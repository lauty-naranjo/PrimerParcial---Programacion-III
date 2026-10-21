# Design — Claridad del resumen de venta

## Context

Ver `proposal.md` § Why. `index.html` declaraba tres filas en el resumen (`#venta-articulos`, `#venta-subtotal`, `#venta-total`) y `js/sales.js` escribía el mismo valor en las dos últimas (líneas 66 y 67). El cálculo del total ya era correcto: se obtiene sumando `renglon.subtotal`.

## Goals / Non-Goals

**Goals**

- Que el resumen muestre exactamente lo que la consigna pide: total de la venta (y los artículos, que ya existían como dato de apoyo).
- Quitar un nodo y una asignación sin alterar ningún cálculo.

**Non-Goals**

- No se toca la columna «Subtotal» de la tabla de renglones (es el subtotal que define la consigna).
- No se renombra nada ni se agregan importes nuevos.

## Decisions

### D1 — Eliminar la fila en lugar de renombrarla

**Decisión**: borrar la fila «Subtotal» del `<dl>` y su referencia en el módulo.
**Alternativas**: (a) renombrarla «Total de la venta» (queda un sinónimo del total, sin aportar información); (b) dejarla y explicarla en el README (documentar una ambigüedad de interfaz en vez de corregirla).
**Por qué**: la consigna no define un subtotal de venta; cualquier etiqueta para ese valor es redundante con el total. Menos superficie, menos dudas en la corrección.

### D2 — Conservar el nodo del total con `aria-live`

**Decisión**: no mover `aria-live="polite"` del total a otro elemento.
**Por qué**: el total es el dato que cambia con cada renglón y el que un lector de pantalla necesita anunciar; el nodo permanece igual.

### D3 — RED a nivel de aceptación

**Decisión**: el arnés `harness-r14.py` cuenta las filas del resumen y verifica la ausencia de la etiqueta «Subtotal» antes y después del cambio.
**Por qué**: mismo criterio que R-13; no hay runner unitario y el comportamiento es observable en el DOM.

## Risks / Trade-offs

- **Referencia huérfana en `js/sales.js`** → se elimina en el mismo paso; la verificación confirma 0 excepciones en consola.
- **Pérdida de información para el operador** → nula: el subtotal sigue visible en cada renglón.
- **Regresión en ventas** → se re-ejecutan los 8 casos.

## Migration Plan

1. RED: `harness-r14.py` falla porque el resumen tiene 3 filas.
2. GREEN: quitar la fila de `index.html` y la asignación de `js/sales.js`.
3. Regresión completa + `node --check`.
4. Actualizar README y archivar. Rollback: `git revert` del commit; no hay datos que migrar.

## Open Questions

Ninguna.
