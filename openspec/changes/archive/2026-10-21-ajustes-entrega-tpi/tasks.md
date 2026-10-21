# Tasks — Ajustes de entrega del TPI

## 1. Preparación

- [x] 1.1 Confirmar la red de seguridad: 8 casos del PDF en verde sobre el estado actual (57/57 comprobaciones del baseline)
- [x] 1.2 Escribir `harness-r13.py` en el change con el escenario «precio cambia después de agregar el renglón» y su comprobación del valor persistido

## 2. Ciclo TDD (R-13)

- [x] 2.1 RED — Ejecutar `harness-r13.py` y confirmar que el escenario falla: el precio persistido toma el valor del catálogo y no el capturado
- [x] 2.2 GREEN — Cambiar el cálculo de `confirmarVenta` en `js/sales.js` para usar `renglon.precioUnitario` y confirmar que el arnés pasa
- [x] 2.3 TRIANGULAR — Verificar un segundo caso con precio decreciente y un tercero con cambio de cantidad posterior al cambio de precio; ambos deben conservar el precio capturado
- [x] 2.4 REFACTOR — Revisar que no quede ningún uso de `libro.precio` dentro de la confirmación ni redondeos redundantes

## 3. Documentación (R-12)

- [x] 3.1 Agregar al README la estructura del libro guardado con ejemplo real de `libreria.v1.libros`
- [x] 3.2 Agregar el paso a paso para modificar el precio de un libro vendido y reproducir la comprobación del historial
- [x] 3.3 Explicitar la diferencia entre el precio del catálogo y el precio copiado en el renglón de la venta
- [x] 3.4 Actualizar la tabla de comprobaciones del README con la fecha y el método de la re-verificación

## 4. Empaquetado

- [x] 4.1 Crear `.gitattributes` con `export-ignore` para `openspec/`, `knowledge-base/`, `docs/`, `.atl/`, `AGENTS.md`, `CHANGES.md` y `.active-orchestrator-state.json`
- [x] 4.2 Generar el paquete con `git archive --format=zip -o tpi-libreria.zip HEAD` y listar su contenido
- [x] 4.3 Confirmar que el paquete contiene sólo `index.html`, `css/`, `js/` y `README.md`

## 5. Verificación final

- [x] 5.1 Ejecutar `node --check js/sales.js` y confirmar 0 errores
- [x] 5.2 Re-ejecutar los 8 casos del PDF completos y confirmar que no hay regresiones
- [x] 5.3 Confirmar 320 px y 1280 px sin desplazamiento horizontal y consola sin errores ni advertencias
- [x] 5.4 Reproducir literalmente los pasos publicados en el README y confirmar que el resultado coincide con lo documentado

## 6. Cierre

- [x] 6.1 Registrar la evidencia en `verification.md` dentro del change
- [x] 6.2 Ejecutar `openspec validate ajustes-entrega-tpi` y confirmar salida válida
- [x] 6.3 Archivar el change y confirmar que las specs principales reflejan R-12 y R-13
