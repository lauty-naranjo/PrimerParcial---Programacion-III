(function () {
  'use strict';

  const Libreria = (window.Libreria = window.Libreria || {});

  Libreria.datos = {
    editoriales: [
      { id: 'ed1', nombre: 'Ediciones del Sur' },
      { id: 'ed2', nombre: 'Editorial Horizonte' }
    ],
    generos: [
      { id: 'g1', nombre: 'Narrativa' },
      { id: 'g2', nombre: 'Ensayo' }
    ],
    autores: [
      { id: 'a1', nombre: 'Ana Belén Ríos' },
      { id: 'a2', nombre: 'Carlos Medina' },
      { id: 'a3', nombre: 'Lucía Ferrer' }
    ],
    libros: [
      {
        id: 'l1',
        titulo: 'El jardín de las horas',
        isbn: '978-950-01-0001-1',
        precio: 1500,
        editorialId: 'ed1',
        generoId: 'g1',
        autorIds: ['a1']
      },
      {
        id: 'l2',
        titulo: 'Cartas del sur',
        isbn: '978-950-01-0002-8',
        precio: 1500,
        editorialId: 'ed2',
        generoId: 'g1',
        autorIds: ['a2', 'a3']
      },
      {
        id: 'l3',
        titulo: 'La memoria del río',
        isbn: '978-950-01-0003-5',
        precio: 2000,
        editorialId: 'ed1',
        generoId: 'g1',
        autorIds: ['a1']
      },
      {
        id: 'l4',
        titulo: 'Oficio de mirar',
        isbn: '978-950-01-0004-2',
        precio: 1800,
        editorialId: 'ed2',
        generoId: 'g2',
        autorIds: ['a2']
      },
      {
        id: 'l5',
        titulo: 'Manual del lector',
        isbn: '978-950-01-0005-9',
        precio: 2500,
        editorialId: 'ed1',
        generoId: null,
        autorIds: ['a3']
      },
      {
        id: 'l6',
        titulo: 'Voces del patio',
        isbn: '978-950-01-0006-6',
        precio: 1200,
        editorialId: 'ed2',
        generoId: 'g1',
        autorIds: ['a1', 'a2']
      }
    ],
    clientes: [
      {
        id: 'c1',
        nombre: 'María González',
        email: 'maria.gonzalez@example.com'
      },
      {
        id: 'c2',
        nombre: 'Jorge Ramírez',
        email: 'jorge.ramirez@example.com'
      },
      {
        id: 'c3',
        nombre: 'Sofía Herrera',
        email: 'sofia.herrera@example.com'
      }
    ]
  };
})();
