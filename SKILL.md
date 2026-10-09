---
name: sacar-cara-de-ia
description: Revisa y mejora la web armada en el curso (portada, catálogo, ficha y demás páginas públicas) para que deje de parecer hecha con IA, se entienda sin explicación y en el celular se use como una app, usando el vault de Obsidian como única fuente de verdad. Lee la marca, la voz, el negocio y los tipos de cliente del vault; saca capturas en compu y celular y mide cada página (palabras, pantallas, botones que compiten, problemas al tocar); pasa el detector de Impeccable; recorre la web como cada cliente sin mandar nada de verdad; escribe un informe en castellano simple; aplica los cambios por tandas, con OK y un commit por tanda; y cierra con una página de antes y después con los números. Usar cuando pidan "que la web no parezca IA", "sacale la cara de IA", "pulí el diseño de la web", "que la web sea más intuitiva", "que se sienta una app", "que la web quede de primera", "auditoría de diseño" o "/sacar-cara-de-ia".
argument-hint: "[auditar | aplicar | página puntual]"
---

# Sacar la cara de IA

Una web hecha con IA se reconoce por tres cosas:
1. **Decisiones por defecto**: la misma estructura, letra, color y movimiento que elige cualquier IA si nadie le dice otra cosa.
2. **Falta de cosas reales**: fotos propias, caras, datos, lugares, pruebas. Sin eso, hasta un diseño perfecto parece de mentira.
3. **Demasiado**: demasiado texto, demasiados botones, demasiados pasos. Una web que hay que explicar no se usa.

Esta skill ataca las tres y **lo demuestra con números**: palabras, pantallas, botones y clientes simulados que llegan o no a lo que buscan, antes y después. La vara no es tu gusto: es lo que el vault dice del negocio.

## Reglas que no se rompen

- **El vault manda.** Leé el `CLAUDE.md` del vault y cumplí sus reglas: qué se pregunta antes, cómo se escribe, qué no se nombra.
- **No inventás nada.** Ni fotos, ni videos, ni testimonios, ni números, ni clientes, ni premios, ni datos de productos. Si una mejora necesita algo real que no está en el vault, va a "Lo que tenés que conseguir vos".
- **La marca no cambia sola.** Colores, tipografías, logo y frase son decisiones del dueño. Si algo de la marca delata a la IA, lo explicás con opciones y cambiás solo con OK. Si cambia, actualizás la nota de marca del vault.
- **Se cambia el aspecto y el orden, no la lógica.** No tocás formularios, links de WhatsApp, filtros, base de datos, panel, idiomas ni SEO, salvo un texto o una clase. Podés conectar con lo que ya existe (por ejemplo, un buscador en la portada que lleve al catálogo con un filtro que el catálogo ya entiende), pero no sumás funciones nuevas (guardar favoritos, cuentas, buscadores con lógica propia). Si algo deja de andar, es un error tuyo y lo arreglás antes de seguir.
- **Recortar no es borrar lo que vende.** Se recorta lo que explica, repite o adorna. Lo que el cliente quiere saber (precio, metros, comodidades, ubicación) se compacta, no se borra.
- **Nada sale de verdad.** Los clientes simulados no mandan formularios ni mensajes: `recorrer.mjs` los frena. No pruebes envíos de otra forma.
- **No publicás por tu cuenta.** Si el `CLAUDE.md` del vault tiene la regla de publicación automática, al terminar cada tanda publicás como dice esa regla. Si no la tiene, todo queda en la compu y publicar es otro paso, con su propio OK.
- **Hablás simple**, como pide el `INICIO` del vault. Si usás una palabra de diseño ("jerarquía", "contraste"), decís qué significa en esa pantalla.
- **Cuando preguntás, frenás** y esperás la respuesta.

## Paso 0. Contarlo

Antes de arrancar, decile al alumno en tres líneas qué va a pasar: vas a mirar su web como un diseñador y como sus clientes, le vas a mostrar qué la delata y cuánto sobra, y no vas a cambiar nada hasta que elija. Avisá que la primera vez tarda unos minutos porque baja las herramientas.

## Paso 1. Ubicar todo

