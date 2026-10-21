# AGENTS.md — Instrucciones para agentes de IA

Proyecto: TPI Librería, Programación III (Tecnicatura Universitaria en Programación a Distancia).
Este archivo es una guía interna para agentes. **No forma parte de la entrega: excluirlo del zip final.**

## Stack y prohibiciones

- HTML, CSS y JavaScript nativos. Sin librerías, frameworks, CDNs, npm, backend ni login.
- Scripts clásicos, **no módulos ES**, para que funcione abriendo `index.html` con doble clic (`file://`).

## Reglas duras

- Todo dato escrito por el usuario se inserta con `textContent`. Nunca `innerHTML` con datos.
- Precios: número, redondeo a centavos y visualización con dos decimales.
- Claves de `localStorage`: `libreria.v1.libros`, `libreria.v1.clientes`, `libreria.v1.ventas`.
- Las semillas se cargan solo si la clave no existe (evitar duplicados al recargar).
- Historial inmutable: cada renglón guarda copia de `titulo`, `isbn` y `precioUnitario` al confirmar.
- ISBN: se compara sin espacios ni guiones. Email: `trim` y comparación sin distinguir mayúsculas.
- Género opcional: sin asignar se muestra «Sin clasificar».
- Editoriales, géneros y autores son datos estáticos; no se pide ABM de ellos.
- No commitear `CONTEXTO*.md`, `*.zip`, `.DS_Store` ni `Thumbs.db`; usar `.git/info/exclude` local.

## Estructura objetivo

```
index.html
css/base.css
css/layout.css
css/components.css
js/data.js
js/store.js
js/utils.js
js/app.js
js/catalog.js
js/books.js
js/clients.js
js/sales.js
js/history.js
README.md
```

## Estado actual

Actualizar esta sección en cada PR.

- Rama por defecto: `master`.
- Etapa 1 fusionada con merge commit `8d9daee` (maqueta y presentación).
- Commits de la Etapa 1: `68ef727`, `856834c`, `b44367a`, `78de881`, `8b6060c` y `7dcc880`.
- Etapa de catálogo fusionada con merge commit `75c9059`; commits `0a668c2`, `4018268`, `be4e79e` y `d7c7a2d`.
- Etapa de altas fusionada con merge commit `d199d9e`; commits `48167fc`, `151bbec` y `d7bf4a5`.
- Rama actual: `feat/ventas-historial-persistencia`, basada en `d199d9e`.
- En esta rama se incorporan `js/store.js`, `js/sales.js` y `js/history.js`, la composición de ventas, el historial inmutable, la persistencia en `localStorage` y el router por hash.
- Existe: catálogo dinámico; tablas de libros y clientes generadas; altas validadas; ventas con renglones editables; cálculos de subtotal y total; confirmación; historial con detalle; persistencia; navegación con `aria-current`.
- El PDF no exige editar ni eliminar libros o clientes: el Ejercicio 4 solo pide altas. Los únicos botones de quitar son los de renglones de una venta antes de confirmar.

## Convención JavaScript

- Scripts clásicos, sin módulos ES. Orden de carga: `data.js`, `utils.js`, `store.js`, `catalog.js`, `books.js`, `clients.js`, `sales.js`, `history.js`, `app.js`.
- Un único namespace `window.Libreria`; cada archivo se envuelve en una IIFE con `'use strict'`.
- `Libreria.datos` contiene las semillas; `Libreria.utils` centraliza normalización de texto, ISBN y email, redondeo y formato de precios y fechas, IDs y poblado de selectores.
- Cada módulo expone `iniciar()` y, cuando corresponde, `refrescar()` para regenerar tablas y selectores sin recargar.
- Las altas de libros y clientes y el formulario de venta usan `novalidate` y validación propia con mensajes en el DOM.
- Render con `createElement`, `textContent`, `DocumentFragment` y `replaceChildren`; nunca `innerHTML` con datos.
- `js/app.js` carga el storage y orquesta catálogo, libros, clientes, ventas, historial y router en `DOMContentLoaded`.
- `js/sales.js` mantiene los renglones en memoria hasta confirmar; al confirmar guarda una copia histórica de título, ISBN, precio unitario y subtotal, y persiste la venta con `Libreria.store`.
- `js/history.js` reconstruye el historial y el detalle solo desde las ventas guardadas; nunca desde el catálogo actual.
- El router vive en `js/app.js`, no en un archivo separado. Reconoce hash vacío o desconocido como catálogo e ignora `#contenido` para no interferir con el enlace de salto.


## Contrato de IDs

Mantener estos `id` al integrar JavaScript. Si se renombra uno, actualizar el JS y este archivo.

