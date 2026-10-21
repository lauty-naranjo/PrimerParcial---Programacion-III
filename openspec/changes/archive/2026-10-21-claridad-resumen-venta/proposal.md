# Proposal — Claridad del resumen de venta

## Why

La consigna define el subtotal como «cantidad por precio» de cada renglón y el total como «suma de subtotales». El resumen de la venta muestra además una línea «Subtotal» con el mismo valor que «Total», lo que introduce un concepto que la consigna no define y puede leerse como un error de cálculo en la instancia de corrección.

## What Changes

- Se elimina la fila «Subtotal» del resumen de la venta; el resumen queda con «Artículos» y «Total».
- El cálculo no cambia: el subtotal sigue existiendo por renglón y el total sigue siendo la suma de subtotales.
- **No** se modifica la tabla de renglones, ni la confirmación, ni el historial.

## Capabilities

### New Capabilities

Ninguna.

### Modified Capabilities

- `ventas-e-historial`: se agrega el requisito «R-14 Resumen de la venta» que fija el contenido del resumen y prohíbe la línea de subtotal general.

## Impact

- **Código**: `index.html` (fila de resumen) y `js/sales.js` (`actualizarResumen` y referencia al nodo eliminado).
- **Documentación**: `README.md` (tabla de comprobaciones).
- **Riesgo**: bajo; el nodo eliminado sólo se usaba para escribir el mismo valor que el total. Se re-verifican los 8 casos.
