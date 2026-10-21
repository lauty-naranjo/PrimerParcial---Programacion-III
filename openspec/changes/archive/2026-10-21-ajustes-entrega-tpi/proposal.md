# Proposal — Ajustes de entrega del TPI

## Why

La auditoría del 21/10/2026 dejó tres desvíos que no afectan el flujo normal pero sí la evaluación: el README no documenta la estructura del libro guardado, lo que impide reproducir el caso de precio histórico que exige la consigna (`IN-01`); la confirmación de venta relee el precio del catálogo en lugar de respetar el capturado en el renglón (`IN-02`); y el repositorio mezcla el entregable con el tooling de trabajo, sin un mecanismo que garantice un paquete limpio.

## What Changes

- **R-12**: el README documenta la estructura completa del libro guardado en `libreria.v1.libros`, con un ejemplo y el paso a paso para reproducir la comprobación del precio histórico.
- **R-13**: la confirmación de venta usa el precio unitario capturado al agregar el renglón y no vuelve a leer el catálogo.
- El README actualiza la tabla de comprobaciones con fecha y método reales de la re-verificación.
- Se agrega `.gitattributes` con `export-ignore` para excluir `openspec/`, `knowledge-base/`, `docs/`, `.atl/`, `AGENTS.md`, `CHANGES.md`, `.active-orchestrator-state.json` del paquete generado con `git archive`.
- **No** se modifica el alcance funcional: sin ABM, sin backend, sin cambios de interfaz.

## Capabilities

### New Capabilities

Ninguna.

### Modified Capabilities

- `ventas-e-historial`: el requisito «R-05 Cálculo y confirmación de la venta» pasa a exigir que el precio unitario persistido sea el capturado en el renglón.
- `documentacion-de-entrega`: se agrega el requisito «R-12 Estructura del libro guardado» al contrato del README.

## Impact

- **Código**: `js/sales.js` (función `confirmarVenta`, línea 351).
- **Documentación**: `README.md` (estructura del libro guardado y tabla de comprobaciones).
- **Infraestructura de entrega**: `.gitattributes` (nuevo).
- **Riesgo**: bajo. El flujo de interfaz no cambia; sólo el origen del precio al confirmar. Se re-verifican los 8 casos completos porque el cambio toca ventas y persistencia.
