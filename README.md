# TPI Librería — Frontend

Trabajo Práctico Integrador de **Programación III**, Tecnicatura Universitaria en Programación a Distancia.

## Integrantes

- Martín Escudero
- Lautaro Naranjo

## Estado del proyecto

**Etapa 1 completada y Ejercicios 3 y 4 implementados y verificados:** maqueta navegable, presentación visual, catálogo dinámico con filtro por título, tablas de libros y clientes generadas desde los datos y altas con validación. Las ventas, el historial y la persistencia (Ejercicios 5 y 6) se implementan en las próximas etapas.

## Cómo abrir el proyecto

No requiere instalación, npm ni servidor.

1. Descargar o clonar la carpeta del proyecto.
2. Abrir `index.html` con doble clic en el navegador.

El proyecto usa HTML, CSS y JavaScript nativos, sin librerías, frameworks ni CDNs.

## Cómo actualizar el proyecto

Si ya tenés el repositorio clonado:

1. `git switch master`
2. `git pull`
3. Abrir `index.html` con doble clic.

No hace falta instalar dependencias ni iniciar un servidor. Los cambios de cada etapa se integran en `master`.

## Navegación entre vistas

| Vista | Enlace |
| --- | --- |
| Catálogo | `#catalogo` |
| Libros | `#libros` |
| Clientes | `#clientes` |
| Ventas | `#ventas` |
| Historial | `#historial` |

Las cinco vistas conviven en `index.html` y se navegan con anclas. El enrutador por hash se integra en una etapa posterior.

## Funcionalidades

### Implementadas

- Estructura semántica con `header`, `nav`, `main`, secciones, formularios y tablas.
- Navegación entre las cinco vistas y enlace «Saltar al contenido».
- Catálogo generado por JavaScript desde `js/data.js`, con seis libros y todos sus datos: título, ISBN, editorial, género, autores y precio.
- Filtro por título sin distinguir mayúsculas, con coincidencias parciales y recorte de espacios; estados de catálogo vacío y búsqueda sin resultados.
- Alta de libros con título, ISBN único, precio, editorial, género opcional y autores múltiples.
- Validación de libros: campos obligatorios, ISBN único comparado sin espacios ni guiones, precio numérico mayor que cero y redondeado a centavos, editorial y autores existentes, y al menos un autor.
- Alta de clientes con nombre completo y email válido y único; el email se compara con `trim` y sin distinguir mayúsculas.
- Opciones de editorial, género, autores y selectores de venta generadas desde `js/data.js`; el género vacío se muestra como «Sin clasificar».
- Actualización sin recarga de las tablas, del catálogo y de los selectores de venta; la selección actual se conserva cuando se agrega un registro.
- Errores por campo, resumen accesible con `role="alert"`, mensajes de éxito con `role="status"` y foco en el primer campo inválido.
- Tablas de libros, clientes, renglones de venta, historial y detalle, con `caption` y encabezados `th`; las tablas de libros y clientes se generan desde los datos y tienen estados vacíos.
- Formulario de venta con validación nativa; su lógica de renglones, cálculos e historial queda para el Ejercicio 5.
- Resumen de venta de ejemplo: 2 × 1500 + 1 × 2000 = 5000.
- CSS externo en tres archivos, identidad visual, diseño adaptable a 320 px y 1280 px, foco visible y contenedores de tabla con desplazamiento propio.
- Seis scripts clásicos externos (`data.js`, `utils.js`, `catalog.js`, `books.js`, `clients.js`, `app.js`), sin `fetch` ni librerías.
- Sin imágenes externas y sin estilos inline.

### Pendientes

- Ejercicio 5: composición de ventas, cálculos e historial inmutable.
- Ejercicio 6: persistencia en `localStorage` y registro de los casos manuales.
- Reemplazar los renglones estáticos de la venta y el historial por el render y los eventos de JavaScript.
- Incorporar la validación propia del formulario de venta y persistir las altas. Las altas actuales viven en memoria y se pierden al recargar.

## Datos de ejemplo

Estos datos viven en `js/data.js` como arrays de objetos con identificadores estables. El catálogo, las tablas de libros y clientes y los selectores de venta se generan a partir de ellos; los renglones de venta y el historial siguen estáticos hasta la próxima etapa.

**Editoriales:** Ediciones del Sur (`ed1`) y Editorial Horizonte (`ed2`).

**Géneros:** Narrativa (`g1`) y Ensayo (`g2`).

