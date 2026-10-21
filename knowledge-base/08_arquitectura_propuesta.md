# Arquitectura Propuesta

## Patrones aplicados

| Patrón | Dónde se usa | Por qué |
| --- | --- | --- |
| Módulo IIFE con `'use strict'` | Los 9 archivos de `js/` | Encapsula estado privado sin módulos ES ni bundler |
| Namespace único (`window.Libreria`) | Todos los módulos | Punto de composición explícito y orden de carga legible |
| Render desde estado | `catalog`, `books`, `clients`, `sales`, `history` | Una sola fuente de verdad (`Libreria.datos`); el DOM se regenera |
| Delegación de eventos | Tabla de renglones e historial | Evita re-registrar listeners cuando el DOM se reemplaza |
| Funciones de validación puras | `validarLibro`, `validarCliente` | Testeables y reutilizables; el DOM sólo presenta el resultado |
| Normalización en `utils` | Búsqueda, ISBN, email, importes, fechas, ids | Evita duplicar reglas entre módulos |
| Persistencia tolerante a fallos | `store` | La aplicación sigue funcionando si `localStorage` falla |

## Estructura de directorios

```
proyecto/
├── index.html
├── README.md
├── css/
│   ├── base.css          # variables, reset, tipografía, utilidades, foco
│   ├── layout.css        # contenedor, cabecera, grillas y media queries
│   └── components.css    # tarjetas, formularios, botones, tablas, mensajes
├── js/
│   ├── data.js           # semillas (libros, editoriales, géneros, autores, clientes)
│   ├── utils.js          # normalización, formato, índices, ids, selectores
│   ├── store.js          # localStorage
│   ├── catalog.js        # render del catálogo, filtro y estados
│   ├── books.js          # alta, validación, tabla y selector de venta
│   ├── clients.js        # alta, validación, tabla y selector de venta
│   ├── sales.js          # renglones, cálculos, confirmación
│   ├── history.js        # historial y detalle
│   └── app.js            # arranque y router por hash
├── docs/                 # fuentes del proyecto (consigna)
├── knowledge-base/       # esta base de conocimiento
└── openspec/             # especificaciones y changes (SDD)
```

El entregable de la cátedra son sólo `index.html`, `css/`, `js/` y `README.md`; el resto es tooling de proceso y se excluye del paquete con `.gitattributes` (`export-ignore`).

## Orden de carga

El orden en `index.html` es contractual: `data → utils → store → catalog → books → clients → sales → history → app`. Un módulo puede asumir que los anteriores ya publicaron su API. `app.js` debe ser el último porque arranca todo en `DOMContentLoaded`.

## Seguridad

- **Autenticación**: no existe (fuera de alcance).
- **Autorización**: no existe; un único operador.
- **Validación de entrada**: en el borde del formulario (`validarLibro`, `validarCliente`, validación de renglones), antes de tocar el estado.
- **Inyección de contenido**: todo dato se inserta con `textContent`; no se usa `innerHTML` en ningún archivo.
- **Confianza en el almacenamiento**: `localStorage` es editable por el usuario; se trata como dato no confiable y su contenido se valida por forma (array) antes de usarse.
- **Secretos**: no hay credenciales ni claves.

## Rendimiento

- Sin red: todos los recursos son locales.
- El re-render completo de tablas es aceptable para el volumen del TP (decenas de filas).
- `Intl.NumberFormat` se instancia una sola vez en `utils.js`.

## Variables de entorno

No aplica. La aplicación no lee configuración externa.

## Puntos de extensión (no implementados)

- Cambiar `store` por una capa de API mantiene intactos los módulos de vista.
- Los ids estables (`lN`, `cN`, `V-000N`) y las claves versionadas (`libreria.v1.*`) permiten migraciones futuras.
- La separación validación/dom permite agregar edición y borrado sin reescribir las vistas.
