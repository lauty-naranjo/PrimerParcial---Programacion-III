# CHANGES — TPI Librería (Frontend)

Índice operativo de changes de OpenSpec. Generado a partir de `knowledge-base/` y de la auditoría del 21/10/2026.

## Estado del tablero

| Change | Estado | Governance | Depende de |
| --- | --- | --- | --- |
| `baseline-tpi-libreria` | archivado el 21/10/2026 | LOW | — |
| `ajustes-entrega-tpi` | archivado el 21/10/2026 | LOW (T1, T4) / MEDIUM (T2) | `baseline-tpi-libreria` |
| `claridad-resumen-venta` | archivado el 21/10/2026 | LOW | `ajustes-entrega-tpi` |

## Árbol de dependencias

```
baseline-tpi-libreria  (especifica y verifica lo ya construido)
        │
        ├── ajustes-entrega-tpi  (cierra R-12 y R-13 sobre esa base)
        │
        └── claridad-resumen-venta  (R-14, cosmético pero alineado al PDF)
```

No hay paralelismo posible: el change de ajustes modifica artefactos que el baseline especifica.

## Camino crítico

`baseline-tpi-libreria` → `ajustes-entrega-tpi` → verificación final → paquete de entrega.

## Plan multi-agente

| Fase | Agente | Entregable |
| --- | --- | --- |
| Fundación | `active-orchestrator` | `openspec/`, `knowledge-base/`, `CHANGES.md`, `.atl/skill-registry.md`, `AGENTS.md` |
| SPEC baseline | `openspec-propose` | `proposal.md`, `specs/*/spec.md`, `design.md` |
| Verificación baseline | `openspec-apply-change` | evidencia de los 8 casos |
| SPEC ajustes | `openspec-propose` | `proposal.md`, `specs/*/spec.md`, `design.md` |
| Implementación ajustes | `openspec-apply-change` | `README.md`, `js/sales.js`, `.gitattributes` |
| Cierre | `openspec-archive-change` | specs sincronizadas en `openspec/specs/` |

## Detalle por change

### `baseline-tpi-libreria`

- **Objetivo**: especificar los 6 ejercicios de la consigna tal como están implementados y producir evidencia verificable.
- **Alcance**: R-01 … R-11 y CA-01 … CA-08.
- **Scope**: `openspec/specs/` (5 capacidades), sin cambios de código de producto.
- **Governance**: LOW (sólo especificación y verificación).
- **Leer antes**: `knowledge-base/05_reglas_de_negocio.md`, `knowledge-base/07_flujos_principales.md`, `docs/consigna-tpi.md`.
- **Fuera de alcance**: cualquier corrección de código o documentación.

### `ajustes-entrega-tpi`

- **Objetivo**: cerrar los desvíos detectados en la auditoría sin ampliar el alcance funcional.
- **Alcance**: R-12 (README: estructura del libro guardado), R-13 (confirmación usa el precio capturado en el renglón), empaquetado con `export-ignore`.
- **Scope**: `README.md`, `js/sales.js`, `.gitattributes`.
- **Governance**: LOW para documentación y empaquetado; MEDIUM para `js/sales.js` (lógica de negocio).
- **Leer antes**: `knowledge-base/10_preguntas_abiertas.md` (`IN-01`, `IN-02`), `knowledge-base/09_decisiones_y_supuestos.md` (`DD-03`).
- **Fuera de alcance**: ABM, backend, rediseño, nuevas funcionalidades.

### `claridad-resumen-venta`

- **Objetivo**: que el resumen de la venta coincida con la definición de la consigna (subtotal por renglón, total como suma).
- **Alcance**: R-14 (el resumen muestra artículos y total, sin línea de subtotal general).
- **Scope**: `index.html`, `js/sales.js`, `README.md`.
- **Governance**: LOW (interfaz y dos líneas de módulo).
- **Leer antes**: `knowledge-base/10_preguntas_abiertas.md` (`IN-03`), `knowledge-base/05_reglas_de_negocio.md` (`RN-VEN`).
- **Fuera de alcance**: la columna «Subtotal» de cada renglón, que se conserva.

## Convenciones de trabajo

1. Ningún cambio en `index.html`, `css/` o `js/` sin un change OpenSpec aprobado.
2. Toda tarea del `tasks.md` se cierra con evidencia (comando ejecutado y salida).
3. La entrega a la cátedra se genera con `git archive` (respeta `export-ignore`): sólo `index.html`, `css/`, `js/` y `README.md`.