**Autores:** Ana Belén Ríos (`a1`), Carlos Medina (`a2`) y Lucía Ferrer (`a3`).

| Libro | ISBN | Precio | Editorial | Género | Autores |
| --- | --- | ---: | --- | --- | --- |
| El jardín de las horas (`l1`) | 978-950-01-0001-1 | 1500 | Ediciones del Sur | Narrativa | Ana Belén Ríos |
| Cartas del sur (`l2`) | 978-950-01-0002-8 | 1500 | Editorial Horizonte | Narrativa | Carlos Medina, Lucía Ferrer |
| La memoria del río (`l3`) | 978-950-01-0003-5 | 2000 | Ediciones del Sur | Narrativa | Ana Belén Ríos |
| Oficio de mirar (`l4`) | 978-950-01-0004-2 | 1800 | Editorial Horizonte | Ensayo | Carlos Medina |
| Manual del lector (`l5`) | 978-950-01-0005-9 | 2500 | Ediciones del Sur | Sin clasificar | Lucía Ferrer |
| Voces del patio (`l6`) | 978-950-01-0006-6 | 1200 | Editorial Horizonte | Narrativa | Ana Belén Ríos, Carlos Medina |

**Clientes:** María González (`maria.gonzalez@example.com`), Jorge Ramírez (`jorge.ramirez@example.com`) y Sofía Herrera (`sofia.herrera@example.com`).

**Venta de ejemplo:** `V-0001`, 20/10/2026, María González, 2 × «El jardín de las horas» + 1 × «La memoria del río», total 5000.

## Arquitectura de JavaScript

- `js/data.js`: semillas de libros, editoriales, géneros, autores y clientes.
- `js/utils.js`: normalización de búsqueda, ISBN y email; redondeo y formato de precios; índices por ID; generación de identificadores y poblado de selectores.
- `js/catalog.js`: render del catálogo, filtro y estados.
- `js/books.js`: alta, validación, tabla de libros y selector de venta.
- `js/clients.js`: alta, validación, tabla de clientes y selector de venta.
- `js/app.js`: arranque del catálogo, libros y clientes.

Los scripts son clásicos (sin módulos ES) y se cargan al final de `index.html` en ese orden. Todo dato se inserta con `textContent`. Las tablas y los selectores se pueden regenerar con `refrescar()`.

## Almacenamiento local

Pendiente de implementación (Ejercicio 6). Las claves previstas son:

- `libreria.v1.libros`
- `libreria.v1.clientes`
- `libreria.v1.ventas`

`localStorage` guarda los datos en el navegador del usuario. Su contenido depende del navegador, del perfil y de la ubicación desde la que se abre el archivo, y no se comparte entre usuarios, perfiles ni equipos. Si se borran los datos del sitio, la información se pierde.

Las altas de libros y clientes de esta etapa se guardan solo en memoria: al recargar se vuelven a cargar las semillas. La persistencia se implementa en el Ejercicio 6.

## Comprobaciones de presentación

Estas comprobaciones se repitieron el 20/10/2026 con el catálogo, las altas y los seis scripts integrados. No reemplazan los ocho casos manuales funcionales: los casos 1, 2 y 3 ya se ejecutaron; los casos 4 a 7 y el flujo completo del caso 8 siguen pendientes.

| Comprobación | Resultado observado |
| --- | --- |
| Ancho de 320 px | `scrollWidth = clientWidth = 305`; `scrollX = 0`; catálogo de 6 tarjetas en una columna; sin scroll horizontal de página. Con errores de alta visibles se mantiene `305/305`. Las tablas conservan desplazamiento interno (contenedor de 237 px, contenido de 576 px). |
| Ancho de 1280 px | `scrollWidth = clientWidth = 1265`; `scrollX = 0`; catálogo de 6 tarjetas en tres columnas; tablas sin desplazamiento interno. |
| Navegación por teclado | El primer `Tab` enfoca «Saltar al contenido» y lo muestra en `top: 0`; luego recorren los cinco enlaces, el buscador, el botón y los campos del formulario de libros. Desde el selector de género, `Tab` llega a los tres checkboxes de autores generados. |
| Foco visible | Contorno sólido de 3 px (`rgb(11, 79, 108)`) en enlaces, campos, botones, región de tabla y checkboxes de autores; el enlace de salto aparece al enfocarse. |
| Región de tabla | El contenedor con `tabindex="0"` recibe foco y desplaza su contenido con el teclado a 320 px (`scrollLeft` pasó de 0 a 120). |
| Consola y recursos | Sin errores de JavaScript ni de consola durante la carga y las interacciones; las tres hojas CSS y los seis scripts cargaron correctamente; no hay `fetch` ni recursos externos. |
| Contraste | Texto principal 14.81:1; navegación 7.84:1; precios 10.96:1; texto suave 6.55:1; error 9.65:1. |
| Auditoría del HTML | 0 IDs duplicados; 0 referencias `aria-*` o `label[for]` rotas; 0 imágenes; 0 estilos inline; 5 tablas con `caption` y 22 `th`; 4 formularios, 1 fieldset y 12 botones. |
| Accesibilidad generada | Los 3 checkboxes de autores tienen `label`, `aria-describedby` válido y foco visible; los errores usan `aria-invalid` y texto asociado. |