1. **El vault**: la carpeta con el `CLAUDE.md` del curso. Si no leíste `INICIO` y `Prioridades` en esta conversación, leelos.
2. **Las notas** (en el curso se llaman así; si no están, buscalas por contenido):
   - Marca: `Identidad visual`, `Voz de marca`, `Contacto público`.
   - Negocio: `Perfil del negocio`, `Diferencial`, `Servicios`, `Zonas`, `Equipo`, `Competencia`.
   - Clientes: cada perfil de `05 - Clientes` y `Preguntas frecuentes`. De acá salen los clientes simulados.
   - Web: `Brief de la web`, `Estado de la web`.
   - Dos o tres notas del catálogo (propiedades o productos), para ver qué datos reales hay.
   - Webs de referencia, si alguna nota las nombra (suele ser `Identidad visual` o `Brief de la web`).
3. **La web**: la carpeta `web/` del vault (si no existe, la que tenga el `index.html`).
   - Corré `git status` ahí. Si hay cambios sin guardar, avisale al alumno y proponé un commit antes de empezar: es el punto de vuelta.
   - Levantá la web en la compu, en segundo plano. Si el puerto 4321 ya responde, usalo. Si existe `web/servidor-local.js`, `node web/servidor-local.js`; si no, `python3 -m http.server 4321 --directory web`.
   - Hacé la lista de páginas públicas: portada, catálogo, una ficha real y las que haya (nosotros, contacto, tasaciones, pedido de visita, 404). El panel de administración no entra.
4. **Fotos y videos propios**: fijate qué hay en el vault y en `web/` (por ejemplo `03 - Marca/archivos/`, `web/assets/`). Un video propio cambia la primera pantalla; si no hay, se anota en "Lo que tenés que conseguir vos".

## Paso 2. La dirección y la tarea de cada cliente

Antes de mirar la web, escribí para vos (después va al informe):
- Qué vende, a quién y dónde.
- Lo que solo este negocio tiene y la competencia no puede copiar: diferencial, zonas, números, equipo, forma de trabajar. Si el diferencial es genérico ("atención personalizada", "calidad"), anotalo como problema de contenido.
- Cómo habla (voz de marca) y cómo se ve (identidad visual, webs de referencia).
- **La frase de dirección**: "Tiene que sentirse como ___, no como ___". Ejemplo: "como el anfitrión de una casa grande, no como un portal de avisos".
- **La tarea número uno de cada tipo de cliente**, con sus palabras. Ejemplo: comprador, "ver departamentos de 2 ambientes en venta en Palermo y preguntar por uno"; propietario, "pedir una tasación".

Cada cambio que propongas sale de esta frase, de una seña concreta, de un número medido o de un cliente que se trabó. Nunca de "queda más lindo".

## Paso 3. Capturas y medición del antes

Desde cualquier carpeta, con la ruta real de esta skill:

```bash
npx -y -p playwright@1 node "<carpeta de esta skill>/scripts/capturas.mjs" \
  --base http://localhost:4321 --salida "<vault>/07 - Web/Capturas" \
  --etiqueta antes --ficha portada=/ catalogo=/catalogo.html <otras páginas>
```

- Saca cada página en compu (1440 px) y celular (390 px): la página entera y la primera pantalla (`-primera.png`).
- **Mide** cada página como la ve una persona (solo lo visible): `palabras`, `palabrasPrimeraPantalla`, `pantallas`, `acciones`, `accionesPrimeraPantalla`, `campos`, `fotoOVideoGrandeArriba`, `seSaleDeCostado`, `botonesChicos` (con ejemplos) y `camposQueHacenZoom`. Queda en `mediciones-antes.json`, en la misma carpeta. Qué significa cada número y qué meta tiene: [referencias/la-vara-alta.md](referencias/la-vara-alta.md), sección 1.
- `--ficha` busca sola la primera ficha del catálogo. Si el catálogo está en otra ruta, sumá `--catalogo /ruta`.
- Si ya hay capturas de una ronda anterior, usá etiquetas `r2-antes`, `r2-tanda-1`, para no pisarlas.
- Si dice que no hay navegador, avisale al alumno que se baja uno de unos 150 MB y corré `npx -y playwright@1 install chromium`. Si igual falla, usá la herramienta de navegador que tengas y sacá las capturas pantalla por pantalla.
- El resultado dice `invisiblesForzados`: si es mayor a 0, hay contenido que solo aparece con una animación. Anotalo para el paso 6.
- **Referente de sencillez** (opcional): si hay una web de referencia, medila igual con `--base https://esa-web --salida "<vault>/07 - Web/Capturas/referente" --etiqueta referente portada=/`. De esa web se compara solo cuánto texto y cuántos botones muestra; su estética no se copia.

