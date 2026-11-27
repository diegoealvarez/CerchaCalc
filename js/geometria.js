/**
 * CerchaCalc
 * Módulo de geometría y trigonometría.
 *
 * Implementa los cálculos geométricos de una cercha
 * industrial a dos aguas con voladizo.
 */

/**
 * Calcula las dimensiones geométricas de una cercha.
 *
 * @param {Object} parametros
 * @param {number} parametros.ancho - Ancho de la bodega (m).
 * @param {number} parametros.angulo - Inclinación del techo (grados).
 * @param {number} parametros.voladizo - Voladizo por lado (m).
 *
 * @returns {Object} Resultados geométricos.
 */
export function calcularGeometria({ ancho, angulo, voladizo }) {
  // 1. Conversión de grados a radianes
  const mitadAncho = ancho / 2;
  const anguloRad = (angulo * Math.PI) / 180;

  // 2. Cálculo de altura central mediante trigonometría
  // h(x) = (x / 2) * tan(theta)
  const altura = mitadAncho * Math.tan(anguloRad);

  // 3. Longitud del agua del techo
  const largoAgua = mitadAncho / Math.cos(anguloRad);

  // 4. Longitud de viga inclinada incluyendo voladizo
  const largoViga = largoAgua + voladizo;

  // 5. Ángulo de corte en la cumbrera
  const anguloCumbrera = 180 - 2 * angulo;

  // 6. Cálculo de diagonales mediante Pitágoras
  const largoDiagonales =
    2 * Math.sqrt(Math.pow(mitadAncho / 2, 2) + Math.pow(altura / 2, 2));

  // 7. Metros totales de perfil por cercha
  const metrosPerfil = ancho + 2 * largoViga + altura + largoDiagonales;

  // 8. Retorno de resultados redondeados
  return {
    altura: Number(altura.toFixed(2)),

    largoAgua: Number(largoAgua.toFixed(2)),

    largoViga: Number(largoViga.toFixed(2)),

    anguloCorteApoyo: Number(angulo.toFixed(1)),

    anguloCorteCumbrera: Number(anguloCumbrera.toFixed(1)),

    largoDiagonales: Number(largoDiagonales.toFixed(2)),

    metrosPerfil: Number(metrosPerfil.toFixed(2)),
  };
}