- Vistas: `#catalogo`, `#libros`, `#clientes`, `#ventas`, `#historial`.
- Catálogo: `#form-busqueda`, `#busqueda-titulo`, `#boton-buscar`, `#catalogo-lista`, `#catalogo-vacio`, `#catalogo-sin-resultados`.
- Libros: `#form-libro`, `#libro-titulo`, `#libro-isbn`, `#libro-precio`, `#libro-editorial`, `#libro-genero`, `#libro-autores`, `#libro-registrar`, `#libro-limpiar`, `#libro-mensaje`, `#libro-titulo-error`, `#libro-isbn-error`, `#libro-precio-error`, `#libro-editorial-error`, `#libro-genero-error`, `#libro-autores-error`, `#libro-exito`, `#tabla-libros`, `#libros-vacio`.
- Clientes: `#form-cliente`, `#cliente-nombre`, `#cliente-email`, `#cliente-registrar`, `#cliente-limpiar`, `#cliente-mensaje`, `#cliente-nombre-error`, `#cliente-email-error`, `#cliente-exito`, `#tabla-clientes`, `#clientes-vacio`.
- Ventas: `#form-venta`, `#venta-cliente`, `#venta-libro`, `#venta-cantidad`, `#venta-agregar`, `#venta-mensaje`, `#tabla-renglones`, `#venta-vacio`, `#venta-articulos`, `#venta-subtotal`, `#venta-total`, `#venta-confirmar`, `#venta-confirmada`.
- Historial: `#tabla-historial`, `#historial-vacio`, `#detalle-venta`, `#detalle-titulo`, `#detalle-meta`, `#detalle-renglones`, `#detalle-tabla-titulo`, `#detalle-total`.
- Los botones «Quitar» de los renglones y «Ver detalle» del historial se generan con JavaScript; reutilizar las clases `boton`, `boton--secundario`, `boton--peligro`, `boton--chico` y el texto oculto con `visualmente-oculto`.

### Notas de integración con JavaScript

- Al iniciar se vacían `#catalogo-lista`, `#tabla-libros tbody`, `#tabla-clientes tbody`, `#tabla-renglones tbody`, `#tabla-historial tbody` y `#detalle-renglones tbody` para evitar duplicados.
- Repoblar `#venta-cliente` y `#venta-libro` cada vez que se agregue un cliente o un libro. No dejar opciones `selected`: el estado inicial es «Seleccioná…».
- Mostrar y ocultar con el atributo `hidden` (o la propiedad `.hidden`), no con `style.display`: `[hidden]` usa `display: none !important`.
- `#detalle-venta` arranca oculto. Al abrir una venta, actualizar `#detalle-titulo`, `#detalle-meta`, `#detalle-tabla-titulo`, `#detalle-renglones` y `#detalle-total`.
- Agregar `aria-current` (valor `location`) en `hashchange` y mover el foco al `h2` de la vista.
- Anunciar cambios en `#venta-total` (`aria-live="polite"`) y reutilizar los estados vacíos con `role="status"`.
- El aviso de maqueta se retiró cuando la app pasó a ser funcional.

## Reparto

- **Martín Escudero:** HTML, CSS, router, catálogo, historial, accesibilidad, responsive e integración.
- **Lautaro Naranjo:** datos, storage, utilidades, libros, clientes, ventas y QA funcional.

## Flujo de trabajo

- Nunca commitear sobre `master`. Una rama por feature y revisión del otro integrante cuando corresponda.
- Merge con **merge commit**, nunca squash, para conservar la autoría.
- En esta máquina el agente implementa, verifica y commitea sin esperar un OK intermedio; el usuario revisa al final. El push de la rama permite que el compañero la revise antes o después del merge.
- Mantener la revisión del compañero como paso del flujo del equipo; no eliminarlo.
- Mensajes de commit en español con formato `tipo(alcance): descripción` (ejemplo: `feat(datos): semillas, store y utils`).

## Datos mínimos

6 libros, 2 editoriales, 2 géneros, 3 autores y 3 clientes ficticios. Al menos un libro sin género. Los precios deben permitir verificar 2 × 1500 + 1 × 2000 = 5000.

## Verificación

- Los ocho casos manuales del PDF se ejecutan de verdad y se registran en el `README.md` con el resultado observado. Ningún caso se marca aprobado sin ejecutarlo.
- Comprobar consola sin errores, navegación por teclado, foco visible y ausencia de scroll horizontal a 320 px y 1280 px.
- En esta etapa se ejecutaron las comprobaciones de presentación del `README.md` (320 px, 1280 px, teclado, foco, tablas y auditoría del HTML) y los ocho casos manuales del PDF; no hubo errores de JavaScript ni de consola.
- Repetir estas comprobaciones después de cada integración y antes de cada PR.
- Antes de cerrar una etapa, verificar un clon limpio o una copia actualizada con `git pull`, abrir `index.html` y comprobar que cargan los nueve scripts y las tres hojas CSS.
