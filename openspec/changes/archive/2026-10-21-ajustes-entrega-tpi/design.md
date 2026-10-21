# Design — Ajustes de entrega del TPI

## Context

Ver `proposal.md` § Why. Línea base ya archivada en `openspec/specs/` (8 capacidades). Estado del código relevante:

- `js/sales.js` `agregarRenglon` captura `precioUnitario` redondeado por renglón (línea 200) y lo usa para el subtotal; al acumular cantidad reutiliza ese precio (línea 190).
- `js/sales.js` `confirmarVenta` descarta ese valor y vuelve a leer `libro.precio` (línea 351) — origen de `IN-02`.
- `README.md` documenta las tres claves y la estructura de la venta, pero no la del libro.
- No hay `package.json` ni runner de tests: la consigna excluye herramientas de construcción del entregable.

## Goals / Non-Goals

**Goals**

- Que el precio persistido en la venta sea exactamente el que el operador vio al agregar el renglón.
- Que el README permita a un tercero reproducir la comprobación del historial inmutable sin leer el código.
- Que el paquete de entrega salga limpio con un solo comando.

**Non-Goals**

- No se toca `agregarRenglon` ni la acumulación de cantidades: ya respetan el precio capturado.
- No se agrega edición de precios en la interfaz (fuera de alcance).
- No se modifica `index.html`, las hojas de estilo ni el resto de los módulos.

## Decisions

### D1 — Usar `renglon.precioUnitario` en la confirmación

**Decisión**: reemplazar `libro.precio` por `renglon.precioUnitario` en el cálculo de `confirmarVenta`.
**Alternativas**: (a) leer el precio del DOM de la fila (acopla la lógica a la vista); (b) recalcular todo el carrito al confirmar (repite el defecto).
**Por qué**: el renglón ya es el registro de lo cotizado; la confirmación sólo debe consolidarlo. Un cambio de una línea, sin efectos sobre el resto del flujo.

### D2 — Mantener el redondeo defensivo

**Decisión**: envolver el valor del renglón en `redondearCentavos` al persistir.
**Por qué**: el precio se redondeó al capturarlo, pero si el renglón se construyera desde otro origen (tests, importación futura) el redondeo evita arrastrar centavos fraccionarios al total.

### D3 — Documentar el libro guardado junto a la venta, en el mismo bloque

**Decisión**: ampliar el bloque de datos persistidos del README con la estructura del libro y un ejemplo, y agregar el paso a paso de la comprobación.
**Alternativas**: (a) una sección aparte al final del README (se pierde la comparación con la venta); (b) sólo un ejemplo sin explicar el paso a paso (no permite reproducir el caso).
**Por qué**: la comprobación del caso 6 consiste en comparar el precio del catálogo con el de la copia histórica; verlos juntos hace obvia la distinción.

### D4 — Empaquetado con `export-ignore`, no con una lista manual

**Decisión**: `.gitattributes` con `export-ignore` por ruta y entrega vía `git archive`.
**Alternativas**: (a) copiar archivos a mano a una carpeta `entrega/` (se desincroniza y duplica en git); (b) rama `entrega` (mantenimiento doble).
**Por qué**: `git archive` respeta `export-ignore` de forma determinista y no requiere pasos manuales ni archivos duplicados en el repositorio.

### D5 — TDD a nivel de aceptación, no unitario

**Decisión**: el ciclo RED→GREEN se ejecuta sobre el comportamiento real en Chrome (`harness-r13.py` adjunto al change), no con un runner de unit tests.
**Alternativas**: agregar `node:test` (requiere `package.json`, excluido por la consigna) o `jsdom` (dependencia externa prohibida).
**Por qué**: el criterio de aceptación es observable en el DOM; el arnés prueba exactamente eso. Además, `confirmarVenta` no es exportada, por lo que un test unitario exigiría refactorizar el módulo sin necesidad.

## Risks / Trade-offs

- **Divergencia entre subtotal mostrado y persistido si el renglón quedó desactualizado** → el subtotal se recalcula con el precio capturado en el mismo paso; ambos números salen del mismo valor.
- **El README puede quedar desactualizado si cambian los campos** → el ejemplo se copia de una venta real ejecutada, y el change deja registro de la fecha de verificación.
- **`export-ignore` olvidado para una ruta nueva de tooling** → se valida listando el contenido del `.zip` generado como parte de las tareas.
- **Regresión en ventas** → se re-ejecutan los 8 casos completos, no sólo el nuevo.

## Migration Plan

1. RED: ejecutar `harness-r13.py` y confirmar que el escenario «precio capturado» falla (registrar salida).
2. GREEN: aplicar el cambio de una línea en `js/sales.js` y volver a ejecutar el arnés.
3. Triangular con precio decreciente y con cambio de cantidad posterior.
4. Actualizar `README.md` (estructura del libro, paso a paso, tabla de comprobaciones).
5. Crear `.gitattributes`, generar el `.zip` con `git archive` y listar su contenido.
6. Re-verificar los 8 casos, `node --check` y consola.
7. Archivar el change. Rollback: `git revert` del commit de implementación; no hay migración de datos.

## Open Questions

- Ninguna que bloquee: el alcance queda cerrado a R-12, R-13 y empaquetado.
