# TPI Librería — Frontend

Trabajo Práctico Integrador de **Programación III**, Tecnicatura Universitaria en Programación a Distancia.

## Integrantes

- Martín Escudero
- Lautaro Naranjo

## Estado del proyecto

**Etapa 1 completada y Ejercicios 3, 4, 5 y 6 implementados.** La aplicación funciona abriendo `index.html` con doble clic: catálogo dinámico con filtro, altas de libros y clientes, ventas con renglones editables, historial inmutable y persistencia en `localStorage`.

La verificación manual de los ocho casos del PDF se registra más abajo. No quedan funcionalidades ni etapas pendientes. El trabajo está integrado en `master`.

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

Las cinco vistas conviven en `index.html` y se navegan con anclas. El router por hash actualiza `aria-current="location"` y mueve el foco al título de la vista. El enlace «Saltar al contenido» lleva el foco a `main`.

## Funcionalidades

### Implementadas

- Estructura semántica con `header`, `nav`, `main`, secciones, formularios y tablas.
- Catálogo generado por JavaScript desde `js/data.js`, con seis libros y todos sus datos: título, ISBN, editorial, género, autores y precio.
- Filtro por título sin distinguir mayúsculas, con coincidencias parciales y recorte de espacios; estados de catálogo vacío y búsqueda sin resultados.
- Alta de libros con título, ISBN único, precio, editorial, género opcional y autores múltiples.
- Validación de libros: campos obligatorios, ISBN único comparado sin espacios ni guiones, precio numérico mayor que cero y redondeado a centavos, editorial y autores existentes, y al menos un autor.
- Alta de clientes con nombre completo y email válido y único; el email se compara con `trim` y sin distinguir mayúsculas.
- Opciones de editorial, género, autores y selectores de venta generadas desde `js/data.js`; el género vacío se muestra como «Sin clasificar».
- Actualización sin recarga de las tablas, del catálogo y de los selectores; las selecciones de venta no se preseleccionan.
- Errores por campo, resumen accesible con `role="alert"`, mensajes de éxito con `role="status"` y foco en el primer campo inválido.
- Ventas con selección de cliente y libro, cantidad entera mayor que cero y precio unitario tomado del catálogo.
- Renglones editables y eliminables antes de confirmar; un libro repetido actualiza la cantidad del renglón existente.
- Cálculo de subtotal y total con redondeo a centavos y visualización de dos decimales.
- Confirmación bloqueada sin cliente, sin renglones o con cantidades inválidas.
- Al confirmar se guarda identificador, fecha, cliente, renglones con título, ISBN, precio unitario y subtotal históricos, y total.
- Historial con identificador, fecha, cliente y total; el botón «Ver detalle» muestra los renglones y el total de la venta.
- Persistencia de libros, clientes y ventas en `localStorage`, con carga de ejemplos solo en el primer inicio.
- CSS externo en tres archivos, identidad visual, diseño adaptable a 320 px y 1280 px, foco visible y contenedores de tabla con desplazamiento propio.
- Nueve scripts clásicos externos (`data.js`, `utils.js`, `store.js`, `catalog.js`, `books.js`, `clients.js`, `sales.js`, `history.js`, `app.js`), sin `fetch` ni librerías.
- Sin imágenes externas y sin estilos inline.

### Pendientes

No hay funcionalidades pendientes de la consigna.

El PDF no exige editar ni eliminar libros o clientes: el Ejercicio 4 solo pide altas. Los únicos botones de quitar son los de renglones de una venta antes de confirmar.

## Datos de ejemplo

Estos datos viven en `js/data.js` como arrays de objetos con identificadores estables. En el primer inicio se copian a `localStorage`; en las siguientes aperturas se recuperan los datos guardados. El catálogo, las tablas de libros y clientes y los selectores de venta se generan a partir de esos arrays. La venta no está precargada: se genera al confirmar.

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

En la tabla de datos de este README los precios se muestran como valores numéricos para leer el ejemplo; la aplicación los muestra con dos decimales y separador de miles.

**Clientes:** María González (`c1`, `maria.gonzalez@example.com`), Jorge Ramírez (`c2`, `jorge.ramirez@example.com`) y Sofía Herrera (`c3`, `sofia.herrera@example.com`).

**Combinación de prueba:** 2 × «El jardín de las horas» (1500) + 1 × «La memoria del río» (2000) = 5000. La venta resultante recibe el identificador `V-0001` en un almacenamiento nuevo.

## Arquitectura de JavaScript

