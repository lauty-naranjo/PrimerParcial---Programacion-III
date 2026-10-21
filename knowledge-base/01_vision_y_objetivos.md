# Visión y Objetivos

## Propósito del sistema

Frontend de una librería que presenta su catálogo y registra libros, clientes y ventas simuladas.

Es el Trabajo Práctico Integrador de **Programación III** (Tecnicatura Universitaria en Programación a Distancia). Desarrolla exclusivamente el frontend: los datos y las operaciones se simulan en el navegador, sin backend, API ni base de datos.

## Objetivos por actor

| Actor | Objetivo principal | Objetivos secundarios |
| --- | --- | --- |
| Cliente de librería | Consultar el catálogo y encontrar un libro por título | Ver ISBN, editorial, género, autores y precio de cada libro |
| Bibliotecario | Registrar libros, clientes y ventas | Componer renglones, revisar el total y consultar el historial |
| Docente (evaluador) | Verificar el cumplimiento de la consigna | Reproducir los 8 casos manuales y comprobar el precio histórico |

## Alcance v1.0

- Cinco vistas navegables por ancla: Catálogo, Libros, Clientes, Ventas e Historial.
- Catálogo generado por JavaScript desde datos locales, con filtro por título.
- Alta de libros con validación de ISBN único, precio y relaciones.
- Alta de clientes con validación de email único y formato.
- Venta simulada con renglones editables, cálculos y confirmación.
- Historial de ventas inmutable con detalle por venta.
- Persistencia en `localStorage` con carga de ejemplos en el primer inicio.
- Diseño adaptable a 320 px y 1280 px, foco visible y navegación por teclado.

## Fuera de alcance

- Backend, API REST, base de datos y conexión con el TP backend.
- Inicio de sesión real y control de acceso.
- Gestión de stock, cobros y facturación fiscal.
- Altas, bajas y modificaciones de editoriales, géneros y autores.
- Edición o eliminación de libros, clientes y ventas confirmadas.
- Librerías, frameworks, CDNs, bundlers y dependencias instaladas.
- Imágenes externas y recursos de terceros.

## Métricas de éxito

| Métrica | Criterio | Evidencia |
| --- | --- | --- |
| Casos manuales del PDF | 8 de 8 con resultado observado registrado | `README.md` § Casos manuales |
| Errores de consola | 0 en cargas, altas, ventas y recarga | Verificación headless 21/10/2026 |
| Adaptación | Sin desplazamiento horizontal de página a 320 px y 1280 px | Verificación headless 21/10/2026 |
| Precio histórico | El detalle conserva los importes confirmados tras cambiar el catálogo | Caso 6 del PDF |

## Referencias

- `docs/consigna-tpi.md` — consigna oficial (texto extraído de `Repaso Primer Parcial.pdf`).
- `README.md` — documentación de entrega del proyecto.
