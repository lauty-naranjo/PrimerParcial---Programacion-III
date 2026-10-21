# Spec Delta — Persistencia

## Purpose

Define qué se guarda en el almacenamiento local del navegador, cómo se recupera al iniciar y cómo responde la aplicación cuando los datos guardados no son utilizables.

## ADDED Requirements

### Requirement: R-06 Carga inicial de ejemplos

En la primera ejecución, cuando no existe estado guardado, la aplicación SHALL inicializar el almacenamiento con los datos de ejemplo y MUST guardarlos para las ejecuciones siguientes.

#### Scenario: Primera ejecución
- **WHEN** se abre la aplicación sin datos previos en el almacenamiento
- **THEN** el catálogo lista 6 libros, la vista de clientes lista 3 clientes y el historial no tiene ventas

#### Scenario: Claves de almacenamiento
- **WHEN** se inspecciona el almacenamiento local después de la primera ejecución
- **THEN** existen las claves `libreria.v1.libros`, `libreria.v1.clientes` y `libreria.v1.ventas` con arreglos serializados

### Requirement: R-06 Recuperación sin duplicados

Al iniciar, la aplicación SHALL leer el estado guardado y MUST NOT volver a incorporar los datos de ejemplo cuando ya existen registros, conservando las altas y ventas de la sesión anterior.

#### Scenario: Recarga después de operar
- **WHEN** el operador agregó un libro, agregó un cliente y confirmó una venta, y luego recarga la página
- **THEN** el catálogo lista 7 libros, la vista de clientes lista 4 clientes y el historial muestra la venta registrada
- **AND** no aparecen registros duplicados

#### Scenario: Integridad del vínculo en el historial
- **WHEN** se recarga la página con ventas registradas
- **THEN** el detalle de cada venta sigue mostrando los datos guardados en la venta

### Requirement: R-06 Tolerancia a datos no utilizables

Si el contenido guardado no tiene la forma esperada o el almacenamiento no está disponible, la aplicación SHALL continuar operativa con el estado inicial y MUST NOT interrumpir la ejecución con una excepción no controlada.

#### Scenario: Contenido corrupto
- **WHEN** una clave de almacenamiento contiene un valor que no es un arreglo válido
- **THEN** la aplicación arranca con el estado inicial y registra o informa la condición sin romper la interfaz

#### Scenario: Almacenamiento bloqueado
- **WHEN** el navegador rechaza la escritura en el almacenamiento local
- **THEN** la aplicación sigue permitiendo operar en memoria y no lanza una excepción no controlada
