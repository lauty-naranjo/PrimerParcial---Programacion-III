# Spec Delta — Documentación de entrega

## ADDED Requirements

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
