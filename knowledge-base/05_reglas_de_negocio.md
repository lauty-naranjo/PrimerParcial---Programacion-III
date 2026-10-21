# Reglas de Negocio

Cada regla tiene un código `RN-{DOMINIO}-{NN}` para trazabilidad entre KB, specs y código.

## Dominio: Catálogo (RN-CAT)

- **RN-CAT-01**: El catálogo se genera desde el array de libros; ningún libro se escribe a mano en el HTML.
- **RN-CAT-02**: El filtro compara por coincidencia parcial del título.
- **RN-CAT-03**: El filtro no distingue mayúsculas de minúsculas.
- **RN-CAT-04**: El filtro elimina espacios sobrantes en los extremos de la búsqueda.
- **RN-CAT-05**: Una búsqueda vacía muestra el catálogo completo.
- **RN-CAT-06**: Una búsqueda sin coincidencias muestra un mensaje explícito y no deja la lista vacía sin explicación.
- **RN-CAT-07**: Un libro sin género se muestra como «Sin clasificar».
- **RN-CAT-08**: El filtro no normaliza acentos: la búsqueda se hace sobre el texto tal cual.

## Dominio: Libros (RN-LIB)

- **RN-LIB-01**: Título e ISBN son obligatorios.
- **RN-LIB-02**: El ISBN se compara sin espacios ni guiones; no se valida dígito de control.
- **RN-LIB-03**: No se admite un ISBN que ya exista en el conjunto local.
- **RN-LIB-04**: El precio debe ser numérico y mayor que cero; se redondea a centavos.
- **RN-LIB-05**: La editorial debe existir en los datos locales.
- **RN-LIB-06**: Se debe seleccionar al menos un autor, y todos los seleccionados deben existir.
- **RN-LIB-07**: El género es opcional; si se asigna, debe existir.
- **RN-LIB-08**: Un libro nuevo recibe el siguiente id `lN` disponible.

## Dominio: Clientes (RN-CLI)

- **RN-CLI-01**: Nombre completo y email son obligatorios; no hay campo de apellido separado.
- **RN-CLI-02**: El email debe tener formato válido (`usuario@dominio.tld`).
- **RN-CLI-03**: El email no puede repetirse; se compara con `trim` y sin distinguir mayúsculas.
- **RN-CLI-04**: El nombre se guarda con los espacios exteriores eliminados.
- **RN-CLI-05**: Un cliente nuevo recibe el siguiente id `cN` disponible.

## Dominio: Ventas (RN-VEN)

- **RN-VEN-01**: La venta requiere un cliente existente.
- **RN-VEN-02**: Cada renglón requiere un libro existente y una cantidad entera mayor que cero.
- **RN-VEN-03**: No se admiten libros repetidos en la misma venta: se actualiza la cantidad del renglón existente y se informa al usuario.
- **RN-VEN-04**: Antes de confirmar se pueden cambiar cantidades y quitar renglones.
- **RN-VEN-05**: `subtotal = cantidad × precioUnitario`; `total = suma de subtotales`; ambos redondeados a centavos.
- **RN-VEN-06**: Los importes se muestran con dos decimales y separador de miles (`es-AR`).
- **RN-VEN-07**: No se confirma sin cliente, sin renglones o con cantidades inválidas.
- **RN-VEN-08**: Al confirmar se persisten id, fecha, cliente, renglones y total.
- **RN-VEN-09**: El precio unitario se copia al renglón como valor histórico y el detalle del historial no lo relee del catálogo.
- **RN-VEN-10**: Las ventas confirmadas no se editan ni se eliminan desde la interfaz.
- **RN-VEN-11**: La confirmación limpia el formulario para una nueva venta y muestra un mensaje de resultado.

## Dominio: Persistencia (RN-PER)

- **RN-PER-01**: Libros, clientes y ventas se guardan en `localStorage` bajo las claves `libreria.v1.libros`, `libreria.v1.clientes` y `libreria.v1.ventas`.
- **RN-PER-02**: Los ejemplos se cargan sólo cuando la clave no existe.
- **RN-PER-03**: Al reabrir se recuperan los datos guardados sin duplicar los ejemplos.
- **RN-PER-04**: Un contenido guardado que no sea una lista se descarta y se restauran los ejemplos, sin romper la aplicación.
- **RN-PER-05**: Un fallo de `localStorage` no impide usar la aplicación: se registra una advertencia y se continúa con los datos en memoria.

## Excepciones globales

- **RN-GLB-01**: Todo dato escrito por el usuario se inserta en el DOM con `textContent`, nunca como HTML.
- **RN-GLB-02**: La aplicación no realiza peticiones de red ni carga recursos externos.
- **RN-GLB-03**: Los mensajes de error se expresan con texto y no dependen sólo del color.
