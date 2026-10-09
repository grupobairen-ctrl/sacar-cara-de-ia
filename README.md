# sacar-cara-de-ia

Skill para Claude Code que agarra la web que armaste en el curso y la lleva a otro nivel: que deje de parecer hecha con IA, que se entienda sin explicación y que en el celular se use como una app.

No le pone el gusto de nadie: usa lo que tu vault dice de tu negocio (marca, voz, diferencial, zonas, equipo y tus tipos de cliente) para decidir qué cambiar. Y te lo demuestra con números.

## Qué hace

1. Lee tu vault y saca una frase de dirección: cómo tiene que sentirse tu web, y qué viene a hacer cada tipo de cliente.
2. Saca capturas de tus páginas en compu y en celular, y **mide** cada una como la ve una persona: cuántas palabras, cuántas pantallas, cuántos botones compiten, qué cosas son difíciles de tocar con el dedo.
3. Pasa el detector de Impeccable, que busca señas de IA y errores de oficio.
4. **Recorre tu web como tus clientes**: el comprador, el inquilino, el propietario. Toca lo que ve, como una persona, y anota dónde se traba. No manda nada de verdad: frena los formularios y los WhatsApp, y te muestra el mensaje que se habría mandado.
5. Mira las capturas con una lista de casi 40 señas de IA y con las once preguntas para que una pantalla se use sola.
6. Te deja un informe en `07 - Web/Auditoría de diseño.md`, con capturas, números, en castellano simple, y una lista de lo que tenés que conseguir vos (fotos, un video corto, caras, datos).
7. Te propone los cambios en tandas, cada una con una meta medible. Vos elegís cuáles. Aplica cada una, mide de nuevo y guarda un punto de vuelta por tanda.
8. Al final te abre en el navegador una página de **antes y después**: los números que cambiaron, un deslizador sobre cada pantalla y tus clientes simulados, antes y después.

No inventa datos, no cambia tu marca sin preguntarte y no toca cómo funciona tu web (formularios, base de datos, WhatsApp). Si tu web ya se publica sola en Vercel después de cada cambio, cada tanda se publica al terminar; si no, todo queda en tu compu.

## Qué necesitás

- Claude Code (en VS Code o en la terminal).
- El vault del curso, con la web en la carpeta `web/`.
- Node (si hiciste los pasos de la web, ya lo tenés).
- Google Chrome, para las capturas. Si no lo tenés, la skill te avisa y baja un navegador de unos 150 MB.

## Cómo se instala

Abrí Claude Code y pegale este mensaje:

> Instalá esta skill para que la pueda usar en todos mis proyectos: https://github.com/grupobairen-ctrl/sacar-cara-de-ia

Claude la guarda solo en la carpeta donde busca las skills (si esa carpeta no existe, la crea). No tenés que buscar ni crear nada.

Si el curso te dio un archivo .zip, el mensaje es el mismo, con la ruta del archivo en lugar del link.

Después cerrá y volvé a abrir Claude Code.

Para actualizarla más adelante: "Actualizá la skill sacar-cara-de-ia".

## Cómo se usa

Abrí Claude Code en la carpeta de tu vault y escribí:

> /sacar-cara-de-ia

También podés pedirle algo puntual:
- `/sacar-cara-de-ia solo auditá`: el informe, sin tocar nada.
- `/sacar-cara-de-ia aplicá la tanda 2`: una tanda del informe.
- `/sacar-cara-de-ia mirá solo la ficha`: una sola página.

La primera vez tarda unos minutos, porque baja el detector y la herramienta de capturas.

También:
- `/sacar-cara-de-ia mostrame el antes y después`: vuelve a abrir la página de antes y después.

## Si algo no te gusta

Cada tanda queda guardada por separado. Pedile a Claude: "deshacé la tanda 2" y vuelve a como estaba.

## Créditos

- Detector: [Impeccable](https://github.com/pbakaus/impeccable), de Paul Bakaus (licencia Apache 2.0). Se usa con `npx`, no se copia.
- Capturas, medición y clientes simulados: [Playwright](https://playwright.dev).
- Formato de las reglas de diseño: [DESIGN.md](https://github.com/google-labs-code/design.md), de Google.
