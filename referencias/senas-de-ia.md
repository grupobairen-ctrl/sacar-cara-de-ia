# Señas de una web hecha con IA

Hay dos generaciones de señas. La primera (2023 a 2025) es la conocida: violeta, Inter, tres tarjetas. La segunda es la que aparece cuando a la IA le piden "que no parezca IA": crema, serif en cursiva, un acento dorado o terracota, etiquetas chiquitas en mayúsculas. Las webs del curso suelen caer en la segunda.

Ninguna seña sola condena una web. Lo que delata es la suma, y sobre todo que no haya nada que solo ese negocio podría tener.

## Las tres pruebas (hacelas primero)

1. **Prueba del logo ajeno.** Imaginá la web con el logo y el nombre de la competencia. Si sirve igual, no tiene nada propio. Es la seña más grave y casi siempre es de contenido, no de diseño.
2. **Prueba de los 5 segundos.** Mirá la primera pantalla 5 segundos. ¿Se entiende qué vende, dónde, para quién y qué tiene de distinto? ¿O solo que es "algo elegante"?
3. **Prueba de lejos.** Mirá la captura de página entera achicada. Si todas las secciones tienen la misma forma (etiqueta, título, texto, grilla), es una plantilla.

## 1. Estructura (lo que más delata)

| Seña | En cambio |
|---|---|
| **La misma fórmula en cada sección**: etiqueta chiquita en mayúsculas (con rayita o número "01"), título grande, párrafo, botón. | Que cada sección tenga la forma de lo que cuenta: un dato grande, una foto que manda, una lista, una cita, un mapa. La etiqueta, solo donde ayuda a ubicarse. |
| **Grilla de 3 o 4 columnas iguales** con ícono, título y texto ("Por qué elegirnos", "Servicios"). | Una razón grande con su prueba y las demás más chicas; o una lista con peso desigual; o un párrafo bien escrito. Si son tres cosas, que no pesen igual. |
| **Título a la izquierda y texto a la derecha**, repetido en varias secciones. | Usarlo una vez, donde de verdad hay un título y un desarrollo. Variar el ancho y la posición de las columnas. |
| **Mismo espacio arriba y abajo en todas las secciones**: ritmo parejo, mucho aire vacío. | Alternar: secciones densas de información y otras con aire. Algo que cruce de borde a borde. Menos espacio donde no hay nada que respirar. |
| **Hero de manual**: foto de fondo oscurecida con título y un link; o título centrado sobre degradé. | Que la primera pantalla muestre algo real y concreto: una propiedad o producto con su dato, el trabajo hecho, el lugar. O una frase con un dato que solo este negocio puede decir. |
| **Todo centrado y simétrico.** | Alinear a un eje y romperlo a propósito una o dos veces. |
| **Pie de 4 columnas** que repite el menú y la frase. | Pie corto con lo que de verdad se busca ahí: horario, cómo llegar, matrícula, quién atiende. |
| **Cierre genérico**: "Hablemos.", "¿Listo para empezar?", "Contactanos". | Decir el próximo paso concreto: quién responde, cuándo y por dónde. |
| **Secciones de relleno**: números redondos sin fuente, logos de clientes, "Nuestra misión", testimonios sin nombre. | Sacarlas. Mejor una sección menos que una de mentira. |
| **Contenido invisible hasta que se anima** (el script de capturas lo marca como `invisiblesForzados`). | Que todo se vea sin animación; la animación, si queda, es un detalle encima. |

## 2. Tipografía

| Seña | En cambio |
|---|---|
| **Inter, Roboto, Poppins, Montserrat u Open Sans** como única letra (primera generación). | Una letra con carácter que salga de la marca. |
| **Serif fina en cursiva para todos los títulos** (Cormorant, Playfair, Fraunces, Newsreader). El detector la marca como `italic-serif-display`. | Si es de la marca, se queda, pero no en todo: cursiva para el hero, los precios o una palabra; títulos de sección en recta; o al revés. Es decisión de marca: se pregunta. |
| **Mayúsculas con mucho espaciado en todos lados**: menú, etiquetas, pie, botones, precios. | Mayúsculas espaciadas para un solo rol (por ejemplo, las etiquetas de operación). El resto, en minúscula normal. |
| **Escala tímida**: todos los títulos parecidos; nada domina la pantalla. | Un elemento que manda por pantalla, bien más grande que el resto. |
| **Una palabra sola en la última línea** de un título. | `text-wrap: balance` en títulos y `text-wrap: pretty` en párrafos. |
| **Números que bailan** en precios, metros y tablas. | `font-variant-numeric: tabular-nums` en la letra de texto (en una serif cursiva no siempre existe). |
| **Interlineado menor a 1,4 o espaciado mayor a 0,05em** en texto corrido. Lo marca el detector. | Interlineado de 1,5 a 1,7; el espaciado ancho, solo en etiquetas cortas. |

## 3. Color y superficies

