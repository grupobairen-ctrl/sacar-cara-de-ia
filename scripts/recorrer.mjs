#!/usr/bin/env node
// Recorre la web como una persona: toca lo que ve por su texto, escribe y elige
// en los campos por su nombre, y anota en cada paso si pudo o no, con una captura.
// Nunca manda nada de verdad: frena los envíos (formularios, pedidos que escriben
// en la base, simulando que salieron bien) y los saltos a otra web (WhatsApp,
// mapas, redes), y anota adónde habrían ido.
//
// Uso (desde cualquier carpeta):
//   npx -y -p playwright@1 node recorrer.mjs --base http://localhost:4321 \
//     --guion "<archivo>.json" --salida "<vault>/07 - Web/Capturas/recorridos" \
//     --etiqueta antes [--compu] [--seguir]
//
// En celular por defecto (390 px, con toque). --compu recorre en 1440 px.
// Frena en el primer paso que falla, como una persona trabada; --seguir sigue igual.
//
// El guion es un JSON:
// {
//   "persona": "comprador",
//   "tarea": "Encontrar un 2 ambientes en Palermo y pedir una visita",
//   "pasos": [
//     { "ir": "/" },
//     { "tocar": "Propiedades" },
//     { "elegir": "Palermo", "en": "Barrio" },
//     { "tocar": "primera propiedad", "css": "a[href^='/propiedad']" },
//     { "ver": "Pedir visita" },
//     { "escribir": "Ana Prueba", "en": "Nombre" },
//     { "marcar": "Acepto" },
//     { "bajar": 1 },
//     { "tocar": "Enviar" },
//     { "volver": true }
//   ]
// }
// "tocar", "ver" y "marcar" buscan por el texto que ve la persona (o el nombre del
// botón para un lector de pantalla). "en" es la etiqueta o el texto de ayuda del
// campo. "css" es el último recurso, para lo que no tiene texto (una foto).

import { createRequire } from 'node:module';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, delimiter, resolve } from 'node:path';

const PANTALLAS = {
  compu: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 },
  celular: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
};

function cargarPlaywright() {
  try { return createRequire(import.meta.url)('playwright'); } catch {}
  for (const dir of (process.env.PATH || '').split(delimiter)) {
    if (!dir.endsWith(join('node_modules', '.bin'))) continue;
    const pkg = join(dir, '..', 'playwright', 'package.json');
    if (existsSync(pkg)) return createRequire(pkg)('playwright');
  }
  console.error('No encontré Playwright. Corré el script así: npx -y -p playwright@1 node recorrer.mjs ...');
  process.exit(2);
}

function leerArgumentos(argv) {
  const opc = { base: 'http://localhost:4321', guion: null, salida: 'recorridos', etiqueta: 'antes', dispositivo: 'celular', seguir: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--base') opc.base = argv[++i];
    else if (a === '--guion') opc.guion = argv[++i];
    else if (a === '--salida') opc.salida = argv[++i];
    else if (a === '--etiqueta') opc.etiqueta = argv[++i];
    else if (a === '--compu') opc.dispositivo = 'compu';
    else if (a === '--seguir') opc.seguir = true;
  }
  if (!opc.guion) {
    console.error('Falta --guion con el archivo JSON del recorrido.');
    process.exit(1);
  }
  return opc;
}

async function lanzar(chromium) {
  try { return await chromium.launch({ channel: 'chrome' }); } catch {}
  try { return await chromium.launch(); } catch {}
  console.error('No hay navegador. Instalalo con: npx -y playwright@1 install chromium (baja unos 150 MB).');
  process.exit(3);
}

const slug = (t) => String(t).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 30);

// Lo que diría una persona sobre adónde la manda un link que sale de la web.
function describirSalida(href) {
  try {
    const u = new URL(href);
    if (/(^|\.)wa\.me$|whatsapp\.com$/.test(u.hostname) || u.protocol === 'whatsapp:') {
      const texto = u.searchParams.get('text');
      return `abriría WhatsApp${texto ? ` con el mensaje: "${texto}"` : ' (sin mensaje armado)'}`;
    }
    if (u.protocol === 'tel:') return `llamaría a ${u.pathname}`;
    if (u.protocol === 'mailto:') return `abriría un mail a ${u.pathname}`;
    return `abriría ${u.hostname}${u.pathname === '/' ? '' : u.pathname}`;
  } catch {
    return `abriría ${href}`;
  }
}

async function primeroVisible(candidatos) {
  for (const loc of candidatos) {
    let todos = [];
    try { todos = await loc.all(); } catch { continue; }
    for (const el of todos) {
      try { if (await el.isVisible()) return el; } catch {}
    }
  }
  return null;
}

