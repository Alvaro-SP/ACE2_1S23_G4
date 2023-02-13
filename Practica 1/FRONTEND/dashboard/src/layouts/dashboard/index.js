// @mui material components
import Grid from "@mui/material/Grid";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import React, { useState, useEffect } from "react";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
// import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
// import PieChart from "examples/Charts/PieChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
// Data
import RadarChart from "examples/Charts/RadarChart";

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
  const [textdirection, setTextdirection] = useState("CONNECT");
  const [statTemperature, setStatTemperature] = useState(0);
  const [statHumidityRel, setStatHumidityRel] = useState(0);
  const [statHumidityAbs, setStatHumidityAbs] = useState(0);
  const [statSpeed, setStatSpeed] = useState(0);
  const [statDirection, setStatDirection] = useState([0, 0, 0.3, 1, 0.3, 0, 0, 0]);
  const [statPressure, setStatPressure] = useState(0);
  // ! *************** VARIABLE DASH (the latest variables) *****************
  const [varTemperature, setVarTemperature] = useState([]);
  const [varPressure, setVarPressure] = useState([]);
  const [varSpeed, setVarSpeed] = useState([]);
  const [varDirection, setVarDirection] = useState(0);
  const [varHumidityRel, setVarHumidityRel] = useState([]);
  const [varHumidityAbs, setVarHumidityAbs] = useState([]);
  const [direccionNum, setDireccionNum] = useState(0);
  console.log(varPressure);
  console.log(varSpeed);
  console.log(varDirection);
  console.log(varHumidityRel);
  console.log(varHumidityAbs);
  useEffect(() => {
    const fetchDataL = async () => {
      const response0 = await fetch("http://localhost:5000/get-all-temperature-data");
      const json0 = await response0.json();
      setVarTemperature(json0.map((item) => item.Valor));
      // console.log("varPressure: ", varHumidityRel);

      const response1 = await fetch("http://localhost:5000/get-all-humidity-data");
      const json1 = await response1.json();
      setVarHumidityRel(json1.map((item) => item.Valor));
      // console.log("varPressure: ", varHumidityRel);

      const response2 = await fetch("http://localhost:5000/get-all-absoulute-humidity-data");
      const json2 = await response2.json();
      setVarHumidityAbs(json2.map((item) => item.Valor));
      // console.log("varPressure: ", varHumidityAbs);

      const response3 = await fetch("http://localhost:5000/get-all-wind-speed-data");
      const json3 = await response3.json();
      setVarSpeed(json3.map((item) => item.Valor));
      // console.log("varPressure: ", varSpeed);

      const response4 = await fetch("http://localhost:5000/get-all-wind-direction-data");
      const json4 = await response4.json();
      setVarDirection(json4.map((item) => item.Valor));
      // console.log("varPressure: ", varDirection);

      // const response5 = await fetch("http://localhost:5000/get-all-barometric-pressure-data");
      // const json5 = await response5.json();

      // setVarPressure(json5.map((item) => item.Valor));
      setVarPressure([
        20, 22, 25, 23, 21, 19, 18, 21, 25, 28, 29, 32, 34, 33, 31, 28, 25, 23, 20, 18,
      ]);
      // console.log("varPressure: ", varPressure);

      const response6 = await fetch("http://localhost:5000/get-latest-data");
      const json6 = await response6.json();
      setStatTemperature(json6[0].Valor);
      setStatHumidityRel(json6[1].Valor);
      setStatSpeed(json6[2].Valor);
      setStatPressure(json6[4].Valor);
      console.log(json6[3].Valor);
      setStatHumidityAbs(json6[5].Valor);
      const newDirections = [0, 0, 0, 0, 0, 0, 0, 0];
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
    };
    const intervalId1 = setInterval(fetchDataL, 5000);
    return () => {
      clearInterval(intervalId1);
    };
  }, []);
  // ! TEMPERATURA
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
  // ! HUMEDAD RELATIVA
  const setup2 = (p5, canvasParentRef) => {
    p5.createCanvas(500, 500, p5.WEBGL).parent(canvasParentRef);
  };
  const draw2 = (p5) => {
    p5.background("#F6A55F");
    p5.textSize(32);
    p5.text("Pressure Over Time", 150, 30);
  };
  // // ! VELOCIDAD
  const setup3 = (p5, canvasParentRef) => {
    p5.createCanvas(500, 500, p5.WEBGL).parent(canvasParentRef);
  };
  const draw3 = (p5) => {
    p5.background("#F6A55F");
    p5.textSize(32);
    p5.text("Pressure Over Time", 150, 30);
  };
  // ! DIRECCION
  const setup4 = (p5, canvasParentRef) => {
    p5.createCanvas(500, 500).parent(canvasParentRef);
  };
  const draw4 = (p5) => {
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
  // ! PRESION
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
  // ! HUMEDAD ABSOLUTA
  const setup6 = (p5, canvasParentRef) => {
    p5.createCanvas(500, 500, p5.WEBGL).parent(canvasParentRef);
  };
  const draw6 = (p5) => {
    p5.background("#F6A55F");
    p5.textSize(32);
    p5.text("Pressure Over Time", 150, 30);
  };
  console.log("varHumidityRel: ", varHumidityRel);
  console.log("varHumidityAbs: ", varHumidityAbs);
  console.log("varSpeed: ", varSpeed);
  console.log("varDirection: ", varDirection);
  console.log("varPressure: ", varPressure);
  console.log("varTemperature: ", varTemperature);
  console.log("varTemperature: ", varTemperature);
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
    setShowSketch3(!showSketch2);
    setShowSketch4(false);
    setShowSketch5(false);
    setShowSketch6(false);
  };
  const handleClick4 = () => {
    setShowSketch2(false);
    setShowSketch1(false);
    setShowSketch2(false);
    setShowSketch3(false);
    setShowSketch4(!showSketch2);
    setShowSketch5(false);
    setShowSketch6(false);
  };
  const handleClick5 = () => {
    setShowSketch2(false);
    setShowSketch1(false);
    setShowSketch2(false);
    setShowSketch3(false);
    setShowSketch4(false);
    setShowSketch5(!showSketch2);
    setShowSketch6(false);
  };
  const handleClick6 = () => {
    setShowSketch2(false);
    setShowSketch1(false);
    setShowSketch2(false);
    setShowSketch3(false);
    setShowSketch4(false);
    setShowSketch5(false);
    setShowSketch6(!showSketch2);
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
                  <Sketch setup={setup5} draw={draw5} />
                </div>
                <ComplexStatisticsCard
                  color="info"
                  icon="air"
                  title="TEMPERATURA DEL AMBIENTE"
                  count={statTemperature}
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
                <div align="center">
                  <Sketch setup={setup5} draw={draw5} />
                </div>
                <ComplexStatisticsCard
                  color="info"
                  icon="air"
                  title="DIRECCION DEL VIENTO"
                  count={statTemperature}
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
                <div align="center">
                  <Sketch setup={setup5} draw={draw5} />
                </div>
                <ComplexStatisticsCard
                  color="info"
                  icon="air"
                  title="VELOCIDAD DEL VIENTO"
                  count={statSpeed}
                  percentage={{
                    color: "success",
                    amount: "GRAFICA EN EL TIEMPO",
                    label: "",
                  }}
                />
                {/* <ReportsLineChart
                  color="dark"
                  title="VELOCIDAD"
                  description={
                    <>
                      (<strong>Velocidad del viento {statSpeed} (K/h)</strong>)
                    </>
                  }
                  chart={{
                    labels: [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
                    datasets: {
                      label: "PRESION",
                      data: [
                        0,
                        0,
                        statSpeed,
                        0,
                        statSpeed,
                        0,
                        statSpeed,
                        0,
                        statSpeed,
                        0,
                        statSpeed,
                        0,
                        0,
                      ],
                    },
                  }}
                  date="VER GRAFICA A TRAVES DEL TIEMPO"
                /> */}
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5} onClick={handleClick4}>
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
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5} onClick={handleClick2}>
              <ComplexStatisticsCard
                color="success"
                icon="thunderstorm"
                title="HUMEDAD RELATIVA"
                count={statHumidityRel}
                percentage={{
                  color: "success",
                  amount: "GRAFICA EN EL TIEMPO",
                  label: "",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5} onClick={handleClick6}>
              <ComplexStatisticsCard
                color="info"
                icon="cloud"
                title="HUMEDAD ABSOLUTA"
                count={statHumidityAbs}
                percentage={{
                  color: "success",
                  amount: "GRAFICA EN EL TIEMPO",
                  label: "",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5} onClick={handleClick5}>
              <ComplexStatisticsCard
                color="primary"
                icon="*"
                title="PRESION"
                count={statPressure}
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
      <RadarChart
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
      />
    </DashboardLayout>
  );
}

export default Dashboard;
