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
- Commit base: `985f8b9` — estructura inicial y README esqueleto.
- `master` antes del merge de esta entrega: `0e4822b` — AGENTS.md con reglas y estado inicial.
- Rama de esta etapa: `feat/presentacion-css`, aprobada; se fusiona con merge commit en esta entrega.
- Commits de esta etapa:
  - `68ef727` — `feat(ui): maqueta completa e identidad visual` (`index.html`, `css/base.css`).
  - `856834c` — `feat(css): layout adaptable con flexbox y grid` (`css/layout.css`).
  - `b44367a` — `feat(css): componentes, tablas y accesibilidad visual` (`css/components.css`).
  - `78de881` — `docs: estado de la entrega y próximo paso` (`AGENTS.md`, `README.md`).
  - Ajustes previos al merge: `docs(etapa1): precisa alcance de la maqueta y estado del proyecto` y `fix(a11y): retira aria-current fijo de la navegación`.
- Existe: maqueta completa de las cinco vistas en `index.html`; tres hojas CSS externas; datos de ejemplo estáticos; formularios con validación nativa; tablas con `caption`, `th` y scroll interno; foco visible, enlace de salto y diseño adaptable a 320 px y 1280 px; `README.md` con estado y comprobaciones.
- Funciona: navegación por anclas, validación nativa, presentación responsive, recorrido por teclado y desplazamiento interno de tablas. El buscador está maquetado; su filtrado se activa con JavaScript.
- No existe todavía: `js/`, persistencia, altas, ventas, historial dinámico ni router por hash. La navegación por hash y `aria-current` se resuelven en esa etapa.
- Próximo paso: rama `feat/datos-formularios` de Lautaro con `js/data.js`, `js/store.js` y `js/utils.js`; después integrar `js/app.js`, `js/catalog.js`, `js/books.js`, `js/clients.js`, `js/sales.js` y `js/history.js`.

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
- En esta etapa se ejecutaron las comprobaciones de presentación del `README.md` (320 px, 1280 px, teclado, foco, tablas y auditoría del HTML). Los casos funcionales 1 a 7 y el flujo completo del caso 8 siguen pendientes hasta integrar JavaScript.
- Repetir estas comprobaciones después de cada integración y antes de cada PR.
