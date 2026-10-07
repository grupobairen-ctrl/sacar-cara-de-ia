---
name: sacar-cara-de-ia
description: Revisa la web armada en el curso (portada, catálogo, ficha y demás páginas públicas) para que deje de parecer hecha con IA, usando el vault de Obsidian como única fuente de verdad. Lee la marca, la voz y el negocio del vault, saca capturas en compu y celular, pasa el detector de Impeccable, mira la web con ojo de diseñador, escribe un informe en castellano simple y aplica los cambios por tandas, con OK y un commit por tanda. Usar cuando pidan "que la web no parezca IA", "sacale la cara de IA", "pulí el diseño de la web", "auditoría de diseño", "la web parece hecha con IA" o "/sacar-cara-de-ia".
argument-hint: "[auditar | aplicar | página puntual]"
---

# Sacar la cara de IA

Una web hecha con IA se reconoce por dos cosas:
1. **Decisiones por defecto**: la misma estructura, letra, color y movimiento que elige cualquier IA si nadie le dice otra cosa.
2. **Falta de cosas reales**: fotos propias, caras, datos, lugares, pruebas. Sin eso, hasta un diseño perfecto parece de mentira.

Esta skill ataca las dos. La vara no es tu gusto: es lo que el vault dice del negocio.

## Reglas que no se rompen

- **El vault manda.** Leé el `CLAUDE.md` del vault y cumplí sus reglas: qué se pregunta antes, cómo se escribe, qué no se nombra.
- **No inventás nada.** Ni fotos, ni testimonios, ni números, ni clientes, ni premios, ni datos de productos. Si una mejora necesita algo real que no está en el vault, va a "Lo que tenés que conseguir vos".
- **La marca no cambia sola.** Colores, tipografías, logo y frase son decisiones del dueño. Si algo de la marca delata a la IA, lo explicás con opciones y cambiás solo con OK. Si cambia, actualizás la nota de marca del vault.
- **Se cambia el aspecto, no la lógica.** No tocás formularios, links de WhatsApp, filtros, base de datos, panel, idiomas ni SEO, salvo un texto o una clase. Si algo deja de andar, es un error tuyo y lo arreglás antes de seguir.
- **No publicás por tu cuenta.** Si el `CLAUDE.md` del vault tiene la regla de publicación automática, al terminar cada tanda publicás como dice esa regla. Si no la tiene, todo queda en la compu y publicar es otro paso, con su propio OK.
- **Hablás simple**, como pide el `INICIO` del vault. Si usás una palabra de diseño ("jerarquía", "ritmo", "contraste"), decís qué significa en esa pantalla.
- **Cuando preguntás, frenás** y esperás la respuesta.

## Paso 1. Ubicar todo

1. **El vault**: la carpeta con el `CLAUDE.md` del curso. Si no leíste `INICIO` y `Prioridades` en esta conversación, leelos.
2. **Las notas** (en el curso se llaman así; si no están, buscalas por contenido):
   - Marca: `Identidad visual`, `Voz de marca`, `Contacto público`.
   - Negocio: `Perfil del negocio`, `Diferencial`, `Servicios`, `Zonas`, `Equipo`, `Competencia`.
   - Clientes: los perfiles y `Preguntas frecuentes`.
   - Web: `Brief de la web`, `Estado de la web`.
   - Dos o tres notas del catálogo (propiedades o productos), para ver qué datos reales hay.
3. **La web**: la carpeta `web/` del vault (si no existe, la que tenga el `index.html`).
   - Corré `git status` ahí. Si hay cambios sin guardar, avisale al alumno y proponé un commit antes de empezar: es el punto de vuelta.
   - Levantá la web en la compu, en segundo plano. Si el puerto 4321 ya responde, usalo. Si existe `web/servidor-local.js`, `node web/servidor-local.js`; si no, `python3 -m http.server 4321 --directory web`.
   - Hacé la lista de páginas públicas: portada, catálogo, una ficha real y las que haya (nosotros, contacto, tasaciones, pedido de visita, 404). El panel de administración no entra.

## Paso 2. La dirección, sacada del vault

