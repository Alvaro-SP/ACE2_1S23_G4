import { Typography } from "@mui/material";
import React from "react";

const SVG_WIDTH = 430;
const SVG_HEIGHT = 300;

export default function ChartTotalPomodoro({ sesionData }) {

  console.log("ChartTotalPomodoro", sesionData);

  // const datos = {
  //   ejecucion: 45,
  //   descanso: 5,
  //   pomodoro1: 10, 
  //   pomodoro2: 20,
  //   pomodoro3: 30,
  //   pomodoro4: 40,
  //   descanso1: 1, 
  //   descanso2: 2,
  //   descanso3: 3,
  //   descanso4: 4,
  //   fecha: "2022-03-19 08:15:30"
  // }

  const datos = sesionData;
  const fechaOrigianl = new Date(sesionData.fecha);
  const maximo = datos.ejecucion > datos.descanso ? datos.ejecucion + 5 / 100 * datos.ejecucion : datos.descanso + 5 / 100 * datos.descanso;
  //  console.log(maximo);

  const data = [
    [0, 200 * (datos.ejecucion - datos.pomodoro1) / maximo],
    [2, 200 * (datos.pomodoro1) / maximo],
    [1, 200 * (datos.descanso - datos.descanso1) / maximo],
    [3, 200 * (datos.descanso1) / maximo],

    [0, 200 * (datos.ejecucion - datos.pomodoro2) / maximo],
    [2, 200 * (datos.pomodoro2) / maximo],
    [1, 200 * (datos.descanso -  datos.descanso2) / maximo],
    [3, 200 * (datos.descanso2) / maximo],

    [0, 200 * (datos.ejecucion - datos.pomodoro3) / maximo],
    [2, 200 * (datos.pomodoro3) / maximo],
    [1, 200 * (datos.descanso -  datos.descanso3) / maximo],
    [3, 200 * (datos.descanso3) / maximo],

    [0, 200 * (datos.ejecucion - datos.pomodoro4) / maximo],
    [2, 200 * (datos.pomodoro4) / maximo],
    [1, 200 * (datos.descanso -  datos.descanso4) / maximo],
    [3, 200 * (datos.descanso4) / maximo]
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
  const numYTicks = 30;
  const barPlotWidth = xAxisLength / data.length;

  const refactorx = 10
  const refactory = 0

  const color1 = "#4287FF"
  const color3 = "#FFB742"

  const color2 = "#03A40A"
  const color4 = "#7F5FF7"

  const calcularFecha = (index,ejecucion,descanso,no) => {
    const descanzoVal = (index)/4 * descanso;
    const trabajoVal = (index)/4 * ejecucion
    const sum = no === 1 ? ejecucion : 0;

    const fecha = new Date(fechaOrigianl.getTime() + (trabajoVal + descanzoVal+sum) * 60 * 1000);
    const valor = fecha.toLocaleTimeString()
    return valor;
  };


  
  return (
    <div style={{ marginTop: "3%", border: "1px solid black" }}>
      <Typography variant="h6" component="h2" style={{ textAlign: "center",marginBottom:"2%" }}>
        Sesión {sesionData.fecha}
      </Typography>
      <svg viewBox="20 20 400 320">

        {/*leyesndas*/}
        {/* LEYENDAS */}
       
        <text x={376 - refactorx-23} y={26+refactory} textAnchor="middle" fontSize="9">
          Trabajo
        </text>
        <rect
          x={360-refactorx-22}
          y={27+refactory}
          width={50}
          height={3}
          fill={color1}
        />

       
        <text x={386 - refactorx-5} y={36+refactory+4} textAnchor="middle" fontSize="9">
         No sentarse a tiempo
        </text>
        <rect
          x={360 - refactorx-22}
          y={37+refactory+4}
          width={50}
          height={3}
          fill={color3}
        />
       
       <text x={376 - refactorx-105} y={26+refactory} textAnchor="middle" fontSize="9">
          Descanzo
        </text>
        <rect
          x={360-refactorx-110}
          y={27+refactory}
          width={50}
          height={3}
          fill={color2}
        />

       
        <text x={386 - refactorx-95} y={36+refactory+4} textAnchor="middle" fontSize="9">
        No pararse a tiempo
        </text>
        <rect
          x={360 - refactorx-110}
          y={37+refactory+4}
          width={50}
          height={3}
          fill={color4}
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
        <text x={x0 + xAxisLength} y={xAxisY + 20}>
          Inicio
        </text>

        {/* Y axis */}
        <g>
          <line x1={x0} y1={y0} x2={x0} y2={y0 + yAxisLength} stroke="grey" />
          <text x={x0 - 20} y={52} fontSize={7}>
            {(maximo).toFixed(1)}
          </text>
        </g>


        {Array.from({ length: numYTicks }).map((_, index) => {
          const y = y0 + index * (yAxisLength / numYTicks);

          return (

            <g key={index}>
              <line x1={x0 - 5} y1={y} x2={x0 + 320} y2={y} stroke="grey" />
              <text x={x0 - 20} y={303 - y} fontSize={7}>
                {(maximo * index / 30).toFixed(1)}
              </text>
            </g>

          );
        })}

        <text x={x0 + 15} y={y0 - 12} textAnchor="middle">
          Tiempo (min)
        </text>


        {/* Apple plots */}
        {data.map(([no, dataY], index) => {
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
                (index) % 4 === 0 && index !== 0 &&
                <line x1={x + applePadding / 2 - 1} y1={y0} x2={x + applePadding / 2 - 1} y2={y0 + yAxisLength} stroke="red" />
              }

              {/* Bar plot */}
              <rect
                x={x + applePadding / 2}
                y={y + height / 2 - 10.5}
                width={barPlotWidth - applePadding}
                height={height / 2 + 10}
                fill={`${ no === 0 ?  color1 : no === 1 ? color2 : no === 2 ? color3 : color4}`}
              />

               {/* Apple leaf */}
               <path
                d={`M${x + barPlotWidth / 2},${y + height / 2 - appleRadius + 3 + 3} l10,-5 l-10,0 z`}
                fill="#0B0c"
              />
              
              {/* Left apple */}
              <circle
                cx={x + barPlotWidth / 2}
                cy={y + height / 2 - 5 }
                r={appleRadius - 9}
                fill="#F00"
              />

             

              {index % 4 === 0 &&
                // <text x={90 + index * 20.5} y={275} textAnchor="middle" >
                //   {`xx:yy:zz`}
                // </text>
                <>
                <text x={300} y={-60 - index*20} textAnchor="middle" transform="rotate(90)" >
               {calcularFecha(index,datos.ejecucion,datos.descanso,0)}
              </text>
               <text x={300} y={-100 - index*20} textAnchor="middle" transform="rotate(90)" >
               {calcularFecha(index,datos.ejecucion,datos.descanso,1)}
             </text>
             </>

              }
            </g>
          );
        })}


      </svg>
      
      <Typography variant="h6" align="center" style={{ marginTop: "0%" }}>
        Tiempo de ejecución y descanso
      </Typography>
    </div>
  );
}
