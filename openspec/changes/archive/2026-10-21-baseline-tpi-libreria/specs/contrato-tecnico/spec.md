# Spec Delta — Contrato técnico

## Purpose

Fija las restricciones tecnológicas de la entrega, el contrato de módulos e identificadores que otros artefactos consumen, y los límites de alcance que no deben cruzarse.

## ADDED Requirements

### Requirement: R-09 Alcance tecnológico permitido

La entrega SHALL componerse únicamente de HTML, CSS y JavaScript nativo, y MUST NOT incluir frameworks, librerías, recursos de red, `fetch`, bundlers ni transpiladores. Cada módulo de `js/` MUST ser una función autoejecutable en modo estricto que publique su API en un espacio de nombres único.

#### Scenario: Sin dependencias externas
- **WHEN** se inspecciona `index.html`
- **THEN** no hay referencias a dominios externos, ni etiquetas `script` con `src` remoto, ni hojas de estilo externas

#### Scenario: Sin construcción
- **WHEN** se abre la aplicación desde el sistema de archivos
- **THEN** funciona sin compilación, sin empaquetado y sin variables de entorno

#### Scenario: Contrato de módulos
- **WHEN** se inspecciona cualquier archivo de `js/`
- **THEN** contiene una función autoejecutable con `'use strict'` que publica su API en `window.Libreria`

#### Scenario: Inserción segura de texto
- **WHEN** se busca en el código la asignación de contenido dinámico
- **THEN** los datos provenientes del usuario o del almacenamiento se insertan con `textContent` y no con `innerHTML`

### Requirement: R-10 Contrato de identificadores y claves

Los identificadores de dominio SHALL respetar el formato `lN` para libros, `cN` para clientes y `V-000N` para ventas, y SHALL ser únicos dentro de su entidad. Las claves de almacenamiento MUST conservar el prefijo de versión `libreria.v1.`.

#### Scenario: Identificador de libro
- **WHEN** se da de alta un libro sobre un catálogo que llega hasta `l6`
- **THEN** el nuevo libro recibe el identificador `l7`

#### Scenario: Identificador de cliente
- **WHEN** se da de alta un cliente sobre una lista que llega hasta `c3`
- **THEN** el nuevo cliente recibe el identificador `c4`

#### Scenario: Identificador de venta
- **WHEN** se confirma la primera venta
- **THEN** recibe el identificador `V-0001`

#### Scenario: Claves versionadas
- **WHEN** se inspecciona el almacenamiento local
- **THEN** las claves usadas son exactamente `libreria.v1.libros`, `libreria.v1.clientes` y `libreria.v1.ventas`

### Requirement: R-11 Alcance cerrado

La entrega MUST NOT implementar capacidades no solicitadas: no hay backend, no hay autenticación, no hay operaciones de modificación o baja sobre libros, clientes o ventas, y no hay dependencias de infraestructura.

#### Scenario: Sin operaciones fuera de alcance
- **WHEN** se relevan las acciones disponibles en las cinco vistas
- **THEN** sólo existen altas de libros y clientes, alta de venta y consulta de historial; no hay edición ni borrado de registros

#### Scenario: Sin red
- **WHEN** se ejecuta la aplicación con la red deshabilitada
- **THEN** todas las vistas y flujos funcionan igual

#### Scenario: Sin autenticación
- **WHEN** se abre la aplicación
- **THEN** no se solicita inicio de sesión ni credencial alguna
