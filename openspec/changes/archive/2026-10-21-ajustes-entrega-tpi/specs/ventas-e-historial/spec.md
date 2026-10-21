# Spec Delta — Ventas e historial

## MODIFIED Requirements

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
