# Funcionalidades

Organizadas por épica y por historia de usuario. Los criterios de aceptación están implementados y verificados salvo que se indique lo contrario.

## Épica 1: Estructura y presentación

### US-001 — Navegar entre las cinco vistas
**Como** bibliotecario **quiero** moverme entre Catálogo, Libros, Clientes, Ventas e Historial **para** operar sin recargar la página.

**Criterios de aceptación**:
- [x] Las cinco vistas existen en `index.html` con `header`, `nav`, `main` y `section`.
- [x] La navegación usa anclas y el router actualiza `aria-current="location"`.
- [x] Al navegar, el foco pasa al `h2` de la vista.
- [x] Existe el enlace «Saltar al contenido» como primer elemento focuseable.

**Reglas relacionadas**: —

### US-002 — Leer la interfaz en cualquier ancho
**Como** usuario **quiero** usar la aplicación en 320 px y en 1280 px **para** leer sin desplazamiento horizontal de página.

**Criterios de aceptación**:
- [x] Layout con Flexbox y Grid; catálogo en 1 columna a 320 px y en 3 a 1280 px.
- [x] Las tablas que no entran se desplazan dentro de su propio contenedor.
- [x] Foco visible en enlaces, campos, botones y regiones de tabla.

**Reglas relacionadas**: RN-GLB-03

## Épica 2: Datos y catálogo

### US-003 — Ver el catálogo con todos sus datos
**Como** cliente **quiero** ver título, ISBN, editorial, género, autores y precio **para** decidir qué libro me interesa.

**Criterios de aceptación**:
- [x] El catálogo se genera desde `js/data.js` (6 libros iniciales).
- [x] Un libro sin género muestra «Sin clasificar».
- [x] Los importes se muestran con dos decimales.

**Reglas relacionadas**: RN-CAT-01, RN-CAT-07, RN-VEN-06

### US-004 — Buscar un libro por título
**Como** cliente **quiero** escribir parte del título **para** acotar el listado.

**Criterios de aceptación**:
- [x] Coincidencia parcial, sin distinguir mayúsculas, con `trim`.
- [x] Búsqueda vacía muestra los 6 libros.
- [x] Sin coincidencias muestra «No se encontraron libros con ese título.».
- [x] Hay mensaje para catálogo vacío.

**Reglas relacionadas**: RN-CAT-02 … RN-CAT-06

## Épica 3: Altas

### US-005 — Registrar un libro
**Como** bibliotecario **quiero** dar de alta un libro **para** incorporarlo al catálogo y a la venta.

**Criterios de aceptación**:
- [x] Campos: título, ISBN, precio, editorial, género (opcional) y autores (checkboxes; al menos uno).
- [x] Editorial, género y autores se generan desde los datos locales.
- [x] Se rechazan título vacío, ISBN vacío o duplicado, precio ≤ 0, editorial inexistente y cero autores.
- [x] El error se muestra junto al campo, con `aria-invalid` y foco en el primer campo inválido.
- [x] Tras el alta, la tabla, el catálogo y el selector de venta se actualizan sin recargar.
- [x] El nuevo libro recibe el siguiente id `lN` y el formulario se limpia.

**Reglas relacionadas**: RN-LIB-01 … RN-LIB-08

### US-006 — Registrar un cliente
**Como** bibliotecario **quiero** dar de alta un cliente **para** poder asignarle ventas.

**Criterios de aceptación**:
- [x] Campos: nombre completo y email.
- [x] Se rechazan campos vacíos, email con formato inválido y email duplicado (sin distinguir mayúsculas).
- [x] Tras el alta, la tabla y el selector de venta se actualizan sin recargar.
- [x] El cliente recibe el siguiente id `cN` y el nombre se guarda con `trim`.

**Reglas relacionadas**: RN-CLI-01 … RN-CLI-05

## Épica 4: Ventas e historial

### US-007 — Componer y confirmar una venta
**Como** bibliotecario **quiero** cargar renglones y confirmar **para** registrar la venta con su total.

**Criterios de aceptación**:
- [x] Se selecciona un cliente existente y se agregan renglones con libro y cantidad entera > 0.
- [x] Repetir un libro actualiza la cantidad del renglón y avisa.
- [x] Se pueden editar cantidades y quitar renglones antes de confirmar.
- [x] Subtotales y total se recalculan y se muestran con dos decimales.
- [x] No se confirma sin cliente, sin renglones o con cantidades inválidas.
- [x] Al confirmar se guarda id `V-000N`, fecha, cliente, renglones históricos y total.
- [x] El formulario se limpia y se muestra un mensaje de resultado.

**Reglas relacionadas**: RN-VEN-01 … RN-VEN-08, RN-VEN-11

### US-008 — Consultar el historial y el detalle
**Como** bibliotecario **quiero** ver las ventas confirmadas y su detalle **para** auditar lo registrado.

**Criterios de aceptación**:
- [x] La tabla muestra id, fecha, cliente, total y botón «Ver detalle».
- [x] El detalle muestra los renglones y el total, con foco en el título del detalle.
- [x] No hay acciones de edición ni borrado sobre ventas confirmadas.
- [x] El detalle conserva los importes aunque cambie el precio del catálogo.

**Reglas relacionadas**: RN-VEN-09, RN-VEN-10

## Épica 5: Persistencia y entrega

### US-009 — Conservar los datos entre sesiones
**Como** bibliotecario **quiero** que los datos sobrevivan a una recarga **para** no perder las altas ni las ventas.

**Criterios de aceptación**:
- [x] Libros, clientes y ventas se guardan en `localStorage`.
- [x] Los ejemplos se cargan sólo en el primer inicio.
- [x] Tras recargar, los datos se recuperan sin duplicar semillas.

**Reglas relacionadas**: RN-PER-01 … RN-PER-05

### US-010 — Documentar la entrega
**Como** docente **quiero** un README completo **para** reproducir la verificación sin leer el código.

**Criterios de aceptación**:
- [x] Integrantes, pasos de apertura sin npm, navegación y funcionalidades.
- [x] Ubicación de los datos iniciales y límites de `localStorage`.
- [x] Los 8 casos manuales con resultado observado.
- [x] Ausencia de imágenes ajenas declarada.
- [ ] La estructura del objeto libro guardado se documenta explícitamente (pendiente: `IN-01` de `10_preguntas_abiertas.md`).

**Reglas relacionadas**: —
