# Verificación — Ajustes de entrega del TPI

**Fecha**: 21/10/2026
**Entorno**: Windows 10, Chrome 155.0.8059.85 (`--headless=new` + CDP), Node v20.18.0, Git 2.x.

## 1. Red de seguridad (antes de tocar código)

| Comprobación | Resultado |
| --- | --- |
| 8 casos del PDF sobre el estado previo | 57/57 PASS |

## 2. Ciclo TDD de R-13

Arnes: `harness-r13.py` (adjunto a este change). Abre la aplicación por `file://` con perfil limpio, agrega renglones, modifica el precio del catálogo antes de confirmar y lee la venta persistida.

| Fase | Comando | Resultado |
| --- | --- | --- |
| RED | `python harness-r13.py` sobre el código original | 2/10 PASS — `precioUnitario 9999` en lugar de `1500`, subtotal `19998`, total `19998`; caso B persistió `500` en lugar de `2000`; caso C persistió `12000` en lugar de `4500` mientras la pantalla mostraba `$ 4.500,00` |
| GREEN | mismo arnés tras el cambio de una línea en `js/sales.js` | 10/10 PASS |
| TRIANGULAR | casos B (precio decreciente) y C (cambio de cantidad posterior) incluidos en el mismo arnés | PASS |
| REFACTOR | revisión de `confirmarVenta` | sin usos restantes de `libro.precio` en la confirmación; el redondeo se mantiene sobre el valor del renglón |

Cambio aplicado (`js/sales.js`, `confirmarVenta`):

```diff
- const precioUnitario = Libreria.utils.redondearCentavos(libro.precio);
+ const precioUnitario = Libreria.utils.redondearCentavos(renglon.precioUnitario);
```

### Evidencia por caso del arnés

| Caso | Escenario | Observado |
| --- | --- | --- |
| A | Precio sube de 1500 a 9999 después de agregar 2 unidades | `precioUnitario 1500`, `subtotal 3000`, `total 3000` |
| B | Precio baja de 2000 a 500 después de agregar 1 unidad | `precioUnitario 2000`, `subtotal 2000` |
| C | Precio sube de 1500 a 4000 y luego la cantidad pasa a 3 | pantalla `$ 4.500,00`; persistido `precioUnitario 1500`, `subtotal 4500` |
| D | Detalle de la venta tras los cambios de precio | muestra `$ 1.500,00`, no `$ 9.999,00`; 0 excepciones |

## 3. Regresión completa (después del cambio)

| Comprobación | Resultado |
| --- | --- |
| 8 casos del PDF con el arnés completo | 57/57 PASS |
| `node --check js/sales.js` | sin errores |
| Consola durante el recorrido | 0 excepciones, 0 errores, 0 advertencias |
| 320 px / 1280 px | `scrollWidth === clientWidth` en ambos anchos |

## 4. R-12 — README

| Comprobación | Resultado |
| --- | --- |
| Estructura del libro guardado | documentada con ejemplo y tabla de los 7 campos (`id`, `titulo`, `isbn`, `precio`, `editorialId`, `generoId`, `autorIds`) |
| Diferencia catálogo vs. copia histórica | explicitada en el texto que sigue a la estructura del libro |
| Paso a paso de reproducción | referencia el campo `precio` de `libreria.v1.libros` y prohíbe tocar `libreria.v1.ventas` |
| Pasos reproducidos literalmente | se editó `precio` de `l1` a `9999` en `libreria.v1.libros`, se recargó y el detalle conservó `$ 1.500,00` y el total original |

## 5. Empaquetado

Comando ejecutado con un índice temporal (`GIT_INDEX_FILE` en `%TEMP%`) para no alterar el índice real ni requerir un commit:

```
git read-tree HEAD
git add -A
git write-tree            # 39fe9ecc...
git archive --format=zip -o tpi-libreria.zip 39fe9ecc...
```

Contenido del paquete (16 entradas, 4 destinos):

```
README.md
css/  css/base.css  css/components.css  css/layout.css
index.html
js/  js/app.js  js/books.js  js/catalog.js  js/clients.js
    js/data.js  js/history.js  js/sales.js  js/store.js  js/utils.js
```

No aparecen `openspec/`, `knowledge-base/`, `docs/`, `.atl/`, `.opencode/`, `AGENTS.md`, `CHANGES.md` ni `.active-orchestrator-state.json`.

## 6. Cobertura no incluida

- `IN-03` («Subtotal» y «Total» con el mismo valor en el resumen de venta): cosmético, fuera de alcance por decisión del equipo; queda en `knowledge-base/10_preguntas_abiertas.md`.
- `R-14`: descartado en el plan.