- `js/data.js`: semillas de libros, editoriales, géneros, autores y clientes.
- `js/utils.js`: normalización de búsqueda, ISBN y email; redondeo, formato de precios y fechas; índices por ID; generación de identificadores y poblado de selectores.
- `js/store.js`: carga y guardado de libros, clientes y ventas en `localStorage`.
- `js/catalog.js`: render del catálogo, filtro y estados.
- `js/books.js`: alta, validación, tabla de libros y selector de venta.
- `js/clients.js`: alta, validación, tabla de clientes y selector de venta.
- `js/sales.js`: composición de renglones, cantidades, cálculos, confirmación y persistencia de ventas.
- `js/history.js`: historial y detalle inmutable de ventas.
- `js/app.js`: carga del storage, arranque de módulos y router por hash.

Los scripts son clásicos (sin módulos ES) y se cargan al final de `index.html` en ese orden. Todo dato se inserta con `textContent`. Las tablas y los selectores se regeneran con `refrescar()`.

## Almacenamiento local

La aplicación usa estas claves:

- `libreria.v1.libros`
- `libreria.v1.clientes`
- `libreria.v1.ventas`

Las dos primeras guardan arrays con los datos de los libros y clientes. La tercera guarda las ventas confirmadas con esta estructura:

```js
{
  id: 'V-0001',
  fecha: '2026-10-21',
  clienteId: 'c1',
  clienteNombre: 'María González',
  renglones: [
    {
      libroId: 'l1',
      titulo: 'El jardín de las horas',
      isbn: '978-950-01-0001-1',
      cantidad: 2,
      precioUnitario: 1500,
      subtotal: 3000
    }
  ],
  total: 3000
}
```

`localStorage` guarda los datos en el navegador del usuario. Su contenido depende del navegador, del perfil y de la ubicación desde la que se abre el archivo, y no se comparte entre usuarios, perfiles ni equipos. Si se borran los datos del sitio, la información se pierde.

Los ejemplos se cargan solo cuando la clave no existe. Al recargar se recuperan los datos guardados sin duplicar las semillas.

### Cómo reproducir la comprobación del precio histórico

1. Confirmar una venta y anotar el precio unitario, los subtotales y el total.
2. Abrir las herramientas de desarrollo del navegador, pestaña **Application (Aplicación) → Local Storage**.
3. Editar únicamente el precio de un libro dentro de `libreria.v1.libros`; no modificar ni borrar `libreria.v1.ventas`.
4. Recargar la página y abrir el detalle de la venta anterior.

El detalle debe conservar el precio unitario, los subtotales y el total confirmados, aunque el catálogo tenga otro precio.

## Comprobaciones realizadas

Estas comprobaciones se ejecutaron el 21/10/2026 con Chrome, abriendo `index.html` desde el sistema de archivos.

| Comprobación | Resultado observado |
| --- | --- |
| Carga inicial | 6 libros, 3 clientes, 0 ventas; 6 tarjetas y 6 filas de libros; 3 filas de clientes; renglones e historial vacíos; detalle oculto; selectores de venta en «Seleccioná…»; total `$ 0,00` y artículos `0`. |
| Ancho de 320 px | `scrollWidth = clientWidth = 320`; `scrollX = 0`; catálogo en una columna; sin scroll horizontal de página. Las tablas de libros y renglones tienen contenedor de 252 px y contenido de 576 px; historial 286/576; detalle 249/576; clientes entra en 252 px. |
| Ancho de 1280 px | `scrollWidth = clientWidth = 1280`; `scrollX = 0`; catálogo en tres columnas; las tablas entran en su contenedor (603 px y 1086 px para el historial), sin desplazamiento horizontal de página. |
| Navegación por teclado | El primer `Tab` enfoca «Saltar al contenido» y lo muestra; al activarlo, el foco pasa a `main` con contorno visible de 3 px. Los enlaces de navegación actualizan el foco al `h2` de la vista. |
| Foco y tablas | Foco visible en enlaces, campos, botones, región de tabla y detalle. Las regiones de tabla reciben foco y se desplazan con el teclado cuando corresponde. |
| Consola y recursos | 0 errores de JavaScript y 0 errores de consola durante cargas, altas, ventas, recarga y apertura del detalle. Las tres hojas CSS y los nueve scripts cargaron correctamente; no hay `fetch` ni recursos externos. |
| Validación | Se rechazan formularios incompletos, ISBN duplicado, email inválido o duplicado, cantidades cero, negativas o decimales y ventas sin cliente o sin renglones. |
| Auditoría del HTML | 75 IDs únicos, 0 duplicados y 0 referencias `aria-*`/`label[for]` rotas; 5 tablas con `caption` y 22 `th`; 4 formularios, 1 fieldset y 0 opciones preseleccionadas; 0 estilos inline y 0 recursos externos. |
| Accesibilidad generada | Los checkboxes de autores tienen `label`, `aria-describedby` válido y foco visible; los errores usan `aria-invalid` y texto asociado. |