Mirá todas las capturas antes de seguir. La que más pesa es la primera pantalla de la portada en el celular: es lo que alguien ve en 5 segundos, llegando desde Instagram o WhatsApp.

## Paso 4. El detector

Para cada página, en compu y en celular:

```bash
npx -y impeccable detect --json --no-design-system <url>
npx -y impeccable detect --json --no-design-system --viewport 390x844 <url>
```

- Juntá los resultados por regla, no por aparición. Separá `"category": "slop"` (cara de IA) de `"quality"` (oficio).
- El detector se equivoca. Confirmá cada aviso en la captura o en el CSS; si es falso, lo descartás y lo anotás en el informe como descartado. Ojo: también lee lo que no se ve (el menú del celular cerrado, mensajes que aparecen solo en ciertos casos); si el aviso es sobre algo oculto, medilo abierto antes de darlo por bueno.
- Guardá el total de avisos: es el número del antes.
- El detector no ve lo más importante: estructura repetida, textos genéricos, falta de cosas reales y lo que le cuesta a un cliente. Eso lo hacés vos en los pasos 5 y 6.

## Paso 5. Los clientes simulados

Leé [referencias/la-vara-alta.md](referencias/la-vara-alta.md), sección 7. Después, por cada tipo de cliente del vault (hasta 4), escribí un guion en `<vault>/07 - Web/Capturas/recorridos/guiones/<cliente>.json` con su tarea número uno:

```json
{
  "persona": "Comprador",
  "tarea": "Ver departamentos en venta en Palermo y consultar por uno",
  "pasos": [
    { "ir": "/" },
    { "tocar": "Propiedades" },
    { "elegir": "Venta", "en": "Operación" },
    { "tocar": "primera propiedad", "css": "a[href^='/propiedad']" },
    { "ver": "USD" },
    { "tocar": "WhatsApp" }
  ]
}
```

- Pasos posibles: `ir`, `tocar`, `escribir` (con `en`), `elegir` (con `en`), `marcar`, `ver`, `bajar` y `volver`. `tocar`, `ver` y `marcar` buscan por el texto que ve la persona. `css` es el último recurso, para lo que no tiene texto (una foto).
- Escribí los pasos con **las palabras de la persona**, no copiando las de la web. Si falla porque la web usa otra palabra, eso es un hallazgo: anotalo como "confunde", cambiá a la palabra de la web y seguí.
- Corré todos a la vez:

```bash
cd "<vault>/07 - Web/Capturas/recorridos"
for g in guiones/*.json; do
  npx -y -p playwright@1 node "<carpeta de esta skill>/scripts/recorrer.mjs" \
    --base http://localhost:4321 --guion "$g" --salida . --etiqueta antes > /dev/null &
done; wait
```

  Cada uno deja `<cliente>-celular-antes.json` y una captura por paso.
- El script dice `bien` o `falla` por paso, `toques`, `llego`, qué frenó (`frenados`: el mensaje de WhatsApp que se habría mandado, el formulario que se habría enviado) y los errores de la página. Si un paso dice "no hay nada que diga exactamente...", revisá en la captura si tocó lo que la persona buscaba.
- **Mirá las capturas de cada paso.** Sumá "confunde" donde la persona lo habría encontrado pero dudando: tardó, tocó algo chico, la pantalla no le confirmó nada, el mensaje armado no dice de qué propiedad habla.
- Hacé la lista única de problemas por gravedad: **bloquea**, **molesta**, **detalle**.

## Paso 6. La revisión con ojo de diseñador

1. **Lo que delata a la IA.** Abrí [referencias/senas-de-ia.md](referencias/senas-de-ia.md) y recorré las capturas con esa lista, sección por sección. Hacé primero las tres pruebas del principio.
2. **Lo que sobra y lo que falta para que se use sola.** Abrí [referencias/la-vara-alta.md](referencias/la-vara-alta.md) y hacé las once preguntas en cada página, con los números del paso 3 y lo que pasó en el paso 5. Mirá en especial la primera pantalla (sección 3), las tarjetas (sección 4) y el celular (sección 5).
3. **Los textos**, contra `Voz de marca`: palabras prohibidas, frases que podrían ser de cualquier negocio, signos y guiones que la marca no usa. Si la web tiene dos idiomas, revisá los dos.

