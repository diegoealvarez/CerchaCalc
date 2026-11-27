/**
 * CerchaCalc
 * Módulo de operaciones matriciales.
 */

/**
 * Multiplica dos matrices compatibles.
 *
 * @param {number[][]} A - Primera matriz.
 * @param {number[][]} B - Segunda matriz.
 * @returns {number[][]} Matriz resultante.
 */
export function multiplicarMatrices(A, B) {
  // Comprobar compatibilidad dimensional
  if (!A.length || !B.length || A[0].length !== B.length) {
    throw new Error("Las dimensiones de las matrices no son compatibles.");
  }

  // Crear matriz de resultados
  const resultado = Array.from({ length: A.length }, () =>
    Array(B[0].length).fill(0),
  );

  // Multiplicación matricial
  for (let i = 0; i < A.length; i++) {
    for (let j = 0; j < B[0].length; j++) {
      for (let k = 0; k < A[0].length; k++) {
        resultado[i][j] += A[i][k] * B[k][j];
      }
    }
  }

  return resultado;
}
