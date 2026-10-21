# Proposal — Baseline del TPI Librería

## Why

El TPI está implementado y verificado, pero no existe ninguna especificación que fije el comportamiento acordado: no hay `openspec/specs/` contra qué medir cambios futuros ni trazabilidad entre la consigna y el código. Sin una línea base, cualquier ajuste posterior (documentación, cálculo, empaquetado) se haría sin contrato explícito y sin criterio de aceptación.

## What Changes

- Se crean **8 capacidades** que describen, como contrato de comportamiento, los seis ejercicios de la consigna `docs/consigna-tpi.md`.
- Se incorporan los requisitos `R-01`…`R-11` de la especificación de entrega y los criterios de aceptación `CA-01`…`CA-08`.
- Se registra la **verificación ejecutada** (21/10/2026, Chrome headless + revisión estática) como evidencia de cada criterio.
- **No** se modifica código de producto, estilos ni documentación de entrega: el baseline sólo especifica y verifica lo existente.

## Capabilities

### New Capabilities

- `interfaz-y-navegacion`: cinco vistas semánticas navegables por ancla, con etiquetas, tablas con encabezados y mensajes de estado (R-01).
- `presentacion-adaptable`: identidad visual con CSS externo, uso de Grid/Flexbox, comportamiento a 320 px y 1280 px, foco visible y compatibilidad de apertura por `file://` (R-02, R-08).
- `catalogo`: representación de libros y catálogos asociados con ids estables, render del catálogo y filtro por título con estados vacío y sin resultados (R-03).
- `altas`: alta de libros y de clientes con validaciones, mensajes de error y actualización sin recarga (R-04).
- `ventas-e-historial`: composición de renglones, cálculos, validaciones de confirmación e historial inmutable con detalle (R-05).
- `persistencia`: carga inicial de ejemplos, recuperación sin duplicados y tolerancia a datos corruptos o a fallos de `localStorage` (R-06).
- `documentacion-de-entrega`: contenido exigido al README y registro honesto de los casos manuales (R-07).
- `contrato-tecnico`: alcance técnico permitido, contrato de módulos, identificadores y claves de almacenamiento, y puntos de extensión (R-09, R-10, R-11).

### Modified Capabilities

Ninguna: no existe un `openspec/specs/` previo.

## Impact

- **Código**: sin cambios. `index.html`, `css/`, `js/` permanecen intactos.
- **Documentación**: se crea `openspec/specs/` (8 capacidades) al archivar el change.
- **Proceso**: primera línea base verificable; habilita los changes de corrección (`ajustes-entrega-tpi`).
- **Dependencias**: ninguna nueva.
