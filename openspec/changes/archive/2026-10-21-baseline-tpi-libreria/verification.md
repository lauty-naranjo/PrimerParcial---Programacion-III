# Verificación — Baseline del TPI Librería

**Fecha**: 21/10/2026
**Entorno**: Windows 10, Chrome 155.0.8059.85 (`--headless=new`, protocolo CDP vía puerto 9345), Node v20.18.0.
**Método**: ejecución real de la aplicación abierta por `file://` en una instancia de Chrome con perfil temporal vacío; las comprobaciones leen el DOM y el estado de `window.Libreria` mediante `Runtime.evaluate`. Las comprobaciones estáticas se ejecutan con `node --check` y búsqueda de patrones sobre `index.html` y `js/*.js`.
**Resultado global**: 57 de 57 comprobaciones PASS. Consola con 0 errores y 0 advertencias.

## Comprobaciones estáticas

| Comprobación | Comando | Resultado |
| --- | --- | --- |
| Sintaxis de los 9 módulos | `node --check js/<archivo>.js` | 9/9 OK |
| `innerHTML`, `outerHTML`, `insertAdjacentHTML`, `document.write` | búsqueda en `js/*.js` e `index.html` | 0 coincidencias |
| `fetch(`, `http://`, `https://` | búsqueda en `js/*.js` e `index.html` | 0 coincidencias |
| Orden de hojas de estilo | inspección de `index.html` | `base.css`, `layout.css`, `components.css` |
| Orden de scripts | inspección de `index.html` | `data`, `utils`, `store`, `catalog`, `books`, `clients`, `sales`, `history`, `app` |
| Sin `type="module"` ni atributos `style` | inspección de `index.html` | 0 coincidencias |

## Caso 1 — Apertura y navegación (R-01, R-08)

| Comprobación | Observado |
| --- | --- |
| Carga por `file://` sin servidor | aplicación lista, `Libreria` inicializado |
| Cinco secciones y cinco enlaces de navegación | 5 / 5 |
| Clic en «Clientes» | hash `#clientes`, sólo ese enlace con `aria-current="location"` |
| Foco tras la navegación | `document.activeElement.id === "clientes-titulo"` |
| Apertura directa con `#historial` | enlace «Historial» marcado como actual |
| Apertura sin fragmento | enlace «Catálogo» marcado como actual |

## Caso 2 — Alta de libro y formato de precio (R-03, R-04, R-10)

| Comprobación | Observado |
| --- | --- |
| Catálogo inicial | 6 libros |
| Alta con precio `1234.567` | libro agregado, id `l7` |
| Precio persistido | `1234.57` |
| Precio mostrado | `$ 1.234,57` |
| Libro sin género | `generoId: null`, se muestra «Sin clasificar» |
| Mensaje de éxito y limpieza del formulario | visibles / campos vacíos |

## Caso 3 — Validaciones del alta de libro (R-04)

| Comprobación | Mensaje observado |
| --- | --- |
| Envío vacío | «Ingresá el título.», «Ingresá el ISBN.», «Ingresá el precio.» |
| ISBN duplicado | «Ya existe un libro con ese ISBN.» |
| Precio `0` | «El precio debe ser un número mayor que cero.» |
| Alta rechazada | el catálogo permanece en 7 libros en los tres casos |

## Caso 4 — Alta de cliente y validaciones (R-04, R-10)

| Comprobación | Observado |
| --- | --- |
| Alta con `  Baseline@Test.com  ` | cliente agregado, id `c4`, email guardado `Baseline@Test.com` |
| Disponibilidad en el selector de venta | opción `c4` presente |
| Email duplicado `baseline@test.com` | «Ya existe un cliente con ese email.» |
| Email `sin-arroba` | «Ingresá un email válido.» |
| Alta rechazada | la lista permanece en 4 clientes |

## Caso 5 — Composición y confirmación de la venta (R-05, R-10)

| Comprobación | Observado |
| --- | --- |
| 2 unidades de `$ 1.500,00` + 1 de `$ 2.000,00` | 2 renglones, total `$ 5.000,00` |
| Agregar un libro ya presente | no crea renglón nuevo, informa «se actualizó la cantidad», total `$ 6.500,00` |
| Cantidad `0` | «La cantidad debe ser un número entero mayor que cero.» |
| Confirmación | 1 venta, id `V-0001`, total persistido `6500`, cliente `c4` |
| Post-confirmación | carrito vacío, mensaje «la venta V-0001 se registró correctamente» |

## Caso 6 — Historial inmutable (R-05, R-06)

| Comprobación | Observado |
| --- | --- |
| Fila en el historial | 1 venta listada |
| Detalle | 2 renglones con `$ 1.500,00` y `$ 2.000,00`, total `$ 6.500,00` |
| Precio del catálogo modificado a `9999` y recarga | el catálogo refleja `9999` |
| Detalle tras la recarga | conserva `$ 1.500,00` y total `$ 6.500,00` |

## Caso 7 — Persistencia sin duplicados (R-06, R-10)

| Comprobación | Observado |
| --- | --- |
| Recarga tras operar | 7 libros, 4 clientes, 1 venta |
| Unicidad de identificadores | sin duplicados en las tres entidades |
| Claves de almacenamiento | `libreria.v1.clientes`, `libreria.v1.libros`, `libreria.v1.ventas` |

## Caso 8 — Adaptación y consola (R-02, R-08)

| Comprobación | Observado |
| --- | --- |
| 320 px | `scrollWidth 320 = clientWidth 320` |
| 1280 px | `scrollWidth 1265 = clientWidth 1265` |
| Consola durante todo el recorrido | 0 excepciones, 0 entradas de nivel error, 0 advertencias |

## Cobertura no incluida

`IN-02` (precio unitario tomado del renglón) **no** se verifica en este baseline porque el comportamiento vigente no lo cumple: `confirmarVenta` relee el precio del catálogo. Queda registrado en `knowledge-base/10_preguntas_abiertas.md` y se especifica en el change `ajustes-entrega-tpi`. Tampoco se verifica `R-07` (contenido del README) en esta ejecución: se auditó por lectura del archivo y su corrección pertenece al mismo change de ajustes.

## Reproducción

1. Abrir Chrome con `--headless=new --remote-debugging-port=9345 --user-data-dir=<perfil temporal>` y la ruta `file:///.../index.html`.
2. Conectar al target de página por WebSocket (CDP), habilitar `Runtime`, `Log` y `Page`.
3. Recorrer los pasos de cada caso con `Runtime.evaluate` sobre el DOM real.
4. Leer el resultado en `%TEMP%\opencode\baseline-result.json`.
