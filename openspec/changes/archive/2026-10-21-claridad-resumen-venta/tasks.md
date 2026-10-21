# Tasks — Claridad del resumen de venta

## 1. Preparación

- [x] 1.1 Confirmar la red de seguridad con los 8 casos del PDF en verde sobre el estado actual

## 2. Ciclo TDD (R-14)

- [x] 2.1 Escribir `harness-r14.py` con la comprobación de filas del resumen y ausencia de la etiqueta «Subtotal»
- [x] 2.2 RED — Ejecutar el arnés y confirmar que falla porque el resumen tiene 3 filas
- [x] 2.3 GREEN — Quitar la fila de `index.html` y la asignación de `js/sales.js`, y confirmar que el arnés pasa
- [x] 2.4 Verificar que la tabla de renglones conserva la columna «Subtotal» y que el total sigue siendo la suma

## 3. Regresión y accesibilidad

- [x] 3.1 Re-ejecutar los 8 casos del PDF completos sin regresiones
- [x] 3.2 Verificar foco visible, enlace «Saltar al contenido» y recorrido por teclado (caso 8)
- [x] 3.3 Confirmar 0 errores y 0 advertencias en consola y `node --check js/sales.js`

## 4. Cierre

- [x] 4.1 Actualizar la tabla de comprobaciones del README
- [x] 4.2 Registrar la evidencia en `verification.md`
- [x] 4.3 Ejecutar `openspec validate claridad-resumen-venta` y archivar el change