Antes de mirar la web, escribí para vos (después va al informe):
- Qué vende, a quién y dónde.
- Lo que solo este negocio tiene y la competencia no puede copiar: diferencial, zonas, números, equipo, forma de trabajar. Si el diferencial es genérico ("atención personalizada", "calidad"), anotalo como problema de contenido.
- Cómo habla (voz de marca) y cómo se ve (identidad visual, webs de referencia).
- **La frase de dirección**: "Tiene que sentirse como ___, no como ___". Ejemplo: "como el anfitrión de una casa grande, no como un portal de avisos".

Cada cambio que propongas sale de esta frase o de una seña concreta. Nunca de "queda más lindo".

## Paso 3. Capturas del antes

Desde cualquier carpeta, con la ruta real de esta skill:

```bash
npx -y -p playwright@1 node "<carpeta de esta skill>/scripts/capturas.mjs" \
  --base http://localhost:4321 --salida "<vault>/07 - Web/Capturas" \
  --etiqueta antes --ficha portada=/ catalogo=/catalogo.html <otras páginas>
```

- Saca cada página en compu (1440 px) y celular (390 px): la página entera y la primera pantalla (`-primera.png`).
- `--ficha` busca sola la primera ficha del catálogo. Si el catálogo está en otra ruta, sumá `--catalogo /ruta`.
- Si ya hay capturas de una ronda anterior, usá etiquetas `r2-antes`, `r2-tanda-1`, para no pisarlas.
- Si dice que no hay navegador, avisale al alumno que se baja uno de unos 150 MB y corré `npx -y playwright@1 install chromium`. Si igual falla, usá la herramienta de navegador que tengas (Claude in Chrome o Playwright) y sacá las capturas pantalla por pantalla.
- El resultado dice `invisiblesForzados`: si es mayor a 0, hay contenido que solo aparece con una animación. Anotalo para el paso 5.

Mirá todas las capturas antes de seguir. La que más pesa es la primera pantalla de la portada, en compu y en celular: es lo que alguien ve en 5 segundos.

## Paso 4. El detector

Para cada página, en compu y en celular:

```bash
npx -y impeccable detect --json --no-design-system <url>
npx -y impeccable detect --json --no-design-system --viewport 390x844 <url>
```

- Juntá los resultados por regla, no por aparición. Separá `"category": "slop"` (cara de IA) de `"quality"` (oficio).
- El detector se equivoca. Confirmá cada aviso en la captura o en el CSS; si es falso, lo descartás y lo anotás en el informe como descartado. Ojo: también lee lo que no se ve (el menú del celular cerrado, mensajes que aparecen solo en ciertos casos); si el aviso es sobre algo oculto, medilo abierto antes de darlo por bueno.
- Guardá el total de avisos: es el número del antes.
- El detector no ve lo más importante: estructura repetida, textos genéricos, falta de cosas reales. Eso lo hacés vos en el paso 5.

## Paso 5. La revisión con ojo de diseñador

Abrí [referencias/senas-de-ia.md](referencias/senas-de-ia.md) y recorré las capturas con esa lista, sección por sección.
- Hacé primero las tres pruebas del principio de la lista.
- Por cada seña que encuentres, anotá: dónde está (página, sección, compu o celular), qué se ve, por qué delata a la IA y qué se haría en cambio según la frase de dirección.
- Leé los textos visibles contra `Voz de marca`: palabras prohibidas, frases que podrían ser de cualquier negocio, signos y guiones que la marca no usa. Si la web tiene dos idiomas, revisá los dos.
- Mirá el CSS de verdad (variables, tipografías, espacios, animaciones) para proponer cambios concretos, no generales.
- Si algo se ve roto en una captura, confirmalo en el código antes de anotarlo. La captura puede crearlo: por ejemplo, un campo que la web oculta a propósito y que el script mostró.

## Paso 6. El informe y el DESIGN.md

1. Escribí `<vault>/07 - Web/Auditoría de diseño.md` con [referencias/plantilla-informe.md](referencias/plantilla-informe.md). Si ya existe, sumá la ronda nueva arriba de la anterior; no la pises. Sumala al índice de `07 - Web`.
   - "Por qué parece hecha con IA": de 5 a 10 señas, de la más grave a la menos grave, cada una con su captura y en palabras de alguien que no diseña. Mejor 6 bien explicadas que 20 de relleno.
   - Tandas: de 3 a 5, de menor a mayor riesgo. Cada una dice qué cambia, en qué páginas, si toca la marca y cómo se vuelve atrás.
   - "Lo que tenés que conseguir vos": lo que ningún código arregla. Cada ítem va también a `Prioridades`.
