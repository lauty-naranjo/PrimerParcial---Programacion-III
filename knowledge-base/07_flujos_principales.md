# Flujos Principales

## Flujo 1: Arranque de la aplicación

**Disparador**: `DOMContentLoaded`.
**Actor**: navegador.

1. `store.iniciar()` clona las semillas de `js/data.js` y las reemplaza por lo guardado en `localStorage` (o por las semillas si la clave no existe).
2. Cada módulo de vista ejecuta su `iniciar()`: cachea referencias del DOM, genera opciones de selectores y renderiza tablas.
3. `app.iniciarRouter()` marca el enlace activo según el hash.

**Casos de error**:
- `localStorage` inaccesible o con JSON inválido → se registra una advertencia y se continúa con las semillas.
- Contenido guardado que no es un array → se descarta, se restauran los ejemplos y se avisa por consola.

## Flujo 2: Alta de libro

**Disparador**: `submit` del formulario de libros.
**Actor**: bibliotecario.

1. `preventDefault()` y limpieza de errores previos.
2. Lectura del formulario: título (`trim`), ISBN (`trim`), precio, editorial, género (`''` → `null`), autores seleccionados.
3. `validarLibro()` compara el ISBN normalizado (sin espacios ni guiones) contra los libros existentes, valida precio numérico > 0, existencia de editorial/género/autores y al menos un autor.
4. Si hay errores: se marca cada campo con `aria-invalid`, se muestran los mensajes, se habilita el resumen `role="alert"` y el foco va al primer campo inválido.
5. Si es válido: se agrega el libro con el siguiente id `lN`, se persiste, se refrescan tabla y selector de venta, se resetea el formulario y se muestra el mensaje de éxito.

**Casos de error**: título vacío, ISBN vacío, ISBN duplicado, precio ≤ 0, sin autor, autor o editorial inexistente.

## Flujo 3: Alta de cliente

**Disparador**: `submit` del formulario de clientes.
**Actor**: bibliotecario.

1. `preventDefault()` y lectura de nombre y email con `trim`.
2. Validación de vacíos, formato de email y unicidad (`normalizarEmail` = `trim` + minúsculas).
3. Errores → mensajes por campo y foco en el primero.
4. Éxito → alta con id `cN`, persistencia, refresco de tabla y selector de venta, reset y mensaje.

**Casos de error**: campos vacíos, email sin formato, email duplicado en distinta capitalización.

## Flujo 4: Composición y confirmación de venta

**Disparador**: `submit` del formulario de venta (agregar renglón) y `click` en «Confirmar venta».
**Actor**: bibliotecario.

1. Agregar renglón: valida libro existente y cantidad entera > 0; si el libro ya está, suma la cantidad y avisa; si no, crea el renglón con el precio unitario actual del catálogo.
2. Editar cantidad: recalcula subtotal y total; una cantidad inválida se rechaza y se restaura el valor anterior.
3. Quitar renglón: elimina el renglón y recalcula.
4. Confirmar: exige cliente existente, al menos un renglón y cantidades válidas; genera `V-000N`, copia título/ISBN/precio unitario a cada renglón, calcula el total, persiste la venta, limpia el formulario, refresca el historial y muestra el mensaje con el id.

**Casos de error**: sin cliente, sin renglones, cantidad 0/negativa/decimal, libro eliminado del catálogo.

## Flujo 5: Consulta del historial

**Disparador**: `click` en «Ver detalle».
**Actor**: bibliotecario.

1. Se busca la venta por id en `Libreria.datos.ventas`.
2. Se completan título, fecha y cliente del detalle, y los renglones **desde la copia guardada**.
3. Se muestra la sección de detalle y el foco pasa a su título.

**Casos de error**: venta inexistente → no se muestra nada (sin excepción).

## Flujo 6: Recarga y persistencia

**Disparador**: recargar la página.
**Actor**: navegador.

1. `store.iniciar()` lee las tres claves; si existen arrays, los usa tal cual (sin re-sembrar).
2. Las tablas, el catálogo y los selectores se reconstruyen desde el estado recuperado.
3. El historial se reconstruye desde `libreria.v1.ventas` y el detalle queda oculto.

**Casos de error**: JSON corrupto → se restauran los ejemplos de esa clave y se continúa.
