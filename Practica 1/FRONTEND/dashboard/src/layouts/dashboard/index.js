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
  const [varDirection, setVarDirection] = useState(0);
  const [varHumidityRel, setVarHumidityRel] = useState([]);
  const [varHumidityAbs, setVarHumidityAbs] = useState([]);
  const [direccionNum, setDireccionNum] = useState(0);
  const [max, setMax] = useState(0);
  const [avg, setAvg] = useState(0);
  const [max1, setMax1] = useState(0);
  const [avg1, setAvg1] = useState(0);

  console.log(varPressure);
  console.log(varSpeed);
  console.log(varDirection);
  console.log(varHumidityRel);
  console.log(varHumidityAbs);
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
      setVarHumidityAbs(json0[5].map((item) => item.Valor));
      setVarSpeed(json0[2].map((item) => item.Valor));
      setVarDirection(json0[3].map((item) => item.Valor));
      setVarPressure(json0[4].map((item) => item.Valor));

      varHumidityAbs.push(Math.floor(Math.random() * 1000) + Math.random());
      varHumidityRel.push(Math.floor(Math.random() * 1000) + Math.random());
      setVarHumidityAbs(varHumidityAbs);
      setVarHumidityRel(varHumidityRel);
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
          setTextdirection("ESTE");
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
    const intervalId1 = setInterval(fetchDataL, 5000);
    return () => {
      clearInterval(intervalId1);
    };
  }, []);
  // ? --------------------------- PROCESSING OVER THE TIME ---------------------------------
  // ! TEMPERATURA A TRAVEZ DEL TIEMPO
  const setup1 = (p5, canvasParentRef) => {
    p5.createCanvas(500, 500, p5.WEBGL).parent(canvasParentRef);
  };
  const draw1 = (p5) => {
    p5.background("#F6A55F");
    p5.textSize(32);
    p5.text("Pressure Over Time", 150, 30);
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
  const setup3 = (p5, canvasParentRef) => {
    p5.createCanvas(500, 500, p5.WEBGL).parent(canvasParentRef);
  };
  const draw3 = (p5) => {
    p5.background("#F6A55F");
    p5.textSize(32);
    p5.text("Pressure Over Time", 150, 30);
  };
  // ! DIRECCION A TRAVEZ DEL TIEMPO
  const setup4 = (p5, canvasParentRef) => {
    p5.createCanvas(400, 200).parent(canvasParentRef);
  };
  const draw4 = (p5) => {
    p5.background(255);
    p5.background(255);
    p5.strokeWeight(8);
    p5.stroke(0);
    p5.fill(255);
    p5.ellipse(200, 100, 320, 160);

    p5.strokeWeight(1);
    p5.fill(0);
    p5.textSize(32);

    p5.fill(255);
    p5.ellipse(200, 100, 320, 160);
    p5.fill(0);
    p5.textAlign(p5.CENTER, p5.TOP);
    p5.text("N", 200, 35);
    p5.textSize(18);
    p5.text("NE", 288, 65);
    p5.textAlign(p5.RIGHT, p5.CENTER);
    p5.textSize(32);
    p5.text("E", 320, 100);
    p5.textSize(18);
    p5.text("SE", 295, 135);
    p5.textAlign(p5.CENTER, p5.BOTTOM);
    p5.textSize(32);
    p5.text("S", 200, 165);
    p5.textSize(18);
    p5.text("SW", 113, 135);
    p5.textAlign(p5.LEFT, p5.CENTER);
    p5.textSize(32);
    p5.text("W", 80, 100);
    p5.textSize(18);
    p5.text("NW", 107, 65);

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
    p5.strokeWeight(4);
    p5.triangle(65, 0, 45, -6, 45, 6);
    p5.pop();
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
  let x = 0;
  const setup5 = (p5, canvasParentRef) => {
    p5.createCanvas(400, 200).parent(canvasParentRef);
  };
  const draw5 = (p5) => {
    p5.background("#F0FFFF");
    p5.background("#F0FFFF");
    p5.noFill();
    p5.stroke("#006400");
    p5.strokeWeight(2);
    p5.rect(0, 0, 400, 200);
    p5.fill("#000000");
    p5.textSize(20);
    p5.text("Pressure Over Time", 150, 30);
    p5.rect(0, 0, 400, 200);
    p5.fill("#000000");
    p5.textSize(20);
    p5.text("Pressure Over Time", 150, 30);
    p5.beginShape();
    for (let i = 0; i < varPressure.length; i += 1) {
      p5.vertex(i * 20, 200 - varPressure[i] * 4);
    }
    p5.endShape();
    p5.stroke("#8B008B");
    p5.line(x, 0, x, 200);
    x += 1;
    if (x > 400) {
      x = 0;
    }
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
  const setup1A = (p5, canvasParentRef) => {
    p5.createCanvas(400, 200, p5.WEBGL).parent(canvasParentRef);
  };
  const draw1A = (p5) => {
    p5.background("#F6A55F");
  };
  // ! HUMEDAD DASHBOARD
  const setup2A = (p5, canvasParentRef) => {
    p5.createCanvas(400, 200).parent(canvasParentRef);
  };
  const draw2A = (p5) => {
    p5.background(0);
  };



  // ! VELOCIDAD DASHBOARD
  let maxSpeed = 80;
  let angle = 0;
  const setup3A = (p,canvasParentRef) => {
    p.createCanvas(400, 200).parent(canvasParentRef);;
    p.angleMode(p.DEGREES);
  };

  const draw3A = (p) => {
    p.background("skyblue");
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
  };
  // ! HUMEDAD ABSOLUTA DASHBOARD
  const setup6A = (p5, canvasParentRef) => {
    p5.createCanvas(1130, 300).parent(canvasParentRef);
  };
  const draw6A = (p5) => {
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
  console.log("varHumidityRel: ", varHumidityRel);
  // console.log("varHumidityAbs: ", varHumidityAbs);
  console.log("varSpeed: ", varSpeed);
  console.log("varDirection: ", varDirection);
  console.log("varPressure: ", varPressure);
  console.log("varTemperature: ", varTemperature);
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
                <Sketch setup={setup4A} draw={draw4A} />
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
                <Sketch setup={setup4A} draw={draw4A} />
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
