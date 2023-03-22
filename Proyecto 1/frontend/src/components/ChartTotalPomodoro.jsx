import { Typography } from "@mui/material";
import React from "react";

const SVG_WIDTH = 430;
const SVG_HEIGHT = 300;




export default function ChartTotalPomodoro({ sesionData }) {

  console.log("ChartTotalPomodoro", sesionData);

  // const datos = {
  //   ejecucion: 45,
  //   descanso: 5,
  //   pomodoro1: 10, //penalizacion no estaba sentado cunado debia
  //   pomodoro2: 20,
  //   pomodoro3: 30,
  //   pomodoro4: 40,
  //   descanso1: 1, //penalizacion no estaba parado cunado debia
  //   descanso2: 2,
  //   descanso3: 3,
  //   descanso4: 4,
  //   fecha: "dd/mm/yyyy xx:yy:zz"
  // }

  const datos = sesionData;
  const maximo = datos.ejecucion > datos.descanso ? datos.ejecucion + 5 / 100 * datos.ejecucion : datos.descanso + 5 / 100 * datos.descanso;
  //  console.log(maximo);

  const data = [
    ["1", 200 * (datos.ejecucion - datos.pomodoro1) / maximo],
    ["2", 200 * (datos.pomodoro1) / maximo],
    ["3", 200 * (datos.descanso1) / maximo],
    ["4", 200 * (datos.ejecucion - datos.pomodoro2) / maximo],
    ["5", 200 * (datos.pomodoro2) / maximo],
    ["6", 200 * (datos.descanso2) / maximo],
    ["7", 200 * (datos.ejecucion - datos.pomodoro3) / maximo],
    ["8", 200 * (datos.pomodoro3) / maximo],
    ["9", 200 * (datos.descanso3) / maximo],
    ["10", 200 * (datos.ejecucion - datos.pomodoro4) / maximo],
    ["11", 200 * (datos.pomodoro4) / maximo],
    ["12", 200 * (datos.descanso4) / maximo]
  ];
  // console.log(data);

  const x0 = 54;
  const xAxisLength = SVG_WIDTH - x0 * 2;
  const y0 = 50;
  const yAxisLength = SVG_HEIGHT - y0 * 2;
  const xAxisY = y0 + yAxisLength;
  const dataYMax = 100
  const dataYMin = data.reduce(
    (currMin, [_, dataY]) => Math.min(currMin, dataY),
    Infinity
  );
  const dataYRange = dataYMax - dataYMin;
  const numYTicks = 20;
  const barPlotWidth = xAxisLength / data.length;

  const refactorx = 0
  const refactory = 0
  return (
    <div style={{ marginTop: "3%", border: "1px solid black" }}>
      <Typography variant="h6" component="h2" style={{ textAlign: "center" }}>
        Sesión {sesionData.fecha}
      </Typography>
      <svg viewBox="20 20 400 320">

        {/*leyesndas*/}
        {/* LEYENDAS */}
       
        <text x={376 - refactorx} y={26+refactory} textAnchor="middle" fontSize="7">
          Trabajo
        </text>
        <rect
          x={360-refactorx}
          y={27+refactory}
          width={50}
          height={3}
          fill="#4287FF"
        />

       
        <text x={386 - refactorx} y={36+refactory} textAnchor="middle" fontSize="7">
          No pararse a tiempo
        </text>
        <rect
          x={360 - refactorx}
          y={37+refactory}
          width={50}
          height={3}
          fill="#03A40A"
        />
       
        <text x={387 - refactorx} y={46+refactory} textAnchor="middle" fontSize="7">
          No sentarse a tiempo
        </text>
        <rect
          x={360 - refactorx}
          y={47+refactory}
          width={50}
          height={3}
          fill="#CF4AFA"
        />


        {/* X axis */}
        <line
          x1={x0}
          y1={xAxisY}
          x2={x0 + xAxisLength}
          y2={xAxisY}
          stroke="grey"
        />
        <text x={x0 + xAxisLength + 5} y={xAxisY + 4}>
          Hora
        </text>

        {/* Y axis */}
        <g>
          <line x1={x0} y1={y0} x2={x0} y2={y0 + yAxisLength} stroke="grey" />
          <text x={x0 - 27} y={52} fontSize={10}>
            {(maximo).toFixed(1)}
          </text>
        </g>


        {Array.from({ length: numYTicks }).map((_, index) => {
          const y = y0 + index * (yAxisLength / numYTicks);

          return (

            <g key={index}>
              <line x1={x0 - 5} y1={y} x2={x0 + 320} y2={y} stroke="grey" />
              <text x={x0 - 27} y={303 - y} fontSize={10}>
                {(maximo * index / 20).toFixed(1)}
              </text>
            </g>

          );
        })}

        <text x={x0 + 15} y={y0 - 12} textAnchor="middle">
          Tiempo (min)
        </text>


        {/* Apple plots */}
        {data.map(([day, dataY], index) => {
          const x = x0 + index * barPlotWidth;

          const yRatio = (dataY - dataYMin) / dataYRange;

          const y = y0 + (1 - yRatio) * yAxisLength;
          const height = yRatio * yAxisLength;

          const applePadding = 2;

          // Calculate the radius of the apple based on the height of the bar
          const appleRadius = 15;

          return (
            <g key={index}>
              {
                (index) % 3 === 0 && index !== 0 &&
                <line x1={x + applePadding / 2 - 1} y1={y0} x2={x + applePadding / 2 - 1} y2={y0 + yAxisLength} stroke="red" />
              }

              {/* Bar plot */}
              <rect
                x={x + applePadding / 2}
                y={y + height / 2 - 10.5}
                width={barPlotWidth - applePadding}
                height={height / 2 + 10}
                fill={`${(index) % 3 === 0 ? "#4287FF" : (index) % 3 === 2 ? "#03A40A" : "#CF4AFA"}`}
              />
              {/* Left apple */}
              <circle
                cx={x + barPlotWidth / 2}
                cy={y + height / 2 - 10}
                r={appleRadius - 6}
                fill="#F00"
              />

              {/* Apple leaf */}
              <path
                d={`M${x + barPlotWidth / 2},${y + height / 2 - appleRadius + 3 - 10} l5,-10 l-20,0 z`}
                fill="#0B0c"
              />

              {index % 3 === 0 &&
                <text x={90 + index * 25} y={275} textAnchor="middle" >
                  {`xx:yy:zz`}
                </text>
              }
            </g>
          );
        })}


      </svg>
      <Typography variant="h6" align="center" style={{ marginTop: "-12%" }}>
        Tiempo de ejecución y descanso
      </Typography>
    </div>
  );
}
