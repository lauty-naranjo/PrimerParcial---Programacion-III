# Spec Delta — Documentación de entrega

## Purpose

Define qué información debe contener el README que acompaña la entrega para que un tercero pueda ejecutar la aplicación, entender sus decisiones y auditar las comprobaciones realizadas.

## ADDED Requirements

### Requirement: R-07 Contenido mínimo del README

El README SHALL documentar la descripción de la aplicación, los pasos para ejecutarla sin servidor, la estructura de archivos entregados, las decisiones de diseño relevantes, el formato de los datos persistidos y el registro de comprobaciones.

#### Scenario: Instrucciones de ejecución
- **WHEN** un lector abre el README
- **THEN** encuentra la instrucción de abrir `index.html` con doble clic y la aclaración de que no requiere servidor ni instalación

#### Scenario: Estructura entregada
- **WHEN** un lector abre el README
- **THEN** encuentra el árbol de archivos con la función de `index.html`, de las tres hojas de estilo y de los módulos de `js/`

#### Scenario: Formato persistido
- **WHEN** un lector abre el README
- **THEN** encuentra las tres claves de almacenamiento y la estructura de la venta guardada

#### Scenario: Decisiones documentadas
- **WHEN** un lector abre el README
- **THEN** encuentra las decisiones de diseño tomadas y las limitaciones conocidas

### Requirement: R-07 Registro honesto de comprobaciones

El README SHALL incluir una tabla de comprobaciones realizadas con el caso, el resultado esperado, el resultado observado, la fecha y el método de verificación. Cada caso declarado aprobado MUST haber sido ejecutado.

#### Scenario: Tabla de comprobaciones
- **WHEN** un lector revisa la tabla de comprobaciones
- **THEN** cada fila indica caso, resultado esperado, resultado observado, fecha y método

#### Scenario: Casos de la consigna
- **WHEN** un lector cuenta las filas correspondientes a los casos del PDF
- **THEN** encuentra los 8 casos identificados y su resultado

#### Scenario: Sin afirmaciones no verificadas
- **WHEN** un caso no fue ejecutado
- **THEN** la tabla no lo declara aprobado
