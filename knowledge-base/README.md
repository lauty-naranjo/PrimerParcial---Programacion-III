# TPI Librería — Base de Conocimiento

Base de conocimiento generada en modo **ingest** (`kb-creator` Mode A) a partir de:

- `docs/consigna-tpi.md` — consigna oficial (texto extraído de `Repaso Primer Parcial.pdf`, 7 páginas).
- `README.md` — documentación de entrega del proyecto.
- Código real: `index.html`, `css/*.css`, `js/*.js`.

## Índice de archivos

| Archivo | Contenido |
| --- | --- |
| [01_vision_y_objetivos.md](01_vision_y_objetivos.md) | Propósito, objetivos por actor, alcance v1.0, fuera de alcance y métricas |
| [02_descripcion_general.md](02_descripcion_general.md) | Stack, arquitectura de scripts, integraciones (ninguna), verificación |
| [03_actores_y_roles.md](03_actores_y_roles.md) | Actores, matriz de permisos efectiva, rutas públicas |
| [04_modelo_de_datos.md](04_modelo_de_datos.md) | Dominios, ERD, entidades, seed data, límites de localStorage |
| [05_reglas_de_negocio.md](05_reglas_de_negocio.md) | Reglas codificadas por dominio (RN-CAT, RN-LIB, RN-CLI, RN-VEN, RN-PER) |
| [06_funcionalidades.md](06_funcionalidades.md) | 10 historias de usuario por épica, con criterios de aceptación |
| [07_flujos_principales.md](07_flujos_principales.md) | Arranque, altas, venta, historial, recarga y manejo de errores |
| [08_arquitectura_propuesta.md](08_arquitectura_propuesta.md) | Patrones, estructura de directorios, seguridad, puntos de extensión |
| [09_decisiones_y_supuestos.md](09_decisiones_y_supuestos.md) | 5 decisiones de diseño y 3 supuestos inferidos |
| [10_preguntas_abiertas.md](10_preguntas_abiertas.md) | 4 inconsistencias detectadas y preguntas priorizadas |

## Quick start para desarrolladores

1. Entender el dominio → [01](01_vision_y_objetivos.md), [03](03_actores_y_roles.md)
2. Entender los datos → [04](04_modelo_de_datos.md)
3. Entender las reglas → [05](05_reglas_de_negocio.md)
4. Entender la arquitectura → [02](02_descripcion_general.md), [08](08_arquitectura_propuesta.md)
5. Implementar → [07](07_flujos_principales.md), [06](06_funcionalidades.md)
6. Antes de codificar → [10](10_preguntas_abiertas.md)

## Resumen ejecutivo

Frontend estático de una librería (HTML + CSS + JavaScript nativo) con catálogo filtrable, altas validadas de libros y clientes, venta simulada con renglones editables e historial inmutable, todo persistido en `localStorage`. No hay backend ni autenticación. El código está completo y verificado contra los 8 casos manuales de la consigna; los desvíos abiertos son documentales y de un detalle de cálculo en la confirmación de venta (`IN-01`, `IN-02`).
