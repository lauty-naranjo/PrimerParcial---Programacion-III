(function () {
  'use strict';

  const Libreria = (window.Libreria = window.Libreria || {});
  const ORDEN_CAMPOS = ['nombre', 'email'];

  let refs = null;
  let iniciado = false;

  function crearCelda(texto) {
    const celda = document.createElement('td');
    celda.textContent = texto;
    return celda;
  }

  function crearFilaCliente(cliente) {
    const fila = document.createElement('tr');
    const email = crearCelda(cliente.email);
    email.className = 'tabla__email';

    fila.append(crearCelda(cliente.nombre), email);
    return fila;
  }

  function renderizarTabla() {
    const clientes = Libreria.datos.clientes;
    const fragmento = document.createDocumentFragment();

    clientes.forEach(function (cliente) {
      fragmento.append(crearFilaCliente(cliente));
    });

    refs.cuerpo.replaceChildren(fragmento);
    refs.vacio.hidden = clientes.length > 0;
  }

  function renderizarOpcionesVenta() {
    const valorPrevio = refs.ventaCliente.value;
    const opciones = Libreria.datos.clientes.map(function (cliente) {
      return { valor: cliente.id, texto: cliente.nombre };
    });

    Libreria.utils.poblarSelect(
      refs.ventaCliente,
      opciones,
      'Seleccioná un cliente',
      valorPrevio
    );
  }

  function refrescar() {
    renderizarTabla();
    renderizarOpcionesVenta();
  }

  function leerFormulario() {
    return {
      nombre: refs.nombre.value.trim(),
      email: refs.email.value.trim()
    };
  }

  function validarCliente(datos) {
    const errores = {};
    const nombre = datos.nombre;
    const email = datos.email;
    const emailNormalizado = Libreria.utils.normalizarEmail(email);

    if (!nombre) {
      errores.nombre = 'Ingresá el nombre completo.';
    }

    if (!email) {
      errores.email = 'Ingresá el email.';
    } else if (!Libreria.utils.esEmailValido(email)) {
      errores.email = 'Ingresá un email válido.';
    } else {
      const repetido = Libreria.datos.clientes.some(function (cliente) {
        return Libreria.utils.normalizarEmail(cliente.email) === emailNormalizado;
      });

      if (repetido) {
        errores.email = 'Ya existe un cliente con ese email.';
      }
    }

    return {
      valido: Object.keys(errores).length === 0,
      errores: errores,
      valores: {
        nombre: nombre,
        email: email
      }
    };
  }

  function marcarError(clave, mensaje) {
    const error = refs.errores[clave];
    error.textContent = mensaje;
    error.hidden = false;
    refs.controles[clave].setAttribute('aria-invalid', 'true');
  }

  function limpiarError(clave) {
    const error = refs.errores[clave];
    error.textContent = '';
    error.hidden = true;
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

  function mostrarErrores(errores) {
    const claves = ORDEN_CAMPOS.filter(function (clave) {
      return Boolean(errores[clave]);
    });

    claves.forEach(function (clave) {
      marcarError(clave, errores[clave]);
    });

    refs.resumen.hidden = false;

    if (claves.length > 0) {
      refs.controles[claves[0]].focus();
    }
  }

  function ocultarExito() {
    refs.exito.hidden = true;
  }

  function mostrarExito() {
    refs.exito.hidden = false;
  }

  function registrarCliente(evento) {
    evento.preventDefault();
    ocultarExito();
    limpiarErrores();

    const resultado = validarCliente(leerFormulario());

    if (!resultado.valido) {
      mostrarErrores(resultado.errores);
      return;
    }

    Libreria.datos.clientes.push({
      id: Libreria.utils.generarId('c', Libreria.datos.clientes),
      nombre: resultado.valores.nombre,
      email: resultado.valores.email
    });
    Libreria.store.guardarClientes();

    refrescar();
    refs.form.reset();
    limpiarErrores();
    mostrarExito();
    refs.nombre.focus();
  }

  function configurarEventos() {
    refs.form.addEventListener('submit', registrarCliente);

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
  }

  function iniciarClientes() {
    if (iniciado) {
      return;
    }

    iniciado = true;
    refs = {
      form: document.getElementById('form-cliente'),
      nombre: document.getElementById('cliente-nombre'),
      email: document.getElementById('cliente-email'),
      limpiar: document.getElementById('cliente-limpiar'),
      resumen: document.getElementById('cliente-mensaje'),
      exito: document.getElementById('cliente-exito'),
      cuerpo: document.querySelector('#tabla-clientes tbody'),
      vacio: document.getElementById('clientes-vacio'),
      ventaCliente: document.getElementById('venta-cliente'),
      errores: {
        nombre: document.getElementById('cliente-nombre-error'),
        email: document.getElementById('cliente-email-error')
      }
    };

    refs.controles = {
      nombre: refs.nombre,
      email: refs.email
    };

    configurarEventos();
    refrescar();
  }

  Libreria.clientes = {
    iniciar: iniciarClientes,
    refrescar: refrescar,
    validarCliente: validarCliente,
    renderizarTabla: renderizarTabla
  };
})();
