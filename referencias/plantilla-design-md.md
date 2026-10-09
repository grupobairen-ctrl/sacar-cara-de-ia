# Plantilla de web/DESIGN.md

`DESIGN.md` es un formato abierto (Google lo liberó en abril de 2026) para que cualquier IA que toque la web respete el diseño. Tiene una cabecera con los valores exactos y abajo las reglas en texto. Impeccable y otras herramientas lo leen solas.

Reglas para llenarlo:
- Los valores salen del CSS real (las variables de `:root`) y de `Identidad visual`. Si no coinciden, gana la nota del vault y el CSS se corrige en una tanda.
- No inventes valores que la web no usa. Si una sección no aplica, se omite.
- Las secciones van en este orden y con estos títulos en inglés, porque así las reconocen las herramientas. El texto de adentro, en castellano.
- "Do's and Don'ts" es lo más importante: ahí van las señas de IA encontradas, escritas como prohibiciones concretas de esta web. "Simplicity" guarda los límites medidos, para que la web no vuelva a llenarse de texto.

```markdown
---
name: <Nombre del negocio>
description: <La frase de la marca>
colors:
  fondo: "#FFFFFF"
  texto: "#0A0A0A"
  acento: "#B8975A"
  # una entrada por cada color que la web usa de verdad
typography:
  display:
    fontFamily: "<letra de títulos>, serif"
    fontSize: "clamp(2.5rem, 1.9rem + 2.5vw, 3.5rem)"
    fontWeight: 500
    lineHeight: 1.1
  body:
    fontFamily: "<letra de texto>, sans-serif"
    fontSize: "clamp(1rem, .96rem + .18vw, 1.0625rem)"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "<letra de texto>, sans-serif"
    fontSize: "13px"
    fontWeight: 500
    letterSpacing: "0.16em"
rounded:
  base: "0"
spacing:
  seccion: "clamp(4.5rem, 2.8rem + 5.6vw, 7.5rem)"
  margen: "clamp(1.25rem, 5vw, 3rem)"
components:
  boton-principal:
    backgroundColor: "{colors.texto}"
    textColor: "{colors.fondo}"
    rounded: "{rounded.base}"
    padding: "14px 24px"
---

# <Nombre del negocio>: reglas de diseño

Se generó desde el vault con la skill `sacar-cara-de-ia`. La marca vive en `03 - Marca/Identidad visual` y `Voz de marca`; si cambian allá, se actualiza este archivo.

## Overview
<La frase de dirección y tres líneas sobre cómo se tiene que sentir la web.>

## Colors
<Para qué se usa cada color y en qué proporción. Dónde va el acento y dónde no.>

## Typography
<Qué letra para qué. Dónde va la cursiva y dónde no. Qué va en mayúsculas.>

## Layout
<Ancho máximo, márgenes, cómo cambia en celular. Cómo varían las secciones entre sí.>

## Elevation & Depth
<Si la web es plana, decilo.>

## Shapes
<Bordes, esquinas, proporciones de las fotos.>

## Components
<Botones, tarjetas, formularios, burbuja de WhatsApp: cómo son y cómo reaccionan.>

## Do's and Don'ts
- Do: <lo que hace única a esta web y hay que cuidar>.
- Don't: <cada seña de IA encontrada, como prohibición concreta. Ejemplo: "No repetir etiqueta en mayúsculas + título en cursiva en cada sección">.

## Simplicity
Los límites que se midieron y se cumplen. Quien cambie la web los vuelve a medir con `capturas.mjs`.
- Portada en el celular: hasta <n> palabras y <n> pantallas; arriba, una frase y una acción.
- Botones que compiten en la primera pantalla: <n> como máximo, además del menú.
- Títulos de tarjeta humanos ("<2 ambientes en Palermo>"); la tarjeta entera se toca.
- En el celular: barra fija abajo con <qué>, botones de 44 px o más, campos con letra de 16 px o más, nada de costado.
- Lo que explica va a un "i" o a su página; lo que vende se compacta, no se borra.
```
