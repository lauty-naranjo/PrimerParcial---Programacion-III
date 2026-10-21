(function () {
  'use strict';

  const Libreria = (window.Libreria = window.Libreria || {});
  const TEXTO_SIN_GENERO = 'Sin clasificar';
  const formatoPrecio = new Intl.NumberFormat('es-AR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  function normalizarBusqueda(texto) {
    return String(texto ?? '').trim().toLocaleLowerCase('es');
  }

  function normalizarIsbn(isbn) {
    return String(isbn ?? '').replace(/[\s-]+/g, '');
  }

  function normalizarEmail(email) {
    return String(email ?? '').trim().toLowerCase();
  }

  function esEmailValido(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email ?? '').trim());
  }

  function redondearCentavos(precio) {
    const numero = Number(precio);

    if (!Number.isFinite(numero)) {
      return NaN;
    }

    return Math.round((numero + Number.EPSILON) * 100) / 100;
  }

  function formatearPrecio(precio) {
    const centavos = redondearCentavos(precio);
    return '$ ' + formatoPrecio.format(Number.isFinite(centavos) ? centavos : 0);
  }

  function indexarPorId(lista) {
    const indice = new Map();
    lista.forEach(function (item) {
      indice.set(item.id, item);
    });
    return indice;
  }

  function generarId(prefijo, lista) {
    let maximo = 0;

    (lista || []).forEach(function (item) {
      const id = String(item && item.id != null ? item.id : '');

      if (!id.startsWith(prefijo)) {
        return;
      }

      const sufijo = id.slice(prefijo.length);

      if (!/^\d+$/.test(sufijo)) {
        return;
      }

      const numero = Number.parseInt(sufijo, 10);

      if (numero > maximo) {
        maximo = numero;
      }
    });

    return prefijo + (maximo + 1);
  }

  function poblarSelect(select, opciones, textoVacio, valorPrevio) {
    const fragmento = document.createDocumentFragment();

    if (textoVacio !== null && textoVacio !== undefined) {
      const vacia = document.createElement('option');
      vacia.value = '';
      vacia.textContent = textoVacio;
      fragmento.append(vacia);
    }

    opciones.forEach(function (opcion) {
      const elemento = document.createElement('option');
      elemento.value = opcion.valor;
      elemento.textContent = opcion.texto;
      fragmento.append(elemento);
    });

    select.replaceChildren(fragmento);

    const existe = opciones.some(function (opcion) {
      return opcion.valor === valorPrevio;
    });

    select.value = existe ? valorPrevio : '';
  }

  Libreria.utils = {
    TEXTO_SIN_GENERO: TEXTO_SIN_GENERO,
    normalizarBusqueda: normalizarBusqueda,
    normalizarIsbn: normalizarIsbn,
    normalizarEmail: normalizarEmail,
    esEmailValido: esEmailValido,
    redondearCentavos: redondearCentavos,
    formatearPrecio: formatearPrecio,
    indexarPorId: indexarPorId,
    generarId: generarId,
    poblarSelect: poblarSelect
  };
})();
