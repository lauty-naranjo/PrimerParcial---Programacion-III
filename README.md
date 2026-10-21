# TPI Librería — Frontend

Trabajo Práctico Integrador de **Programación III**, Tecnicatura Universitaria en Programación a Distancia.

## Integrantes

- Martín Escudero
- Lautaro Naranjo

## Estado del proyecto

**Etapa 1 completada y Ejercicio 3 implementado y verificado:** maqueta navegable, presentación visual y catálogo dinámico con filtro por título. Las altas, las ventas, el historial y la persistencia (Ejercicios 4 a 6) se implementan en las próximas etapas.

## Cómo abrir el proyecto

No requiere instalación, npm ni servidor.

1. Descargar o clonar la carpeta del proyecto.
2. Abrir `index.html` con doble clic en el navegador.

El proyecto usa HTML, CSS y JavaScript nativos, sin librerías, frameworks ni CDNs.

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
- Formularios de alta de libros, clientes y ventas con validación nativa del navegador.
- Tablas de libros, clientes, renglones de venta, historial y detalle, con `caption` y encabezados `th`.
- Resumen de venta de ejemplo: 2 × 1500 + 1 × 2000 = 5000.
- Mensajes de error, éxito y estados vacíos preparados para JavaScript.
- CSS externo en tres archivos, identidad visual, diseño adaptable a 320 px y 1280 px, foco visible y contenedores de tabla con desplazamiento propio.
- Cuatro scripts clásicos externos (`data.js`, `utils.js`, `catalog.js`, `app.js`), sin `fetch` ni librerías.
- Sin imágenes externas y sin estilos inline.

### Pendientes

- Ejercicio 4: alta de libros y de clientes con sus validaciones, y render dinámico de las tablas de libros y clientes.
- Ejercicio 5: composición de ventas, cálculos e historial inmutable.
- Ejercicio 6: persistencia en `localStorage` y registro de los casos manuales.
- Reemplazar los renglones estáticos de la venta y el historial por el render y los eventos de JavaScript.

## Datos de ejemplo

Estos datos viven en `js/data.js` como arrays de objetos con identificadores estables. El catálogo se genera a partir de ellos; las tablas de libros y clientes siguen siendo estáticas hasta la próxima etapa.

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
- `js/utils.js`: normalización de búsqueda, formato de precios e índices por ID.
- `js/catalog.js`: render del catálogo, filtro y estados.
- `js/app.js`: arranque de la aplicación.

Los scripts son clásicos (sin módulos ES) y se cargan al final de `index.html` en ese orden. Todo dato se inserta con `textContent`.

## Almacenamiento local

Pendiente de implementación (Ejercicio 6). Las claves previstas son:

- `libreria.v1.libros`
- `libreria.v1.clientes`
- `libreria.v1.ventas`

`localStorage` guarda los datos en el navegador del usuario. Su contenido depende del navegador, del perfil y de la ubicación desde la que se abre el archivo, y no se comparte entre usuarios, perfiles ni equipos. Si se borran los datos del sitio, la información se pierde.

## Comprobaciones de presentación

Estas comprobaciones se repitieron el 20/10/2026 con el catálogo dinámico y los cuatro scripts integrados. No reemplazan los ocho casos manuales funcionales: el caso 1 ya se ejecutó y los casos 2 a 7 y el flujo completo del caso 8 siguen pendientes.

