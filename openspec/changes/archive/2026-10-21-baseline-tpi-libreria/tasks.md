# Tasks — Baseline del TPI Librería

## 1. Especificación

- [x] 1.1 Verificar que las 8 capacidades del proposal tienen su `specs/<capacidad>/spec.md` y que `openspec validate baseline-tpi-libreria` pasa
- [x] 1.2 Verificar que los requisitos R-01 a R-11 aparecen en las specs y que cada uno tiene al menos un escenario
- [x] 1.3 Verificar que cada escenario de venta, catálogo y persistencia es observable desde la interfaz

## 2. Verificación estática

- [x] 2.1 Ejecutar `node --check` sobre los 9 archivos de `js/` y confirmar 0 errores de sintaxis
- [x] 2.2 Buscar `innerHTML`, `outerHTML`, `insertAdjacentHTML`, `document.write`, `fetch(`, `http://` y `https://` en `js/` e `index.html` y confirmar 0 coincidencias
- [x] 2.3 Confirmar en `index.html` el orden exacto de las tres hojas de estilo y de los nueve scripts, y que no hay `<script type="module">` ni atributos `style`

## 3. Verificación funcional en navegador

- [x] 3.1 Caso 1 — Abrir `index.html` por `file://` y confirmar que las cinco secciones cargan y que la navegación por ancla marca el enlace actual y mueve el foco
- [x] 3.2 Caso 2 — Alta de libro con precio `1234.567` y confirmar que el catálogo muestra `$ 1.234,57` y el id asignado es `l7`
- [x] 3.3 Caso 3 — Enviar el formulario de libro vacío, con ISBN duplicado y con precio `0`, y confirmar los tres mensajes de error sin alta
- [x] 3.4 Caso 4 — Alta de cliente con email válido y con email duplicado en distinta capitalización, y confirmar alta y rechazo respectivamente
- [x] 3.5 Caso 5 — Componer una venta con 2 unidades de `$ 1.500,00` y 1 de `$ 2.000,00` (total `$ 5.000,00`), acumular un renglón repetido (total `$ 6.500,00`) y confirmar la venta `V-0001`
- [x] 3.6 Caso 6 — Ver el detalle de la venta, cambiar el precio en el catálogo, recargar y confirmar que el historial conserva precio y total originales
- [x] 3.7 Caso 7 — Recargar la página y confirmar 7 libros, 4 clientes, 1 venta y ausencia de duplicados
- [x] 3.8 Caso 8 — Medir `scrollWidth === clientWidth` a 320 px y 1280 px, y confirmar 0 errores y 0 advertencias propias en consola

## 4. Cierre

- [x] 4.1 Registrar la evidencia (fecha, método, resultado por caso) en `verification.md` dentro del change
- [x] 4.2 Ejecutar `openspec validate baseline-tpi-libreria` y confirmar salida válida
- [x] 4.3 Archivar el change y confirmar que `openspec/specs/` contiene las 8 capacidades
