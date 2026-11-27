/**
 * CerchaCalc
 * Módulo de presupuesto y cálculo de costos.
 */

import { multiplicarMatrices } from "./matrices.js";

// Valores unitarios de materiales y servicios.
const PRECIOS = {
  perfil: 4500,
  planchaUnion: 2800,
  kitPernos: 3500,
  flete: 85000,
};

/**
 * Calcula el presupuesto mediante multiplicación matricial Q × P.
 *
 * @param {number} metrosPerfil - Metros de perfil requeridos.
 * @param {number} cantidad - Número de cerchas.
 */
export function calcularPresupuesto(metrosPerfil, cantidad) {
  // Matriz de cantidades (Q).
  const Q = [[metrosPerfil, 9, 4]];

  // Matriz de precios unitarios (P).
  const P = [[PRECIOS.perfil], [PRECIOS.planchaUnion], [PRECIOS.kitPernos]];

  // Multiplicación matricial Q × P.
  const resultadoMatriz = multiplicarMatrices(Q, P);

  const costoUnitario = resultadoMatriz[0][0];

  // Costo total considerando cantidad de cerchas y flete.
  const costoTotal = costoUnitario * cantidad + PRECIOS.flete;

  return {
    matrizCantidades: Q,
    matrizPrecios: P,
    resultadoMatriz,
    costoUnitario,
    costoTotal,
    flete: PRECIOS.flete,
  };
}
