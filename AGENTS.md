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
- Existe: `index.html` semántico con las cinco secciones, navegación por hash y estados vacíos; `README.md` esqueleto.
- No existe todavía: `css/`, `js/`, persistencia, altas, ventas ni historial.
- Próximo paso: commit 2, rama `feat/datos-formularios` de Lautaro (`js/data.js`, `js/store.js`, `js/utils.js`).

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
