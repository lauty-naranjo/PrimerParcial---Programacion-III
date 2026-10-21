# Spec Delta — Presentación adaptable

## Purpose

Define la identidad visual del sitio, el uso de estilos externos y las condiciones de legibilidad y compatibilidad en los anchos y el entorno de ejecución exigidos por la cátedra.

## ADDED Requirements

### Requirement: R-02 Estilos externos y layout adaptable

La presentación SHALL definirse íntegramente en hojas de estilo externas, ordenadas por responsabilidad (base, layout, componentes), y MUST garantizar que la página no genere desplazamiento horizontal en anchos de 320 px y 1280 px.

#### Scenario: Ancho mínimo de 320 px
- **WHEN** la aplicación se renderiza con un viewport de 320 px de ancho
- **THEN** `document.documentElement.scrollWidth` es igual a `document.documentElement.clientWidth`

#### Scenario: Ancho de escritorio de 1280 px
- **WHEN** la aplicación se renderiza con un viewport de 1280 px de ancho
- **THEN** `document.documentElement.scrollWidth` es igual a `document.documentElement.clientWidth`

#### Scenario: Tabla ancha contenida
- **WHEN** el contenido de una tabla supera el ancho disponible en un viewport angosto
- **THEN** el desplazamiento horizontal ocurre dentro del contenedor de la tabla y no en la página

#### Scenario: Sin estilos en línea
- **WHEN** se inspecciona el HTML entregado
- **THEN** no hay atributos `style` ni bloques `style` en los documentos

### Requirement: R-08 Compatibilidad de ejecución

La aplicación SHALL funcionar al abrir `index.html` directamente desde el sistema de archivos, sin servidor, sin recursos de red y sin errores en la consola.

#### Scenario: Apertura por file://
- **WHEN** se abre `index.html` desde el sistema de archivos
- **THEN** las cinco vistas, los formularios y el historial quedan operativos
- **AND** no se registran errores de carga de recursos

#### Scenario: Consola limpia
- **WHEN** se recorre la aplicación ejecutando una venta completa
- **THEN** la consola no registra excepciones ni advertencias propias

#### Scenario: Foco visible
- **WHEN** el operador recorre los controles con la tecla Tab
- **THEN** el control enfocado muestra un indicador de foco perceptible