## Casos manuales

Ningún caso se registra como aprobado sin haberlo ejecutado. Los casos 1, 2 y 3 ya se ejecutaron; los casos 4 a 7 y el flujo funcional completo del caso 8 siguen pendientes de las próximas etapas.

| # | Caso | Resultado esperado | Resultado observado |
| --- | --- | --- | --- |
| 1 | Búsqueda con parte del título en mayúsculas; luego búsqueda vacía y texto inexistente | Coincidencias sin distinguir mayúsculas; catálogo completo; mensaje sin resultados | Aprobado: «JARDÍN» mostró «El jardín de las horas»; «  memoria  » mostró «La memoria del río»; vacío y solo espacios mostraron los 6 libros; «zzz» mostró el mensaje de sin resultados. También se probó el envío del formulario con «jardín». |
| 2 | Alta de libro con ISBN existente y luego con ISBN nuevo | El duplicado se rechaza; el válido aparece en catálogo y en la selección de venta | Aprobado: «978 950 01 0001 1» se rechazó con «Ya existe un libro con ese ISBN.». El alta de «Cuaderno de pruebas» (ISBN `978-950-01-0099-9`, precio `1234.567` → `$ 1.234,57`, Editorial Horizonte, Ensayo, Ana Belén Ríos y Lucía Ferrer) agregó la fila, la tarjeta del catálogo y la opción de venta con ID `l7`. También se verificó un alta sin género: mostró «Sin clasificar» y guardó `generoId: null`. |
| 3 | Alta de cliente con email inválido, email existente en mayúsculas y email nuevo | Se rechazan los dos primeros; el nuevo aparece en listado y selección | Aprobado: «lucia.example.com» se rechazó con «Ingresá un email válido.»; «  MARIA.GONZALEZ@EXAMPLE.COM  » se rechazó como duplicado; «Lucia.Prueba@Example.com» con espacios exteriores se guardó recortado y agregó la fila y la opción de venta con ID `c4`. |
| 4 | Venta sin cliente, con cantidad cero, negativa o decimal, y con libro repetido | No se confirma; el duplicado no crea otro renglón | Pendiente de ejecución |
| 5 | Venta válida: dos unidades a 1500 y una a 2000 | Subtotales 3000 y 2000; total 5000; detalle conservado en el historial | Pendiente de ejecución |
| 6 | Venta confirmada y cambio exclusivo del precio de catálogo guardado, en una copia de prueba | Tras recargar, el precio unitario, los subtotales y el total de esa venta conservan los valores confirmados | Pendiente de ejecución |
| 7 | Recarga después de altas y venta | Se recuperan los datos sin duplicar ejemplos ni ventas | Pendiente de ejecución |
| 8 | Navegación por teclado y anchos de 320 px y 1280 px | Foco visible, controles utilizables y tabla con desplazamiento propio si lo necesita | Comprobación de presentación repetida con catálogo, altas y tablas dinámicas: foco visible, teclado, 320/1280 y tabla con scroll interno; falta validar el flujo funcional completo de ventas/historial. |

## Imágenes

No se utilizan imágenes externas. Si en etapas posteriores se incorporan recursos locales, se documentará su procedencia y licencia.

## Nota sobre esta etapa

El catálogo, las tablas de libros y clientes y los selectores de venta se generan desde `js/data.js`. Las altas de libros y clientes validan y actualizan la interfaz sin recargar, pero viven en memoria. El agregado de renglones, la confirmación de ventas, el historial y la persistencia todavía no modifican datos. La próxima etapa incorpora ventas e historial para completar los Ejercicios 5 y 6.
