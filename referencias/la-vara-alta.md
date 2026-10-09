# La vara alta: que se use sola y que se vea de primera

Las señas de IA explican por qué una web parece de plantilla. Esta guía explica qué hace que una web se sienta **de primera**: que se entienda sin explicación, que en el celular se use como una app y que la primera pantalla impacte.

Sale de un portal inmobiliario real, rediseñado en octubre de 2026 con este mismo método. El dueño dijo "veo demasiados textos y muchas cosas". Se midió todo, se comparó con una web que se usa fácil y se recortó. La ficha bajó de 516 a 243 palabras y de 7.272 a 3.719 px de alto en el celular. La portada, de 407 a 244 palabras. Sin la medición era una opinión; con los números, el problema se vio solo.

## 1. Medir antes de opinar

`capturas.mjs` mide cada página en compu y en celular. Se mide lo que ve una persona:

| Número | Qué dice | Meta habitual |
|---|---|---|
| `palabras` | Cuánto hay que leer en toda la página. | Bajar bastante, a menudo a la mitad, sin perder datos que venden. |
| `palabrasPrimeraPantalla` | Cuánto hay que leer antes de tocar algo. | Una frase y una acción. En la portada, menos de 25 palabras. |
| `pantallas` | Cuántas veces hay que deslizar para llegar al final. | Que lo importante esté en las 2 o 3 primeras. |
| `accionesPrimeraPantalla` | Cuántos botones y links compiten arriba. | Una principal y una secundaria, además del menú. |
| `campos` | Cuánto pide un formulario a la vista. | Una decisión por pantalla en formularios largos. |
| `botonesChicos` | Cosas que se tocan y miden menos de 44 px (celular). | 0. |
| `camposQueHacenZoom` | Campos con letra de menos de 16 px: el iPhone se acerca solo al tocarlos (celular). | 0. |
| `seSaleDeCostado` | La página se mueve de costado (celular). | `false`. |

**El referente de sencillez.** Si el vault nombra webs de referencia (en `Identidad visual` o en `Brief de la web`), o el alumno conoce una que "se usa fácil", se mide igual (`--base https://esa-web.com`). De esa web se mira **solo** cuánto texto muestra y qué tan fácil es usarla. Su estética no se copia nunca: la vara visual es la marca del vault.

## 2. Las once preguntas, pantalla por pantalla

1. **¿Qué pregunta responde esta pantalla?** Se tiene que entender en tres segundos. Si responde cinco, se separa o se ordena.
2. **¿Cuántas acciones compiten?** Una principal y una secundaria a la vista. El resto va a un segundo nivel: "Más", plegado o un renglón chico al final.
3. **¿Qué texto explica?** Si hay que explicar, falla el diseño. Afuera las frases que cuentan cómo funciona. Etiquetas de una a tres palabras.
4. **¿Los títulos son humanos?** "2 ambientes en Palermo", no un código, no la dirección con número, no "Propiedad 14".
5. **¿Los datos son pocos y grandes?** Hasta cuatro números clave a la vista (precio, metros, ambientes, baños). El resto, en el detalle.
6. **¿Hay bloques vacíos?** No se muestran. Un estado vacío es una línea y un botón.
7. **¿La tarjeta entera se toca?** Sin botón "Ver más" aparte.
8. **¿Los formularios piden una cosa por vez?** Una decisión por pantalla, botón fijo abajo, lo opcional al final o después.
9. **¿Se siente app en el celular?** Ver la sección 5.
10. **¿Lo mismo se llama igual en todas partes?** Si el menú dice "Propiedades", el botón no dice "Catálogo".
11. **¿Los errores dicen qué hacer, en castellano?**

**Recortar no es borrar lo que vende.** En el portal, un recorte sacó las comodidades de la ficha ("menos texto") y hubo que devolverlas en una sola línea: es lo que el cliente quiere saber. Lo que vende se compacta (una línea, íconos chicos, un "Ver todo"), no se borra. Lo que se recorta es lo que explica, repite o adorna.

## 3. La primera pantalla que impacta

