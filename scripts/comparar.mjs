#!/usr/bin/env node
// Arma una página de "antes y después" para abrir en el navegador: los números
// grandes (palabras, pantallas, acciones, problemas del celular, detector y
// clientes simulados), un deslizador sobre la primera pantalla de cada página
// en compu y en celular, y la tabla completa. No necesita nada instalado.
//
// Uso (desde cualquier carpeta):
//   node comparar.mjs --capturas "<vault>/07 - Web/Capturas" \
//     --antes antes --despues despues \
//     --salida "<vault>/07 - Web/Antes y después.html" \
//     --titulo "Nombre del negocio" --acento "#b08d57" \
//     [--extra extra.json] [--abrir]
//
// extra.json (opcional), con lo que no sale de las capturas:
// {
//   "frase": "Tiene que sentirse como ..., no como ...",
//   "detector": { "antes": 64, "despues": 24 },
//   "recorridos": [
//     { "persona": "Comprador", "tarea": "...", "antes": "Se trabó en el paso 3: ...", "despues": "Llegó en 5 toques", "llegoAntes": false, "llegoDespues": true }
//   ],
//   "tandas": ["Detalles de oficio", "Menos texto", "..."]
// }

import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { execFile } from 'node:child_process';

function leerArgumentos(argv) {
  const opc = { capturas: null, antes: 'antes', despues: 'despues', salida: null, titulo: 'Tu web', acento: '#8a6d3b', extra: null, abrir: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--capturas') opc.capturas = argv[++i];
    else if (a === '--antes') opc.antes = argv[++i];
    else if (a === '--despues') opc.despues = argv[++i];
    else if (a === '--salida') opc.salida = argv[++i];
    else if (a === '--titulo') opc.titulo = argv[++i];
    else if (a === '--acento') opc.acento = argv[++i];
    else if (a === '--extra') opc.extra = argv[++i];
    else if (a === '--abrir') opc.abrir = true;
  }
  if (!opc.capturas) { console.error('Falta --capturas con la carpeta de las capturas.'); process.exit(1); }
  opc.capturas = resolve(opc.capturas);
  opc.salida = resolve(opc.salida || join(opc.capturas, '..', 'Antes y después.html'));
  if (!/^#[0-9a-f]{3,8}$/i.test(opc.acento)) opc.acento = '#8a6d3b';
  return opc;
}

const esc = (t) => String(t ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const nf = new Intl.NumberFormat('es-AR');

function leerJSON(ruta, siFalta) {
  try { return JSON.parse(readFileSync(ruta, 'utf8')); } catch { return siFalta; }
}

const opc = leerArgumentos(process.argv.slice(2));
const antes = leerJSON(join(opc.capturas, `mediciones-${opc.antes}.json`), null);
const despues = leerJSON(join(opc.capturas, `mediciones-${opc.despues}.json`), null);
if (!antes || !despues) {
  console.error(`No encontré mediciones-${opc.antes}.json o mediciones-${opc.despues}.json en ${opc.capturas}. Sacá las capturas con esas etiquetas primero.`);
  process.exit(1);
}
const extra = opc.extra ? leerJSON(resolve(opc.extra), {}) : {};

// Las imágenes se enlazan con una ruta relativa a la página, así la carpeta
// se puede mover entera.
const carpetaRel = relative(dirname(opc.salida), opc.capturas).split(sep).map(encodeURIComponent).join('/');
const img = (archivo) => (carpetaRel ? `${carpetaRel}/` : '') + encodeURIComponent(archivo);
const hay = (archivo) => existsSync(join(opc.capturas, archivo));

const buscar = (lista, pagina, dispositivo) => lista.find((r) => r.pagina === pagina && r.dispositivo === dispositivo);
const paginas = [...new Set([...antes, ...despues].map((r) => r.pagina))];
const orden = ['portada', 'catalogo', 'ficha'];
paginas.sort((a, b) => (orden.indexOf(a) + 1 || 99) - (orden.indexOf(b) + 1 || 99));
const nombrePagina = (p) => ({ portada: 'Portada', catalogo: 'Catálogo', ficha: 'Ficha' })[p] || p.charAt(0).toUpperCase() + p.slice(1).replace(/-/g, ' ');

const suma = (lista, campo, dispositivo) => lista.filter((r) => !dispositivo || r.dispositivo === dispositivo).reduce((t, r) => t + (Number(r[campo]) || 0), 0);
const problemasCel = (lista) => lista.filter((r) => r.dispositivo === 'celular').reduce((t, r) => t + (r.botonesChicos || 0) + (r.camposQueHacenZoom || 0) + (r.seSaleDeCostado ? 1 : 0), 0);

function variacion(a, d, menosEsMejor = true) {
  if (a === d) return { texto: 'igual', clase: 'igual' };
  if (!a) return { texto: d > a ? `+${nf.format(d - a)}` : nf.format(d - a), clase: (d < a) === menosEsMejor ? 'mejor' : 'peor' };
  const pct = Math.round(((d - a) / a) * 100);
  return { texto: `${pct > 0 ? '+' : ''}${pct} %`, clase: (d < a) === menosEsMejor ? 'mejor' : 'peor' };
}

// Los números grandes: solo los que cambiaron, para que la página cuente algo.
const grandes = [];
const portadaCelA = buscar(antes, 'portada', 'celular');
const portadaCelD = buscar(despues, 'portada', 'celular');
if (portadaCelA && portadaCelD) {
  grandes.push({ titulo: 'Palabras en la portada, en el celular', a: portadaCelA.palabras, d: portadaCelD.palabras });
  grandes.push({ titulo: 'Pantallas para recorrer la portada', a: portadaCelA.pantallas, d: portadaCelD.pantallas });
}
grandes.push({ titulo: 'Palabras en toda la web, en el celular', a: suma(antes, 'palabras', 'celular'), d: suma(despues, 'palabras', 'celular') });
grandes.push({ titulo: 'Botones que compiten en la primera pantalla', a: suma(antes, 'accionesPrimeraPantalla'), d: suma(despues, 'accionesPrimeraPantalla') });
grandes.push({ titulo: 'Problemas al usarla con el dedo', a: problemasCel(antes), d: problemasCel(despues) });
if (extra.detector && extra.detector.antes != null && extra.detector.despues != null) {
  grandes.push({ titulo: 'Avisos del detector de diseño', a: extra.detector.antes, d: extra.detector.despues });
}
const recorridos = Array.isArray(extra.recorridos) ? extra.recorridos : [];
const conResultado = recorridos.filter((r) => typeof r.llegoAntes === 'boolean' && typeof r.llegoDespues === 'boolean');
if (conResultado.length) {
  grandes.push({ titulo: 'Clientes simulados que llegaron a lo que buscaban', a: conResultado.filter((r) => r.llegoAntes).length, d: conResultado.filter((r) => r.llegoDespues).length, menosEsMejor: false, de: conResultado.length });
}
// Primero lo que mejoró; lo que empeoró también se muestra, para no mentir.
const mostrar = grandes.filter((g) => g.a !== g.d)
  .map((g) => ({ ...g, _mejor: (g.d < g.a) === (g.menosEsMejor !== false) }))
  .sort((x, y) => Number(y._mejor) - Number(x._mejor))
  .map(({ _mejor, ...g }) => g);

const tarjetasGrandes = mostrar.map((g) => {
  const v = variacion(g.a, g.d, g.menosEsMejor !== false);
  const de = g.de ? ` de ${g.de}` : '';
  return `<div class="dato">
      <p class="dato__titulo">${esc(g.titulo)}</p>
      <p class="dato__numeros"><span class="dato__antes">${nf.format(g.a)}</span><span class="dato__flecha" aria-hidden="true">→</span><span class="dato__despues">${nf.format(g.d)}${de}</span></p>
      <p class="dato__var dato__var--${v.clase}">${esc(v.texto)}</p>
    </div>`;
}).join('\n');

function comparador(pagina, dispositivo) {
  const a = `${pagina}-${dispositivo}-${opc.antes}-primera.png`;
  const d = `${pagina}-${dispositivo}-${opc.despues}-primera.png`;
  if (!hay(a) || !hay(d)) return '';
  const enteraA = `${pagina}-${dispositivo}-${opc.antes}.png`;
  const enteraD = `${pagina}-${dispositivo}-${opc.despues}.png`;
  const etiqueta = dispositivo === 'celular' ? 'Celular' : 'Compu';
  return `<figure class="comp comp--${dispositivo}">
      <div class="comp__marco" style="--pos:50%">
        <img src="${img(a)}" alt="${esc(nombrePagina(pagina))} antes, en ${etiqueta.toLowerCase()}" loading="lazy">
        <img class="comp__despues" src="${img(d)}" alt="${esc(nombrePagina(pagina))} después, en ${etiqueta.toLowerCase()}" loading="lazy">
        <span class="comp__linea" aria-hidden="true"></span>
        <span class="comp__etq comp__etq--a">Antes</span>
        <span class="comp__etq comp__etq--d">Después</span>
        <input class="comp__rango" type="range" min="0" max="100" value="50" aria-label="Deslizá para comparar ${esc(nombrePagina(pagina))} en ${etiqueta.toLowerCase()}">
      </div>
      <figcaption>${etiqueta}${hay(enteraA) && hay(enteraD) ? ` · página entera: <a href="${img(enteraA)}" target="_blank" rel="noopener">antes</a> y <a href="${img(enteraD)}" target="_blank" rel="noopener">después</a>` : ''}</figcaption>
    </figure>`;
}

const secciones = paginas.map((p) => {
  const comps = ['compu', 'celular'].map((d) => comparador(p, d)).filter(Boolean).join('\n');
  if (!comps) return '';
  return `<section class="pagina">
    <h2>${esc(nombrePagina(p))}</h2>
    <div class="pagina__comps">${comps}</div>
  </section>`;
}).join('\n');

const filas = [];
const campos = [
  ['palabras', 'Palabras'],
  ['palabrasPrimeraPantalla', 'Palabras arriba'],
  ['pantallas', 'Pantallas'],
  ['accionesPrimeraPantalla', 'Botones arriba'],
  ['acciones', 'Botones en total'],
  ['botonesChicos', 'Botones chicos'],
  ['camposQueHacenZoom', 'Campos que hacen zoom'],
];
for (const p of paginas) {
  for (const d of ['compu', 'celular']) {
    const a = buscar(antes, p, d);
    const z = buscar(despues, p, d);
    if (!a || !z) continue;
    const celdas = campos.map(([c]) => {
      if (d === 'compu' && (c === 'botonesChicos' || c === 'camposQueHacenZoom')) return '<td class="vacio">·</td>';
      const v = variacion(a[c], z[c]);
      return `<td><span class="t-antes">${nf.format(a[c])}</span> → <strong>${nf.format(z[c])}</strong>${v.clase !== 'igual' ? ` <span class="t-var t-var--${v.clase}">${esc(v.texto)}</span>` : ''}</td>`;
    }).join('');
    filas.push(`<tr><th scope="row">${esc(nombrePagina(p))} <span class="t-disp">${d}</span></th>${celdas}</tr>`);
  }
}

const listaRecorridos = recorridos.length ? `<section class="recorridos">
    <h2>Clientes simulados</h2>
    <p class="nota">Recorrieron la web en el celular como lo haría cada cliente, tocando lo que ven. No se mandó nada de verdad.</p>
    <ul>${recorridos.map((r) => `
      <li>
        <p class="rec__persona">${esc(r.persona)}</p>
        <p class="rec__tarea">${esc(r.tarea)}</p>
        <p class="rec__res"><span class="rec__etq">Antes</span> ${esc(r.antes)}</p>
        <p class="rec__res"><span class="rec__etq rec__etq--d">Después</span> ${esc(r.despues)}</p>
      </li>`).join('')}
    </ul>
  </section>` : '';

const tandas = Array.isArray(extra.tandas) && extra.tandas.length ? `<section class="tandas">
    <h2>Lo que se hizo</h2>
    <ol>${extra.tandas.map((t) => `<li>${esc(t)}</li>`).join('')}</ol>
  </section>` : '';

const fecha = new Intl.DateTimeFormat('es-AR', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date());

const html = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(opc.titulo)} · antes y después</title>
<style>
  :root { --acento: ${opc.acento}; --fondo: #fbfaf8; --tinta: #16161a; --suave: #6b6a70; --linea: #e6e3de; --mejor: #1f7a4d; --peor: #a23b2a; }
  @media (prefers-color-scheme: dark) { :root { --fondo: #121214; --tinta: #f2f1ee; --suave: #a3a2a8; --linea: #2a2a2e; --mejor: #5cc394; --peor: #f08a76; } }
  * { box-sizing: border-box; }
  body { margin: 0; background: var(--fondo); color: var(--tinta); font: 17px/1.55 system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; -webkit-font-smoothing: antialiased; }
  .wrap { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
  header { padding: 56px 0 24px; }
  .kicker { margin: 0 0 8px; color: var(--acento); font-weight: 600; letter-spacing: .02em; }
  h1 { margin: 0; font-size: clamp(34px, 6vw, 64px); line-height: 1.05; letter-spacing: -.02em; text-wrap: balance; }
  .frase { margin: 16px 0 0; max-width: 60ch; color: var(--suave); font-size: 19px; }
  h2 { font-size: 26px; letter-spacing: -.01em; margin: 0 0 18px; }
  .datos { display: flex; flex-wrap: wrap; border: 1px solid var(--linea); border-radius: 14px; overflow: hidden; margin: 24px 0 64px; }
  .dato { flex: 1 1 220px; padding: 22px 22px 20px; box-shadow: 1px 0 0 var(--linea), 0 1px 0 var(--linea); }
  .dato__titulo { margin: 0; color: var(--suave); font-size: 15px; min-height: 2.6em; }
  .dato__numeros { margin: 8px 0 2px; display: flex; align-items: baseline; gap: 10px; font-variant-numeric: tabular-nums; }
  .dato__antes { color: var(--suave); font-size: 22px; text-decoration: line-through; text-decoration-thickness: 1px; }
  .dato__flecha { color: var(--suave); }
  .dato__despues { font-size: 40px; font-weight: 700; letter-spacing: -.02em; }
  .dato__var { margin: 0; font-weight: 600; font-size: 15px; }
  .dato__var--mejor, .t-var--mejor { color: var(--mejor); }
  .dato__var--peor, .t-var--peor { color: var(--peor); }
  .pagina { margin: 0 0 72px; }
  .pagina__comps { display: flex; gap: 28px; align-items: flex-start; flex-wrap: wrap; }
  .comp { margin: 0; flex: 1 1 640px; min-width: 0; }
  .comp--celular { flex: 0 1 360px; }
  .comp__marco { position: relative; border-radius: 12px; overflow: hidden; border: 1px solid var(--linea); background: #000; touch-action: pan-y; }
  .comp--celular .comp__marco { border-radius: 26px; }
  .comp__marco img { display: block; width: 100%; height: auto; }
  .comp__despues { position: absolute; inset: 0; clip-path: inset(0 0 0 var(--pos)); }
  .comp__linea { position: absolute; top: 0; bottom: 0; left: var(--pos); width: 2px; margin-left: -1px; background: #fff; box-shadow: 0 0 0 1px rgba(0,0,0,.25); pointer-events: none; }
  .comp__linea::after { content: "⇆"; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 40px; height: 40px; border-radius: 50%; background: #fff; color: #111; display: grid; place-items: center; font-size: 18px; box-shadow: 0 2px 10px rgba(0,0,0,.3); }
  .comp__etq { position: absolute; top: 12px; padding: 4px 10px; border-radius: 99px; background: rgba(0,0,0,.6); color: #fff; font-size: 13px; font-weight: 600; pointer-events: none; }
  .comp__etq--a { left: 12px; }
  .comp__etq--d { right: 12px; background: var(--acento); }
  .comp__rango { position: absolute; inset: 0; width: 100%; height: 100%; margin: 0; opacity: 0; cursor: ew-resize; }
  .comp__marco:has(.comp__rango:focus-visible) { outline: 3px solid var(--acento); outline-offset: 3px; }
  figcaption { margin-top: 10px; color: var(--suave); font-size: 15px; }
  figcaption a { color: inherit; }
  .tabla { overflow-x: auto; margin: 0 0 72px; border: 1px solid var(--linea); border-radius: 12px; }
  table { border-collapse: collapse; width: 100%; font-size: 15px; font-variant-numeric: tabular-nums; }
  th, td { padding: 12px 14px; text-align: left; border-bottom: 1px solid var(--linea); white-space: nowrap; }
  thead th { color: var(--suave); font-weight: 600; }
  tbody tr:last-child th, tbody tr:last-child td { border-bottom: 0; }
  .t-antes, .t-disp { color: var(--suave); }
  .t-disp { font-weight: 400; margin-left: 4px; }
  .t-var { font-size: 13px; font-weight: 600; }
  .vacio { color: var(--linea); }
  .recorridos ul { list-style: none; padding: 0; margin: 0 0 72px; display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; }
  .recorridos li { border: 1px solid var(--linea); border-radius: 12px; padding: 18px; }
  .rec__persona { margin: 0; font-weight: 700; font-size: 19px; }
  .rec__tarea { margin: 2px 0 12px; color: var(--suave); }
  .rec__res { margin: 6px 0 0; }
  .rec__etq { display: inline-block; min-width: 72px; font-size: 13px; font-weight: 600; color: var(--suave); }
  .rec__etq--d { color: var(--acento); }
  .nota { color: var(--suave); margin: -8px 0 18px; }
  .tandas ol { margin: 0 0 72px; padding-left: 22px; }
  .tandas li { margin: 6px 0; }
  footer { padding: 24px 0 48px; color: var(--suave); font-size: 14px; border-top: 1px solid var(--linea); }
  @media (max-width: 600px) { .comp, .comp--celular { flex-basis: 100%; } header { padding-top: 36px; } }
</style>
</head>
<body>
<main class="wrap">
  <header>
    <p class="kicker">${esc(opc.titulo)} · ${esc(fecha)}</p>
    <h1>Antes y después</h1>
    ${extra.frase ? `<p class="frase">${esc(extra.frase)}</p>` : ''}
  </header>
  ${tarjetasGrandes ? `<div class="datos">${tarjetasGrandes}</div>` : ''}
  ${secciones}
  ${listaRecorridos}
  ${filas.length ? `<section>
    <h2>Todas las mediciones</h2>
    <div class="tabla"><table>
      <thead><tr><th scope="col">Página</th>${campos.map(([, t]) => `<th scope="col">${t}</th>`).join('')}</tr></thead>
      <tbody>${filas.join('')}</tbody>
    </table></div>
  </section>` : ''}
  ${tandas}
  <footer>Hecho con la skill sacar-cara-de-ia. Se mide lo que ve una persona: texto y botones visibles, en compu (1440 px) y en celular (390 px).</footer>
</main>
<script>
  for (const r of document.querySelectorAll('.comp__rango')) {
    const marco = r.closest('.comp__marco');
    const mover = () => marco.style.setProperty('--pos', r.value + '%');
    r.addEventListener('input', mover);
    mover();
  }
</script>
</body>
</html>
`;

mkdirSync(dirname(opc.salida), { recursive: true });
writeFileSync(opc.salida, html);
console.log(JSON.stringify({ pagina: opc.salida, numeros: mostrar.map((g) => ({ ...g, variacion: variacion(g.a, g.d, g.menosEsMejor !== false).texto })) }, null, 2));

if (opc.abrir) {
  const [cmd, args] = process.platform === 'darwin' ? ['open', [opc.salida]]
    : process.platform === 'win32' ? ['cmd', ['/c', 'start', '', opc.salida]]
    : ['xdg-open', [opc.salida]];
  execFile(cmd, args, () => {});
}
