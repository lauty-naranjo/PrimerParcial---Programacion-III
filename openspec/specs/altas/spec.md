# altas Specification

## Purpose
Define las reglas de validación y el resultado observable del alta de libros y del alta de clientes, incluidas las comprobaciones de duplicados y la actualización de las vistas dependientes.

## Requirements

### Requirement: R-04 Alta de libro validada

El alta de libro SHALL rechazar el registro cuando falta el título, falta el ISBN, el ISBN ya existe en el catálogo, el precio no es numérico o no es mayor que cero, no se seleccionó editorial, el género seleccionado no existe o no se seleccionó al menos un autor. Cuando la validación falla el libro MUST NOT incorporarse al catálogo.

#### Scenario: Título vacío
- **WHEN** el operador envía el formulario de libro sin título
- **THEN** se muestra «Ingresá el título.» junto al campo y el libro no se agrega

#### Scenario: ISBN duplicado
- **WHEN** el operador ingresa un ISBN que ya pertenece a otro libro
- **THEN** se muestra «Ya existe un libro con ese ISBN.» y el libro no se agrega

#### Scenario: Precio no positivo
- **WHEN** el operador ingresa un precio igual a cero o negativo
- **THEN** se muestra «El precio debe ser un número mayor que cero.» y el libro no se agrega

#### Scenario: Precio con más decimales que centavos
- **WHEN** el operador ingresa un precio con más de dos decimales
- **THEN** el precio se normaliza a dos decimales antes de guardarse

#### Scenario: Alta exitosa
- **WHEN** el operador completa todos los campos con datos válidos y envía el formulario
- **THEN** el libro aparece en la tabla de altas y en el catálogo sin recargar la página
- **AND** el formulario queda limpio con un mensaje de éxito

### Requirement: R-04 Alta de cliente validada

El alta de cliente SHALL rechazar el registro cuando falta el nombre, el email no tiene formato válido o el email ya pertenece a otro cliente, comparando sin distinguir mayúsculas de minúsculas y sin espacios externos.

#### Scenario: Email inválido
- **WHEN** el operador envía el formulario con un email sin formato válido
- **THEN** se muestra «Ingresá un email válido.» y el cliente no se agrega

#### Scenario: Email duplicado con distinta capitalización
- **WHEN** el operador ingresa un email que ya existe escrito con otras mayúsculas
- **THEN** se muestra «Ya existe un cliente con ese email.» y el cliente no se agrega

#### Scenario: Email con espacios externos
- **WHEN** el operador ingresa un email con espacios al inicio o al final
- **THEN** el email se guarda sin esos espacios

#### Scenario: Alta exitosa
- **WHEN** el operador ingresa nombre y email válidos
- **THEN** el cliente aparece en la tabla de clientes y en el selector de la vista de venta sin recargar la página
