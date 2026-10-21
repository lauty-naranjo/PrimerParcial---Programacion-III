(function () {
  'use strict';

  const Libreria = (window.Libreria = window.Libreria || {});
  const formatoPrecio = new Intl.NumberFormat('es-AR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  function normalizarBusqueda(texto) {
    return String(texto ?? '').trim().toLocaleLowerCase('es');
  }

  function formatearPrecio(precio) {
    const numero = Number(precio);
    const centavos = Number.isFinite(numero) ? Math.round(numero * 100) / 100 : 0;
    return '$ ' + formatoPrecio.format(centavos);
  }

  function indexarPorId(lista) {
    const indice = new Map();
    lista.forEach(function (item) {
      indice.set(item.id, item);
    });
    return indice;
  }

  Libreria.utils = {
    normalizarBusqueda: normalizarBusqueda,
    formatearPrecio: formatearPrecio,
    indexarPorId: indexarPorId
  };
})();
