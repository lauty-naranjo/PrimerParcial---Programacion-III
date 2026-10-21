# Design — Baseline del TPI Librería

## Context

Ver `proposal.md` § Why. Estado relevante del repositorio:

- Aplicación completa: `index.html` (5 vistas), 3 hojas de estilo y 9 módulos IIFE.
- No existe `openspec/specs/`: no hay contrato previo ni línea base archivada.
- La consigna vive en `docs/consigna-tpi.md` (texto extraído del PDF de cátedra).
- La auditoría del 21/10/2026 ejecutó los 8 casos en Chrome headless y no encontró defectos funcionales; sí encontró dos desvíos documentales (`IN-01`, `IN-02` en `knowledge-base/10_preguntas_abiertas.md`) que se resuelven en otro change.

## Goals / Non-Goals

**Goals**

- Dejar el comportamiento actual escrito como contrato verificable, un requisito por punto evaluable de la consigna.
- Trazar cada requisito `R-NN` a una capacidad y cada criterio `CA-NN` a un escenario de spec.
- Producir evidencia reproducible de los 8 casos sin tocar el producto.

**Non-Goals**

- No se corrigen `IN-01`, `IN-02` ni `IN-03` (van en `ajustes-entrega-tpi`).
- No se especifica el precio unitario capturado en el renglón como comportamiento vigente: `confirmarVenta` relee el precio del catálogo (`js/sales.js` línea 351), por lo que ese requisito se introduce recién en el change de ajustes. El baseline describe lo que la aplicación hace hoy, no lo que debería hacer.
- No se agregan tests automatizados al repositorio: el baseline verifica por ejecución en navegador y revisión estática.
- No se rediseña la UI ni se refactoriza el código.

## Decisions

### D1 — Un baseline en lugar de especificar "hacia adelante"

**Decisión**: especificar el estado actual completo y archivarlo antes de corregir.
**Alternativas**: (a) escribir sólo los deltas de las correcciones pendientes; (b) no especificar nada y corregir directo.
**Por qué**: con (a) la primera spec del proyecto sería un delta sin línea base; con (b) no habría contrato contra el cual validar el resto del trabajo. El baseline produce `openspec/specs/` con las 8 capacidades y deja los ajustes como deltas pequeños.

### D2 — Capacidades alineadas a los seis ejercicios, no a los módulos JS

**Decisión**: las capacidades se nombran por comportamiento observable (`catalogo`, `altas`, `ventas-e-historial`, `persistencia`), no por archivo (`books.js`).
**Alternativas**: una capacidad por archivo (refleja la implementación y queda obsoleta si se refactoriza).
**Por qué**: la spec debe sobrevivir a cambios internos; el mapeo archivo→capacidad vive en este diseño, no en la spec.

### D3 — Requisitos con ID `R-NN` y escenarios con los criterios `CA-NN`

**Decisión**: el nombre del requisito lleva el ID de la especificación de entrega y cada escenario es un criterio ejecutable.
**Alternativas**: requisitos sin ID (se pierde trazabilidad con la tabla de evaluación de la cátedra).
**Por qué**: la cátedra evalúa por puntos; el ID permite verificar cobertura requisito por requisito en la auditoría.

### D4 — Mapeo requisito → archivo implementado

| Requisito | Capacidad | Implementación |
| --- | --- | --- |
| R-01 | `interfaz-y-navegacion` | `index.html`, `js/app.js` |
| R-02, R-08 | `presentacion-adaptable` | `css/*.css`, `index.html` |
| R-03 | `catalogo` | `js/catalog.js`, `js/utils.js` |
| R-04 | `altas` | `js/books.js`, `js/clients.js` |
| R-05 | `ventas-e-historial` | `js/sales.js`, `js/history.js` |
| R-06 | `persistencia` | `js/store.js`, `js/data.js` |
| R-07 | `documentacion-de-entrega` | `README.md` |
| R-09, R-10, R-11 | `contrato-tecnico` | todos los archivos |

### D5 — Verificación por ejecución real, no por lectura del código

**Decisión**: los escenarios con efecto en el DOM se comprueban en Chrome headless vía CDP, leyendo el DOM resultante y los eventos de consola; los estáticos se comprueban con `node --check` y búsqueda de patrones prohibidos.
**Alternativas**: revisión manual del código (no demuestra comportamiento) o tests con `jsdom` (dependencia externa que la consigna excluye del entregable).
**Por qué**: el criterio de la cátedra es el comportamiento observado; la evidencia queda en `verification.md` dentro del change.

### D6 — TDD fuera del alcance de este change

**Decisión**: el baseline no sigue ciclo RED→GREEN porque no escribe código de producción.
**Por qué**: no hay comportamiento nuevo que diseñar. El ciclo TDD completo aplica al change siguiente, donde R-13 modifica lógica pura (`confirmarVenta`).

## Risks / Trade-offs

- **La spec congela un defecto conocido (`IN-02`)** → se documenta explícitamente en el escenario «Precio unitario histórico» como comportamiento exigido, y el change de ajustes lo modifica con `MODIFIED`/`ADDED` explícito, dejando rastro del cambio de contrato.
- **Evidencia basada en este navegador y este equipo** → se registra versión de Chrome, fecha y método en `verification.md`.
- **Capacidades nuevas con `## Purpose`** → si el propósito queda corto, `openspec validate --strict` falla; se validó cada archivo antes de archivar.
- **Duplicación entre `knowledge-base/` y `openspec/specs/`** → la KB explica el *por qué* y el *cómo*; la spec fija el *qué* verificable. Se acepta la superposición mínima.

## Migration Plan

1. Escribir `proposal.md`, las 8 specs, `design.md` y `tasks.md`.
2. `openspec validate baseline-tpi-libreria` en verde (modo estricto si está disponible).
3. Ejecutar la verificación y guardar `verification.md` con la evidencia.
4. `openspec archive baseline-tpi-libreria` → crea `openspec/specs/<capacidad>/spec.md` con el `Purpose` de cada delta.
5. Rollback: `git checkout -- openspec/` y borrar `openspec/changes/baseline-tpi-libreria/`; no hay cambios fuera de `openspec/`.

## Open Questions

- ¿La entrega se corrige contra la app abierta en el navegador del docente o contra el paquete comprimido? Afecta el peso de `R-07`, no el contenido de esta spec (ver `IN-04` y la pregunta de prioridad alta en `knowledge-base/10_preguntas_abiertas.md`).
