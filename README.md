# sacar-cara-de-ia

Skill para Claude Code que revisa la web que armaste en el curso y la ayuda a dejar de parecer hecha con IA.

No le pone el gusto de nadie: usa lo que tu vault dice de tu negocio (marca, voz, diferencial, zonas, equipo) para decidir qué cambiar.

## Qué hace

1. Lee tu vault y saca una frase de dirección: cómo tiene que sentirse tu web.
2. Saca capturas de tus páginas en compu y en celular.
3. Pasa el detector de Impeccable, que busca señas de IA y errores de oficio.
4. Mira las capturas con una lista de casi 40 señas de IA, de las viejas (violeta, tres tarjetas) y de las nuevas (crema, serif en cursiva, dorado, etiquetas chiquitas en mayúsculas).
5. Te deja un informe en `07 - Web/Auditoría de diseño.md`, con capturas, en castellano simple, y una lista de lo que tenés que conseguir vos (fotos, caras, datos).
6. Te propone los cambios en tandas. Vos elegís cuáles. Aplica cada una, saca capturas del antes y el después y guarda un punto de vuelta por tanda.

No inventa datos y no cambia tu marca sin preguntarte. Si tu web ya se publica sola en Vercel después de cada cambio, cada tanda se publica al terminar; si no, todo queda en tu compu.

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

## Si algo no te gusta

Cada tanda queda guardada por separado. Pedile a Claude: "deshacé la tanda 2" y vuelve a como estaba.

## Créditos

- Detector: [Impeccable](https://github.com/pbakaus/impeccable), de Paul Bakaus (licencia Apache 2.0). Se usa con `npx`, no se copia.
- Capturas: [Playwright](https://playwright.dev).
- Formato de las reglas de diseño: [DESIGN.md](https://github.com/google-labs-code/design.md), de Google.
