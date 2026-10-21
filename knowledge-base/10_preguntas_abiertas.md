# Preguntas Abiertas

## Inconsistencias detectadas

### IN-01 — El README no documenta la estructura del libro guardado
**Documento A dice**: la consigna (Ej. 6) exige identificar «la ubicación y estructura del catálogo guardado en localStorage» para reproducir la comprobación del precio histórico (`docs/consigna-tpi.md`, página 6).
**Documento B dice**: `README.md` lista las tres claves y muestra la estructura de la **venta**, pero no la del **libro** guardado, que es donde vive `precio`.
**Impacto**: el docente puede ubicar la clave, pero no sabe qué campo editar sin inspeccionar la consola. Riesgo sobre el criterio «documentación y entrega» (3 puntos).
**Resolución**: resuelto en el change `ajustes-entrega-tpi` (archivado el 21/10/2026), requisito R-12. El README documenta los siete campos del libro guardado con ejemplo y tabla, y la diferencia frente a la copia histórica de la venta.

### IN-02 — La confirmación relee el precio del catálogo
**Documento A dice**: la consigna exige que el precio unitario «se copia al renglón como valor histórico» (`docs/consigna-tpi.md`, página 5).
**Documento B dice**: `js/sales.js` (`confirmarVenta`) calcula `precioUnitario` con `redondearCentavos(libro.precio)`, es decir, lo relee del catálogo en lugar de usar el valor capturado en `renglon.precioUnitario`.
**Impacto**: con el flujo normal de la interfaz el resultado es idéntico (no hay edición de precios), pero si se modifica el catálogo guardado sin recargar, el subtotal mostrado y el persistido pueden diferir.
**Resolución**: resuelto en el change `ajustes-entrega-tpi` (archivado el 21/10/2026), requisito R-13. `confirmarVenta` persiste `renglon.precioUnitario`; se verificó con un ciclo RED→GREEN en `harness-r13.py` (10/10) y una regresión de 57/57 sobre los ocho casos.

### IN-03 — El resumen muestra «Subtotal» y «Total» con el mismo valor
**Documento A dice**: la consigna pide el total como suma de subtotales y no exige mostrar un subtotal general (`docs/consigna-tpi.md`, página 5).
**Documento B dice**: `index.html` muestra «Subtotal» y «Total», ambos alimentados por la misma variable en `js/sales.js` (`actualizarResumen`).
**Impacto**: cosmético; puede leerse como un cálculo duplicado o defectuoso.
**Resolución propuesta**: dejar sólo «Total» (o rotular el segundo como «Total de la venta»). No bloquea la entrega.

### IN-04 — El reporte de comprobaciones no distingue autoría
**Documento A dice**: la consigna exige registrar el resultado observado de cada caso.
**Documento B dice**: `README.md` registra los 8 casos como aprobados con fecha 21/10/2026.
**Impacto**: la tabla no indica si se ejecutaron manualmente en Chrome o de forma automatizada.
**Resolución**: resuelto en el change `ajustes-entrega-tpi` (archivado el 21/10/2026). La tabla de comprobaciones indica ahora la fecha y el método (Chrome 155 con perfil limpio, Node 20 y Git), y se agregaron las filas de confirmación con precio capturado y de paquete de entrega.

## Preguntas abiertas (priorizadas)

| Prioridad | Pregunta | Bloquea | Decisor |
| --- | --- | --- | --- |
| Alta | ¿Cuál es la fecha, el canal y la modalidad de entrega? La consigna indica que los comunica el docente por separado | La entrega en sí | Docente |
| Media | ¿Se incluye el `README.md` del repo con las carpetas de tooling (`openspec/`, `knowledge-base/`, `docs/`) o sólo el paquete `index.html` + `css/` + `js/` + `README.md`? | Formato del artefacto | Equipo |
| Baja | ¿Se suprime «Subtotal» del resumen de venta (`IN-03`)? | Nada | Equipo |
| Baja | ¿Se agrega un test automatizado con `node:test` para la lógica de ventas, sabiendo que la consigna excluye herramientas de compilación del entregable? | Nada (los tests quedan fuera del paquete) | Equipo |
