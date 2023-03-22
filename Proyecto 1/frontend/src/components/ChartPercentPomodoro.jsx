
import React from "react";
import { Typography } from "@mui/material";
const SVG_WIDTH = 400;
const SVG_HEIGHT = 300;
// DEBO SPLITEAR: ["POMODORO", CUMPLIMIENTO,  PENALIZACION_POR_NO_SENTARSE_A_TIEMPO, PENALIZACION_POR_NO_PARARSE]
const data = [
  ["Pomodoro 1", 100, 0, 0],
  ["Pomodoro 2", 20, 12, 80],
  ["Pomodoro 3", 30, 70, 0],
  ["Pomodoro 4", 20, 10, 70],

];

export default function ChartPercentPomodoro() {
  const x0 = 50;
  const xAxisLength = SVG_WIDTH - x0 * 2;
  const y0 = 50;
  const yAxisLength = SVG_HEIGHT - y0 * 2;
  const xAxisY = y0 + yAxisLength;
  const dataYMax = 100
  const dataYMin = 0
  const dataYRange = dataYMax - dataYMin;
  const numYTicks = 5;
  const barPlotWidth = xAxisLength / data.length;
  let c = -10;


  return (
    <div style={{ marginTop: "3%", border: "1px solid black" }}>
      
        <Typography variant="h6" component="h2" style={{ textAlign: "center" }}>
          Sesion dd/mm/yy hh:mm:ss
        </Typography>
        
      <br />
      <svg viewBox="20 20 400 300" style={{ width: "100%", height: "auto", display: "block" }}>


        {/* X axis */}
        <line
          x1={x0}
          y1={xAxisY}
          x2={x0 + xAxisLength}
          y2={xAxisY}
          stroke="grey"
        />
        <text x={x0 + xAxisLength + 5} y={xAxisY + 4}>
          Sesion
        </text>

        

        {/* Y axis */}
        <line x1={x0} y1={y0} x2={x0} y2={y0 + yAxisLength} stroke="grey" />
        {Array.from({ length: 10 }).map((_, index) => {
          const y = y0 + index * (yAxisLength / 10);

          const yValue = Math.round(dataYMax - index * (dataYRange / 10));

          return (
            <g key={index}>
              <line x1={x0} y1={y} x2={x0 - 5} y2={y} stroke="grey" />
              <text x={x0 - 5} y={y + 5} textAnchor="end">
                {yValue}
              </text>
            </g>
          );
        })}
        {Array.from({ length: numYTicks }).map((_, index) => {
          const y = y0 + index * (yAxisLength / numYTicks);
          // Se dibuja las lineas horizontales
          return (

            <g key={index}>
              <line x1={x0} y1={y} x2={x0 + 305} y2={y} stroke="grey" />
            </g>

          );
        })}
        <text x={x0} y={y0 - 8} textAnchor="middle">%</text>
        {/* Apple plots */}
        {data.map(([pomodoro, dataY, datap1], index) => {
          const x = x0 + index * barPlotWidth;

          const yRatio = (dataY - dataYMin) / dataYRange;
          const y = y0 + (1 - yRatio) * yAxisLength;
          const height = yRatio * yAxisLength;
          c += 22;
          const applePadding = 10;
          // Calculate the radius of the apple based on the height of the bar
         
          return (
            <g key={index}>
              {/* LEYENDAS */}
              <rect
                x={360}
                y={27}
                width={50}
                height={3}
                fill="#00d115"
              ></rect>

              <text x={376} y={26} textAnchor="middle" fontSize="7">
                Cumplimiento
              </text>
              <rect
                x={360}
                y={37}
                width={50}
                height={3}
                fill="#f78205"
              ></rect>
              <text x={386} y={36} textAnchor="middle" fontSize="7">
                No pararse a tiempo
              </text>
              <rect
                x={360}
                y={47}
                width={50}
                height={3}
                fill="#de3700"
              ></rect>
              <text x={387} y={46} textAnchor="middle" fontSize="7">
                No sentarse a tiempo
              </text>

              <rect
                x={x + applePadding / 2}
                y={y}
                width={barPlotWidth - applePadding}
                height={height}
                fill="#00d115"
              >
                <title>Cumplimiento: {dataY} %</title>
              </rect>
              <rect
                x={x + applePadding / 2}
                y={50}
                width={barPlotWidth - applePadding}
                height={datap1 * 2}
                fill="#de3700"
              >
                <title>Penalización por no sentarse a tiempo: {datap1} %</title>
              </rect>
              <rect
                x={x + applePadding / 2}
                y={datap1 * 2 + 50}
                width={barPlotWidth - applePadding}
                height={200 - datap1 * 2 - height}
                fill="#f78205">
                <title>Penalización por no pararse a tiempo: {100 - (dataY + datap1)} %</title>
              </rect>

              <text x={x + barPlotWidth / 2 - 40} y={xAxisY + c} textAnchor="middle" transform="rotate(-20 100 200)" fontSize="12">
                {pomodoro}
              </text>

            </g>
          );
        })}

      </svg>
      <Typography variant="h5" align="center" style={{ marginTop: "0%" }}>
        Tiempo de ejecución y descanso
      </Typography>
    </div>
  );
}
