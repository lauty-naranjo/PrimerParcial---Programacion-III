# Spec Delta — Ventas e historial

## ADDED Requirements

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