// Como una persona: primero lo que dice exactamente eso (el botón "Venta"), y
// solo si no hay, lo que lo contiene (una tarjeta que dice "Venta · Núñez").
// Para tocar, el texto tiene que estar en algo que se toca: un título que dice
// "Propiedades" no lleva a ningún lado, y una persona que lo toca se queda igual.
const ROLES = ['button', 'link', 'tab', 'radio', 'checkbox', 'menuitem', 'option'];
const TOCABLE = 'xpath=ancestor-or-self::*[self::a[@href] or self::button or self::label or self::summary or @role="button" or @role="link" or @role="tab" or @onclick][1]';
async function buscarParaTocar(pagina, paso) {
  const t = paso.tocar ?? paso.marcar ?? paso.ver;
  const soloVer = paso.ver !== undefined;
  if (paso.css) {
    const el = await primeroVisible([pagina.locator(paso.css)]);
    if (el) return { el, exacto: true };
  }
  if (typeof t !== 'string') return { el: null };
  for (const exact of [true, false]) {
    const lista = ROLES.map((rol) => pagina.getByRole(rol, { name: t, exact }));
    lista.push(pagina.getByLabel(t, { exact }));
    lista.push(soloVer ? pagina.getByText(t, { exact }) : pagina.getByText(t, { exact }).locator(TOCABLE));
    const el = await primeroVisible(lista);
    if (el) return { el, exacto: exact };
  }
  return { el: null };
}

function buscarCampo(pagina, nombre) {
  return primeroVisible([
    pagina.getByLabel(nombre, { exact: false }),
    pagina.getByPlaceholder(nombre, { exact: false }),
    pagina.getByRole('textbox', { name: nombre }),
    pagina.getByRole('searchbox', { name: nombre }),
    pagina.getByRole('combobox', { name: nombre }),
  ]);
}

async function esperar(pagina) {
  try { await pagina.waitForLoadState('networkidle', { timeout: 5000 }); } catch {}
  await pagina.waitForTimeout(400);
}

const opc = leerArgumentos(process.argv.slice(2));
const guion = JSON.parse(readFileSync(resolve(opc.guion), 'utf8'));
const salida = resolve(opc.salida);
mkdirSync(salida, { recursive: true });
const origen = new URL(opc.base).origin;
const prefijo = `${slug(guion.persona || 'persona')}-${opc.dispositivo}-${opc.etiqueta}`;

const { chromium } = cargarPlaywright();
const navegador = await lanzar(chromium);
const contexto = await navegador.newContext({ ...PANTALLAS[opc.dispositivo], locale: 'es-AR' });

const frenados = [];
const erroresDeLaPagina = [];
let pasoActual = 0;

// El freno: nada sale de verdad. Los envíos se contestan como si hubieran salido
// bien, para ver lo que la persona vería después; los saltos a otra web no se hacen.
await contexto.route('**/*', async (route) => {
  const pedido = route.request();
  const url = pedido.url();
  // Solo lo que hace la página en sí: un mapa o un video metidos adentro se dejan andar.
  const principal = (() => { try { return pedido.frame().parentFrame() === null; } catch { return true; } })();
  const esMapa = /^https:\/\/(maps\.googleapis\.com|www\.google\.com\/maps)/.test(url);
  if (principal && !esMapa && !['GET', 'HEAD', 'OPTIONS'].includes(pedido.method())) {
    frenados.push({ paso: pasoActual, tipo: 'envío frenado', detalle: `${pedido.method()} ${url.split('?')[0]}` });
    return route.fulfill({ status: 201, contentType: 'application/json', body: '[]' });
  }
  if (pedido.isNavigationRequest() && principal && !url.startsWith(origen) && !url.startsWith('about:')) {
    frenados.push({ paso: pasoActual, tipo: 'salida frenada', detalle: describirSalida(url) });
    return route.abort();
  }
  return route.continue();
});

const pagina = await contexto.newPage();
pagina.on('pageerror', (e) => erroresDeLaPagina.push(e.message.split('\n')[0]));
pagina.on('dialog', (d) => d.dismiss().catch(() => {}));
contexto.on('page', (nueva) => { if (nueva !== pagina) nueva.close().catch(() => {}); });

const pasos = [];
let toques = 0;
let trabado = null;

