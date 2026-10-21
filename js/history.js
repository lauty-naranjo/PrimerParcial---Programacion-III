(function () {
  'use strict';

  const Libreria = (window.Libreria = window.Libreria || {});

  let refs = null;
  let iniciado = false;

  function crearCelda(texto, esNumero) {
    const celda = document.createElement('td');
    celda.textContent = texto;

    if (esNumero) {
      celda.className = 'tabla__numero';
    }

    return celda;
  }

  function crearFilaFecha(fecha) {
    const celda = document.createElement('td');
    const tiempo = document.createElement('time');

    tiempo.dateTime = fecha;
    tiempo.textContent = Libreria.utils.formatearFecha(fecha);
    celda.append(tiempo);
    return celda;
  }

  function crearBotonDetalle(venta) {
    const boton = document.createElement('button');
    boton.type = 'button';
    boton.className = 'boton boton--secundario boton--chico';
    boton.dataset.ventaId = venta.id;
    boton.textContent = 'Ver detalle';

    const oculto = document.createElement('span');
    oculto.className = 'visualmente-oculto';
    oculto.textContent = ' de la venta ' + venta.id;
    boton.append(oculto);

    return boton;
  }

  function crearFilaVenta(venta) {
    const fila = document.createElement('tr');
    const celdaDetalle = document.createElement('td');

    celdaDetalle.append(crearBotonDetalle(venta));
    fila.append(
      crearCelda(venta.id),
      crearFilaFecha(venta.fecha),
      crearCelda(venta.clienteNombre),
      crearCelda(Libreria.utils.formatearPrecio(venta.total), true),
      celdaDetalle
    );

    return fila;
  }

  function ocultarDetalle() {
    refs.detalle.hidden = true;
    refs.detalleCuerpo.replaceChildren();
    refs.detalleTotal.textContent = Libreria.utils.formatearPrecio(0);
  }

  function renderizarHistorial() {
    const ventas = Libreria.datos.ventas || [];
    const fragmento = document.createDocumentFragment();

    ventas.forEach(function (venta) {
      fragmento.append(crearFilaVenta(venta));
    });

    refs.cuerpo.replaceChildren(fragmento);
    refs.vacio.hidden = ventas.length > 0;
  }

  function mostrarDetalle(ventaId) {
    const venta = (Libreria.datos.ventas || []).find(function (item) {
      return item.id === ventaId;
    });

    if (!venta) {
      return;
    }

    refs.titulo.textContent = 'Venta ' + venta.id;

    const tiempo = document.createElement('time');
    tiempo.dateTime = venta.fecha;
    tiempo.textContent = Libreria.utils.formatearFecha(venta.fecha);

    refs.meta.replaceChildren(
      tiempo,
      document.createTextNode(' · ' + venta.clienteNombre)
    );
    refs.detalleTablaTitulo.textContent = 'Renglones de la venta ' + venta.id;

    const fragmento = document.createDocumentFragment();

    venta.renglones.forEach(function (renglon) {
      const fila = document.createElement('tr');
      fila.append(
        crearCelda(renglon.titulo),
        crearCelda(String(renglon.cantidad), true),
        crearCelda(Libreria.utils.formatearPrecio(renglon.precioUnitario), true),
        crearCelda(Libreria.utils.formatearPrecio(renglon.subtotal), true)
      );
      fragmento.append(fila);
    });

    refs.detalleCuerpo.replaceChildren(fragmento);
    refs.detalleTotal.textContent = Libreria.utils.formatearPrecio(venta.total);
    refs.detalle.hidden = false;
    refs.titulo.focus();
  }

  function refrescar() {
    renderizarHistorial();
    ocultarDetalle();
  }

  function configurarEventos() {
    refs.cuerpo.addEventListener('click', function (evento) {
      const boton = evento.target.closest('button[data-venta-id]');

      if (boton) {
        mostrarDetalle(boton.dataset.ventaId);
      }
    });
  }

  function iniciarHistorial() {
    if (iniciado) {
      return;
    }

    iniciado = true;
    refs = {
      cuerpo: document.querySelector('#tabla-historial tbody'),
      vacio: document.getElementById('historial-vacio'),
      detalle: document.getElementById('detalle-venta'),
      titulo: document.getElementById('detalle-titulo'),
      meta: document.getElementById('detalle-meta'),
      detalleTablaTitulo: document.getElementById('detalle-tabla-titulo'),
      detalleCuerpo: document.querySelector('#detalle-renglones tbody'),
      detalleTotal: document.getElementById('detalle-total')
    };

    configurarEventos();
    refrescar();
  }

  Libreria.historial = {
    iniciar: iniciarHistorial,
    refrescar: refrescar,
    mostrarDetalle: mostrarDetalle
  };
})();
