/**
 * CerchaCalc
 * Módulo principal de la aplicación.
 *
 * Coordina geometría, matrices, presupuesto,
 * representación gráfica e historial.
 */

import { calcularGeometria } from "./geometria.js";
import { calcularPresupuesto } from "./presupuesto.js";
import { dibujarCercha } from "./grafico.js";

import {
  guardarCotizacion,
  obtenerHistorial,
  limpiarHistorial,
  renderizarHistorial,
} from "./historial.js";

// Elementos del formulario.
const inputAncho = document.getElementById("ancho");
const inputAngulo = document.getElementById("angulo");
const inputVoladizo = document.getElementById("voladizo");
const inputCantidad = document.getElementById("cantidad");

const btnCalcular = document.getElementById("btnCalcular");
const btnLimpiar = document.getElementById("btnLimpiar");

// Elementos de resultados.
const resAltura = document.getElementById("resAltura");
const resViga = document.getElementById("resViga");
const resAngulos = document.getElementById("resAngulos");
const resAcero = document.getElementById("resAcero");
const resCostoUnitario = document.getElementById("resCostoUnitario");
const resCostoTotal = document.getElementById("resCostoTotal");

// Matriz de presupuesto.
const detalleMatriz = document.getElementById("detalleMatriz");

// Formateador de moneda chilena.
const formatoCLP = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP",
  maximumFractionDigits: 0,
});

/**
 * Muestra un mensaje de error al usuario.
 */
function mostrarError(mensaje) {
  alert(mensaje);
}

/**
 * Obtiene y valida los datos del formulario.
 */
function obtenerDatos() {
  const ancho = Number(inputAncho.value);
  const angulo = Number(inputAngulo.value);
  const voladizo = Number(inputVoladizo.value);
  const cantidad = Number(inputCantidad.value);

  if (
    !Number.isFinite(ancho) ||
    !Number.isFinite(angulo) ||
    !Number.isFinite(voladizo) ||
    !Number.isInteger(cantidad)
  ) {
    throw new Error("Ingresa valores numéricos válidos.");
  }

  if (
    ancho <= 0 ||
    angulo <= 0 ||
    angulo >= 90 ||
    voladizo < 0 ||
    cantidad <= 0
  ) {
    throw new Error(
      "Revisa los datos: ancho y cantidad deben ser positivos, " +
        "el ángulo debe estar entre 0° y 90°, y el voladizo no puede ser negativo.",
    );
  }

  return { ancho, angulo, voladizo, cantidad };
}

/**
 * Actualiza los resultados en pantalla.
 */
function mostrarResultados(geometria, presupuesto) {
  resAltura.textContent = `${geometria.altura.toFixed(2)} m`;

  resViga.textContent = `${geometria.largoViga.toFixed(2)} m`;

  resAngulos.textContent =
    `${geometria.anguloCorteApoyo.toFixed(1)}° / ` +
    `${geometria.anguloCorteCumbrera.toFixed(1)}°`;

  resAcero.textContent = `${geometria.metrosPerfil.toFixed(2)} m`;

  resCostoUnitario.textContent = formatoCLP.format(presupuesto.costoUnitario);

  resCostoTotal.textContent = formatoCLP.format(presupuesto.costoTotal);

  mostrarMatriz(presupuesto);
}

/**
 * Representa la operación matricial Q × P.
 */
function mostrarMatriz(presupuesto) {
  if (!detalleMatriz) return;

  const cantidades = presupuesto.matrizCantidades[0];
  const precios = presupuesto.matrizPrecios.map((fila) => fila[0]);

  detalleMatriz.innerHTML = `
        <div class="matrix-box">
            <strong>Matriz Q (cantidades)</strong>
            <p>[ ${cantidades.join(" | ")} ]</p>
        </div>

        <div class="matrix-box">
            <strong>Matriz P (precios)</strong>
            ${precios
              .map((precio) => `<p>[ ${formatoCLP.format(precio)} ]</p>`)
              .join("")}
        </div>

        <div class="matrix-box">
            <strong>Resultado Q × P</strong>
            <p>${formatoCLP.format(presupuesto.costoUnitario)}</p>
        </div>
    `;
}

/**
 * Ejecuta el cálculo completo y guarda la cotización.
 */
function calcular() {
  try {
    const datos = obtenerDatos();

    const geometria = calcularGeometria(datos);

    const presupuesto = calcularPresupuesto(
      geometria.metrosPerfil,
      datos.cantidad,
    );

    mostrarResultados(geometria, presupuesto);

    dibujarCercha({
      ancho: datos.ancho,
      geometria: {
        ...geometria,
        largoViga: geometria.largoViga,
      },
    });

    guardarCotizacion({
      ancho: datos.ancho,
      angulo: datos.angulo,
      voladizo: datos.voladizo,
      cantidad: datos.cantidad,
      altura: geometria.altura,
      costoTotal: presupuesto.costoTotal,
    });

    renderizarHistorial();
  } catch (error) {
    mostrarError(error.message);
    console.error("Error en el cálculo:", error);
  }
}

/**
 * Limpia el historial previa confirmación.
 */
function limpiar() {
  const confirmar = confirm(
    "¿Estás seguro de que deseas eliminar todas las cotizaciones?",
  );

  if (!confirmar) return;

  limpiarHistorial();
  renderizarHistorial();
}

/**
 * Actualiza el dibujo automáticamente al modificar
 * los parámetros geométricos del formulario.
 */
function actualizarVistaPrevia() {
  const ancho = Number(inputAncho.value);
  const angulo = Number(inputAngulo.value);
  const voladizo = Number(inputVoladizo.value);

  const svg = document.getElementById("svgCercha");

  // Esperar hasta tener parámetros geométricos válidos.
  if (
    !Number.isFinite(ancho) ||
    !Number.isFinite(angulo) ||
    !Number.isFinite(voladizo) ||
    ancho <= 0 ||
    angulo <= 0 ||
    angulo >= 90 ||
    voladizo < 0
  ) {
    svg.innerHTML = "";
    return;
  }

  const geometria = calcularGeometria({
    ancho,
    angulo,
    voladizo,
  });

  dibujarCercha({
    ancho,
    geometria,
  });
}

// Eventos de los botones.
btnCalcular.addEventListener("click", calcular);
btnLimpiar.addEventListener("click", limpiar);

// Actualización automática del dibujo.
inputAncho.addEventListener("input", actualizarVistaPrevia);
inputAngulo.addEventListener("input", actualizarVistaPrevia);
inputVoladizo.addEventListener("input", actualizarVistaPrevia);

// Carga inicial.
actualizarVistaPrevia();
renderizarHistorial();