- Por cada hallazgo, anotá: dónde está (página, sección, compu o celular), qué se ve, por qué delata o molesta y qué se haría en cambio según la frase de dirección.
- Mirá el CSS de verdad (variables, tipografías, espacios, animaciones) para proponer cambios concretos, no generales.
- Si algo se ve roto en una captura, confirmalo en el código antes de anotarlo. La captura puede crearlo: por ejemplo, un campo que la web oculta a propósito y que el script mostró.

## Paso 7. El informe y el DESIGN.md

1. Escribí `<vault>/07 - Web/Auditoría de diseño.md` con [referencias/plantilla-informe.md](referencias/plantilla-informe.md). Si ya existe, sumá la ronda nueva arriba de la anterior; no la pises. Sumala al índice de `07 - Web`.
   - "Los números": la tabla del antes (y del referente, si lo hay).
   - "Los clientes simulados": quién llegó, quién se trabó y dónde, con la captura del paso donde se trabó.
   - "Por qué parece hecha con IA" y "Lo que sobra": de 6 a 12 hallazgos en total, del más grave al menos grave, cada uno con su captura y en palabras de alguien que no diseña. Mejor 6 bien explicados que 20 de relleno.
   - Tandas: de 3 a 5, de menor a mayor riesgo, cada una con **una meta que se puede medir** ("la portada en el celular, de 253 a menos de 130 palabras", "el comprador llega a consultar en 4 toques o menos"). Un orden que suele funcionar:
     1. **Oficio y celular tipo app**: botones de 44 px, campos que no hacen zoom, nada de costado, barra fija abajo, respuesta al tocar, color de la barra del navegador. No toca la marca.
     2. **Menos texto y menos botones**: las once preguntas aplicadas; títulos humanos, tarjeta entera tocable, confianza compacta, pie corto.
     3. **La primera pantalla y las tarjetas**: imagen o video propio que manda, una frase, una acción; tarjetas con la foto arriba y tres datos; listas que se deslizan en el celular.
     4. **Marca**: cursiva, acento, colores. Solo con OK.
   - "Lo que tenés que conseguir vos": lo que ningún código arregla (fotos, un video corto, caras, datos). Cada ítem va también a `Prioridades`.
2. Creá o actualizá `web/DESIGN.md` con [referencias/plantilla-design-md.md](referencias/plantilla-design-md.md): los valores que ya están en el CSS, lo que dice `Identidad visual`, las señas encontradas como prohibiciones y los límites de sencillez. Si ya existe, mostrale al alumno qué cambia antes de pisarlo.
   - Confirmá que no se publique: `*.md` tiene que estar en `web/.vercelignore` (o en el equivalente del servicio que use). Si no está, sumalo.
   - En `Brief de la web` (o en la nota que se lee para construir la web) sumá una línea: "Reglas de diseño: `web/DESIGN.md`. Se leen antes de tocar el diseño."

## Paso 8. Frenar y preguntar

Mostrale al alumno en el chat, corto:
- La frase de dirección.
- Tres números del antes que sorprendan (por ejemplo: "tu portada en el celular tiene 253 palabras y se recorre en casi 5 pantallas"; "el comprador no pudo filtrar por venta en el celular").
- Las 3 señas o problemas más fuertes, una línea cada uno.
- Las tandas numeradas, con su meta, su riesgo y si tocan la marca.
- El link al informe.

Preguntá qué tandas aplicar y, si alguna toca la marca, qué opción elige. Frená. No toques código hasta tener la respuesta.

## Paso 9. Aplicar, tanda por tanda

