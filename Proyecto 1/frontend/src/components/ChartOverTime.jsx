import React from "react";

const SVG_WIDTH = 400;
const SVG_HEIGHT = 300;

export default function ChartOverTime({ minutosMax, minutosVal, fecha, banner, posicion,description }) {
  const x0 = 50;
  const xAxisLength = SVG_WIDTH - x0 * 2;
  const y0 = 50;
  const yAxisLength = SVG_HEIGHT - y0 * 2;
  const xAxisY = y0 + yAxisLength;
  const numYTicks = 5;

  const maxWith = 284.5;

  //data obtenida
  const minMax = minutosMax;
  const minutos = minutosVal;

  const l1 = posicion === 0 || posicion === 3 ? "NO" : "SI";
  const l2 = posicion === 0 || posicion === 3? "SI" : "NO";
  const date = fecha;
  const tipoNo = banner;
  const descripcion = description
  //calculos
  const porcentaje = (minutos) / minMax;
  const distancia = maxWith * porcentaje;

  return (
    <div style={{ marginTop: "3%", border: "1px solid black" }}>

      <svg viewBox="20 20 400 320">

        <text x={125} y={50} fontSize="1.3em">
          Sesión {date}
        </text>

        <text x={50} y={305} fontSize="1.3em">
          {descripcion}
        </text>
        <text x={160} y={330} fontSize="1.15em">
          {tipoNo}
        </text>

        {/* grafo*/}
        <rect x="50" y="130" width={distancia} height="119.5" fill="#FF5960" stroke="gray" />
        <text x={x0 + 5 + distancia} y={y0 + 225} textAnchor="end">
          {minutos}
        </text>
        <line x1={x0 + distancia} y1={240} x2={x0 + distancia} y2={260} stroke="black" />

        {/* X axis */}
        <line
          x1={x0}
          y1={xAxisY}
          x2={x0 + xAxisLength - 15}
          y2={xAxisY}
          stroke="black"
        />
        <line x1={x0 + 285} y1={240} x2={x0 + 285} y2={260} stroke="black" />

        <text x={x0 + xAxisLength - 5} y={xAxisY - 10 - 10}>
          Tiempo
        </text>
        <text x={x0 + xAxisLength - 5} y={xAxisY + 7 - 10}>
          (minutos)
        </text>

        {/* Y axis */}
        <line x1={x0} y1={y0} x2={x0} y2={y0 + yAxisLength} stroke="black" />
        {Array.from({ length: numYTicks }).map((_, index) => {
          const y = y0 + index * (yAxisLength / numYTicks);

          return (
            <g key={index}>
              <line x1={x0} y1={y} x2={x0 - 5} y2={y} stroke="black" />
            </g>
          );
        })}
        <text x={x0 - 5} y={y0 + 85} textAnchor="end">
          {l1}
        </text>
        <text x={x0 - 5} y={y0 + 200} textAnchor="end">
          {l2}
        </text>
        <text x={x0} y={y0 - 8} textAnchor="middle">
          Sentado
        </text>

        {/* Data */}
        <text x={x0 - 1} y={y0 + 215} textAnchor="end">
          0
        </text>

        <text x={x0 + 305} y={y0 + 215} textAnchor="end">
          {minMax}
        </text>


      </svg>
    </div>
  );
}


