(function () {
  'use strict';

  const Libreria = (window.Libreria = window.Libreria || {});
  const CLAVES = Object.freeze({
    libros: 'libreria.v1.libros',
    clientes: 'libreria.v1.clientes',
    ventas: 'libreria.v1.ventas'
  });

  let iniciado = false;

  function clonar(valor) {
    return JSON.parse(JSON.stringify(valor));
  }

  function leer(clave) {
    try {
      const guardado = window.localStorage.getItem(clave);

      if (guardado === null) {
        return null;
      }

      return JSON.parse(guardado);
    } catch (error) {
      console.warn('No se pudo leer ' + clave + ' desde localStorage.', error);
      return null;
    }
  }

  function guardar(clave, valor) {
    try {
      window.localStorage.setItem(clave, JSON.stringify(valor));
    } catch (error) {
      console.warn('No se pudo guardar ' + clave + ' en localStorage.', error);
    }
  }

  function cargarLista(clave, semillas, etiqueta) {
    const valor = leer(clave);

    if (Array.isArray(valor)) {
      return valor;
    }

    if (valor !== null) {
      console.warn('El contenido guardado de ' + etiqueta + ' no es una lista; se restauran los ejemplos.');
    }

    guardar(clave, semillas);
    return semillas;
  }

  function iniciar() {
    if (iniciado) {
      return;
    }

    iniciado = true;

    const semillasLibros = clonar(Libreria.datos.libros || []);
    const semillasClientes = clonar(Libreria.datos.clientes || []);

    Libreria.datos.libros = cargarLista(CLAVES.libros, semillasLibros, 'libros');
    Libreria.datos.clientes = cargarLista(CLAVES.clientes, semillasClientes, 'clientes');
    Libreria.datos.ventas = cargarLista(CLAVES.ventas, [], 'ventas');
  }

  function guardarLibros() {
    guardar(CLAVES.libros, Libreria.datos.libros);
  }

  function guardarClientes() {
    guardar(CLAVES.clientes, Libreria.datos.clientes);
  }

  function guardarVentas() {
    guardar(CLAVES.ventas, Libreria.datos.ventas);
  }

  function guardarTodo() {
    guardarLibros();
    guardarClientes();
    guardarVentas();
  }

  Libreria.store = {
    CLAVES: CLAVES,
    iniciar: iniciar,
    guardarLibros: guardarLibros,
    guardarClientes: guardarClientes,
    guardarVentas: guardarVentas,
    guardarTodo: guardarTodo
  };
})();