2. Creá o actualizá `web/DESIGN.md` con [referencias/plantilla-design-md.md](referencias/plantilla-design-md.md): los valores que ya están en el CSS, lo que dice `Identidad visual` y las señas encontradas como prohibiciones. Si ya existe, mostrale al alumno qué cambia antes de pisarlo.
   - Confirmá que no se publique: `*.md` tiene que estar en `web/.vercelignore` (o en el equivalente del servicio que use). Si no está, sumalo.
   - En `Brief de la web` (o en la nota que se lee para construir la web) sumá una línea: "Reglas de diseño: `web/DESIGN.md`. Se leen antes de tocar el diseño."

## Paso 7. Frenar y preguntar

Mostrale al alumno en el chat, corto:
- La frase de dirección.
- Las 3 señas más fuertes, una línea cada una.
- Las tandas numeradas, con su riesgo y si tocan la marca.
- El link al informe.

Preguntá qué tandas aplicar y, si alguna toca la marca, qué opción elige. Frená. No toques código hasta tener la respuesta.

## Paso 8. Aplicar, tanda por tanda

Para cada tanda aprobada:
0. **Fijate que nadie más esté tocando la web.** Corré `git status` en `web/`. Si hay cambios que no hiciste vos (puede haber otra conversación de Claude trabajando), frená y avisale al alumno. En los commits, sumá solo tus archivos.
1. **Cambiá.** Primero las variables y los estilos compartidos; después lo de cada página. Si cambiás un texto, cambialo también en el otro idioma y comprobá en el navegador que cambia.
2. **Mirá.** Capturas con `--etiqueta tanda-N` de las páginas que tocaste (con `--solo compu` o `--solo celular` si alcanza). Revisá:
   - que nada se salga de costado en celular;
   - botones y links de 44 px o más, y el foco del teclado visible;
   - contraste suficiente (4,5 a 1 en texto chico);
   - que sigan andando el menú, los filtros, la galería, los formularios y los links de WhatsApp.
   Si algo empeoró, arreglalo antes de seguir.
3. **Guardá.** Commit en `web/` con el mensaje `Diseño, tanda N: <qué cambió>`. Así cada tanda se deshace sola. Si el vault tiene publicación automática, publicá ahora, como dice esa regla, y confirmá en la dirección publicada que el cambio está.
4. **Anotá.** Si la tanda cambió una regla de marca, actualizá `Identidad visual` (o la nota que corresponda) y `web/DESIGN.md`.

Al terminar cada tanda, mostrá la primera pantalla del antes y del después, y seguí con la próxima.

Si el alumno dijo "hacé todo", igual vas por tandas, con capturas y commits, pero sin frenar entre una y otra. Lo que toca la marca se pregunta siempre.

## Paso 9. Cierre

- Capturas finales con `--etiqueta despues` (si la última tanda ya las sacó con todas las páginas, alcanza con esas).
- Si el vault no tiene publicación automática y la web ya está publicada, decile al alumno que la versión en internet sigue siendo la anterior y que publicarla es otro paso, con su OK.
- Detector de nuevo: cuántos avisos había y cuántos quedan. Los que quedan a propósito, explicados.
- En el informe, completá "Antes y después" con la primera pantalla de la portada en compu y celular, lo que se hizo y lo que quedó.
- Actualizá la nota del día, `Estado de la web` y `Prioridades`, como pide el `CLAUDE.md` del vault.
- Al alumno, en tres líneas: qué cambió, el link al informe y lo que le queda conseguir.

## Si piden algo puntual

- "Solo auditá": pasos 1 a 7, sin aplicar.
- "Aplicá la tanda N": leé el informe, confirmá que la tanda sigue vigente y hacé el paso 8.
- "Mirá solo la ficha" (u otra página): pasos 1 a 7 sobre esa página.
