# Verificación — Claridad del resumen de venta

**Fecha**: 21/10/2026
**Entorno**: Windows 10, Chrome 155.0.8059.85 (`--headless=new` + CDP), Node v20.18.0.

## 1. Ciclo TDD de R-14

Arnés: `harness-r14.py` (adjunto al change). Abre la aplicación por `file://` con perfil limpio, compone renglones y lee las filas del resumen, la tabla y el recorrido por teclado.

| Fase | Comando | Resultado |
| --- | --- | --- |
| RED | `python harness-r14.py` sobre el código original | 11/15 — el resumen declaraba `['Artículos', 'Subtotal', 'Total']` en los tres escenarios que exigen dos filas |
| GREEN | mismo arnés tras quitar la fila y su referencia | 15/15 PASS |
| REFACTOR | `grep venta-subtotal` en `js/`, `index.html` y `css/` | 0 referencias huérfanas |

Cambios aplicados:

```diff
  # index.html — resumen de la venta
- <div class="resumen__fila">
-   <dt>Subtotal</dt>
-   <dd id="venta-subtotal">$ 0,00</dd>
- </div>
  <div class="resumen__fila resumen__fila--total">
    <dt>Total</dt>
    <dd id="venta-total" aria-live="polite">$ 0,00</dd>
  </div>

  # js/sales.js — actualizarResumen y refs
- refs.subtotal.textContent = Libreria.utils.formatearPrecio(total);
  refs.total.textContent = Libreria.utils.formatearPrecio(total);
- subtotal: document.getElementById('venta-subtotal'),
```

### Evidencia por bloque

| Bloque | Comprobación | Observado |
| --- | --- | --- |
| A | Estado vacío | filas `['Artículos', 'Total']`, artículos `0`, total `$ 0,00` |
| B | 2 × `$ 1.500,00` + 1 × `$ 2.000,00` | 3 artículos, total `$ 5.000,00`, sin etiqueta «Subtotal» |
| C | Subtotal por renglón | cabeceras conservan «Precio unitario» y «Subtotal»; subtotales `$ 3.000,00` y `$ 2.000,00` |
| C | Cambio de cantidad a 3 | total `$ 6.500,00`, resumen sigue con dos filas |
| D | Teclado (caso 8) | primer `Tab` → «Saltar al contenido» con `outline: solid 3px`; segundo `Tab` → `#catalogo` |
| D | Consola | 0 excepciones |

## 2. Regresión completa

| Comprobación | Resultado |
| --- | --- |
| 8 casos del PDF con el arnés completo | 57/57 PASS |
| `node --check js/sales.js` | sin errores |
| Consola durante el recorrido | 0 errores, 0 advertencias |
| 320 px / 1280 px | `scrollWidth === clientWidth` |

## 3. Documentación

| Comprobación | Resultado |
| --- | --- |
| Bullet de funcionalidades | describe subtotal por renglón, total como suma y resumen con artículos y total |
| Tabla de comprobaciones | filas «Resumen de venta» y «Teclado y foco» agregadas con resultados observados |
