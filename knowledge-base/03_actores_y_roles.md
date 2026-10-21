# Actores y Roles

## Actores del sistema

| Actor | Descripción | Cómo interactúa |
| --- | --- | --- |
| Cliente de librería | Persona ficticia registrada en el sistema | Es seleccionado en el formulario de venta; no opera la interfaz |
| Bibliotecario | Usuario que opera la aplicación | Registra libros y clientes, compone ventas y consulta el historial |
| Docente (evaluador) | Revisor de la consigna | Abre `index.html`, ejecuta los 8 casos manuales y revisa el README y el localStorage |

## RBAC — Matriz de permisos

No hay autenticación ni autorización: la consigna excluye el inicio de sesión real. La aplicación asume un único operador con acceso total. La tabla describe el alcance funcional efectivo, no un control de acceso implementado.

| Rol | Catálogo | Libros | Clientes | Ventas | Historial |
| --- | --- | --- | --- | --- | --- |
| Bibliotecario | Leer | Leer, crear | Leer, crear | Leer, crear, confirmar | Leer, ver detalle |
| Cliente | Leer | — | — | — | — |

Restricciones transversales:

- Las ventas confirmadas no se editan ni se eliminan desde la interfaz.
- Los libros y clientes no se editan ni se eliminan (la consigna sólo pide altas).
- Los únicos elementos eliminables son los renglones de una venta no confirmada.

## Rutas públicas

Todas las vistas son públicas. La navegación es por hash sobre un único documento:

| Vista | Hash | Sección |
| --- | --- | --- |
| Catálogo | `#catalogo` | `#catalogo` |
| Libros | `#libros` | `#libros` |
| Clientes | `#clientes` | `#clientes` |
| Ventas | `#ventas` | `#ventas` |
| Historial | `#historial` | `#historial` |

El router (`js/app.js`) marca el enlace activo con `aria-current="location"` y mueve el foco al `h2` de la vista en cada `hashchange`.
