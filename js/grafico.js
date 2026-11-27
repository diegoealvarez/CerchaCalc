/**
 * CerchaCalc
 * Módulo de representación gráfica mediante SVG.
 */

export function dibujarCercha({ ancho, geometria }) {
  const svg = document.getElementById("svgCercha");

  if (!svg) {
    throw new Error("No se encontró el elemento SVG de la cercha.");
  }

  const anchoSVG = 600;
  const altoSVG = 260;
  const margen = 45;

  const escalaX = (anchoSVG - margen * 2) / ancho;

  const alturaVisual = geometria.altura;
  const escalaY = (altoSVG - margen * 2) / alturaVisual;

  const escala = Math.min(escalaX, escalaY);

  const centroX = anchoSVG / 2;
  const baseY = altoSVG - margen;

  const mitad = (ancho * escala) / 2;
  const altura = alturaVisual * escala;
  const voladizo =
    Math.max(0, geometria.largoViga - geometria.largoAgua) * escala;

  const izquierda = centroX - mitad;
  const derecha = centroX + mitad;
  const cumbreraY = baseY - altura;

  const xIzqAlero = izquierda - voladizo;
  const xDerAlero = derecha + voladizo;

  const punto = (x, y) => `${x.toFixed(2)},${y.toFixed(2)}`;

  svg.setAttribute("viewBox", `0 0 ${anchoSVG} ${altoSVG}`);

  svg.innerHTML = `
        <g fill="none" stroke-linecap="round" stroke-linejoin="round">

            <!-- Cordón inferior -->
            <line
                x1="${izquierda}" y1="${baseY}"
                x2="${derecha}" y2="${baseY}"
                stroke="#1e3a8a" stroke-width="5"
            />

            <!-- Cordones superiores -->
            <line
                x1="${xIzqAlero}" y1="${baseY}"
                x2="${centroX}" y2="${cumbreraY}"
                stroke="#0284c7" stroke-width="5"
            />

            <line
                x1="${centroX}" y1="${cumbreraY}"
                x2="${xDerAlero}" y2="${baseY}"
                stroke="#0284c7" stroke-width="5"
            />

            <!-- Montante central -->
            <line
                x1="${centroX}" y1="${cumbreraY}"
                x2="${centroX}" y2="${baseY}"
                stroke="#64748b" stroke-width="3"
            />

            <!-- Diagonales -->
            <line
                x1="${izquierda}" y1="${baseY}"
                x2="${centroX}" y2="${baseY - altura / 2}"
                stroke="#64748b" stroke-width="3"
            />

            <line
                x1="${centroX}" y1="${baseY - altura / 2}"
                x2="${derecha}" y2="${baseY}"
                stroke="#64748b" stroke-width="3"
            />

            <!-- Puntos de unión -->
            <circle cx="${izquierda}" cy="${baseY}" r="4" fill="#1e3a8a"/>
            <circle cx="${centroX}" cy="${cumbreraY}" r="4" fill="#1e3a8a"/>
            <circle cx="${derecha}" cy="${baseY}" r="4" fill="#1e3a8a"/>

            <!-- Línea de referencia -->
            <line
                x1="${izquierda}" y1="${baseY + 12}"
                x2="${derecha}" y2="${baseY + 12}"
                stroke="#94a3b8" stroke-width="1"
                stroke-dasharray="4 4"
            />

        </g>

        <g fill="#1e293b" font-size="12" text-anchor="middle">
            <text x="${centroX}" y="${cumbreraY - 12}">
                Cumbrera
            </text>
            <text x="${centroX}" y="${baseY + 28}">
                ${ancho.toFixed(2)} m
            </text>
        </g>
    `;
}
