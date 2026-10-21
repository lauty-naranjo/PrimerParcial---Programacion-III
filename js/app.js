(function () {
  'use strict';

  const Libreria = (window.Libreria = window.Libreria || {});

  function iniciarRouter() {
    const enlaces = Array.prototype.slice.call(
      document.querySelectorAll('.nav-principal__enlace')
    );

    function actualizar(moverFoco) {
      const hash = window.location.hash || '#catalogo';

      enlaces.forEach(function (enlace) {
        if (enlace.getAttribute('href') === hash) {
          enlace.setAttribute('aria-current', 'location');
        } else {
          enlace.removeAttribute('aria-current');
        }
      });

      if (!moverFoco) {
        return;
      }

      const esVista = enlaces.some(function (enlace) {
        return enlace.getAttribute('href') === hash;
      });

      if (!esVista) {
        return;
      }

      const seccion = document.querySelector(hash);

      if (!seccion) {
        return;
      }

      const titulo = seccion.querySelector('h2');

      if (titulo) {
        titulo.setAttribute('tabindex', '-1');
        titulo.focus({ preventScroll: true });
      }
    }

    window.addEventListener('hashchange', function () {
      actualizar(true);
    });

    actualizar(false);
  }

  document.addEventListener('DOMContentLoaded', function () {
    Libreria.store.iniciar();
    Libreria.catalogo.iniciar();
    Libreria.libros.iniciar();
    Libreria.clientes.iniciar();
    Libreria.ventas.iniciar();
    Libreria.historial.iniciar();
    iniciarRouter();
  });
})();
