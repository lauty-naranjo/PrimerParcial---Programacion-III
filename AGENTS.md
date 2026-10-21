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
- Rama de esta etapa: `feat/altas-libros-clientes`, verificada y aprobada.
- Commits de esta etapa: `48167fc` (utils) y `151bbec` (altas), más el commit de documentación de cierre.
- Integración: merge `--no-ff` a `master` y push de `master` y `feat/altas-libros-clientes`.
- Cambios de esta etapa: `js/books.js`, `js/clients.js`, `js/utils.js`, `js/catalog.js`, `js/app.js`, `index.html`, `css/components.css`, `README.md` y `AGENTS.md`.
- Existe: catálogo dinámico; tablas de libros y clientes generadas; altas validadas; opciones de editorial, género, autores y selectores de venta generados desde `js/data.js`; errores por campo, resumen, éxito y estados vacíos; tres hojas CSS y seis scripts clásicos.
- Funciona: navegación por anclas, catálogo y filtro, altas de libros y clientes, actualización de tablas/catálogo/selectores sin recarga, validaciones, presentación responsive, teclado y tablas con desplazamiento. Casos manuales 1, 2 y 3 aprobados.
- Verificación en navegador: sin errores de JavaScript ni de consola; 320 px (`scrollWidth = clientWidth = 305`) y 1280 px (`1265`) sin scroll horizontal; catálogo en una y tres columnas; tabla de 237/576 px con `scrollLeft` de 0 a 120 a 320 px y de 603/603 px a 1280 px; foco visible en checkboxes generados; auditoría sin IDs duplicados ni referencias rotas.
- No existe todavía: `js/store.js`, persistencia, ventas, historial dinámico ni router por hash. Las altas viven en memoria y se pierden al recargar.
- Próximo paso: consigna 5 con `js/sales.js` y `js/history.js`: composición de ventas, cálculos, renglones dinámicos e historial inmutable. `js/store.js` y `localStorage` quedan para la consigna 6.

## Convención JavaScript

- Scripts clásicos, sin módulos ES. Orden de carga: `data.js`, `utils.js`, `catalog.js`, `books.js`, `clients.js`, `app.js`; `store.js`, `sales.js` e `history.js` se incorporan antes de `app.js`.
- Un único namespace `window.Libreria`; cada archivo se envuelve en una IIFE con `'use strict'`.
- `Libreria.datos` contiene las semillas; `Libreria.utils` centraliza normalización de texto, ISBN y email, redondeo y formato de precios, IDs y poblado de selectores.
- Cada módulo expone `iniciar()` y, cuando corresponde, `refrescar()` para regenerar tablas y selectores sin recargar.
- Las altas de libros y clientes usan `novalidate` y validación propia; el formulario de venta conserva la validación nativa hasta la consigna 5.
- Render con `createElement`, `textContent`, `DocumentFragment` y `replaceChildren`; nunca `innerHTML` con datos.
- `js/app.js` orquesta el arranque del catálogo, libros y clientes en `DOMContentLoaded`.

## Contrato de IDs

Mantener estos `id` al integrar JavaScript. Si se renombra uno, actualizar el JS y este archivo.

- Vistas: `#catalogo`, `#libros`, `#clientes`, `#ventas`, `#historial`.
- Catálogo: `#form-busqueda`, `#busqueda-titulo`, `#boton-buscar`, `#catalogo-lista`, `#catalogo-vacio`, `#catalogo-sin-resultados`.
- Libros: `#form-libro`, `#libro-titulo`, `#libro-isbn`, `#libro-precio`, `#libro-editorial`, `#libro-genero`, `#libro-autores`, `#libro-registrar`, `#libro-limpiar`, `#libro-mensaje`, `#libro-titulo-error`, `#libro-isbn-error`, `#libro-precio-error`, `#libro-editorial-error`, `#libro-genero-error`, `#libro-autores-error`, `#libro-exito`, `#tabla-libros`, `#libros-vacio`.
- Clientes: `#form-cliente`, `#cliente-nombre`, `#cliente-email`, `#cliente-registrar`, `#cliente-limpiar`, `#cliente-mensaje`, `#cliente-nombre-error`, `#cliente-email-error`, `#cliente-exito`, `#tabla-clientes`, `#clientes-vacio`.
- Ventas: `#form-venta`, `#venta-cliente`, `#venta-libro`, `#venta-cantidad`, `#venta-agregar`, `#venta-mensaje`, `#tabla-renglones`, `#venta-vacio`, `#venta-subtotal`, `#venta-total`, `#venta-confirmar`, `#venta-confirmada`.
- Historial: `#tabla-historial`, `#historial-vacio`, `#detalle-venta`, `#detalle-renglones`, `#detalle-total`.
- Los botones «Editar», «Quitar» y «Ver detalle» de cada fila se generan con JavaScript; reutilizar las clases `boton`, `boton--secundario`, `boton--peligro`, `boton--chico` y el texto oculto con `visualmente-oculto`.

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
- En esta etapa se ejecutaron las comprobaciones de presentación del `README.md` (320 px, 1280 px, teclado, foco, tablas y auditoría del HTML) y los casos manuales 1, 2 y 3; no hubo errores de JavaScript ni de consola. Los casos 4 a 7 y el flujo funcional completo del caso 8 siguen pendientes hasta integrar ventas y persistencia.
- Repetir estas comprobaciones después de cada integración y antes de cada PR.
- Antes de cerrar una etapa, verificar un clon limpio o una copia actualizada con `git pull`, abrir `index.html` y comprobar que cargan los seis scripts y las tres hojas CSS.
