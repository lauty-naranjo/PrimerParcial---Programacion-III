# AGENTS.md — TPI Librería (Frontend)

Instrucciones específicas de este proyecto. No repite las reglas globales del stack.

## Contexto

Frontend estático de una librería: catálogo filtrable, altas de libros y clientes, venta simulada e historial inmutable con persistencia en `localStorage`. Es el Trabajo Práctico Integrador de **Programación III** y se evalúa contra `docs/consigna-tpi.md` (texto de `Repaso Primer Parcial.pdf`).

## Mapa de navegación

| Necesidad | Documento |
| --- | --- |
| Alcance, objetivos y criterios de éxito | `knowledge-base/01_vision_y_objetivos.md` |
| Stack y arquitectura de scripts | `knowledge-base/02_descripcion_general.md` |
| Entidades, ids y claves de storage | `knowledge-base/04_modelo_de_datos.md` |
| Reglas de negocio codificadas (RN-*) | `knowledge-base/05_reglas_de_negocio.md` |
| Historias de usuario y criterios | `knowledge-base/06_funcionalidades.md` |
| Flujos y manejo de errores | `knowledge-base/07_flujos_principales.md` |
| Patrones y estructura de carpetas | `knowledge-base/08_arquitectura_propuesta.md` |
| Decisiones y supuestos | `knowledge-base/09_decisiones_y_supuestos.md` |
| Deuda conocida | `knowledge-base/10_preguntas_abiertas.md` |
| Changes y orden de trabajo | `CHANGES.md` |
| Skills y reglas compactas | `.atl/skill-registry.md` |

## Reglas duras

### Stack

1. **Sólo HTML, CSS y JavaScript nativo.** Prohibido: frameworks, librerías, CDNs, `fetch`, bundlers, transpiladores, npm en el entregable.
2. **La aplicación debe funcionar abriendo `index.html` con doble clic** (`file://`). Si un cambio exige servidor, está mal.
3. **Nueve scripts clásicos** (`data`, `utils`, `store`, `catalog`, `books`, `clients`, `sales`, `history`, `app`) cargados en ese orden exacto al final del `body`. No usar `<script type="module">`.
4. **Tres hojas de estilo** (`base.css`, `layout.css`, `components.css`). Sin estilos inline y sin recursos externos.
5. **Sin imágenes externas.** Si alguna vez se agrega una local, documentar origen y licencia en el README.

### Código

6. Cada archivo de `js/` es una **IIFE con `'use strict'`** que publica su API en `window.Libreria`. No crear variables globales sueltas.
7. **Todo dato proveniente del usuario o de `localStorage` se inserta con `textContent`.** Prohibido `innerHTML`, `outerHTML`, `insertAdjacentHTML` y `document.write`.
8. **Identificadores, textos de interfaz y comentarios en español.** Sin emojis en el código ni en la documentación.
9. **El estado vive en `Libreria.datos`.** El DOM se regenera desde el estado; no guardar datos en atributos del DOM.
10. **Contrato estable**: ids `lN`, `cN`, `V-000N`; claves `libreria.v1.libros`, `libreria.v1.clientes`, `libreria.v1.ventas`. Cambiarlo exige un change aprobado y actualizar el README.
11. **La venta guarda copia histórica** del título, ISBN, precio unitario y subtotal. El historial nunca relee precios del catálogo.

### Proceso

12. **Ningún cambio en `index.html`, `css/` o `js/` sin un change OpenSpec aprobado** (`openspec new change` → `proposal` → `specs` → `design` → `tasks` → apply → archive).
13. **Toda tarea se cierra con evidencia**: comando ejecutado y resultado. No declarar un caso aprobado sin haberlo ejecutado.
14. **No ampliar alcance.** Si aparece una necesidad nueva, registrarla en `knowledge-base/10_preguntas_abiertas.md` y proponer un change.
15. **No inventar** requisitos, comportamientos ni resultados de verificación.

## Verificación obligatoria antes de cerrar cualquier tarea

1. `node --check` sobre cada archivo de `js/` modificado.
2. Recorrido en navegador con los casos afectados del PDF (los 8 completos si el cambio toca ventas, persistencia o README).
3. Consola limpia: 0 errores y 0 warnings propios.
4. Anchos de 320 px y 1280 px sin desplazamiento horizontal de página (`document.documentElement.scrollWidth === clientWidth`).
5. Actualizar la tabla de «Comprobaciones realizadas» del `README.md` con la fecha y el método reales.

## Entrega

El paquete para la cátedra contiene **sólo** `index.html`, `css/`, `js/` y `README.md`. `openspec/`, `knowledge-base/`, `docs/`, `.atl/`, `AGENTS.md`, `CHANGES.md` y `.active-orchestrator-state.json` son tooling y se excluyen con `.gitattributes` (`export-ignore`). Generar con:

```
git archive --format=zip -o tpi-libreria.zip HEAD
```

## Comandos útiles

```
openspec list --json
openspec status --change "<nombre>" --json
openspec validate "<nombre>"
openspec archive "<nombre>"
node --check js/sales.js
```
