(function () {
  'use strict';

  const Libreria = (window.Libreria = window.Libreria || {});
  const TEXTO_SIN_GENERO = Libreria.utils.TEXTO_SIN_GENERO;
  const ORDEN_CAMPOS = ['titulo', 'isbn', 'precio', 'editorialId', 'generoId', 'autorIds'];

  let refs = null;
  let editorialesPorId = null;
  let generosPorId = null;
  let autoresPorId = null;
  let iniciado = false;
  let primeraCargaVenta = true;

  function crearCelda(texto, esNumero) {
    const celda = document.createElement('td');
    celda.textContent = texto;

    if (esNumero) {
      celda.className = 'tabla__numero';
    }

    return celda;
  }

  function obtenerEditorial(libro) {
    const editorial = editorialesPorId.get(libro.editorialId);
    return editorial ? editorial.nombre : '';
  }

  function obtenerGenero(libro) {
    if (!libro.generoId) {
      return TEXTO_SIN_GENERO;
    }

    const genero = generosPorId.get(libro.generoId);
    return genero ? genero.nombre : TEXTO_SIN_GENERO;
  }

  function obtenerAutores(libro) {
    return (libro.autorIds || [])
      .map(function (autorId) {
        const autor = autoresPorId.get(autorId);
        return autor ? autor.nombre : '';
      })
      .filter(function (nombre) {
        return nombre;
      })
      .join(', ');
  }

  function crearFilaLibro(libro) {
    const fila = document.createElement('tr');
    fila.append(
      crearCelda(libro.titulo),
      crearCelda(libro.isbn),
      crearCelda(obtenerEditorial(libro)),
      crearCelda(obtenerGenero(libro)),
      crearCelda(obtenerAutores(libro)),
      crearCelda(Libreria.utils.formatearPrecio(libro.precio), true)
    );
    return fila;
  }

  function renderizarTabla() {
    const libros = Libreria.datos.libros;
    const fragmento = document.createDocumentFragment();

    libros.forEach(function (libro) {
      fragmento.append(crearFilaLibro(libro));
    });

    refs.cuerpo.replaceChildren(fragmento);
    refs.vacio.hidden = libros.length > 0;
  }

  function renderizarOpcionesEditorial() {
    const valorPrevio = refs.editorial.value;
    const opciones = Libreria.datos.editoriales.map(function (editorial) {
      return { valor: editorial.id, texto: editorial.nombre };
    });

    Libreria.utils.poblarSelect(
      refs.editorial,
      opciones,
      'Seleccioná una editorial',
      valorPrevio
    );
  }

  function renderizarOpcionesGenero() {
    const valorPrevio = refs.genero.value;
    const opciones = Libreria.datos.generos.map(function (genero) {
      return { valor: genero.id, texto: genero.nombre };
    });

    Libreria.utils.poblarSelect(refs.genero, opciones, TEXTO_SIN_GENERO, valorPrevio);
  }

  function renderizarOpcionesAutores() {
    const fragmento = document.createDocumentFragment();

    Libreria.datos.autores.forEach(function (autor) {
      const etiqueta = document.createElement('label');
      etiqueta.className = 'opcion';

      const control = document.createElement('input');
      control.type = 'checkbox';
      control.name = 'autores';
      control.value = autor.id;
      control.setAttribute('aria-describedby', 'libro-autores-error');

      etiqueta.append(control, document.createTextNode(' ' + autor.nombre));
      fragmento.append(etiqueta);
    });

    refs.autores.replaceChildren(fragmento);
  }

  function renderizarOpcionesVenta() {
    const valorPrevio = refs.ventaLibro.value;
    const opciones = Libreria.datos.libros.map(function (libro) {
      return { valor: libro.id, texto: libro.titulo };
    });

    Libreria.utils.poblarSelect(
      refs.ventaLibro,
      opciones,
      'Seleccioná un libro',
      valorPrevio
    );

    if (primeraCargaVenta) {
      if (opciones.length > 0) {
        refs.ventaLibro.value = opciones[0].valor;
      }
      primeraCargaVenta = false;
    }
  }

  function refrescar() {
    renderizarTabla();
    renderizarOpcionesVenta();
  }

  function leerFormulario() {
    const autorIds = [];

    refs.autores.querySelectorAll('input[name="autores"]:checked').forEach(function (control) {
      autorIds.push(control.value);
    });

    return {
      titulo: refs.titulo.value.trim(),
      isbn: refs.isbn.value.trim(),
      precio: refs.precio.value.trim(),
      editorialId: refs.editorial.value,
      generoId: refs.genero.value || null,
      autorIds: autorIds
    };
  }

  function validarLibro(datos) {
    const errores = {};
    const titulo = datos.titulo;
    const isbn = datos.isbn;
    const isbnNormalizado = Libreria.utils.normalizarIsbn(isbn);
    let precio = null;
    let generoId = datos.generoId;

    if (!titulo) {
      errores.titulo = 'Ingresá el título.';
    }

    if (!isbn) {
      errores.isbn = 'Ingresá el ISBN.';
    } else {
      const repetido = Libreria.datos.libros.some(function (libro) {
        return Libreria.utils.normalizarIsbn(libro.isbn) === isbnNormalizado;
      });

      if (repetido) {
        errores.isbn = 'Ya existe un libro con ese ISBN.';
      }
    }

    if (!datos.precio) {
      errores.precio = 'Ingresá el precio.';
    } else {
      const numero = Number(datos.precio);

      if (!Number.isFinite(numero) || numero <= 0) {
        errores.precio = 'El precio debe ser un número mayor que cero.';
      } else {
        precio = Libreria.utils.redondearCentavos(numero);

        if (!Number.isFinite(precio) || precio < 0.01) {
          errores.precio = 'El precio debe ser al menos 0,01.';
        }
      }
    }

    if (!datos.editorialId) {
      errores.editorialId = 'Seleccioná una editorial.';
    } else if (!editorialesPorId.has(datos.editorialId)) {
      errores.editorialId = 'La editorial seleccionada no existe.';
    }

    if (generoId) {
      if (!generosPorId.has(generoId)) {
        errores.generoId = 'El género seleccionado no existe.';
      }
    } else {
      generoId = null;
    }

    if (datos.autorIds.length === 0) {
      errores.autorIds = 'Seleccioná al menos un autor.';
    } else {
      const autorInvalido = datos.autorIds.some(function (autorId) {
        return !autoresPorId.has(autorId);
      });

      if (autorInvalido) {
        errores.autorIds = 'Uno de los autores seleccionados no existe.';
      }
    }

    return {
      valido: Object.keys(errores).length === 0,
      errores: errores,
      valores: {
        titulo: titulo,
        isbn: isbn,
        precio: precio,
        editorialId: datos.editorialId,
        generoId: generoId,
        autorIds: datos.autorIds.slice()
      }
    };
  }

  function obtenerControlesAutores() {
    return refs.autores.querySelectorAll('input[name="autores"]');
  }

  function marcarError(clave, mensaje) {
    const error = refs.errores[clave];
    error.textContent = mensaje;
    error.hidden = false;

    if (clave === 'autorIds') {
      refs.grupoAutores.setAttribute('aria-invalid', 'true');
      obtenerControlesAutores().forEach(function (control) {
        control.setAttribute('aria-invalid', 'true');
      });
      return;
    }

    refs.controles[clave].setAttribute('aria-invalid', 'true');
  }

  function limpiarError(clave) {
    const error = refs.errores[clave];
    error.textContent = '';
    error.hidden = true;

    if (clave === 'autorIds') {
      refs.grupoAutores.removeAttribute('aria-invalid');
      obtenerControlesAutores().forEach(function (control) {
        control.removeAttribute('aria-invalid');
      });
      return;
    }

    refs.controles[clave].removeAttribute('aria-invalid');
  }

  function limpiarErrores() {
    ORDEN_CAMPOS.forEach(function (clave) {
      limpiarError(clave);
    });
    refs.resumen.hidden = true;
  }

  function actualizarResumen() {
    const hayErrores = ORDEN_CAMPOS.some(function (clave) {
      return !refs.errores[clave].hidden;
    });

    refs.resumen.hidden = !hayErrores;
  }

  function enfocarCampo(clave) {
    if (clave === 'autorIds') {
      const primero = refs.autores.querySelector('input[name="autores"]');

      if (primero) {
        primero.focus();
      }
      return;
    }

    refs.controles[clave].focus();
  }

  function mostrarErrores(errores) {
    const claves = ORDEN_CAMPOS.filter(function (clave) {
      return Boolean(errores[clave]);
    });

    claves.forEach(function (clave) {
      marcarError(clave, errores[clave]);
    });

    refs.resumen.hidden = false;

    if (claves.length > 0) {
      enfocarCampo(claves[0]);
    }
  }

  function ocultarExito() {
    refs.exito.hidden = true;
  }

  function mostrarExito() {
    refs.exito.hidden = false;
  }

  function registrarLibro(evento) {
    evento.preventDefault();
    ocultarExito();
    limpiarErrores();

    const resultado = validarLibro(leerFormulario());

    if (!resultado.valido) {
      mostrarErrores(resultado.errores);
      return;
    }

    Libreria.datos.libros.push({
      id: Libreria.utils.generarId('l', Libreria.datos.libros),
      titulo: resultado.valores.titulo,
      isbn: resultado.valores.isbn,
      precio: resultado.valores.precio,
      editorialId: resultado.valores.editorialId,
      generoId: resultado.valores.generoId,
      autorIds: resultado.valores.autorIds
    });

    refrescar();
    Libreria.catalogo.refrescar();
    refs.form.reset();
    limpiarErrores();
    mostrarExito();
    refs.titulo.focus();
  }

  function configurarEventos() {
    refs.form.addEventListener('submit', registrarLibro);

    refs.limpiar.addEventListener('click', function () {
      window.setTimeout(function () {
        limpiarErrores();
        ocultarExito();
      }, 0);
    });

    Object.keys(refs.controles).forEach(function (clave) {
      const control = refs.controles[clave];

      function manejarCambio() {
        limpiarError(clave);
        actualizarResumen();
        ocultarExito();
      }

      control.addEventListener('input', manejarCambio);
      control.addEventListener('change', manejarCambio);
    });

    refs.autores.addEventListener('change', function () {
      limpiarError('autorIds');
      actualizarResumen();
      ocultarExito();
    });
  }

  function iniciarLibros() {
    if (iniciado) {
      return;
    }

    iniciado = true;
    refs = {
      form: document.getElementById('form-libro'),
      titulo: document.getElementById('libro-titulo'),
      isbn: document.getElementById('libro-isbn'),
      precio: document.getElementById('libro-precio'),
      editorial: document.getElementById('libro-editorial'),
      genero: document.getElementById('libro-genero'),
      autores: document.getElementById('libro-autores'),
      grupoAutores: document.getElementById('libro-autores').closest('fieldset'),
      limpiar: document.getElementById('libro-limpiar'),
      resumen: document.getElementById('libro-mensaje'),
      exito: document.getElementById('libro-exito'),
      cuerpo: document.querySelector('#tabla-libros tbody'),
      vacio: document.getElementById('libros-vacio'),
      ventaLibro: document.getElementById('venta-libro'),
      errores: {
        titulo: document.getElementById('libro-titulo-error'),
        isbn: document.getElementById('libro-isbn-error'),
        precio: document.getElementById('libro-precio-error'),
        editorialId: document.getElementById('libro-editorial-error'),
        generoId: document.getElementById('libro-genero-error'),
        autorIds: document.getElementById('libro-autores-error')
      }
    };

    refs.controles = {
      titulo: refs.titulo,
      isbn: refs.isbn,
      precio: refs.precio,
      editorialId: refs.editorial,
      generoId: refs.genero
    };

    editorialesPorId = Libreria.utils.indexarPorId(Libreria.datos.editoriales);
    generosPorId = Libreria.utils.indexarPorId(Libreria.datos.generos);
    autoresPorId = Libreria.utils.indexarPorId(Libreria.datos.autores);

    renderizarOpcionesEditorial();
    renderizarOpcionesGenero();
    renderizarOpcionesAutores();
    configurarEventos();
    refrescar();
  }

  Libreria.libros = {
    iniciar: iniciarLibros,
    refrescar: refrescar,
    validarLibro: validarLibro,
    renderizarTabla: renderizarTabla
  };
})();
