// @mui material components
import Grid from "@mui/material/Grid";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import React, { useRef, useState, useEffect } from "react";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
// import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
// import PieChart from "examples/Charts/PieChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
// Data
// import RadarChart from "examples/Charts/RadarChart";

import Sketch from "react-p5";
// import axios from "axios";
// llamamos al socket de la APi

// /get-all-temperature-data
// /get-all-humidity-data
// /get-all-wind-speed-data
// /get-all-wind-direction-data
// /get-all-barometric-pressure-data
// /get-latest-data
function Dashboard() {
  // ! *************** VARIABLES DE DASH PRINCIPAL LATEST *****************
  const [textdirection, setTextdirection] = useState("CONNECT");
  const [statTemperature, setStatTemperature] = useState(0);
  const [statHumidityRel, setStatHumidityRel] = useState(0);
  const [statHumidityAbs, setStatHumidityAbs] = useState(0);
  const [statSpeed, setStatSpeed] = useState(0);
  const [statDirection, setStatDirection] = useState([0, 0, 0.3, 1, 0.3, 0, 0, 0]);
  const [statPressure, setStatPressure] = useState(0);
  // ! *************** VARIABLES DE REPORTES EN EL TIEMPO *****************
  const [varTemperature, setVarTemperature] = useState([]);
  const [varPressure, setVarPressure] = useState([]);
  const [varSpeed, setVarSpeed] = useState([]);
  const [varDirection, setVarDirection] = useState([]);
  const [varHumidityRel, setVarHumidityRel] = useState([]);
  const [varHumidityAbs, setVarHumidityAbs] = useState([]);
  const [direccionNum, setDireccionNum] = useState(0);
  const [max, setMax] = useState(0);
  const [avg, setAvg] = useState(0);
  const [max1, setMax1] = useState(0);
  const [avg1, setAvg1] = useState(0);
  const [max2, setMax2] = useState(0);
  const [avg2, setAvg2] = useState(0);
  //! # 0 = Temperatura
  //! # 1 = Humedad relativa
  //! # 2 = Velcidad del viento
  //! # 3 = Direccion del viento
  //! # 4 = Presion barometriva
  //! # 5 = Humedad absoluta
  useEffect(() => {
    const fetchDataL = async () => {
      const response0 = await fetch("http://localhost:5000/get-all-data");
      const json0 = await response0.json();
      setVarTemperature(json0[0].map((item) => item.Valor));
      setVarHumidityRel(json0[1].map((item) => item.Valor));
      setVarSpeed(json0[2].map((item) => item.Valor));
      setVarDirection(json0[3].map((item) => item.Valor));
      setVarPressure(json0[4].map((item) => item.Valor));
      setVarHumidityAbs(json0[5].map((item) => item.Valor));

      // varHumidityAbs.push(Math.floor(Math.random() * 1000) + Math.random());
      // varHumidityRel.push(Math.floor(Math.random() * 1000) + Math.random());
      // varTemperature.push(Math.floor(Math.random() * 1000) + Math.random());
      // varSpeed.push(Math.floor(Math.random() * 1000) + Math.random());
      // varPressure.push(Math.floor(Math.random() * 1000) + Math.random());
      // for (var i = 0; i < 2; i++) {
      //   varDirection.push(Math.floor(Math.random() * 9));
      // }
      // setVarHumidityAbs(varHumidityAbs);
      // setVarHumidityRel(varHumidityRel);
      // setVarTemperature(varTemperature);
      // setVarDirection(varDirection);
      // setVarSpeed(varSpeed);
      // setVarPressure(varPressure);
      const maxtemp = Math.floor(Math.max(...varHumidityAbs)) + 1;
      const avgtemp = Math.floor(varHumidityAbs.reduce((a, b) => a + b, 0) / varHumidityAbs.length);
      setMax(maxtemp);
      setAvg(avgtemp);
      const maxtemp1 = Math.floor(Math.max(...varHumidityRel)) + 1;
      const avgtemp1 = Math.floor(varHumidityRel.reduce((a, b) => a + b, 0) / varHumidityRel.length);
      setMax1(maxtemp1);
      setAvg1(avgtemp1);

      const response6 = await fetch("http://localhost:5000/get-latest-data");
      const json6 = await response6.json();
      setStatTemperature(json6[0].Valor);
      setStatHumidityRel(json6[1].Valor);
      setStatSpeed(json6[2].Valor);
      setStatPressure(json6[4].Valor);
      setStatHumidityAbs(json6[5].Valor);
      let newDirections = [0, 0, 0, 0, 0, 0, 0, 0];
      json6[3].Valor = 5;
      setDireccionNum(json6[3].Valor);
      switch (direccionNum) {
        case 1:
          newDirections[0] = 1;
          newDirections[7] = 0.3;
          newDirections[1] = 0.3;
          setTextdirection("NORTE");
          break;
        case 2:
          newDirections[1] = 1;
          newDirections[0] = 0.3;
          newDirections[2] = 0.3;
          setTextdirection("NORESTE");
          break;
        case 3:
          newDirections[2] = 1;
          newDirections[1] = 0.3;
          newDirections[3] = 0.3;
          setTextdirection("ESTE");
          break;
        case 4:
          newDirections[3] = 1;
          newDirections[2] = 0.3;
          newDirections[4] = 0.3;
          setTextdirection("SURESTE");
          break;
        case 5:
          newDirections[4] = 1;
          newDirections[3] = 0.3;
          newDirections[5] = 0.3;
          setTextdirection("SUR");
          break;
        case 6:
          newDirections[5] = 1;
          newDirections[4] = 0.3;
          newDirections[6] = 0.3;
          setTextdirection("SUROESTE");
          break;
        case 7:
          newDirections[6] = 1;
          newDirections[5] = 0.3;
          newDirections[7] = 0.3;
          setTextdirection("OESTE");
          break;
        case 8:
          newDirections[7] = 1;
          newDirections[6] = 0.3;
          newDirections[0] = 0.3;
          setTextdirection("NOROESTE");
          break;
        default:
          break;
      }
      setStatDirection(newDirections);
      newDirections = statDirection;
    };
    const intervalId1 = setInterval(fetchDataL, 15000);
    return () => {
      clearInterval(intervalId1);
    };
  }, []);
  // ? --------------------------- PROCESSING OVER THE TIME ---------------------------------
  // ! TEMPERATURA A TRAVEZ DEL TIEMPO

  let spacer22 = 10;
  const setup1 = (p5, canvasParentRef) => {
    p5.createCanvas(1120, 300).parent(canvasParentRef);
    console.log("size: length, width", 100 * spacer22, 200)
  };

  const draw1 = (p5) => {
    const max2 = Math.floor(Math.max(...varTemperature)) + 1;
    const avg2 = Math.floor(varTemperature.reduce((a, b) => a + b, 0) / varTemperature.length);

    const min = Math.floor(Math.min(...varTemperature));
    let porcentajeX = (p5.width - (160)) / varTemperature.length;
    let porcentajeY = Math.abs(((p5.height - (15)) / max2) / 2);

    p5.background(0);
    //p5.background(255);

    //titulo
    p5.fill(255, 255, 255);
    p5.stroke(0);
    p5.text('Temperatura (°C)', 400, 20);


    // a = a + 1;
    p5.stroke(255);
    p5.line(a, 25, a, p5.height);


    //paredes 
    p5.stroke(255);
    p5.line(p5.width - (160), 25, p5.width - (160), p5.height);
    p5.line(p5.width - 110, 25, p5.width - 110, p5.height);
    let Porcentaje10 = p5.height / 11;
    //lineas de grafo
    for (let i = 0; i < 11; i++) {
      p5.textSize(15);
      p5.stroke(140);
      p5.line(0, p5.height - i * Porcentaje10, p5.width - (160), p5.height - i * Porcentaje10);

      p5.stroke(255);


      if (i > 5) {
        p5.text(`${Math.floor(Math.abs(max2 / 5 * (i - 5)))}`, p5.width - (160) + 5, p5.height - i * Porcentaje10 - 1);
      }
      if (i < 5) {
        p5.text(`${Math.floor(min / 5 * (5 - i))}`, p5.width - (160) + 5, p5.height - i * Porcentaje10 - 1);
      }


      if (i == 5) {
        p5.text(`0`, p5.width - (160) + 5, p5.height - i * Porcentaje10 - 1);
      }

    }

    //leyendas avg2
    p5.textSize(20);
    p5.stroke(0);
    p5.text(`avg:${avg2}`, p5.width - 100, 115);

    p5.stroke(255);
    p5.line(0, (p5.height + 30) / 2, p5.width, (p5.height + 30) / 2);

    for (let x = 0; x < varTemperature.length; x++) {
      p5.stroke(255, 211, 47);

      // if (porcentajeX * x < a) {
      if (varTemperature[x] == 0) {
        p5.ellipse(porcentajeX * x, (p5.height + 30) / 2 + varTemperature[x] * porcentajeY, 4, 4);
      } else if (varTemperature[x] > 0) {
        p5.line(porcentajeX * x, (p5.height + 34) / 2, porcentajeX * x, varTemperature[x] * porcentajeY + 25);
      } else {
        p5.stroke(14, 226, 255);

        // console.log("negativo",varTemperature[x])
        // console.log("%",varTemperature[x]*porcentajeY)
        p5.line(porcentajeX * x, (p5.height + 34) / 2, porcentajeX * x, (p5.height + 34) / 2 + varTemperature[x] * porcentajeY * -1);
      }


      // }

      //(p5.height+34)/2+
    }

  };

  function star(p5, x, y, radius1, radius2, npoints) {
    const angle = p5.TWO_PI / npoints;
    const halfAngle = angle / 2.0;
    p5.beginShape();
    for (let a = 0; a < p5.TWO_PI; a += angle) {
      let sx = x + p5.cos(a) * radius2;
      let sy = y + p5.sin(a) * radius2;
      p5.vertex(sx, sy);
      sx = x + p5.cos(a + halfAngle) * radius1;
      sy = y + p5.sin(a + halfAngle) * radius1;
      p5.vertex(sx, sy);
    }
    p5.endShape(p5.CLOSE);
  }
  // ! HUMEDAD RELATIVA A TRAVEZ DEL TIEMPO
  let a = 0;
  const spacer1 = 10;
  const setup2 = (p5, canvasParentRef) => {
    p5.createCanvas(1130, 300).parent(canvasParentRef);
  };
  const draw2 = (p5) => {
    const porcentajeX = (p5.width - 160) / varHumidityRel.length;
    const porcentajeY = (p5.height - 30) / max1;
    const Porcentaje10 = p5.height / 11;
    p5.background(0);
    // titulo
    p5.stroke(255);
    p5.text("Humedad Relativa (%)", 400, 20);
    a += 1;
    p5.line(a, 25, a, p5.height);
    // lineas de grafo
    for (let i = 0; i < 11; i += 1) {
      p5.textSize(15);
      p5.stroke(140);
      p5.line(0, p5.height - i * Porcentaje10, p5.width - 160, p5.height - i * Porcentaje10);
      p5.stroke(255);
      p5.text(
        `${Math.floor((max1 / 10) * i)}`,
        p5.width - 160 + 5,
        p5.height - i * Porcentaje10 - 1
      );
    }
    // paredes
    p5.stroke(255);
    p5.line(p5.width - 160, 25, p5.width - 160, p5.height);
    p5.line(p5.width - 110, 25, p5.width - 110, p5.height);
    p5.line(0, 0, 0, p5.height);
    p5.line(0, 0, p5.width, 0);
    p5.line(p5.width, 0, p5.width, p5.height);
    p5.line(0, p5.height, p5.width, p5.height);
    p5.textSize(20);
    // leyendas avg
    p5.text(`Avg:${avg1}`, p5.width - 100, 115);
    for (var x = 0; x < varHumidityRel.length; x += 1) {
      p5.stroke(218, 126, 255);
      if (varHumidityRel[x] >= avg1) p5.stroke(0, 100, 255);
      // if (porcentajeX * x < a) {
      p5.line(
        porcentajeX * x,
        p5.height,
        porcentajeX * x,
        p5.height - varHumidityRel[x] * porcentajeY
      );
      // }
      // p5.ellipse(porcentajeX*x,  p5.height-varHumidityRel[x]*porcentajeY, 1, 1);
    }
    if (a > p5.width - 160) a = 0;
  };
  // ! VELOCIDAD A TRAVEZ DEL TIEMPO
  let axd = 0;
  const setup3 = (p5, canvasParentRef) => {
    p5.createCanvas(1120, 300).parent(canvasParentRef);
    console.log("size: length, width", 100 * 10, 200)
  };

  const draw3 = (p5) => {
    const max = Math.floor(Math.max(...varSpeed)) + 1;
    const avg = Math.floor(varSpeed.reduce((a, b) => a + b, 0) / varSpeed.length);
    let porcentajeX = (p5.width - (160)) / varSpeed.length;
    let porcentajeY = (p5.height - (30)) / max;
    let Porcentaje10 = p5.height / 11;
    p5.background(0);
    //p5.background(255);

    //titulo
    p5.fill(255, 255, 255);
    p5.stroke(0);
    p5.text('Velocidad (Km/h)', 400, 20);


    axd = axd + 1;
    p5.stroke(255);
    p5.line(axd, 25, axd, p5.height);

    //lineas de grafo
    for (let i = 0; i < 11; i++) {
      p5.textSize(15);
      p5.stroke(140);
      p5.line(0, p5.height - i * Porcentaje10, p5.width - (160), p5.height - i * Porcentaje10);
      p5.stroke(0);
      p5.text(`${Math.floor(max / 10 * (i))}`, p5.width - (160) + 5, p5.height - i * Porcentaje10 - 1);
    }



    //paredes 
    p5.stroke(255);
    p5.line(p5.width - (160), 25, p5.width - (160), p5.height);
    p5.line(p5.width - 110, 25, p5.width - 110, p5.height);



    p5.textSize(20);

    //leyendas avg
    p5.stroke(0);
    p5.text(`Avg:${avg}`, p5.width - 100, 115);

    for (let x = 0; x < varSpeed.length; x++) {
      p5.stroke(255, 211, 47);


      if (varSpeed[x] >= avg)
        p5.stroke(255, 79, 47);


      // if (porcentajeX * x < a)
      //p5.ellipse(porcentajeX*x,  p5.height-varSpeed[x]*porcentajeY, 1, 1);
      p5.line(porcentajeX * x, p5.height, porcentajeX * x, p5.height - varSpeed[x] * porcentajeY);
    }



    if (axd > p5.width - 160)
      axd = 0;

  };

  // ! DIRECCION A TRAVEZ DEL TIEMPO

  let axdxdx = 0;
  let spacerxdxd = 10;
  const setup4 = (p5, canvasParentRef) => {
    p5.createCanvas(1120, 300).parent(canvasParentRef);
    console.log("size: length, width", 100 * spacerxdxd, 200)
  };

  const draw4 = (p5) => {
    let avg = Math.floor(varDirection.reduce((a, b) => a + b, 0) / varDirection.length);
    if (avg == 0) {
      avg = "";
    } else if (avg == 1) {
      avg = "N";
    } else if (avg == 2) {
      avg = "NE";
    } else if (avg == 3) {
      avg = "E";
    } else if (avg == 4) {
      avg = "SE";
    } else if (avg == 5) {
      avg = "S";
    } else if (avg == 6) {
      avg = "SW";
    } else if (avg == 7) {
      avg = "W";
    } else if (avg == 8) {
      avg = "NW";
    }
    let porcentajeX = (p5.width - (160)) / varDirection.length;
    let porcentajeY = (p5.height) / 9;
    let Porcentaje10 = (p5.height) / 9;
    p5.background(0);
    //p5.background(255);

    //titulo
    p5.fill(255, 255, 255);
    p5.stroke(0);
    p5.text('Direccion ', 400, 20);


    axdxdx = axdxdx + 1;
    p5.stroke(255);
    p5.line(axdxdx, 25, axdxdx, p5.height);

    //lineas de grafo
    for (let i = 0; i < 9; i++) {
      p5.textSize(15);
      p5.stroke(140);
      p5.line(0, p5.height - i * Porcentaje10, p5.width - (160), p5.height - i * Porcentaje10);
      p5.stroke(0);
      let text = ""
      if (i == 0) {
        text = "";
      } else if (i == 1) {
        text = "N";
      } else if (i == 2) {
        text = "NE";
      } else if (i == 3) {
        text = "E";
      } else if (i == 4) {
        text = "SE";
      } else if (i == 5) {
        text = "S";
      } else if (i == 6) {
        text = "SW";
      } else if (i == 7) {
        text = "W";
      } else if (i == 8) {
        text = "NW";
      }
      p5.text(`${text}`, p5.width - (160) + 5, p5.height - i * Porcentaje10 - 1);
    }

    //leyendas avg
    p5.textSize(20);
    p5.text(`Avg:${avg}`, p5.width - 100, 115);

    //paredes 
    p5.stroke(255);
    p5.line(p5.width - (160), 25, p5.width - (160), p5.height);
    p5.line(p5.width - 110, 25, p5.width - 110, p5.height);



    p5.textSize(20);

    //leyendas avg
    p5.stroke(0);


    for (let x = 0; x < varDirection.length; x++) {


      //  if(porcentajeX*x<a){
      if (varDirection[x] == 1) {
        p5.stroke(255, 14, 14);
      } else if (varDirection[x] == 2) {
        p5.stroke(255, 248, 14);
      } else if (varDirection[x] == 3) {
        p5.stroke(14, 255, 25);
      } else if (varDirection[x] == 4) {
        p5.stroke(14, 211, 251);
      } else if (varDirection[x] == 5) {
        p5.stroke(14, 98, 255);
      } else if (varDirection[x] == 6) {
        p5.stroke(215, 14, 255);
      } else if (varDirection[x] == 7) {
        p5.stroke(255, 14, 98);
      } else if (varDirection[x] == 8) {
        p5.stroke(255, 142, 14);
      } else {
        continue;
      }

      p5.ellipse(porcentajeX * x, p5.height - varDirection[x] * porcentajeY, 4, 4);
      p5.line(porcentajeX * x, p5.height, porcentajeX * x, p5.height - varDirection[x] * porcentajeY);
      //  }

    }



    if (axdxdx > p5.width - 160)
      axdxdx = 0;

  };
  const setup4E = (p5, canvasParentRef) => {
    p5.createCanvas(500, 500).parent(canvasParentRef);
  };
  const draw4E = (p5) => {
    p5.background(255);
    p5.strokeWeight(8);
    p5.stroke(0);
    p5.fill(255);
    p5.ellipse(250, 250, 400, 400);

    p5.strokeWeight(1);
    p5.fill(0);
    p5.textSize(40); // Increase text size for better visibility

    p5.fill(255);
    p5.ellipse(250, 250, 400, 400);
    p5.fill(0);
    p5.textAlign(p5.CENTER, p5.TOP);
    p5.text("N", 250, 70);
    p5.textSize(24);
    p5.text("NE", 365, 130);
    p5.textAlign(p5.RIGHT, p5.CENTER);
    p5.textSize(40);
    p5.text("E", 430, 250);
    p5.textSize(24);
    p5.text("SE", 400, 360);
    p5.textAlign(p5.CENTER, p5.BOTTOM);
    p5.textSize(40);
    p5.text("S", 250, 440);
    p5.textSize(24);
    p5.text("SW", 145, 385);
    p5.textAlign(p5.LEFT, p5.CENTER);
    p5.textSize(40);
    p5.text("W", 80, 250);
    p5.textSize(24);
    p5.text("NW", 100, 150);

    p5.strokeWeight(4);
    p5.fill(255, 0, 0);
    p5.push();
    p5.translate(250, 250);
    p5.rotate(p5.radians(direccionNum * 45 - 135));
    p5.push();
    p5.translate(0, 0);
    p5.rotate(p5.frameCount / 200.0);
    star(p5, 0, 0, 10, 80, 6);
    p5.pop();
    p5.strokeWeight(10);
    p5.line(0, 0, 120, 0);
    p5.strokeWeight(4);
    p5.triangle(130, 0, 90, -10, 90, 10);
    p5.pop();
    // angle += 1;
  };
  // ! PRESION A TRAVEZ DEL TIEMPO
  let aaax = 0;
  const setup5 = (p5, canvasParentRef) => {
    p5.createCanvas(1120, 300).parent(canvasParentRef);
  };

  const draw5 = (p5) => {
    const max = Math.floor(Math.max(...varPressure)) + 1;
    const avg = Math.floor(varPressure.reduce((a, b) => a + b, 0) / varPressure.length);
    let porcentajeX = (p5.width - (160)) / varPressure.length;
    let porcentajeY = (p5.height - (30)) / max;
    let Porcentaje10 = p5.height / 11;
    p5.background(0);
    //p5.background(255);

    //titulo
    p5.fill(255, 255, 255);
    p5.stroke(0);
    p5.text('Presion (mmhg)', 400, 20);


    aaax = aaax + 1;
    p5.stroke(255);
    p5.line(aaax, 25, aaax, p5.height);

    //lineas de grafo
    for (let i = 0; i < 11; i++) {
      p5.textSize(15);
      p5.stroke(140);
      p5.line(0, p5.height - i * Porcentaje10, p5.width - (160), p5.height - i * Porcentaje10);
      p5.stroke(0);
      p5.text(`${Math.floor(max / 10 * (i))}`, p5.width - (160) + 5, p5.height - i * Porcentaje10 - 1);
    }



    //paredes 
    p5.stroke(255);
    p5.line(p5.width - (160), 25, p5.width - (160), p5.height);
    p5.line(p5.width - 110, 25, p5.width - 110, p5.height);



    p5.textSize(20);

    //leyendas avg
    p5.stroke(0);
    p5.text(`Avg:${avg}`, p5.width - 100, 115);

    for (let x = 0; x < varPressure.length; x++) {
      p5.stroke(255, 211, 47);


      if (varPressure[x] >= avg)
        p5.stroke(255, 79, 47);


      // if (porcentajeX * x < a)
      //p5.ellipse(porcentajeX*x,  p5.height-varPressure[x]*porcentajeY, 1, 1);
      p5.line(porcentajeX * x, p5.height, porcentajeX * x, p5.height - varPressure[x] * porcentajeY);
    }



    if (aaax > p5.width - 160)
      aaax = 0;

  };
  // ! HUMEDAD ABSOLUTA A TRAVEZ DEL TIEMPO
  a = 0;
  const spacer = 10;
  const setup6 = (p5, canvasParentRef) => {
    p5.createCanvas(1130, 300).parent(canvasParentRef);
  };
  const draw6 = (p5) => {
    const porcentajeX = (p5.width - 160) / varHumidityAbs.length;
    const porcentajeY = (p5.height - 30) / max;
    const Porcentaje10 = p5.height / 11;
    p5.background(255);
    // titulo
    p5.stroke(255);
    p5.text("Humedad Absoluta (GR/m^3)", 400, 20);
    a += 1;
    p5.line(a, 25, a, p5.height);
    // lineas de grafo
    for (let i = 0; i < 11; i += 1) {
      p5.textSize(15);
      p5.stroke(140);
      p5.line(0, p5.height - i * Porcentaje10, p5.width - 160, p5.height - i * Porcentaje10);
      p5.stroke(255);
      p5.text(
        `${Math.floor((max / 10) * i)}`,
        p5.width - 160 + 5,
        p5.height - i * Porcentaje10 - 1
      );
    }
    // paredes
    p5.stroke(0);
    p5.line(p5.width - 160, 25, p5.width - 160, p5.height);
    p5.line(p5.width - 110, 25, p5.width - 110, p5.height);
    p5.line(0, 0, 0, p5.height);
    p5.line(0, 0, p5.width, 0);
    p5.line(p5.width, 0, p5.width, p5.height);
    p5.line(0, p5.height, p5.width, p5.height);
    p5.textSize(20);
    // leyendas avg
    p5.text(`Avg:${avg}`, p5.width - 100, 115);
    for (var x = 0; x < varHumidityAbs.length; x += 1) {
      p5.stroke(218, 126, 255);
      if (varHumidityAbs[x] >= avg) p5.stroke(0, 100, 255);
      // if (porcentajeX * x < a) {
      p5.line(
        porcentajeX * x,
        p5.height,
        porcentajeX * x,
        p5.height - varHumidityAbs[x] * porcentajeY
      );
      // }
      // p5.ellipse(porcentajeX*x,  p5.height-varHumidityAbs[x]*porcentajeY, 1, 1);
    }
    if (a > p5.width - 160) a = 0;
  };
  // ? --------------------------- PROCESSING DASHBOARD ---------------------------------
  // ! TEMPERATURA DASHBOARD

  let last0 = statTemperature;


  const setup1A = (p5, canvasParentRef) => {
    p5.createCanvas(400, 200).parent(canvasParentRef);

  };

  let millis0 = 0;
  let millis10 = 0;

  var angle0 = 0.0;
  var offset0 = 100;
  var scalar0 = 40;
  var speed0 = 0.05;

  var Rred = '#FF0000'
  var Bred = '#002EFF'
  var Wred = '#FFFFFF'

  const draw1A = (p5) => {
    p5.background(0);
    var y1 = offset0 + p5.sin(angle0) * scalar0;
    var y2 = offset0 + p5.sin(angle0 + 0.4) * scalar0;
    var y3 = offset0 + p5.sin(angle0 + 0.8) * scalar0;

    var color = Wred
    if (last0 === statTemperature) {
      color = Wred
    } else if (statTemperature > last0) {
      color = Rred
    } else if (statTemperature < last0) {
      color = Bred

    }

    p5.fill(color);

    p5.ellipse(80, y1, 40, 40);
    p5.ellipse(120, y2, 40, 40);
    p5.ellipse(160, y3, 40, 40);
    angle += speed0;

    p5.fill(255);
    p5.textSize(40);
    p5.text(`${statTemperature}`, 230, 110);
    p5.textSize(20);
    p5.text('Temperatura', 230, 35);
    p5.text('(%)', 230, 140);

    let crr_millis = p5.millis();
    if (crr_millis >= millis0 + 5000 || p5.millis() <= 35) {
      if (crr_millis >= millis0 + 5000) {
        millis0 = crr_millis
      }
      last0 = statTemperature;
      // var num = Math.floor(Math.random() * 10);
      // num *= Math.round(Math.random()) ? 1 : -1;
      // valor = num

    }
  };

  // ! HUMEDAD DASHBOARD
  let last2 = setStatHumidityRel;

  const setup2A = (p5, canvasParentRef) => {
    p5.createCanvas(400, 200).parent(canvasParentRef);
  };

  let millis2 = 0;
  let millis12 = 0;
  const draw2A = (p5) => {
    let crr_millis = p5.millis();
    if (crr_millis >= millis2 + 5000 || p5.millis() <= 35) {
      if (crr_millis >= millis2 + 5000) {
        millis2 = crr_millis
      }
      p5.background(255);
      // valor = Math.floor(Math.random() * 10);
      //titulo
      p5.stroke(255);
      p5.fill(0);
      p5.textSize(20);
      p5.text('Humedad Relativa', 230, 25);


      p5.text('(%)', 250, 140);
      p5.textSize(40);
      p5.text(`${statHumidityRel}`, 230, 110);

      //paredes 
      p5.stroke(0);
      p5.line(0, 0, 0, p5.height);
      p5.line(0, 0, p5.width, 0);
      p5.line(p5.width, 0, p5.width, p5.height);
      p5.line(0, p5.height, p5.width, p5.height);

      //300 - 150 - 50

      let porcent = last2 === 0 || setStatHumidityRel === 0 ? 0 : setStatHumidityRel / last2;
      p5.fill(255, 197, 0, 150 * porcent + 25);
      let x = Math.floor(Math.random() * (p5.width - 200)) + 200
      let y = Math.floor(Math.random() * (p5.height - 60 - 90)) + 100
      p5.ellipse(x - 220, y, 150, 150);
      last2 = setStatHumidityRel;
    }

    if (crr_millis >= millis12 + 500) {
      let x = Math.floor(Math.random() * (p5.width - 200)) + 200
      let y = Math.floor(Math.random() * (p5.height))
      p5.ellipse(x - 220, y, 15, 15);
      millis12 = crr_millis
    }
  };



  // ! VELOCIDAD DASHBOARD
  let maxSpeed = 80;
  let angle = 0;
  const setup3A = (p, canvasParentRef) => {
    p.createCanvas(400, 200).parent(canvasParentRef);;
    p.angleMode(p.DEGREES);
  };

  const draw3A = (p) => {
    p.background("white");
    p.translate(p.width / 2, p.height / 2);
    // Dibujamos el dial del velocímetro
    p.stroke(0);
    p.strokeWeight(2);
    p.noFill();
    for (let i = 0; i <= maxSpeed; i += 2) {
      let angle = p.map(i, 0, maxSpeed, -250, 750);
      let x = Math.cos(angle) * 80;
      let y = Math.sin(angle) * 80;
      p.line(0, 0, x, y);
    }

    // Dibujamos los números del dial
    p.textAlign(p.CENTER, p.CENTER);
    p.noStroke();
    p.fill(0);
    for (let i = 0; i <= maxSpeed; i += 5) {
      let angle = p.map(i, 0, maxSpeed, -230, 80);
      let x = p.cos(angle) * 90;
      let y = p.sin(angle) * 90;
      p.text(i, x, y);
    }
    // Dibujamos el indicador de velocidad
    p.fill(255, 0, 0);
    p.noStroke();
    angle = p.map(statSpeed, 0, maxSpeed, -140, 160); // se actualiza el ángulo del indicador
    p.rotate(angle);
    p.triangle(-10, -30, 10, -30, 0, -140);
  };
  // ! DIRECCION DASHBOARD
  const setup4A = (p5, canvasParentRef) => {
    p5.createCanvas(400, 200).parent(canvasParentRef);
  };
  const draw4A = (p5) => {
    p5.background(255);
    p5.strokeWeight(8);
    p5.stroke(0);
    p5.fill(255);
    p5.ellipse(200, 100, 196, 196);

    p5.strokeWeight(1);
    p5.fill(0);
    p5.textSize(32);

    p5.fill(255);
    p5.ellipse(200, 100, 196, 196);
    p5.fill(0);
    p5.textAlign(p5.CENTER, p5.TOP);
    p5.text("N", 200, 2);
    p5.textSize(18);
    p5.text("NE", 270, 40);
    p5.textAlign(p5.RIGHT, p5.CENTER);
    p5.textSize(32);
    p5.text("E", 300, 100);
    p5.textSize(18);
    p5.text("SE", 280, 154);
    p5.textAlign(p5.CENTER, p5.BOTTOM);
    p5.textSize(32);
    p5.text("S", 200, 200);
    p5.textSize(18);
    p5.text("SW", 135, 165);
    p5.textAlign(p5.LEFT, p5.CENTER);
    p5.textSize(32);
    p5.text("W", 100, 100);
    p5.textSize(18);
    p5.text("NW", 120, 48);

    p5.strokeWeight(4);
    p5.fill(255, 0, 0);
    p5.push();
    p5.translate(200, 100);
    p5.rotate(p5.radians(direccionNum * 45 - 135));
    p5.push();
    p5.translate(0, 0);
    p5.rotate(p5.frameCount / 200.0);
    star(p5, 0, 0, 7, 40, 6);
    p5.pop();
    p5.strokeWeight(8);
    p5.line(0, 0, 60, 0);
    p5.strokeWeight(3);
    p5.triangle(75, 0, 45, -6, 45, 6);
    p5.pop();
  };
  // ! PRESION DASHBOARD

  const setup5A = (p5, canvasParentRef) => {
    p5.createCanvas(400, 200).parent(canvasParentRef);
  };
  
  const draw5A = (p5) => {
    p5.background(220);
    
    // Título
    p5.stroke(255);
    p5.fill(0);
    p5.textSize(20);
    p5.text('Presión Atmosférica', 150, 25);
    
    // Valor de la presión
    p5.textSize(40);
    p5.text(`${statPressure} mmHg`, 150, 100);
    
    // Gráfico de la presión
    p5.noFill();
    p5.stroke(0);
    p5.beginShape();
    for (let i = 0; i < p5.width; i++) {
      let val = Math.floor(Math.random() * 20) + 100;
      let y = p5.map(val, 100, 120, p5.height - 10, 10);
      p5.vertex(i, y);
    }
    p5.endShape();
    
    // Actualizar valor de la presión
    // pressure = Math.floor(Math.random() * 20) + 100;
  };
  // ! HUMEDAD ABSOLUTA DASHBOARD
  let millis = 0;
  let millis1 = 0;
  let last = statHumidityAbs;
  const setup6A = (p5, canvasParentRef) => {
    p5.createCanvas(400, 200).parent(canvasParentRef);
  };
  const draw6A = (p5) => {
    let crr_millis = p5.millis();
    if (crr_millis >= millis + 5000 || p5.millis() <= 35) {
      if (crr_millis >= millis + 5000) {
        millis = crr_millis;
      }
      p5.background(255);
      // valor = Math.floor(Math.random() * 10);
      //titulo
      p5.stroke(255);
      p5.fill(0);
      p5.textSize(20);
      p5.text("Humedad Absoluta ", 20, 20);

      p5.text("(GR/m^3)", 10, 140);
      p5.textSize(40);
      p5.text(`${statHumidityAbs}`, 10, 110);

      //paredes
      p5.stroke(0);
      p5.line(0, 0, 0, p5.height);
      p5.line(0, 0, p5.width, 0);
      p5.line(p5.width, 0, p5.width, p5.height);
      p5.line(0, p5.height, p5.width, p5.height);

      //300 - 150 - 50

      let porcent = last === 0 || statHumidityAbs === 0 ? 0 : statHumidityAbs / last;
      p5.fill(0, 39, 255, 150 * porcent + 25);
      let x = Math.floor(Math.random() * (p5.width - 200)) + 200;
      let y = Math.floor(Math.random() * (p5.height - 60 - 90)) + 100;
      p5.ellipse(x, y, 150, 150);
      last = statHumidityAbs;
    }

    if (crr_millis >= millis1 + 500) {
      let x = Math.floor(Math.random() * (p5.width - 200)) + 200;
      let y = Math.floor(Math.random() * p5.height);
      p5.ellipse(x, y, 15, 15);
      millis1 = crr_millis;
    }
  };




  // const setup6A = (p5, canvasParentRef) => {
  //   p5.createCanvas(1130, 300).parent(canvasParentRef);
  // };
  // const draw6A = (p5) => {
  //   const porcentajeX = (p5.width - 160) / varHumidityAbs.length;
  //   const porcentajeY = (p5.height - 30) / max;
  //   const Porcentaje10 = p5.height / 11;
  //   p5.background(255);
  //   // titulo
  //   p5.stroke(255);
  //   p5.text("Humedad Absoluta (GR/m^3)", 400, 20);
  //   a += 1;
  //   p5.line(a, 25, a, p5.height);
  //   // lineas de grafo
  //   for (let i = 0; i < 11; i += 1) {
  //     p5.textSize(15);
  //     p5.stroke(140);
  //     p5.line(0, p5.height - i * Porcentaje10, p5.width - 160, p5.height - i * Porcentaje10);
  //     p5.stroke(255);
  //     p5.text(
  //       `${Math.floor((max / 10) * i)}`,
  //       p5.width - 160 + 5,
  //       p5.height - i * Porcentaje10 - 1
  //     );
  //   }
  //   // paredes
  //   p5.stroke(0);
  //   p5.line(p5.width - 160, 25, p5.width - 160, p5.height);
  //   p5.line(p5.width - 110, 25, p5.width - 110, p5.height);
  //   p5.line(0, 0, 0, p5.height);
  //   p5.line(0, 0, p5.width, 0);
  //   p5.line(p5.width, 0, p5.width, p5.height);
  //   p5.line(0, p5.height, p5.width, p5.height);
  //   p5.textSize(20);
  //   // leyendas avg
  //   p5.text(`Avg:${avg}`, p5.width - 100, 115);
  //   for (var x = 0; x < varHumidityAbs.length; x += 1) {
  //     p5.stroke(218, 126, 255);
  //     if (varHumidityAbs[x] >= avg) p5.stroke(0, 100, 255);
  //     // if (porcentajeX * x < a) {
  //     p5.line(
  //       porcentajeX * x,
  //       p5.height,
  //       porcentajeX * x,
  //       p5.height - varHumidityAbs[x] * porcentajeY
  //     );
  //     // }
  //     // p5.ellipse(porcentajeX*x,  p5.height-varHumidityAbs[x]*porcentajeY, 1, 1);
  //   }
  //   if (a > p5.width - 160) a = 0;
  // };
  console.log("varHumidityRel: ", varHumidityRel);
  console.log("varHumidityAbs: ", varHumidityAbs);
  console.log("varSpeed: ", varSpeed);
  console.log("varDirection: ", varDirection);
  console.log("varPressure: ", varPressure);
  console.log("varTemperature: ", varTemperature);
  // ! *************** HANDLERS DE Dashboard *****************
  const [showSketch1, setShowSketch1] = useState(false);
  const [showSketch2, setShowSketch2] = useState(false);
  const [showSketch3, setShowSketch3] = useState(false);
  const [showSketch4, setShowSketch4] = useState(false);
  const [showSketch5, setShowSketch5] = useState(false);
  const [showSketch6, setShowSketch6] = useState(false);
  const handleClick1 = () => {
    setShowSketch1(!showSketch1);
    setShowSketch2(false);
    setShowSketch3(false);
    setShowSketch4(false);
    setShowSketch5(false);
    setShowSketch6(false);
  };
  const handleClick2 = () => {
    setShowSketch2(!showSketch2);
    setShowSketch1(false);
    setShowSketch3(false);
    setShowSketch4(false);
    setShowSketch5(false);
    setShowSketch6(false);
  };
  const handleClick3 = () => {
    setShowSketch2(false);
    setShowSketch1(false);
    setShowSketch2(false);
    setShowSketch3(!showSketch3);
    setShowSketch4(false);
    setShowSketch5(false);
    setShowSketch6(false);
  };
  const handleClick4 = () => {
    setShowSketch2(false);
    setShowSketch1(false);
    setShowSketch2(false);
    setShowSketch3(false);
    setShowSketch4(!showSketch4);
    setShowSketch5(false);
    setShowSketch6(false);
  };
  const handleClick5 = () => {
    setShowSketch2(false);
    setShowSketch1(false);
    setShowSketch2(false);
    setShowSketch3(false);
    setShowSketch4(false);
    setShowSketch5(!showSketch5);
    setShowSketch6(false);
  };
  const handleClick6 = () => {
    setShowSketch2(false);
    setShowSketch1(false);
    setShowSketch3(false);
    setShowSketch4(false);
    setShowSketch5(false);
    setShowSketch6(!showSketch6);
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3} onClick={handleClick1}>
                <div align="center">
                  <Sketch setup={setup1A} draw={draw1A} />
                </div>
                <ComplexStatisticsCard
                  color="error"
                  icon="air"
                  title="TEMPERATURA DEL AMBIENTE"
                  count={statTemperature + " C °"}
                  percentage={{
                    color: "success",
                    amount: "GRAFICA EN EL TIEMPO",
                    label: "",
                  }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3} onClick={handleClick4}>
                <div >
                  <Sketch setup={setup4A} draw={draw4A} />
                </div>
                <ComplexStatisticsCard
                  color="warning"
                  icon="air"
                  title="DIRECCION DEL VIENTO"
                  count={textdirection}
                  percentage={{
                    color: "success",
                    amount: "GRAFICA EN EL TIEMPO",
                    label: "",
                  }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3} onClick={handleClick3}>
                <div >
                  <Sketch setup={setup3A} draw={draw3A} />
                </div>
                <ComplexStatisticsCard
                  color="info"
                  icon="air"
                  title="VELOCIDAD DEL VIENTO"
                  count={statSpeed + " Km/h  "}
                  percentage={{
                    color: "success",
                    amount: "GRAFICA EN EL TIEMPO",
                    label: "",
                  }}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={3} onClick={handleClick2}>
              <div >
                <Sketch setup={setup2A} draw={draw2A} />
              </div>
              <ComplexStatisticsCard
                color="success"
                icon="thunderstorm"
                title="HUMEDAD RELATIVA"
                count={statHumidityRel + " %  "}
                percentage={{
                  color: "success",
                  amount: "GRAFICA EN EL TIEMPO",
                  label: "",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={3} onClick={handleClick6}>
              <div align="center">
                <Sketch setup={setup6A} draw={draw6A} />
              </div>
              <ComplexStatisticsCard
                color="info"
                icon="cloud"
                title="HUMEDAD ABSOLUTA"
                count={statHumidityAbs + " g/m3  "}
                percentage={{
                  color: "success",
                  amount: "GRAFICA EN EL TIEMPO",
                  label: "",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={3} onClick={handleClick5}>
              <div align="center">
                <Sketch setup={setup5A} draw={draw5A} />
              </div>
              <ComplexStatisticsCard
                color="primary"
                icon="*"
                title="PRESION"
                count={statPressure + " mmHg     "}
                percentage={{
                  color: "success",
                  amount: "GRAFICA EN EL TIEMPO",
                  label: "",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox py={1}>
          <div align="center">{showSketch1 && <Sketch setup={setup1} draw={draw1} />}</div>
          <div align="center">{showSketch2 && <Sketch setup={setup2} draw={draw2} />}</div>
          <div align="center">{showSketch3 && <Sketch setup={setup3} draw={draw3} />}</div>
          <div align="center">{showSketch4 && <Sketch setup={setup4} draw={draw4} />}</div>
          <div align="center">{showSketch5 && <Sketch setup={setup5} draw={draw5} />}</div>
          <div align="center">{showSketch6 && <Sketch setup={setup6} draw={draw6} />}</div>
          {/* <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid> */}
        </MDBox>
      </MDBox>


      {/* <RadarChart
        color="Info"
        title="DIRECCION DEL VIENTO"
        description={
          <>
            (<strong>Velocidad del viento (K/h)</strong>)
          </>
        }
        chart={{
          labels: ["N", "NE", "E", "SE", "S", "SO", "O", "NO"],
          datasets: [
            {
              label: "DIRECCION DEL VIENTO",
              color: "info",
              data: statDirection,
              borderDash: [5, 5],
            },
          ],
        }}
        date="VER GRAFICA A TRAVES DEL TIEMPO"
      /> */}
    </DashboardLayout>
  );
}

export default Dashboard;
