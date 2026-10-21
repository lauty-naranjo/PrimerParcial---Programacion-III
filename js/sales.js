(function () {
  'use strict';

  const Libreria = (window.Libreria = window.Libreria || {});

  let refs = null;
  let renglones = [];
  let iniciado = false;

  function obtenerLibro(libroId) {
    return Libreria.datos.libros.find(function (libro) {
      return libro.id === libroId;
    }) || null;
  }

  function obtenerCliente(clienteId) {
    return Libreria.datos.clientes.find(function (cliente) {
      return cliente.id === clienteId;
    }) || null;
  }

  function calcularSubtotal(cantidad, precioUnitario) {
    return Libreria.utils.redondearCentavos(cantidad * precioUnitario);
  }

  function crearCelda(texto, esNumero) {
    const celda = document.createElement('td');
    celda.textContent = texto;

    if (esNumero) {
      celda.className = 'tabla__numero';
    }

    return celda;
  }

  function mostrarMensaje(texto, tipo) {
    refs.mensaje.textContent = texto;
    refs.mensaje.className = 'mensaje mensaje--' + (tipo || 'error');
    refs.mensaje.hidden = false;
  }

  function ocultarMensaje() {
    refs.mensaje.textContent = '';
    refs.mensaje.hidden = true;
  }

  function mostrarConfirmacion(texto) {
    refs.confirmada.textContent = texto;
    refs.confirmada.hidden = false;
  }

  function ocultarConfirmacion() {
    refs.confirmada.hidden = true;
  }

  function actualizarResumen() {
    const articulos = renglones.reduce(function (total, renglon) {
      return total + renglon.cantidad;
    }, 0);
    const total = renglones.reduce(function (suma, renglon) {
      return Libreria.utils.redondearCentavos(suma + renglon.subtotal);
    }, 0);

    refs.articulos.textContent = String(articulos);
    refs.subtotal.textContent = Libreria.utils.formatearPrecio(total);
    refs.total.textContent = Libreria.utils.formatearPrecio(total);
  }

  function crearControlCantidad(renglon) {
    const control = document.createElement('input');
    control.type = 'number';
    control.min = '1';
    control.step = '1';
    control.value = String(renglon.cantidad);
    control.className = 'campo__control tabla__cantidad';
    control.setAttribute('aria-label', 'Cantidad de ' + renglon.titulo);
    control.dataset.libroId = renglon.libroId;
    return control;
  }

  function crearBotonQuitar(renglon) {
    const boton = document.createElement('button');
    boton.type = 'button';
    boton.className = 'boton boton--peligro boton--chico';
    boton.dataset.libroId = renglon.libroId;
    boton.textContent = 'Quitar';

    const oculto = document.createElement('span');
    oculto.className = 'visualmente-oculto';
    oculto.textContent = ' ' + renglon.titulo + ' de la venta';
    boton.append(oculto);

    return boton;
  }

  function crearFilaRenglon(renglon) {
    const fila = document.createElement('tr');
    const acciones = document.createElement('div');
    const celdaAcciones = document.createElement('td');
    const celdaCantidad = document.createElement('td');

    celdaCantidad.className = 'tabla__numero';
    celdaCantidad.append(crearControlCantidad(renglon));

    acciones.className = 'tabla__acciones';
    acciones.append(crearBotonQuitar(renglon));
    celdaAcciones.append(acciones);

    fila.append(
      crearCelda(renglon.titulo),
      celdaCantidad,
      crearCelda(Libreria.utils.formatearPrecio(renglon.precioUnitario), true),
      crearCelda(Libreria.utils.formatearPrecio(renglon.subtotal), true),
      celdaAcciones
    );

    return fila;
  }

  function renderizarRenglones() {
    const fragmento = document.createDocumentFragment();

    renglones.forEach(function (renglon) {
      fragmento.append(crearFilaRenglon(renglon));
    });

    refs.cuerpo.replaceChildren(fragmento);
    refs.vacio.hidden = renglones.length > 0;
  }

  function refrescar() {
    const clientePrevio = refs.cliente.value;
    const libroPrevio = refs.libro.value;
    const clientes = Libreria.datos.clientes.map(function (cliente) {
      return { valor: cliente.id, texto: cliente.nombre };
    });
    const libros = Libreria.datos.libros.map(function (libro) {
      return { valor: libro.id, texto: libro.titulo };
    });

    Libreria.utils.poblarSelect(
      refs.cliente,
      clientes,
      'Seleccioná un cliente',
      clientePrevio
    );
    Libreria.utils.poblarSelect(
      refs.libro,
      libros,
      'Seleccioná un libro',
      libroPrevio
    );
  }

  function agregarRenglon(evento) {
    evento.preventDefault();
    ocultarMensaje();
    ocultarConfirmacion();

    const libroId = refs.libro.value;
    const cantidad = Number(refs.cantidad.value);

    if (!libroId) {
      mostrarMensaje('Seleccioná un libro.');
      refs.libro.focus();
      return;
    }

    if (!Number.isInteger(cantidad) || cantidad <= 0) {
      mostrarMensaje('La cantidad debe ser un número entero mayor que cero.');
      refs.cantidad.focus();
      return;
    }

    const libro = obtenerLibro(libroId);

    if (!libro) {
      mostrarMensaje('El libro seleccionado no existe.');
      refs.libro.focus();
      return;
    }

    const existente = renglones.find(function (renglon) {
      return renglon.libroId === libroId;
    });

    if (existente) {
      existente.cantidad += cantidad;
      existente.subtotal = calcularSubtotal(existente.cantidad, existente.precioUnitario);
      renderizarRenglones();
      actualizarResumen();
      mostrarMensaje('El libro ya estaba en la venta; se actualizó la cantidad.', 'aviso');
      refs.cantidad.value = '1';
      refs.libro.value = '';
      refs.libro.focus();
      return;
    }

    const precioUnitario = Libreria.utils.redondearCentavos(libro.precio);

    renglones.push({
      libroId: libro.id,
      titulo: libro.titulo,
      isbn: libro.isbn,
      cantidad: cantidad,
      precioUnitario: precioUnitario,
      subtotal: calcularSubtotal(cantidad, precioUnitario)
    });

    renderizarRenglones();
    actualizarResumen();
    refs.cantidad.value = '1';
    refs.libro.value = '';
    refs.libro.focus();
  }

  function cambiarCantidad(input) {
    const renglon = renglones.find(function (item) {
      return item.libroId === input.dataset.libroId;
    });
    const cantidad = Number(input.value);

    if (!renglon) {
      return;
    }

    if (!Number.isInteger(cantidad) || cantidad <= 0) {
      input.value = String(renglon.cantidad);
      mostrarMensaje('La cantidad debe ser un número entero mayor que cero.');
      input.focus();
      return;
    }

    renglon.cantidad = cantidad;
    renglon.subtotal = calcularSubtotal(cantidad, renglon.precioUnitario);

    const fila = input.closest('tr');
    const subtotal = fila ? fila.children[3] : null;

    if (subtotal) {
      subtotal.textContent = Libreria.utils.formatearPrecio(renglon.subtotal);
    }

    actualizarResumen();
    ocultarMensaje();
    ocultarConfirmacion();
  }

  function quitarRenglon(libroId) {
    const indice = renglones.findIndex(function (renglon) {
      return renglon.libroId === libroId;
    });

    if (indice === -1) {
      return;
    }

    renglones.splice(indice, 1);
    renderizarRenglones();
    actualizarResumen();
    ocultarMensaje();
    ocultarConfirmacion();
  }

  function sincronizarCantidades() {
    const controles = refs.cuerpo.querySelectorAll('input[data-libro-id]');
    let valido = true;

    controles.forEach(function (control) {
      const renglon = renglones.find(function (item) {
        return item.libroId === control.dataset.libroId;
      });
      const cantidad = Number(control.value);

      if (!renglon) {
        return;
      }

      if (!Number.isInteger(cantidad) || cantidad <= 0) {
        valido = false;
        control.value = String(renglon.cantidad);
        return;
      }

      renglon.cantidad = cantidad;
      renglon.subtotal = calcularSubtotal(cantidad, renglon.precioUnitario);
    });

    return valido;
  }

  function generarIdVenta() {
    let maximo = 0;

    Libreria.datos.ventas.forEach(function (venta) {
      const coincidencia = /^V-(\d+)$/.exec(String(venta && venta.id ? venta.id : ''));

      if (coincidencia) {
        const numero = Number.parseInt(coincidencia[1], 10);

        if (numero > maximo) {
          maximo = numero;
        }
      }
    });

    return 'V-' + String(maximo + 1).padStart(4, '0');
  }

  function confirmarVenta() {
    ocultarMensaje();
    ocultarConfirmacion();

    const cliente = obtenerCliente(refs.cliente.value);

    if (!cliente) {
      mostrarMensaje('Seleccioná un cliente para confirmar la venta.');
      refs.cliente.focus();
      return;
    }

    if (renglones.length === 0) {
      mostrarMensaje('Agregá al menos un renglón antes de confirmar la venta.');
      refs.libro.focus();
      return;
    }

    if (!sincronizarCantidades()) {
      mostrarMensaje('Revisá las cantidades: deben ser enteros mayores que cero.');
      const primero = refs.cuerpo.querySelector('input[data-libro-id]');

      if (primero) {
        primero.focus();
      }
      return;
    }

    const renglonesVenta = [];
    let total = 0;

    for (let i = 0; i < renglones.length; i += 1) {
      const renglon = renglones[i];
      const libro = obtenerLibro(renglon.libroId);

      if (!libro) {
        mostrarMensaje('El libro «' + renglon.titulo + '» ya no está disponible.');
        return;
      }

      const precioUnitario = Libreria.utils.redondearCentavos(libro.precio);
      const subtotal = calcularSubtotal(renglon.cantidad, precioUnitario);

      renglonesVenta.push({
        libroId: libro.id,
        titulo: libro.titulo,
        isbn: libro.isbn,
        cantidad: renglon.cantidad,
        precioUnitario: precioUnitario,
        subtotal: subtotal
      });
      total = Libreria.utils.redondearCentavos(total + subtotal);
    }

    const venta = {
      id: generarIdVenta(),
      fecha: Libreria.utils.fechaLocalISO(),
      clienteId: cliente.id,
      clienteNombre: cliente.nombre,
      renglones: renglonesVenta,
      total: total
    };

    Libreria.datos.ventas.push(venta);
    Libreria.store.guardarVentas();

    renglones = [];
    refs.cliente.value = '';
    refs.libro.value = '';
    refs.cantidad.value = '1';
    renderizarRenglones();
    actualizarResumen();
    Libreria.historial.refrescar();
    mostrarConfirmacion('Listo: la venta ' + venta.id + ' se registró correctamente.');
  }

  function configurarEventos() {
    refs.form.addEventListener('submit', agregarRenglon);
    refs.confirmar.addEventListener('click', confirmarVenta);

    refs.cuerpo.addEventListener('change', function (evento) {
      const control = evento.target.closest('input[data-libro-id]');

      if (control) {
        cambiarCantidad(control);
      }
    });

    refs.cuerpo.addEventListener('click', function (evento) {
      const boton = evento.target.closest('button[data-libro-id]');

      if (boton) {
        quitarRenglon(boton.dataset.libroId);
      }
    });

    refs.cliente.addEventListener('change', function () {
      ocultarMensaje();
      ocultarConfirmacion();
    });

    refs.libro.addEventListener('change', function () {
      ocultarMensaje();
      ocultarConfirmacion();
    });
  }

  function iniciarVentas() {
    if (iniciado) {
      return;
    }

    iniciado = true;
    refs = {
      form: document.getElementById('form-venta'),
      cliente: document.getElementById('venta-cliente'),
      libro: document.getElementById('venta-libro'),
      cantidad: document.getElementById('venta-cantidad'),
      mensaje: document.getElementById('venta-mensaje'),
      cuerpo: document.querySelector('#tabla-renglones tbody'),
      vacio: document.getElementById('venta-vacio'),
      articulos: document.getElementById('venta-articulos'),
      subtotal: document.getElementById('venta-subtotal'),
      total: document.getElementById('venta-total'),
      confirmar: document.getElementById('venta-confirmar'),
      confirmada: document.getElementById('venta-confirmada')
    };

    Libreria.datos.ventas = Libreria.datos.ventas || [];
    renglones = [];
    refrescar();
    renderizarRenglones();
    actualizarResumen();
    ocultarMensaje();
    ocultarConfirmacion();
    configurarEventos();
  }

  Libreria.ventas = {
    iniciar: iniciarVentas,
    refrescar: refrescar,
    confirmar: confirmarVenta
  };
})();
