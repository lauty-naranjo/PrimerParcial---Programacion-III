# documentacion-de-entrega Specification

## Purpose
Define qué información debe contener el README que acompaña la entrega para que un tercero pueda ejecutar la aplicación, entender sus decisiones y auditar las comprobaciones realizadas.

## Requirements

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

### Requirement: R-12 Estructura del libro guardado

El README SHALL documentar la estructura del libro tal como se guarda en `libreria.v1.libros`, incluyendo todos sus campos y sus tipos, y SHALL explicar cómo ubicar y modificar el precio de un libro guardado para reproducir la comprobación del historial inmutable.

#### Scenario: Estructura del libro
- **WHEN** un lector busca en el README la estructura del libro guardado
- **THEN** encuentra un ejemplo con los campos `id`, `titulo`, `isbn`, `precio`, `editorialId`, `generoId` y `autorIds`
- **AND** cada campo está descripto con su tipo y su significado

#### Scenario: Reproducción del precio histórico
- **WHEN** un lector sigue los pasos del README para modificar el precio de un libro ya vendido
- **THEN** puede recargar la aplicación y comprobar que el historial conserva el precio y el subtotal originales de la venta

#### Scenario: Diferencia entre copia histórica y catálogo
- **WHEN** un lector revisa la documentación de los datos persistidos
- **THEN** el README distingue el precio vigente en el catálogo del precio copiado en el renglón de la venta
