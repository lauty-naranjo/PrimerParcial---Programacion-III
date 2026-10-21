# Decisiones y Supuestos

## Decisiones documentadas

### DD-01 — Scripts clásicos con namespace global en lugar de módulos ES
**Decisión**: cada archivo es una IIFE que publica su API en `window.Libreria`.
**Contexto**: el proyecto debe abrirse con doble clic (`file://`), sin servidor.
**Alternativas consideradas**: `<script type="module">` (falla con `file://` por CORS), un único archivo monolítico.
**Justificación**: los módulos ES no funcionan de forma fiable desde el sistema de archivos; la IIFE mantiene separación de responsabilidades sin build.
**Trade-offs aceptados**: dependencia implícita del orden de carga y ausencia de tree-shaking.

### DD-02 — `localStorage` como persistencia
**Decisión**: persistir libros, clientes y ventas en tres claves `libreria.v1.*`.
**Contexto**: la consigna excluye backend y base de datos.
**Alternativas consideradas**: estado sólo en memoria (falla el caso 7 del PDF), IndexedDB (innecesario para el volumen).
**Justificación**: API síncrona, disponible en todos los navegadores objetivo y suficiente para el alcance.
**Trade-offs aceptados**: los datos dependen del navegador, del perfil y de la ubicación del archivo.

### DD-03 — Copia histórica de los renglones al confirmar
**Decisión**: la venta guarda `titulo`, `isbn`, `precioUnitario` y `subtotal` por renglón; el historial lee sólo la copia guardada.
**Contexto**: el caso 6 del PDF exige que el detalle no cambie si se modifica el precio del catálogo.
**Alternativas consideradas**: guardar sólo `libroId` y resolver contra el catálogo al leer (falla el caso 6).
**Justificación**: garantiza inmutabilidad del registro histórico sin duplicar la entidad completa.
**Trade-offs aceptados**: duplicación de datos descriptivos.

### DD-04 — Re-render completo desde el estado
**Decisión**: cada cambio de estado reemplaza el contenido de la tabla o lista correspondiente.
**Contexto**: el volumen de datos del TP es de decenas de registros.
**Alternativas consideradas**: actualización incremental por nodo.
**Justificación**: menos código, menos estados intermedios y menor riesgo de desincronización.
**Trade-offs aceptados**: se pierde el foco del elemento reemplazado; se reubica explícitamente cuando importa (alta de libro y de cliente).

### DD-05 — Un único `index.html` con navegación por anclas
**Decisión**: cinco secciones en un documento y un router por hash.
**Contexto**: la consigna permite varias páginas o secciones de una misma página.
**Alternativas consideradas**: archivos HTML separados (duplicaría el estado y la carga de scripts).
**Justificación**: el estado vive en memoria y se comparte entre vistas sin serialización.
**Trade-offs aceptados**: un documento más largo y necesidad de gestionar el foco manualmente.

## Supuestos inferidos

### SU-01 — El operador es un único bibliotecario
**Supuesto**: no hay concurrencia ni múltiples usuarios sobre el mismo almacenamiento.
**Origen**: la consigna excluye login y servidor (`docs/consigna-tpi.md`).
**Riesgo si es falso**: dos pestañas podrían pisarse datos al confirmar ventas.
**Cómo validar**: abrir dos pestañas y confirmar ventas en ambas.

### SU-02 — «Sin clasificar» es un valor de presentación, no un género persistido
**Supuesto**: un libro sin género guarda `generoId: null`.
**Origen**: `js/data.js` (`l5`) y `js/books.js` (`generoId: refs.genero.value || null`).
**Riesgo si es falso**: un selector con la opción «Sin clasificar» podría interpretarse como id vacío persistido; hoy se normaliza a `null`.
**Cómo validar**: alta de libro sin género y lectura de `libreria.v1.libros`.

### SU-03 — El precio del renglón se captura al agregarlo
**Supuesto**: el renglón conserva el precio vigente al momento de agregarlo y la confirmación lo respeta.
**Origen**: `js/sales.js` (se captura en `agregarRenglon`).
**Riesgo si es falso**: `confirmarVenta` vuelve a leer el precio del catálogo, lo que rompería el supuesto si el catálogo cambia sin recargar (ver `IN-02`).
**Cómo validar**: editar `libreria.v1.libros` sin recargar, agregar un renglón antes y otro después, y confirmar.
