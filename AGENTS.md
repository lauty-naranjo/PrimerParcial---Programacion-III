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
- Rama de esta etapa: `feat/datos-catalogo`, verificada y aprobada.
- Commits de esta etapa: `0a668c2` (datos), `4018268` (utils), `be4e79e` (catálogo) y el commit de documentación de cierre.
- Integración: merge `--no-ff` a `master` y push de `master` y `feat/datos-catalogo`.
- Cambios de esta etapa: `js/data.js`, `js/utils.js`, `js/catalog.js`, `js/app.js`, `index.html`, `README.md` y `AGENTS.md`.
- Existe: catálogo dinámico generado desde `js/data.js`; semillas de libros, editoriales, géneros, autores y clientes; filtro por título con estados de vacío y sin resultados; tres hojas CSS externas; formularios con validación nativa; tablas estáticas de libros, clientes, venta e historial.
- Funciona: navegación por anclas, catálogo y filtro, validación nativa, presentación responsive, recorrido por teclado y desplazamiento interno de tablas. El caso manual 1 del PDF está aprobado.
- Verificación en navegador: sin errores de JavaScript ni de consola; 320 px (`scrollWidth = clientWidth = 305`) y 1280 px (`1265`) sin scroll horizontal; catálogo en una y tres columnas; tabla con `scrollLeft` de 0 a 120 a 320 px.
- No existe todavía: `js/store.js`, persistencia, altas, ventas, historial dinámico ni router por hash.
- Próximo paso: consigna 4 con `js/books.js` y `js/clients.js`: render de las tablas de libros y clientes, generación de selectores y validaciones de alta. `js/store.js` y `localStorage` quedan para la consigna 6.

## Convención JavaScript

- Scripts clásicos, sin módulos ES. Orden de carga: `data.js`, `utils.js`, `catalog.js`, `app.js`; los módulos de cada entidad se agregan después de `catalog.js`.
- Un único namespace `window.Libreria`; cada archivo se envuelve en una IIFE con `'use strict'`.
- `Libreria.datos` contiene las semillas; `Libreria.utils` las funciones compartidas; cada módulo expone `iniciar()`.
- Render con `createElement`, `textContent`, `DocumentFragment` y `replaceChildren`; nunca `innerHTML` con datos.
- `js/app.js` orquesta el arranque en `DOMContentLoaded`.

## Contrato de IDs

Mantener estos `id` al integrar JavaScript. Si se renombra uno, actualizar el JS y este archivo.

- Vistas: `#catalogo`, `#libros`, `#clientes`, `#ventas`, `#historial`.
- Catálogo: `#form-busqueda`, `#busqueda-titulo`, `#boton-buscar`, `#catalogo-lista`, `#catalogo-vacio`, `#catalogo-sin-resultados`.
- Libros: `#form-libro`, `#libro-titulo`, `#libro-isbn`, `#libro-precio`, `#libro-editorial`, `#libro-genero`, `#libro-registrar`, `#libro-limpiar`, `#libro-mensaje`, `#tabla-libros`, `#libros-vacio`.
- Clientes: `#form-cliente`, `#cliente-nombre`, `#cliente-email`, `#cliente-registrar`, `#cliente-limpiar`, `#cliente-mensaje`, `#tabla-clientes`, `#clientes-vacio`.
- Ventas: `#form-venta`, `#venta-cliente`, `#venta-libro`, `#venta-cantidad`, `#venta-agregar`, `#venta-mensaje`, `#tabla-renglones`, `#venta-vacio`, `#venta-subtotal`, `#venta-total`, `#venta-confirmar`, `#venta-confirmada`.
- Historial: `#tabla-historial`, `#historial-vacio`, `#detalle-venta`, `#detalle-renglones`, `#detalle-total`.
- Los botones «Editar», «Quitar» y «Ver detalle» de cada fila se generan con JavaScript; reutilizar las clases `boton`, `boton--secundario`, `boton--peligro`, `boton--chico` y el texto oculto con `visualmente-oculto`.

## Reparto

- **Martín Escudero:** HTML, CSS, router, catálogo, historial, accesibilidad, responsive e integración.
- **Lautaro Naranjo:** datos, storage, utilidades, libros, clientes, ventas y QA funcional.

## Flujo de trabajo

- Nunca commitear sobre `master`. Una rama por feature y PR revisado por el otro integrante.
- Merge con **merge commit**, nunca squash, para conservar la autoría.
- En la máquina de Martín: primero se implementa, él revisa y aprueba, y recién después se hace el commit.
- Mensajes de commit en español con formato `tipo(alcance): descripción` (ejemplo: `feat(datos): semillas, store y utils`).

## Datos mínimos

6 libros, 2 editoriales, 2 géneros, 3 autores y 3 clientes ficticios. Al menos un libro sin género. Los precios deben permitir verificar 2 × 1500 + 1 × 2000 = 5000.

## Verificación

- Los ocho casos manuales del PDF se ejecutan de verdad y se registran en el `README.md` con el resultado observado. Ningún caso se marca aprobado sin ejecutarlo.
- Comprobar consola sin errores, navegación por teclado, foco visible y ausencia de scroll horizontal a 320 px y 1280 px.
- En esta etapa se ejecutaron las comprobaciones de presentación del `README.md` (320 px, 1280 px, teclado, foco, tablas y auditoría del HTML) y el caso manual 1; no hubo errores de JavaScript ni de consola. Los casos 2 a 7 y el flujo funcional completo del caso 8 siguen pendientes hasta integrar las altas, ventas y persistencia.
- Repetir estas comprobaciones después de cada integración y antes de cada PR.