for (const [i, paso] of (guion.pasos || []).entries()) {
  pasoActual = i + 1;
  const n = String(i + 1).padStart(2, '0');
  const registro = { paso: i + 1, accion: Object.keys(paso).filter((k) => k !== 'css' && k !== 'en').join(' '), objetivo: paso.tocar ?? paso.escribir ?? paso.elegir ?? paso.ver ?? paso.marcar ?? paso.ir ?? paso.bajar ?? '', resultado: 'bien', detalle: '' };
  try {
    if (paso.ir !== undefined) {
      await pagina.goto(new URL(paso.ir, opc.base).href, { waitUntil: 'load', timeout: 30000 });
      await esperar(pagina);
    } else if (paso.volver) {
      await pagina.goBack({ timeout: 10000 });
      await esperar(pagina);
      toques++;
    } else if (paso.bajar !== undefined) {
      await pagina.mouse.wheel(0, (Number(paso.bajar) || 1) * PANTALLAS[opc.dispositivo].viewport.height * 0.8);
      await pagina.waitForTimeout(500);
    } else if (paso.ver !== undefined) {
      const { el } = await buscarParaTocar(pagina, paso);
      if (!el) throw new Error(`no veo "${paso.ver}" en la pantalla`);
      await el.scrollIntoViewIfNeeded();
    } else if (paso.tocar !== undefined || paso.marcar !== undefined) {
      const { el, exacto } = await buscarParaTocar(pagina, paso);
      if (!el) throw new Error(`no encuentro "${paso.tocar ?? paso.marcar}" para tocar`);
      await el.scrollIntoViewIfNeeded();
      registro.toco = await el.evaluate((nodo) => `${nodo.tagName.toLowerCase()}: ${(nodo.innerText || nodo.getAttribute('aria-label') || nodo.getAttribute('alt') || '').replace(/\s+/g, ' ').trim().slice(0, 60)}`);
      const notas = [];
      if (!exacto) notas.push(`no hay nada que diga exactamente "${paso.tocar ?? paso.marcar}"; tocó lo que lo contiene (${registro.toco}): revisá si es lo que buscaba la persona`);
      const caja = await el.boundingBox();
      if (caja && opc.dispositivo === 'celular' && (caja.height < 44 || caja.width < 44)) {
        notas.push(`se puede tocar, pero mide ${Math.round(caja.width)} × ${Math.round(caja.height)} px (menos de 44)`);
      }
      registro.detalle = notas.join('; ');
      const href = await el.evaluate((nodo) => nodo.closest('a')?.href || null);
      if (href && (!href.startsWith(origen) || /^(tel|mailto|whatsapp):/.test(href))) {
        registro.detalle = [registro.detalle, describirSalida(href)].filter(Boolean).join('; ');
        frenados.push({ paso: pasoActual, tipo: 'salida frenada', detalle: describirSalida(href) });
      } else if (paso.marcar !== undefined) {
        await el.check({ timeout: 5000 }).catch(() => el.click({ timeout: 5000 }));
      } else if (opc.dispositivo === 'celular') {
        await el.tap({ timeout: 5000 });
      } else {
        await el.click({ timeout: 5000 });
      }
      toques++;
      await esperar(pagina);
    } else if (paso.escribir !== undefined) {
      const campo = await buscarCampo(pagina, paso.en);
      if (!campo) throw new Error(`no encuentro el campo "${paso.en}"`);
      await campo.scrollIntoViewIfNeeded();
      await campo.fill(String(paso.escribir), { timeout: 5000 });
      toques++;
    } else if (paso.elegir !== undefined) {
      const campo = await buscarCampo(pagina, paso.en);
      if (!campo) throw new Error(`no encuentro el campo "${paso.en}"`);
      await campo.scrollIntoViewIfNeeded();
      const esSelect = await campo.evaluate((nodo) => nodo.tagName === 'SELECT');
      if (esSelect) {
        const valor = await campo.evaluate((nodo, buscado) => {
          const op = [...nodo.options].find((o) => o.textContent.toLowerCase().includes(String(buscado).toLowerCase()));
          return op ? op.value : null;
        }, paso.elegir);
        if (valor === null) throw new Error(`"${paso.en}" no tiene la opción "${paso.elegir}"`);
        await campo.selectOption(valor);
      } else {
        await campo.click();
        const opcion = await primeroVisible([pagina.getByRole('option', { name: String(paso.elegir) }), pagina.getByText(String(paso.elegir))]);
        if (!opcion) throw new Error(`no aparece la opción "${paso.elegir}" en "${paso.en}"`);
        await opcion.click();
      }
      toques++;
      await esperar(pagina);
    } else {
      throw new Error(`no entiendo el paso ${JSON.stringify(paso)}`);
    }
  } catch (e) {
    registro.resultado = 'falla';
    registro.detalle = e.message.split('\n')[0].replace(/^locator\.\w+: /, '');
  }
  registro.url = pagina.url().replace(origen, '') || '/';
  registro.captura = join(salida, `${prefijo}-${n}-${slug(registro.objetivo || registro.accion)}.png`);
  await pagina.screenshot({ path: registro.captura }).catch(() => { registro.captura = null; });
  pasos.push(registro);
  if (registro.resultado === 'falla' && !trabado) {
    trabado = registro.paso;
    if (!opc.seguir) break;
  }
}

await navegador.close();

const informe = {
  persona: guion.persona,
  tarea: guion.tarea,
  dispositivo: opc.dispositivo,
  etiqueta: opc.etiqueta,
  llego: !trabado,
  trabadoEnPaso: trabado,
  toques,
  pasos,
  frenados,
  erroresDeLaPagina: [...new Set(erroresDeLaPagina)],
};
writeFileSync(join(salida, `${prefijo}.json`), JSON.stringify(informe, null, 2));
console.log(JSON.stringify(informe, null, 2));
