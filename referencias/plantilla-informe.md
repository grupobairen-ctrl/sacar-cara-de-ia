# Plantilla del informe

Va en `<vault>/07 - Web/Auditoría de diseño.md`. Las rondas nuevas se suman arriba de las anteriores. Las capturas se muestran con `![[archivo.png|600]]` (el número es el ancho en Obsidian; para el celular, `|300`). Enlazá cada nota del vault una sola vez.

```markdown
---
estado: activo
area: web
tipo: plan
---
# Auditoría de diseño

Qué hace que la web parezca hecha con IA, qué le sobra para usarse sola y cómo se arregla. La hace la skill `sacar-cara-de-ia`.

## Ronda del <día> de <mes> de <año>

### En tres líneas
<Qué se encontró, qué se propone y qué tiene que conseguir el dueño. Sin jerga. Con un número.>

### La dirección
"Tiene que sentirse como <...>, no como <...>."
Sale de [[Diferencial]], [[Voz de marca]] e [[Identidad visual]]: <dos líneas sobre por qué>.

### Los números
Lo que ve una persona, medido en celular (390 px) y en compu (1440 px).

| Página | Palabras | Arriba | Pantallas | Botones arriba | Botones chicos | Campos con zoom |
|---|---|---|---|---|---|---|
| Portada, celular | <n> | <n> | <n> | <n> | <n> | <n> |

<Si hubo referente: la misma fila de su portada, y una línea que diga qué se le copia (solo la sencillez) y qué no.>

### Los clientes simulados
Recorrieron la web en el celular, tocando lo que ven. No se mandó nada de verdad.

| Cliente | Tarea | Resultado | Toques |
|---|---|---|---|
| <Comprador> | <...> | <Llegó / Se trabó en el paso N: ...> | <n> |

<Por cada cliente que se trabó o dudó: la captura del paso y qué pasó, en una línea.>
![[<cliente>-celular-antes-<NN>-<paso>.png|300]]

### Las tres pruebas
- **Logo ajeno:** <pasa o no pasa, y por qué>.
- **5 segundos:** <qué se entiende y qué no>.
- **De lejos:** <si las secciones se repiten>.

### Lo que encontramos
De la más grave a la menos grave. Cada una dice si es cara de IA, algo que sobra o algo que traba.

1. **<El hallazgo en palabras simples>** (<página>, <compu y/o celular>) · <cara de IA / sobra / traba>
   ![[<captura>.png|600]]
   - Qué se ve: <...>
   - Por qué importa: <...>
   - Qué haríamos: <...> (tanda <N>)

<de 6 a 12 hallazgos>

### Las tandas
| Tanda | Qué cambia | Meta medible | Páginas | Toca la marca | Riesgo |
|---|---|---|---|---|---|
| 1 | <...> | <de 13 a 0 problemas al tocar> | <...> | No | Bajo |

**Tanda 1. <Nombre>.** <Qué se hace, en tres o cuatro líneas.> Se deshace con el commit "Diseño, tanda 1".

### Decisiones de marca
<Solo si alguna tanda toca la marca.>
- **<La decisión>.** A: <opción>. B: <opción>. Recomendada: <cuál y por qué>.

### Lo que tenés que conseguir vos
Lo que ningún código arregla. También está en [[Prioridades]].
- [ ] <Fotos propias de ...>
- [ ] <Un video corto y propio para la portada: 8 a 20 segundos, sin texto encima>
- [ ] <Foto de quién atiende, con su nombre>

### El detector
- Antes: <N> avisos (<n> de cara de IA y <n> de oficio).
- Descartados por falsos: <cuáles y por qué>.
- Después: <se completa al cerrar>.

### Antes y después
<Se completa al cerrar: la tabla de números antes y después, los clientes que llegan ahora, la primera pantalla de la portada en compu y celular, lo que se hizo en cada tanda y lo que quedó. La página para mostrar es `Antes y después.html`, en esta carpeta: se abre en el navegador.>
```
