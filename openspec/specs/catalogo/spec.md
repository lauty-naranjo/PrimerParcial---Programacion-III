# catalogo Specification

## Purpose
Define cómo se representan los libros y sus catálogos asociados, cómo se presentan en la vista de catálogo y cómo se filtra la lista por título.

## Requirements

### Requirement: R-03 Representación del catálogo

Cada libro SHALL identificarse con un id estable y SHALL exponer título, ISBN, precio, editorial, género y uno o más autores resueltos por id contra los catálogos asociados. Un libro sin género MUST mostrarse como «Sin clasificar».

#### Scenario: Catálogo inicial
- **WHEN** se abre la aplicación por primera vez
- **THEN** el catálogo lista los 6 libros de ejemplo

#### Scenario: Datos visibles de cada libro
- **WHEN** se observa una tarjeta del catálogo
- **THEN** se muestran título, ISBN, editorial, autores, género y precio formateado en moneda local

#### Scenario: Libro sin género
- **WHEN** un libro no tiene género asignado
- **THEN** la columna de género muestra «Sin clasificar»

#### Scenario: Precio con más de dos decimales
- **WHEN** el precio almacenado es `1234.567`
- **THEN** el catálogo lo muestra como `$ 1.234,57`

### Requirement: R-03 Filtro por título

La vista de catálogo SHALL filtrar por coincidencia parcial de título sin distinguir mayúsculas de minúsculas e ignorando espacios al inicio y al final de la consulta. El filtro MUST informar cuando no hay coincidencias y MUST restaurar la lista completa cuando la consulta queda vacía.

#### Scenario: Coincidencia ignorando mayúsculas
- **WHEN** el operador escribe `JARDÍN` en el filtro
- **THEN** el catálogo muestra sólo los libros cuyo título contiene «Jardín»

#### Scenario: Espacios sobrantes
- **WHEN** el operador escribe `  memoria  ` en el filtro
- **THEN** el catálogo muestra los libros cuyo título contiene «memoria»

#### Scenario: Coincidencia parcial
- **WHEN** el operador escribe `del`
- **THEN** el catálogo muestra todos los libros cuyo título contiene «del»

#### Scenario: Sin coincidencias
- **WHEN** el operador escribe `zzz`
- **THEN** el catálogo no muestra filas y aparece un mensaje que indica que no hay resultados

#### Scenario: Consulta vacía
- **WHEN** el operador borra el contenido del filtro
- **THEN** el catálogo vuelve a listar todos los libros