| Comprobación | Resultado observado |
| --- | --- |
| Ancho de 320 px | `scrollWidth = clientWidth = 305`; `scrollX = 0`; catálogo de 6 tarjetas en una columna; sin scroll horizontal de página. Las tablas conservan desplazamiento interno (contenedor de 237 px, contenido de 576 px). |
| Ancho de 1280 px | `scrollWidth = clientWidth = 1265`; `scrollX = 0`; catálogo de 6 tarjetas en tres columnas; tablas sin desplazamiento interno. |
| Navegación por teclado | El primer `Tab` enfoca «Saltar al contenido» y lo muestra en `top: 0`; luego recorren los cinco enlaces, el buscador, el botón y los campos del formulario de libros. El catálogo no agrega paradas de foco. |
| Foco visible | Contorno sólido de 3 px (`rgb(11, 79, 108)`) en enlaces, campos, botones y región de tabla; el enlace de salto aparece al enfocarse. |
| Región de tabla | El contenedor con `tabindex="0"` recibe foco y desplaza su contenido con el teclado a 320 px (`scrollLeft` pasó de 0 a 120). |
| Consola y recursos | Sin errores de JavaScript ni de consola durante la carga y las interacciones; las tres hojas CSS y los cuatro scripts cargaron correctamente; no hay `fetch` ni recursos externos. |
| Contraste | Texto principal 14.81:1; navegación 7.84:1; precios 10.96:1; texto suave 6.55:1; error 9.65:1. |
| Auditoría del HTML | 0 IDs duplicados; 0 referencias `aria-*` o `label[for]` rotas; 0 imágenes; 0 estilos inline; 5 tablas con `caption` y 22 `th`. |

## Casos manuales

Ningún caso se registra como aprobado sin haberlo ejecutado. El caso 1 ya se ejecutó; los casos 2 a 7 y el flujo funcional completo del caso 8 siguen pendientes de las próximas etapas.

| # | Caso | Resultado esperado | Resultado observado |
| --- | --- | --- | --- |
| 1 | Búsqueda con parte del título en mayúsculas; luego búsqueda vacía y texto inexistente | Coincidencias sin distinguir mayúsculas; catálogo completo; mensaje sin resultados | Aprobado: «JARDÍN» mostró «El jardín de las horas»; «  memoria  » mostró «La memoria del río»; vacío y solo espacios mostraron los 6 libros; «zzz» mostró el mensaje de sin resultados. También se probó el envío del formulario con «jardín». |
| 2 | Alta de libro con ISBN existente y luego con ISBN nuevo | El duplicado se rechaza; el válido aparece en catálogo y en la selección de venta | Pendiente de ejecución |
| 3 | Alta de cliente con email inválido, email existente en mayúsculas y email nuevo | Se rechazan los dos primeros; el nuevo aparece en listado y selección | Pendiente de ejecución |
| 4 | Venta sin cliente, con cantidad cero, negativa o decimal, y con libro repetido | No se confirma; el duplicado no crea otro renglón | Pendiente de ejecución |
| 5 | Venta válida: dos unidades a 1500 y una a 2000 | Subtotales 3000 y 2000; total 5000; detalle conservado en el historial | Pendiente de ejecución |
| 6 | Venta confirmada y cambio exclusivo del precio de catálogo guardado, en una copia de prueba | Tras recargar, el precio unitario, los subtotales y el total de esa venta conservan los valores confirmados | Pendiente de ejecución |
| 7 | Recarga después de altas y venta | Se recuperan los datos sin duplicar ejemplos ni ventas | Pendiente de ejecución |
| 8 | Navegación por teclado y anchos de 320 px y 1280 px | Foco visible, controles utilizables y tabla con desplazamiento propio si lo necesita | Comprobación de presentación repetida con el catálogo dinámico: foco visible, teclado, 320/1280 y tabla con scroll interno; falta validar el flujo funcional completo. |

## Imágenes

No se utilizan imágenes externas. Si en etapas posteriores se incorporan recursos locales, se documentará su procedencia y licencia.

## Nota sobre esta etapa

El catálogo ya se genera desde `js/data.js`, el filtro por título funciona y el caso manual 1 está verificado. Las tablas de libros y clientes, los formularios de alta, el agregado de renglones, la confirmación de ventas y el historial todavía no modifican datos. La próxima etapa incorpora las altas y el render dinámico de las tablas para completar los Ejercicios 4 a 6.