Para cada tanda aprobada:
0. **Fijate que nadie más esté tocando la web.** Corré `git status` en `web/`. Si hay cambios que no hiciste vos (puede haber otra conversación de Claude trabajando), frená y avisale al alumno. En los commits, sumá solo tus archivos.
1. **Cambiá.** Primero las variables y los estilos compartidos; después lo de cada página. Las piezas que se repiten en todas las páginas (encabezado, barra fija, pie) van en todas. Si cambiás un texto, cambialo también en el otro idioma y comprobá en el navegador que cambia.
2. **Mirá y medí.** Capturas con `--etiqueta tanda-N` de las páginas que tocaste. Compará los números con los del antes y con la meta de la tanda. Revisá:
   - que nada se salga de costado en celular;
   - botones y links de 44 px o más, y el foco del teclado visible;
   - contraste suficiente (4,5 a 1 en texto chico);
   - que sigan andando el menú, los filtros, la galería, los formularios y los links de WhatsApp (si la tanda tocó un recorrido, corré de nuevo ese cliente con `--etiqueta tanda-N`).
   Si algo empeoró o la meta no se cumplió, arreglalo antes de seguir.
3. **Guardá.** Commit en `web/` con el mensaje `Diseño, tanda N: <qué cambió>`. Así cada tanda se deshace sola. Si el vault tiene publicación automática, publicá ahora, como dice esa regla, y confirmá en la dirección publicada que el cambio está.
4. **Anotá.** Si la tanda cambió una regla de marca, actualizá `Identidad visual` (o la nota que corresponda) y `web/DESIGN.md`.

Al terminar cada tanda, mostrá la primera pantalla del antes y del después y el número que cambió, y seguí con la próxima.

Si el alumno dijo "hacé todo", igual vas por tandas, con capturas, medición y commits, pero sin frenar entre una y otra. Lo que toca la marca se pregunta siempre.

## Paso 10. Cierre: el antes y el después

1. Capturas finales de todas las páginas con `--etiqueta despues` (la misma lista del paso 3).
2. Detector de nuevo: cuántos avisos había y cuántos quedan. Los que quedan a propósito, explicados.
3. Los mismos clientes simulados, con los mismos guiones y `--etiqueta despues`. Si un guion necesita otra palabra porque la web ahora dice otra cosa, cambiala y anotalo.
4. Escribí `<vault>/07 - Web/Capturas/antes-y-despues.json` con la frase, el detector, los recorridos y las tandas:

```json
{
  "frase": "Tiene que sentirse como ..., no como ...",
  "detector": { "antes": 64, "despues": 24 },
  "recorridos": [
    { "persona": "Comprador", "tarea": "...", "antes": "Se trabó en el paso 3: no encontró cómo filtrar por venta.", "despues": "Llegó en 4 toques.", "llegoAntes": false, "llegoDespues": true }
  ],
  "tandas": ["Oficio y celular tipo app", "Menos texto y menos botones", "..."]
}
```

5. Armá la página y abrila en el navegador:

```bash
node "<carpeta de esta skill>/scripts/comparar.mjs" \
  --capturas "<vault>/07 - Web/Capturas" --antes antes --despues despues \
  --salida "<vault>/07 - Web/Antes y después.html" \
  --titulo "<Nombre del negocio>" --acento "<color de acento de Identidad visual>" \
  --extra "<vault>/07 - Web/Capturas/antes-y-despues.json" --abrir
```

   Tiene los números grandes, un deslizador sobre la primera pantalla de cada página en compu y en celular, los clientes simulados y la tabla completa. Miralá antes de mostrarla (con una captura de esa página): si un número empeoró, decilo y explicá por qué.
6. En el informe, completá "Antes y después": la tabla de números, los clientes, la primera pantalla de la portada en compu y celular, lo que se hizo en cada tanda y lo que quedó. Sumá al índice de `07 - Web` una línea para `Antes y después.html` ("se abre en el navegador").
7. Si el vault no tiene publicación automática y la web ya está publicada, decile al alumno que la versión en internet sigue siendo la anterior y que publicarla es otro paso, con su OK.
8. Actualizá la nota del día, `Estado de la web` y `Prioridades`, como pide el `CLAUDE.md` del vault.
9. Al alumno, corto: los tres números que más cambiaron, cuántos clientes llegan ahora, el link al informe, que la página de antes y después ya está abierta y lo que le queda conseguir.

## Si piden algo puntual

- "Solo auditá": pasos 0 a 8, sin aplicar.
- "Aplicá la tanda N": leé el informe, confirmá que la tanda sigue vigente y hacé el paso 9. Si es la última, el paso 10.
- "Mirá solo la ficha" (u otra página): pasos 1 a 8 sobre esa página.
- "Mostrame el antes y después": paso 10, desde el punto 4, con las capturas que ya haya.