Es lo que una persona ve en 5 segundos, casi siempre en el celular, casi siempre llegando desde Instagram o WhatsApp.

- **Una imagen real que manda, de borde a borde.** La mejor foto propia del negocio o, si el dueño tiene uno, un **video propio corto** (8 a 20 segundos, sin cortes bruscos, sin texto encima, autorizado). Nunca de banco ni generado.
- **Un filtro parejo del color de la marca** encima, lo justo para leer (entre 35 y 50 % de opacidad). Parejo en toda la imagen, no un degradé negro abajo.
- **Una frase corta**: hasta 8 palabras, que diga qué y dónde. Si la marca usa cursiva, va en **una** palabra de esa frase.
- **Una sola acción, que es la tarea número uno del cliente.** En una inmobiliaria, buscar o ver propiedades: un buscador ("Buscá barrio o zona") o un botón con verbo y objeto. En compu, el buscador puede tener dos o tres partes (Comprar o Alquilar, zona, botón).
- **Centrado y nada más.** En la primera pantalla, frase y acción centradas, el buscador un poco más angosto que la frase. Sin párrafo, sin tres botones, sin etiquetas chiquitas arriba.
- **El encabezado mínimo**: el logo a la izquierda y, a la derecha, una acción (la del dueño, por ejemplo "Tasar" o "Publicar") y el menú. Alineados ópticamente con el logo.

Esto no es el "hero de manual" de las señas de IA. Ese hero tiene una foto de banco, una frase que podría ser de cualquiera y un link vago. Este tiene una imagen que solo este negocio tiene, una frase concreta y la tarea real del cliente.

**Si hay video**, así no pesa ni molesta:

```html
<video class="hero__video" autoplay muted loop playsinline preload="auto"
       poster="/assets/img/hero.jpg" aria-hidden="true">
  <source src="/assets/video/hero.mp4" type="video/mp4">
</video>
```

```css
.hero__video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.hero::after { content: ""; position: absolute; inset: 0; background: color-mix(in srgb, var(--color-marca) 44%, transparent); }
@media (prefers-reduced-motion: reduce) { .hero__video { display: none; } } /* queda la foto del poster */
```

- MP4 en H.264, menos de 8 MB, del tamaño original (no estirado ni recortado a otra proporción). Si pesa más, se comprime antes (con `ffmpeg` si está instalado, preguntando primero).
- La foto del `poster` es un cuadro del mismo video: es lo que se ve mientras carga y con "reducir movimiento".

## 4. Tarjetas que dan ganas de tocar

- **La foto manda**: arriba, grande, con una sola proporción en todo el sitio (4:3 o 3:2).
- **Sobre la foto**, arriba a la izquierda, una etiqueta chica (operación o estado). Arriba a la derecha, el corazón de guardar, **solo si la web ya tiene esa función**.
- **Título humano** ("4 ambientes en Las Cañitas") y debajo, chico, la calle o el edificio.
- **El precio grande** y el período chico ("USD 4.500 /mes"). Debajo, tres datos en una línea con "·" (112 m² · 2 baños · 1 coch.).
- **Toda la tarjeta es un link.** Sin botón "Ver más".
- **En el celular, las listas secundarias se deslizan de costado** (destacadas, desarrollos, "lo último que entró"), dejando asomar la tarjeta siguiente, para que se note que hay más. El catálogo completo sigue en columna.

```css
.riel { display: flex; gap: 12px; overflow-x: auto; scroll-snap-type: x mandatory; padding-inline: var(--margen); scroll-padding-inline: var(--margen); scrollbar-width: none; }
.riel > * { flex: 0 0 82%; scroll-snap-align: start; }
@media (min-width: 900px) { .riel { display: grid; grid-template-columns: repeat(3, 1fr); overflow: visible; } }
```

## 5. Que en el celular se sienta app

- **Una barra fija abajo.** Si la web tiene de 3 a 5 secciones reales, una barra de pestañas con ícono fino y palabra (por ejemplo Inicio, Propiedades, Contacto). Si no, una sola acción fija (el WhatsApp con verbo). Respeta el borde del iPhone y no tapa contenido:

