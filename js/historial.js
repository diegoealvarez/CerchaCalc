/**
 * CerchaCalc
 * Módulo de almacenamiento e historial de cotizaciones.
 */

const CLAVE_HISTORIAL = "historialCerchas";

/**
 * Obtiene las cotizaciones almacenadas.
 */
export function obtenerHistorial() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE_HISTORIAL)) || [];
  } catch (error) {
    console.error("Error al leer el historial:", error);
    return [];
  }
}

/**
 * Guarda una nueva cotización.
 */
export function guardarCotizacion(cotizacion) {
  const historial = obtenerHistorial();

  const nuevaCotizacion = {
    id: Date.now(),
    fecha: new Date().toLocaleString("es-CL"),
    ...cotizacion,
  };

  historial.unshift(nuevaCotizacion);

  localStorage.setItem(CLAVE_HISTORIAL, JSON.stringify(historial));

  return historial;
}

/**
 * Elimina todas las cotizaciones almacenadas.
 */
export function limpiarHistorial() {
  localStorage.removeItem(CLAVE_HISTORIAL);
  return [];
}

/**
 * Renderiza las cotizaciones en la tabla HTML.
 */
export function renderizarHistorial() {
  const tabla = document.getElementById("tablaHistorial");

  if (!tabla) {
    return;
  }

  const historial = obtenerHistorial();

  if (historial.length === 0) {
    tabla.innerHTML = `
            <tr>
                <td colspan="7">
                    No hay cotizaciones registradas.
                </td>
            </tr>
        `;
    return;
  }

  tabla.innerHTML = historial
    .map(
      (item) => `
        <tr>
            <td>${item.fecha ?? "-"}</td>

            <td>
                ${Number(item.ancho).toFixed(2)}
            </td>

            <td>
                ${Number(item.angulo).toFixed(1)}°
            </td>

            <td>
                ${Number(item.voladizo).toFixed(2)}
            </td>

            <td>
                ${item.cantidad}
            </td>

            <td>
                ${Number(item.altura).toFixed(2)}
            </td>

            <td>
                ${Number(item.costoTotal).toLocaleString("es-CL", {
                  style: "currency",
                  currency: "CLP",
                  maximumFractionDigits: 0,
                })}
            </td>
        </tr>
    `,
    )
    .join("");
}