| Seña | En cambio |
|---|---|
| **Primera generación**: degradé violeta o azul, texto con degradé, neón, vidrio esmerilado, sombras grandes y difusas, bordes muy redondeados en todo. | Fondos planos, sombras casi nulas, una sola forma de borde. |
| **Segunda generación**: fondo crema o hueso + serif + un acento (dorado, terracota, verde salvia, oliva); o negro + un acento ácido + letra mono; textura de grano; líneas de 1 px en todo. | Si la paleta es de la marca, se queda. Lo que cambia es la proporción y dónde va el acento. |
| **El acento en todos lados**: cada etiqueta, cada rayita, cada ícono, cada título del pie. | El acento en 1 a 3 lugares que importan (el botón principal, el precio, un detalle de marca). |
| **Fondos alternados** blanco, hueso, blanco, negro, como franjas. | Cambiar de fondo cuando cambia el tema, no cada sección. |

## 4. Imágenes e íconos

| Seña | En cambio |
|---|---|
| **Fotos de banco o generadas con IA**: luz perfecta, gente sonriendo a cámara, oficinas que no existen. | Fotos propias, aunque sean simples. Una foto real mediocre vale más que una perfecta de banco. |
| **Ninguna persona** en un negocio que vende trato personal. | La cara de quien atiende, con nombre. Va a "Lo que tenés que conseguir vos". |
| **Emojis como íconos**, o íconos de librería en círculos de color arriba de cada tarjeta. | Sin íconos, o pocos y del mismo trazo, solo donde ayudan a leer (WhatsApp, ubicación). |
| **Ilustraciones abstractas o 3D** que no tienen que ver con el negocio. | Sacarlas. |
| **Recortes sin criterio**: cada foto con otra proporción. | Una o dos proporciones fijas en todo el sitio. |
| **Lugares vacíos o de ejemplo** a la vista ("imagen de ejemplo", bloques grises, una grilla con una sola tarjeta). | Que la sección no aparezca hasta que haya contenido, o un estado vacío bien escrito. |

## 5. Movimiento

| Seña | En cambio |
|---|---|
| **Todo aparece subiendo al hacer scroll**, con el mismo tiempo. | Movimiento solo donde explica algo: abrir la galería, el menú, una confirmación. |
| **Tarjetas que se agrandan, botones que rebotan, brillos.** | Cambios de color o subrayado, cortos (150 a 250 ms). |
| **No respeta "reducir movimiento"** del sistema. | `@media (prefers-reduced-motion: reduce)` apaga las animaciones. |

## 6. Textos (la otra mitad)

| Seña | En cambio |
|---|---|
| **Frases que podrían ser de cualquiera**: "tu hogar soñado", "calidad y confianza", "soluciones a tu medida", "descubrí", "una experiencia única". | Frases con un dato que solo este negocio puede decir. Salen de `Diferencial`, `Zonas` y las notas del catálogo. |
| **Tríadas**: "rápido, simple y seguro". | Una cosa, con su prueba. |
| **Adjetivos en lugar de datos**: amplio, luminoso, exclusivo. | Metros, orientación, año, barrio, material con nombre. |
| **Guiones largos, signos de exclamación, emojis.** | Lo que diga `Voz de marca`. En las webs del curso, ninguno de los tres. |
| **Botones vagos**: "Ver más", "Saber más", "Enviar". | Verbo y objeto: "Ver los departamentos en venta", "Pedir la tasación". |
| **Todos los párrafos con el mismo largo y la misma forma.** | Variar: una frase sola, un párrafo, una lista. |
| **Castellano neutro o inglés traducido literal** cuando la marca habla de vos. | El registro de `Voz de marca`, en los dos idiomas. |

Para reescribir textos se puede usar la skill `humanizer` si está instalada, siempre con `Voz de marca` como regla y sin inventar datos.

## 7. Lo que solo tiene un negocio real

Si falta, la web parece hecha con IA aunque el diseño sea perfecto. Nada de esto se inventa: lo que no está en el vault va a "Lo que tenés que conseguir vos".

- **Fotos propias**: de los productos o propiedades, del local, del equipo trabajando.
- **Caras y nombres**: quién atiende, quién firma, quién es el responsable.
- **Datos concretos**: años, cantidad de operaciones o clientes, horarios, tiempo de respuesta.
- **Lugar**: barrios, calles, mapa de zonas, cómo llegar.
- **Pruebas**: testimonios con nombre y permiso, matrícula, prensa, premios reales.
- **El oficio del rubro**: lo que un cliente de ese rubro busca y una plantilla no trae. Inmobiliaria: plano, expensas, orientación, apto crédito, estado del edificio. Gastronomía: carta con precios, horarios, reservas. Servicios: casos con antes y después, precios o rangos. Tienda: talles, envíos, cambios.

## 8. Oficio (no delata solo, pero da "terminado")

- Contraste: 4,5 a 1 para texto chico, 3 a 1 para texto grande.
- Foco del teclado visible; botones y links de 44 px o más.
- Estados: al pasar el mouse, cargando, sin resultados, error.
- Columnas de texto de 60 a 75 caracteres de ancho.
- Ícono de la pestaña, imagen al compartir y una página 404 con la marca.
- Nada se sale de costado en celular.
