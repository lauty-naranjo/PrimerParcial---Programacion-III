# ventas-e-historial Specification

## Purpose
Define la composición de una venta a partir de renglones, las validaciones previas a la confirmación, el cálculo de importes y el comportamiento inmutable del historial con su detalle.

## Requirements

### Requirement: R-05 Composición de renglones

La vista de venta SHALL permitir agregar un libro con una cantidad entera mayor que cero y SHALL rechazar la operación cuando no se seleccionó libro o la cantidad no es un entero positivo. Si el libro ya está en la venta, la cantidad MUST acumularse en el renglón existente en lugar de crear un renglón duplicado.

#### Scenario: Agregar un renglón
- **WHEN** el operador elige un libro, indica cantidad `2` y agrega
- **THEN** la venta muestra un renglón con ese libro, cantidad 2 y su subtotal

#### Scenario: Sin libro seleccionado
- **WHEN** el operador intenta agregar sin elegir un libro
- **THEN** se muestra «Seleccioná un libro.» y la venta no cambia

#### Scenario: Cantidad no válida
- **WHEN** el operador indica cantidad `0`, negativa o no entera
- **THEN** se muestra «La cantidad debe ser un número entero mayor que cero.» y la venta no cambia

#### Scenario: Libro repetido
- **WHEN** el operador agrega un libro que ya está en la venta
- **THEN** la cantidad del renglón existente se incrementa y aparece el aviso de que la cantidad se actualizó

#### Scenario: Quitar un renglón
- **WHEN** el operador quita un renglón
- **THEN** el renglón desaparece y los importes se recalculan

### Requirement: R-05 Cálculo y confirmación de la venta

Cada renglón SHALL mostrar su subtotal como cantidad por precio unitario, y la venta SHALL mostrar el total como la suma de los subtotales, formateado en moneda local con dos decimales. El precio unitario MUST ser el capturado al agregar el renglón y MUST NOT releerse del catálogo al confirmar. La confirmación MUST exigir un cliente seleccionado y al menos un renglón, y al registrarse MUST asignar un identificador correlativo con formato `V-000N`, una fecha y persistir la venta.

#### Scenario: Cálculo del total
- **WHEN** la venta contiene 2 unidades de un libro de `$ 1.500,00` y 1 unidad de un libro de `$ 2.000,00`
- **THEN** el total mostrado es `$ 5.000,00`

#### Scenario: Confirmación sin cliente
- **WHEN** el operador confirma sin cliente seleccionado
- **THEN** se muestra «Seleccioná un cliente para confirmar la venta.» y no se registra nada

#### Scenario: Confirmación sin renglones
- **WHEN** el operador confirma sin renglones
- **THEN** se muestra «Agregá al menos un renglón antes de confirmar la venta.» y no se registra nada

#### Scenario: Venta registrada
- **WHEN** el operador confirma una venta válida
- **THEN** se informa el identificador asignado (por ejemplo `V-0001`)
- **AND** la venta aparece en el historial y el formulario de venta queda vacío

#### Scenario: Precio capturado en el renglón
- **WHEN** el precio del libro cambia en el catálogo después de agregado el renglón y antes de confirmar la venta
- **THEN** el precio unitario y el subtotal persistidos corresponden al precio capturado al agregar el renglón
- **AND** el total de la venta se calcula con ese mismo precio

### Requirement: R-05 Historial inmutable

El historial SHALL listar las ventas registradas con identificador, fecha, cliente, cantidad de artículos y total, y SHALL permitir ver el detalle de los renglones. Los datos mostrados MUST provenir de la copia guardada en la venta y MUST NOT recalcularse contra el catálogo.

#### Scenario: Listado del historial
- **WHEN** existe una venta registrada
- **THEN** el historial muestra una fila con su identificador, fecha, cliente, artículos y total

#### Scenario: Detalle de una venta
- **WHEN** el operador activa «Ver detalle» de una venta
- **THEN** se muestran los renglones guardados (título, ISBN, precio unitario, cantidad y subtotal) y el total de esa venta

#### Scenario: Cambio posterior del catálogo
- **WHEN** el precio de un libro se modifica después de registrada la venta
- **THEN** el historial y su detalle siguen mostrando el precio y el subtotal originales

#### Scenario: Historial vacío
- **WHEN** no hay ventas registradas
- **THEN** el historial muestra un mensaje que indica que todavía no hay ventas

### Requirement: R-14 Resumen de la venta

El resumen de la venta SHALL mostrar la cantidad total de artículos y el total de la venta formateado en moneda local. El resumen MUST NOT mostrar una línea de subtotal general: el subtotal se define por renglón y el total es su suma.

#### Scenario: Resumen con renglones
- **WHEN** la venta contiene 2 unidades de un libro de `$ 1.500,00` y 1 unidad de un libro de `$ 2.000,00`
- **THEN** el resumen muestra 3 artículos y `$ 5.000,00` como total
- **AND** no existe una fila «Subtotal» en el resumen

#### Scenario: Resumen sin renglones
- **WHEN** la venta no tiene renglones
- **THEN** el resumen muestra 0 artículos y `$ 0,00`
- **AND** sigue sin existir una fila «Subtotal»

#### Scenario: Actualización al cambiar cantidades
- **WHEN** el operador cambia la cantidad de un renglón
- **THEN** el total del resumen se actualiza y el resumen sigue mostrando sólo artículos y total