## Casos manuales

Ningún caso se registra como aprobado sin haberlo ejecutado. Los ocho casos se ejecutaron sobre la versión final.

| # | Caso | Resultado esperado | Resultado observado |
| --- | --- | --- | --- |
| 1 | Búsqueda con parte del título en mayúsculas; luego búsqueda vacía y texto inexistente | Coincidencias sin distinguir mayúsculas; catálogo completo; mensaje sin resultados | Aprobado: «JARDÍN» mostró 1 libro; «  memoria  » mostró 1 libro; «zzz» mostró el mensaje de sin resultados; la búsqueda vacía mostró los 6 libros. |
| 2 | Alta de libro con ISBN existente y luego con ISBN nuevo | El duplicado se rechaza; el válido aparece en catálogo y en la selección de venta | Aprobado: `978 950 01 0001 1` se rechazó con «Ya existe un libro con ese ISBN.». El alta de «Cuaderno de pruebas» (`978-950-01-0099-9`, precio `1234.567` → `$ 1.234,57`) agregó la fila, la tarjeta del catálogo y la opción de venta `l7`. |
| 3 | Alta de cliente con email inválido, email existente en mayúsculas y email nuevo | Se rechazan los dos primeros; el nuevo aparece en listado y selección | Aprobado: `lucia.example.com` se rechazó con «Ingresá un email válido.»; `MARIA.GONZALEZ@EXAMPLE.COM` se rechazó como duplicado; `Lucia.Prueba@Example.com` se guardó y agregó la fila y la opción `c4`. También se verificó con `  Espacios@Example.com  `: se guardó como `Espacios@Example.com` y el nombre perdió los espacios exteriores. |
| 4 | Venta sin cliente, cantidad cero, negativa o decimal; libro repetido | No se confirma; el duplicado no crea otro renglón | Aprobado: sin cliente mostró «Seleccioná un cliente para confirmar la venta.» y no creó ventas; cantidades 0, -1 y 1.5 mostraron «La cantidad debe ser un número entero mayor que cero.» y no agregaron renglones; repetir el libro dejó 1 renglón con cantidad 2 y total `$ 3.000,00`. |
| 5 | Venta válida: dos unidades a 1500 y una a 2000 | Subtotales 3000 y 2000; total 5000; detalle conservado en el historial | Aprobado: subtotales `$ 3.000,00` y `$ 2.000,00`, artículos 3, total `$ 5.000,00`; al confirmar se creó `V-0001`, el formulario quedó limpio y el historial mostró 1 venta. El detalle conservó los dos renglones y el total. |
| 6 | Venta confirmada y cambio exclusivo del precio de catálogo guardado | Tras recargar, el precio unitario, los subtotales y el total de esa venta conservan los valores confirmados | Aprobado: se cambió `l1` de 1500 a 9999 en `libreria.v1.libros`, se recargó y el detalle siguió mostrando `$ 1.500,00`, `$ 3.000,00` y total `$ 5.000,00`. La venta guardada no se modificó. |
| 7 | Recarga después de altas y venta | Se recuperan los datos sin duplicar ejemplos ni ventas | Aprobado: antes y después de recargar se conservaron 7 libros, 4 clientes y 1 venta; las tablas y el historial mantuvieron 7, 4 y 1 filas, respectivamente, sin duplicar semillas. |
| 8 | Navegación por teclado y anchos de 320 px y 1280 px | Foco visible, controles utilizables y tabla con desplazamiento propio si lo necesita | Aprobado: 320/320 y 1280/1280 sin scroll horizontal de página; foco visible en skip, `main`, enlaces y campos; el detalle se abre con foco en su título; las tablas se desplazan dentro de su contenedor. |

## Imágenes

No se utilizan imágenes externas ni recursos gráficos ajenos. Si en etapas posteriores se incorporan recursos locales, se documentará su procedencia y licencia.

## Nota sobre esta etapa

La aplicación completa el alcance funcional del PDF: datos locales, catálogo y filtro, altas validadas, venta simulada, historial inmutable y persistencia. El detalle de una venta se genera desde la copia histórica guardada al confirmar, no desde el precio actual del catálogo. El README debe mantenerse actualizado si se modifica el contrato de IDs o el flujo de datos.
