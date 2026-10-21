# Spec Delta — Interfaz y navegación

## Purpose

Define las cinco vistas de la aplicación, cómo se navega entre ellas sin recargar y qué estructura semántica debe tener cada una para ser operable con teclado y lector de pantalla.

## ADDED Requirements

### Requirement: R-01 Vistas y navegación

La aplicación SHALL presentar sus cinco secciones —catálogo, alta de libros, alta de clientes, venta e historial— en un único documento, navegables desde una barra superior mediante enlaces de ancla sin recargar la página. Al navegar, el enlace de la sección destino MUST quedar marcado como actual y el foco MUST trasladarse al título de esa sección.

#### Scenario: Navegación entre secciones
- **WHEN** el operador activa el enlace «Clientes» de la barra de navegación
- **THEN** la URL queda con el fragmento `#clientes` y la sección de clientes queda alineada en la ventana
- **AND** el enlace «Clientes» queda marcado con `aria-current="location"` y los demás enlaces no

#### Scenario: Acceso directo a una sección por ancla
- **WHEN** se abre la aplicación con el fragmento `#historial` en la URL
- **THEN** el enlace «Historial» aparece marcado como actual desde la carga inicial

#### Scenario: Sin fragmento
- **WHEN** se abre la aplicación sin fragmento en la URL
- **THEN** el enlace «Catálogo» aparece marcado como actual

#### Scenario: Foco tras la navegación
- **WHEN** el operador activa un enlace de la barra
- **THEN** el foco se ubica en el encabezado de la sección destino

### Requirement: R-01 Estructura semántica operable

Cada vista SHALL declarar un encabezado propio, cada control de formulario SHALL tener una etiqueta asociada, y cada tabla SHALL tener celdas de encabezado que identifiquen sus columnas.

#### Scenario: Etiquetas de formulario
- **WHEN** se inspecciona el formulario de alta de libro
- **THEN** cada campo de entrada tiene un elemento `label` asociado por `for`/`id`

#### Scenario: Encabezados de tabla
- **WHEN** se inspecciona la tabla del listado de libros
- **THEN** sus columnas («Título», «ISBN», «Editorial», «Género», «Autores», «Precio») están declaradas con celdas `th`

#### Scenario: Mensaje de error anunciado
- **WHEN** un alta falla la validación
- **THEN** el mensaje de error se muestra en texto visible y el control inválido queda marcado con `aria-invalid="true"`
