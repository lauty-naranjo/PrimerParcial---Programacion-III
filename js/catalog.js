(function () {
  'use strict';

  const Libreria = (window.Libreria = window.Libreria || {});
  const TEXTO_SIN_GENERO = 'Sin clasificar';

  let refs = null;
  let editorialesPorId = null;
  let generosPorId = null;
  let autoresPorId = null;
  let consultaActual = '';
  let iniciado = false;

  function crearFilaDato(etiqueta, valor) {
    const fila = document.createElement('div');
    const termino = document.createElement('dt');
    const definicion = document.createElement('dd');

    termino.textContent = etiqueta;
    definicion.textContent = valor;
    fila.append(termino, definicion);

    return fila;
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
    return libro.autorIds
      .map(function (autorId) {
        const autor = autoresPorId.get(autorId);
        return autor ? autor.nombre : '';
      })
      .filter(function (nombre) {
        return nombre;
      })
      .join(', ');
  }

  function crearTarjetaLibro(libro) {
    const tarjeta = document.createElement('li');
    tarjeta.className = 'tarjeta libro';

    const lomo = document.createElement('div');
    lomo.className = 'libro__lomo';
    lomo.setAttribute('aria-hidden', 'true');

    const cuerpo = document.createElement('div');
    cuerpo.className = 'libro__cuerpo';

    const insignia = document.createElement('p');
    insignia.className = libro.generoId ? 'insignia' : 'insignia insignia--sin';
    insignia.textContent = obtenerGenero(libro);

    const titulo = document.createElement('h3');
    titulo.className = 'libro__titulo';
    titulo.textContent = libro.titulo;

    const datos = document.createElement('dl');
    datos.className = 'libro__datos';
    datos.append(
      crearFilaDato('ISBN', libro.isbn),
      crearFilaDato('Editorial', obtenerEditorial(libro)),
      crearFilaDato('Autores', obtenerAutores(libro))
    );

    const precio = document.createElement('p');
    precio.className = 'libro__precio';
    precio.textContent = Libreria.utils.formatearPrecio(libro.precio);

    cuerpo.append(insignia, titulo, datos, precio);
    tarjeta.append(lomo, cuerpo);

    return tarjeta;
  }

  function filtrarLibros(libros, consulta) {
    const busqueda = Libreria.utils.normalizarBusqueda(consulta);

    if (!busqueda) {
      return libros.slice();
    }

    return libros.filter(function (libro) {
      const titulo = Libreria.utils.normalizarBusqueda(libro.titulo);
      return titulo.includes(busqueda);
    });
  }

  function actualizarMensajes(cantidad, consultaActiva) {
    const sinLibros = Libreria.datos.libros.length === 0;

    refs.vacio.hidden = !sinLibros;
    refs.sinResultados.hidden = sinLibros || !consultaActiva || cantidad > 0;
  }

  function renderizarLibros(libros, consultaActiva) {
    const fragmento = document.createDocumentFragment();

    libros.forEach(function (libro) {
      fragmento.append(crearTarjetaLibro(libro));
    });

    refs.lista.replaceChildren(fragmento);
    actualizarMensajes(libros.length, consultaActiva);
  }

  function aplicarFiltro(valor) {
    consultaActual = Libreria.utils.normalizarBusqueda(valor);
    const libros = filtrarLibros(Libreria.datos.libros, consultaActual);
    renderizarLibros(libros, Boolean(consultaActual));
  }

  function refrescar() {
    aplicarFiltro(consultaActual);
  }

  function iniciarCatalogo() {
    if (iniciado) {
      return;
    }

    iniciado = true;
    refs = {
      form: document.getElementById('form-busqueda'),
      input: document.getElementById('busqueda-titulo'),
      lista: document.getElementById('catalogo-lista'),
      vacio: document.getElementById('catalogo-vacio'),
      sinResultados: document.getElementById('catalogo-sin-resultados')
    };

    editorialesPorId = Libreria.utils.indexarPorId(Libreria.datos.editoriales);
    generosPorId = Libreria.utils.indexarPorId(Libreria.datos.generos);
    autoresPorId = Libreria.utils.indexarPorId(Libreria.datos.autores);

    refs.form.addEventListener('submit', function (evento) {
      evento.preventDefault();
      aplicarFiltro(refs.input.value);
    });

    refs.input.addEventListener('input', function () {
      aplicarFiltro(refs.input.value);
    });

    aplicarFiltro(refs.input.value);
  }

  Libreria.catalogo = {
    iniciar: iniciarCatalogo,
    aplicarFiltro: aplicarFiltro,
    refrescar: refrescar,
    filtrarLibros: filtrarLibros,
    renderizarLibros: renderizarLibros
  };
})();
