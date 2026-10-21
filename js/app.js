(function () {
  'use strict';

  const Libreria = (window.Libreria = window.Libreria || {});

  document.addEventListener('DOMContentLoaded', function () {
    Libreria.catalogo.iniciar();
    Libreria.libros.iniciar();
    Libreria.clientes.iniciar();
  });
})();
