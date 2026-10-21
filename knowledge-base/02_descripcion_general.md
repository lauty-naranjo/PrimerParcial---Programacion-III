# Descripción General

## Stack tecnológico

| Capa | Tecnologías | Versión mínima | Notas |
| --- | --- | --- | --- |
| Estructura | HTML5 | Navegador actual | `index.html` único, cinco secciones |
| Estilos | CSS3 (custom properties, Grid, Flexbox) | Navegador actual | Tres archivos externos |
| Lógica | JavaScript nativo (ES2020+) | Navegador actual | Scripts clásicos, sin módulos ES |
| Persistencia | `localStorage` | Navegador actual | Tres claves `libreria.v1.*` |
| Formato | `Intl.NumberFormat('es-AR')` | Navegador actual | Importes con dos decimales |

Sin frameworks, sin librerías, sin CDN, sin `fetch`, sin bundler y sin dependencias instaladas. El proyecto se abre con doble clic sobre `index.html` (`file://`); no requiere servidor.

## Arquitectura general

Nueve scripts clásicos que se registran sobre un namespace global único. Cada archivo es una IIFE con `'use strict'` que publica su API en `window.Libreria`.

```
index.html
  └── scripts (orden de carga)
        data.js    → Libreria.datos (semillas)
        utils.js   → Libreria.utils (normalización, formato, ids)
        store.js   → Libreria.store (localStorage)
        catalog.js → Libreria.catalogo
        books.js   → Libreria.libros      ─┬─ ambos escriben el mismo DOM
        clients.js → Libreria.clientes     │  y refrescan los selectores
        sales.js   → Libreria.ventas      ─┤
        history.js → Libreria.historial   ─┘
        app.js     → arranque + router por hash
```

**Justificación de alto nivel**: el orden de carga expresa las dependencias (`data` antes que `store`, `utils` antes que todos los módulos de vista) y evita cualquier herramienta de build. El estado vive en `Libreria.datos` y el DOM se regenera desde ese estado; no hay estado duplicado en el DOM.

## Integraciones externas

Ninguna. No hay llamadas de red, servicios de terceros, SDKs ni webhooks. Todos los recursos (CSS y JS) son locales.

## API REST

No aplica: el alcance excluye backend y API. La forma de los datos persistidos se documenta en `04_modelo_de_datos.md`.

## Verificación

La aplicación se verificó con Chrome headless (21/10/2026): DOM renderizado, flujos completos, persistencia y anchos de 320 px y 1280 px. Resultados en `README.md` § Comprobaciones realizadas.