```css
.barra-app { position: fixed; inset: auto 0 0 0; display: grid; grid-auto-flow: column; padding-bottom: env(safe-area-inset-bottom); background: var(--fondo-barra); border-top: 1px solid var(--linea); z-index: 50; }
.barra-app a { min-height: 56px; display: grid; place-items: center; gap: 2px; font-size: 12px; }
body { padding-bottom: calc(64px + env(safe-area-inset-bottom)); }
@media (min-width: 900px) { .barra-app { display: none; } body { padding-bottom: 0; } }
```

  La pestaña de la página actual se marca con el color de acento y `aria-current="page"`. Va en el HTML de cada página, no solo en la portada.
- **Que no se sienta web vieja al tocar**:

```css
html { background: var(--color-del-pie); }               /* al estirar la página no aparece blanco */
body { background: var(--fondo); }
a, button, [role="button"] { touch-action: manipulation; -webkit-tap-highlight-color: transparent; }
a:active, button:active { opacity: .7; }                   /* respuesta propia al tocar */
input, select, textarea { font-size: 16px; }               /* el iPhone no hace zoom al tocar */
```

```html
<meta name="theme-color" content="#color-del-encabezado">
```

- **Botones de 44 px o más**, separados entre sí.
- **Nada se mueve de costado.**
- **Nunca se bloquea el zoom con dos dedos** (`user-scalable=no` o `maximum-scale=1`). En una app interna puede ser; en una web pública es un error de accesibilidad.
- **Transiciones cortas** (150 a 250 ms), y "reducir movimiento" las apaga.
- **Carga rápida**: la imagen de la primera pantalla con `fetchpriority="high"`, el resto con `loading="lazy"`, y todas con `width` y `height` para que nada salte al cargar.

## 6. Menos texto, más prueba

- **Etiquetas de una a tres palabras.** Las explicaciones van a un botón "i", a un "Cómo trabajamos" plegado o a su propia página.
- **Una sección, una idea.** Si una sección necesita un párrafo para entenderse, falla.
- **Lo premium no se vende, se muestra**: más foto, menos adjetivos.
- **La confianza, compacta.** En vez de cuatro tarjetas con párrafo ("Por qué elegirnos"), una franja con tres o cuatro criterios en una línea, con íconos finos, y un link "Cómo trabajamos" para quien quiera leer.
- **El pie, corto**: una fila en compu y una columna en celular, con lo que se busca ahí (contacto, matrícula, redes, legales). Sin repetir el menú entero ni la frase.
- **El mensaje de WhatsApp, ya escrito** con la propiedad y el link, para que el cliente solo toque "Enviar".

## 7. Los clientes simulados

`recorrer.mjs` recorre la web en el celular como una persona: toca lo que ve por su texto y escribe en los campos por su nombre. Frena todo envío y toda salida a otra web, y anota adónde habría ido (el mensaje de WhatsApp que se armaría, por ejemplo).

- **Una persona por tipo de cliente del vault** (`05 - Clientes`), con **su** tarea principal. Inmobiliaria: el comprador busca y consulta, el inquilino busca un alquiler y pide visita, el propietario quiere tasar o vender, el inversor busca rentabilidad. Hasta 4 personas.
- **El guion se escribe con las palabras de la persona, no con las de la web.** Si la persona buscaría "Alquilar" y la web dice "Locación", el paso falla, y eso es un hallazgo ("confunde"). Para seguir, se reintenta con la palabra de la web y se anota.
- **Empieza donde empieza el cliente**: en la portada, o en una ficha si llega desde un link de Instagram o WhatsApp.
- **Cada paso es bien, falla o confunde.** "Bien" y "falla" los da el script. "Confunde" lo decidís mirando la captura: lo encontró, pero tardó, dudó, tocó algo chico o la pantalla no le confirmó nada.
- **La gravedad**: **bloquea** (no puede seguir), **molesta** (sigue, pero se traba o duda) y **detalle**.
- **El número que importa**: cuántos llegaron y en cuántos toques. Al final se vuelve a recorrer igual, para mostrar el antes y el después.
