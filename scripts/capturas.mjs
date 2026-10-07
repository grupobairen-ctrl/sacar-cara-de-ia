#!/usr/bin/env node
// Saca capturas de la web en compu (1440 px) y celular (390 px): página entera
// y primera pantalla, con las animaciones de aparición ya resueltas.
//
// Uso (desde cualquier carpeta):
//   npx -y -p playwright@1 node capturas.mjs --base http://localhost:4321 \
//     --salida "<vault>/07 - Web/Capturas" --etiqueta antes --ficha \
//     portada=/ catalogo=/catalogo.html
//
// Cada página va como nombre=ruta (o solo la ruta). --ficha suma la primera
// ficha que encuentre en el catálogo. --solo compu|celular saca un solo tamaño.

import { createRequire } from 'node:module';
import { existsSync, mkdirSync } from 'node:fs';
import { join, delimiter, resolve } from 'node:path';

const PANTALLAS = {
  compu: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 },
  celular: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
};

function cargarPlaywright() {
  try { return createRequire(import.meta.url)('playwright'); } catch {}
  // npx -p playwright deja el paquete en el PATH, no al alcance de require.
  for (const dir of (process.env.PATH || '').split(delimiter)) {
    if (!dir.endsWith(join('node_modules', '.bin'))) continue;
    const pkg = join(dir, '..', 'playwright', 'package.json');
    if (existsSync(pkg)) return createRequire(pkg)('playwright');
  }
  console.error('No encontré Playwright. Corré el script así: npx -y -p playwright@1 node capturas.mjs ...');
  process.exit(2);
}

function leerArgumentos(argv) {
  const opc = { base: 'http://localhost:4321', salida: 'capturas', etiqueta: 'antes', ficha: false, catalogo: '/catalogo.html', solo: null, paginas: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--base') opc.base = argv[++i];
    else if (a === '--salida') opc.salida = argv[++i];
    else if (a === '--etiqueta') opc.etiqueta = argv[++i];
    else if (a === '--catalogo') opc.catalogo = argv[++i];
    else if (a === '--solo') opc.solo = argv[++i];
    else if (a === '--ficha') opc.ficha = true;
    else {
      const [nombre, ruta] = a.includes('=') ? a.split(/=(.*)/s) : [nombreDeRuta(a), a];
      opc.paginas.push({ nombre, ruta });
    }
  }
  return opc;
}

function nombreDeRuta(ruta) {
  const limpia = ruta.split(/[?#]/)[0].replace(/^\/+|\/+$/g, '').replace(/\.html$/, '');
  return limpia ? limpia.replace(/[^\w-]+/g, '-') : 'portada';
}

async function abrir(pagina, url) {
  try {
    await pagina.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
  } catch {
    await pagina.goto(url, { waitUntil: 'load', timeout: 30000 });
  }
  await pagina.evaluate(() => document.fonts && document.fonts.ready);
}

// Recorre la página para que carguen las imágenes diferidas y se disparen las
// animaciones de aparición; después fuerza visible lo que haya quedado en cero.
// Solo fuerza lo que tiene pinta de animación de aparición (corrido o con
// transición de opacidad), nunca un campo de formulario oculto a propósito.
async function prepararParaCaptura(pagina) {
  const alto = await pagina.evaluate(() => document.documentElement.scrollHeight);
  const paso = Math.round((await pagina.evaluate(() => window.innerHeight)) * 0.6);
  for (let y = 0; y < alto; y += paso) {
    await pagina.evaluate((v) => window.scrollTo(0, v), y);
    await pagina.waitForTimeout(150);
  }
  await pagina.addStyleTag({ content: '*,*::before,*::after{transition-duration:0s!important;transition-delay:0s!important;animation-duration:0s!important;animation-delay:0s!important}' });
  const forzados = await pagina.evaluate(() => {
    let n = 0;
    for (const el of document.querySelectorAll('body *')) {
      const s = getComputedStyle(el);
      if (s.opacity !== '0' || s.visibility === 'hidden' || s.position === 'fixed') continue;
      if (el.matches('input, select, textarea, option')) continue;
      if (s.transform === 'none' && !/\b(opacity|all)\b/.test(s.transitionProperty.replace(/^all$/, ''))) continue;
      if (el.closest('[hidden],[aria-hidden="true"],dialog:not([open])')) continue;
      const r = el.getBoundingClientRect();
      if (r.width < 2 || r.height < 2) continue;
      el.style.setProperty('opacity', '1', 'important');
      el.style.setProperty('transform', 'none', 'important');
      n++;
    }
    return n;
  });
  await pagina.evaluate(() => window.scrollTo(0, 0));
  await pagina.waitForTimeout(400);
  return forzados;
}

async function buscarFicha(contexto, opc) {
  const pagina = await contexto.newPage();
  await abrir(pagina, new URL(opc.catalogo, opc.base).href);
  await pagina.waitForTimeout(800);
  const href = await pagina.evaluate(() => {
    const a = document.querySelector('a[href*="propiedad"], a[href*="producto"], a[href*="ficha"]');
    return a ? a.getAttribute('href') : null;
  });
  await pagina.close();
  return href;
}

async function lanzar(chromium) {
  try { return await chromium.launch({ channel: 'chrome' }); } catch {}
  try { return await chromium.launch(); } catch {}
  console.error('No hay navegador para las capturas. Instalalo con: npx -y playwright@1 install chromium (baja unos 150 MB).');
  process.exit(3);
}

const opc = leerArgumentos(process.argv.slice(2));
if (!opc.paginas.length && !opc.ficha) opc.paginas.push({ nombre: 'portada', ruta: '/' });
const salida = resolve(opc.salida);
mkdirSync(salida, { recursive: true });

const { chromium } = cargarPlaywright();
const navegador = await lanzar(chromium);
const resultado = [];

for (const [dispositivo, config] of Object.entries(PANTALLAS)) {
  if (opc.solo && opc.solo !== dispositivo) continue;
  const contexto = await navegador.newContext({ ...config, reducedMotion: 'reduce' });
  const paginas = [...opc.paginas];
  if (opc.ficha) {
    const href = await buscarFicha(contexto, opc);
    if (href) paginas.push({ nombre: 'ficha', ruta: href });
    else console.error(`[${dispositivo}] No encontré ninguna ficha en ${opc.catalogo}.`);
  }
  for (const { nombre, ruta } of paginas) {
    const url = new URL(ruta, opc.base).href;
    const pagina = await contexto.newPage();
    try {
      await abrir(pagina, url);
      const forzados = await prepararParaCaptura(pagina);
      const base = join(salida, `${nombre}-${dispositivo}-${opc.etiqueta}`);
      await pagina.screenshot({ path: `${base}.png`, fullPage: true });
      await pagina.screenshot({ path: `${base}-primera.png` });
      resultado.push({ pagina: nombre, dispositivo, url, archivo: `${base}.png`, primeraPantalla: `${base}-primera.png`, invisiblesForzados: forzados });
    } catch (e) {
      resultado.push({ pagina: nombre, dispositivo, url, error: e.message.split('\n')[0] });
    }
    await pagina.close();
  }
  await contexto.close();
}

await navegador.close();
console.log(JSON.stringify(resultado, null, 2));
