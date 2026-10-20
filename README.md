# TPI Librería — Frontend

Trabajo Práctico Integrador de **Programación III**, Tecnicatura Universitaria en Programación a Distancia.

## Integrantes

- Martín Escudero
- Lautaro Naranjo

## Estado del proyecto

Etapa inicial: estructura y navegación entre vistas. El resto de las funcionalidades está pendiente y se detalla en este documento.

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

Las cinco vistas conviven en `index.html`. Mientras no exista el enrutador en JavaScript, los enlaces funcionan como anclas dentro de la misma página.

## Funcionalidades

### Implementadas

- Estructura semántica con `header`, `nav` y `main`.
- Navegación entre las cinco vistas.
- Mensajes de estado vacío en cada vista.

### Pendientes

- Ejercicio 1: formularios, tablas y mensajes de resultado en cada vista.
- Ejercicio 2: identidad visual, CSS externo, adaptación a 320 px y 1280 px, foco visible y accesibilidad básica.
- Ejercicio 3: datos locales, catálogo generado por JavaScript y filtro por título.
- Ejercicio 4: alta de libros y de clientes con sus validaciones.
- Ejercicio 5: composición de ventas, cálculos y historial inmutable.
- Ejercicio 6: persistencia en `localStorage` y registro de los casos manuales.

## Datos iniciales

Pendiente de implementación en `js/data.js`. Se incluirán los mínimos que exige la consigna: 6 libros, 2 editoriales, 2 géneros, 3 autores y 3 clientes ficticios, con al menos un libro sin género asignado.

## Almacenamiento local

Pendiente de implementación. Las claves previstas son:

- `libreria.v1.libros`
- `libreria.v1.clientes`
- `libreria.v1.ventas`

`localStorage` guarda los datos en el navegador del usuario. Su contenido depende del navegador, del perfil y de la ubicación desde la que se abre el archivo, y no se comparte entre usuarios, perfiles ni equipos. Si se borran los datos del sitio, la información se pierde.

## Casos manuales

Ningún caso se registra como aprobado sin haberlo ejecutado. Todos los resultados están pendientes.

| # | Caso | Resultado esperado | Resultado observado |
| --- | --- | --- | --- |
| 1 | Búsqueda con parte del título en mayúsculas; luego búsqueda vacía y texto inexistente | Coincidencias sin distinguir mayúsculas; catálogo completo; mensaje sin resultados | Pendiente de ejecución |
| 2 | Alta de libro con ISBN existente y luego con ISBN nuevo | El duplicado se rechaza; el válido aparece en catálogo y en la selección de venta | Pendiente de ejecución |
| 3 | Alta de cliente con email inválido, email existente en mayúsculas y email nuevo | Se rechazan los dos primeros; el nuevo aparece en listado y selección | Pendiente de ejecución |
| 4 | Venta sin cliente, con cantidad cero, negativa o decimal, y con libro repetido | No se confirma; el duplicado no crea otro renglón | Pendiente de ejecución |
| 5 | Venta válida: dos unidades a 1500 y una a 2000 | Subtotales 3000 y 2000; total 5000; detalle conservado en el historial | Pendiente de ejecución |
| 6 | Venta confirmada y cambio exclusivo del precio de catálogo guardado, en una copia de prueba | Tras recargar, el precio unitario, los subtotales y el total de esa venta conservan los valores confirmados | Pendiente de ejecución |
| 7 | Recarga después de altas y venta | Se recuperan los datos sin duplicar ejemplos ni ventas | Pendiente de ejecución |
| 8 | Navegación por teclado y anchos de 320 px y 1280 px | Foco visible, controles utilizables y tabla con desplazamiento propio si lo necesita | Pendiente de ejecución |

## Imágenes

No se utilizan imágenes externas. Si en etapas posteriores se incorporan recursos locales, se documentará su procedencia y licencia.

## Nota sobre esta etapa

Las cinco vistas son, por ahora, maquetas de estructura: muestran sus títulos y estados vacíos. La navegación entre secciones ya funciona mediante anclas. Las operaciones de alta, venta, historial y persistencia todavía no están implementadas.
