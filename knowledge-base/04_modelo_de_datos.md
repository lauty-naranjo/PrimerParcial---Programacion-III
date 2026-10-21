# Modelo de Datos

## Dominios

| Dominio | Descripción | Persistencia |
| --- | --- | --- |
| Catálogo | Libros y sus relaciones con editorial, género y autores | `libreria.v1.libros` |
| Personas | Clientes de la librería | `libreria.v1.clientes` |
| Ventas | Ventas confirmadas con sus renglones históricos | `libreria.v1.ventas` |

Editoriales, géneros y autores son catálogos fijos de sólo lectura: viven en `js/data.js` y no se persisten ni se modifican desde la interfaz.

## ERD

```
Editorial 1 ──── N Libro N ──── N Autor
                    │
Genero   1 ──── N Libro
                    │
                    │ (1)
                 RenglonVenta N ──── 1 Venta N ──── 1 Cliente
```

Un libro pertenece a una editorial, puede tener un género (opcional) y uno o más autores. Una venta pertenece a un cliente y contiene uno o más renglones; cada renglón referencia un libro, pero guarda una copia histórica de sus datos.

## Entidades

### Libro
- `id` (string, `lN`) — identificador estable
- `titulo` (string, obligatorio)
- `isbn` (string, obligatorio, único comparado sin espacios ni guiones)
- `precio` (number, mayor que 0, redondeado a centavos)
- `editorialId` (string, FK a Editorial, obligatorio)
- `generoId` (string|null, FK a Género, opcional)
- `autorIds` (string[], FK a Autor, al menos uno)

Relaciones: N:1 con Editorial y Género; N:M con Autor.

### Editorial / Genero / Autor
- `id` (string: `edN`, `gN`, `aN`)
- `nombre` (string)

Sólo lectura en esta versión.

### Cliente
- `id` (string, `cN`)
- `nombre` (string, nombre completo, sin campo de apellido separado)
- `email` (string, formato válido, único comparado con `trim` y sin distinguir mayúsculas)

### Venta
- `id` (string, `V-000N`, correlativo de cuatro dígitos)
- `fecha` (string, ISO local `YYYY-MM-DD`)
- `clienteId`, `clienteNombre` (copia del nombre al confirmar)
- `renglones` (RenglonVenta[], al menos uno)
- `total` (number, suma de subtotales redondeada a centavos)

### RenglonVenta (copia histórica)
- `libroId` (string)
- `titulo`, `isbn` (copia descriptiva al confirmar)
- `cantidad` (entero > 0)
- `precioUnitario` (number, copiado al confirmar; no se relee del catálogo en el historial)
- `subtotal` (number, `cantidad × precioUnitario` redondeado)

## Seed data inicial

| Entidad | Cantidad | Ids |
| --- | --- | --- |
| Libros | 6 | `l1`…`l6` |
| Editoriales | 2 | `ed1` Ediciones del Sur, `ed2` Editorial Horizonte |
| Géneros | 2 | `g1` Narrativa, `g2` Ensayo |
| Autores | 3 | `a1` Ana Belén Ríos, `a2` Carlos Medina, `a3` Lucía Ferrer |
| Clientes | 3 | `c1` María González, `c2` Jorge Ramírez, `c3` Sofía Herrera |
| Ventas | 0 | — |

`l5` («Manual del lector») no tiene género asignado: es el caso de ejemplo de «Sin clasificar».

Las semillas se copian a `localStorage` sólo cuando la clave no existe; al reabrir se recuperan las listas guardadas sin duplicar los ejemplos (`js/store.js`).

## Límites del almacenamiento

`localStorage` depende del navegador, del perfil y de la ubicación desde la que se abre el archivo; no se comparte entre usuarios, perfiles ni equipos. Si se borran los datos del sitio, la información se pierde. No representa integridad garantizada por un servidor.
