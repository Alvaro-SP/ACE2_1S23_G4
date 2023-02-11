// @mui material components
import Grid from "@mui/material/Grid";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import React, { useState, useEffect } from "react";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
// import PieChart from "examples/Charts/PieChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
// Data
import RadarChart from "examples/Charts/RadarChart";

import Sketch from "react-p5";

// /get-all-temperature-data
// /get-all-humidity-data
// /get-all-wind-speed-data
// /get-all-wind-direction-data
// /get-all-barometric-pressure-data
// /get-latest-data
function Dashboard() {
  // ! *************** VARIABLE TEMPERATURA *****************
  const [varTemperature, setVarTemperature] = useState(0);
  useEffect(() => {
    const fetchData1 = async () => {
      const response = await fetch("http://localhost:5000/get-all-temperature-data");
      const json = await response.json();
      console.log(json);
      setVarTemperature(json);
      console.log(varTemperature);
    };
    const intervalId1 = setInterval(fetchData1, 1000);
    return () => {
      clearInterval(intervalId1);
    };
  }, []);
  // * IMAGEN DINAMICA:
  const setup0 = (p5, canvasParentRef) => {
    p5.createCanvas(500, 500).parent(canvasParentRef);
  };
  const draw0 = (p5) => {
    p5.background(255);
  };
  // ! *************** VARIABLE HUMEDAD RELATIVA *****************
  const [varHumidityRel, setVarHumidityRel] = useState(0);
  useEffect(() => {
    const fetchData1 = async () => {
      const response = await fetch("http://localhost:5000/get-all-humidity-data");
      const json = await response.json();
      console.log(json);
      setVarHumidityRel(json);
      console.log(varHumidityRel);
    };
    const intervalId1 = setInterval(fetchData1, 1000);
    return () => {
      clearInterval(intervalId1);
    };
  }, []);
  // ! *************** VARIABLE HUMEDAD ABSOLUTA *****************
  const [varHumidityAbs, setVarHumidityAbs] = useState(0);
  useEffect(() => {
    const fetchData1 = async () => {
      const response = await fetch("http://localhost:5000/get-all-absoulute-pressure-data");
      const json = await response.json();
      console.log(json);
      setVarHumidityAbs(json);
      console.log(varHumidityAbs);
    };
    const intervalId1 = setInterval(fetchData1, 1000);
    return () => {
      clearInterval(intervalId1);
    };
  }, []);
  // ! *************** VARIABLE VELOCIDAD DEL VIENTO *****************
  const [varSpeed, setVarSpeed] = useState(0);
  useEffect(() => {
    const fetchData1 = async () => {
      const response = await fetch("http://localhost:5000/get-all-wind-speed-data");
      const json = await response.json();
      console.log(json);
      setVarSpeed(json);
      console.log(varSpeed);
    };
    const intervalId1 = setInterval(fetchData1, 1000);
    return () => {
      clearInterval(intervalId1);
    };
  }, []);
  // ! *************** VARIABLE DIRECCION DEL VIENTO *****************
  const [varDirection, setVarDirection] = useState(0);
  useEffect(() => {
    const fetchData1 = async () => {
      const response = await fetch("http://localhost:5000/get-all-wind-direction-data");
      const json = await response.json();
      console.log(json);
      setVarDirection(json);
      console.log(varDirection);
    };
    const intervalId1 = setInterval(fetchData1, 1000);
    return () => {
      clearInterval(intervalId1);
    };
  }, []);
  // ! *************** VARIABLE PRESION BAROMETRICA *****************
  const [varPressure, setVarPressure] = useState(0);
  useEffect(() => {
    const fetchData1 = async () => {
      const response = await fetch("http://localhost:5000/get-all-barometric-pressure-data");
      const json = await response.json();
      console.log(json);
      setVarPressure(json);
      console.log(varPressure);
    };
    const intervalId1 = setInterval(fetchData1, 1000);
    return () => {
      clearInterval(intervalId1);
    };
  }, []);
  // ! *************** VARIABLE DASH (the latest variables) *****************
  const [statTemperature, setStatTemperature] = useState(0);
  const [statHumidityRel, setStatHumidityRel] = useState(0);
  const [statHumidityAbs, setStatHumidityAbs] = useState(0);
  const [statSpeed, setStatSpeed] = useState(0);
  const [statDirection, setStatDirection] = useState([0, 0, 0.3, 1, 0.3, 0, 0, 0]);
  const [statPressure, setStatPressure] = useState(0);
  const [textdirection, setTextdirection] = useState("CONNECT");
  useEffect(() => {
    const fetchDataL = async () => {
      const response = await fetch("http://localhost:5000/get-latest-data");
      const json = await response.json();
      setStatTemperature(json[0].Valor);
      setStatHumidityRel(json[1].Valor);
      setStatSpeed(json[2].Valor);
      setStatDirection(json[3].Valor);
      setStatPressure(json[4].Valor);
      setStatHumidityAbs(json[5].Valor);
      const newDirections = [0, 0, 0, 0, 0, 0, 0, 0];
      switch (json[0].Valor) {
        case "N":
          newDirections[0] = 1;
          newDirections[7] = 0.3;
          newDirections[1] = 0.3;
          setTextdirection("NORTE");
          break;
        case "NE":
          newDirections[1] = 1;
          newDirections[0] = 0.3;
          newDirections[2] = 0.3;
          setTextdirection("NORESTE");
          break;
        case "E":
          newDirections[2] = 1;
          newDirections[1] = 0.3;
          newDirections[3] = 0.3;
          setTextdirection("ESTE");
          break;
        case "SE":
          newDirections[3] = 1;
          newDirections[2] = 0.3;
          newDirections[4] = 0.3;
          setTextdirection("SURESTE");
          break;
        case "S":
          newDirections[4] = 1;
          newDirections[3] = 0.3;
          newDirections[5] = 0.3;
          setTextdirection("SUR");
          break;
        case "SW":
          newDirections[5] = 1;
          newDirections[4] = 0.3;
          newDirections[6] = 0.3;
          setTextdirection("SUROESTE");
          break;
        case "W":
          newDirections[6] = 1;
          newDirections[5] = 0.3;
          newDirections[7] = 0.3;
          setTextdirection("ESTE");
          break;
        case "NW":
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
    const intervalId1 = setInterval(fetchDataL, 1000);
    return () => {
      clearInterval(intervalId1);
    };
  }, []);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="TEMPERATURA"
                  description={
                    <>
                      (<strong>Temperatura del ambiente( {statTemperature} °C) </strong>)
                    </>
                  }
                  chart={{
                    labels: [
                      "",
                      "",
                      "",
                      "",
                      "",
                      "",
                      "",
                      "",
                      "",
                      "",
                      "",
                      "",
                      "",
                      "",
                      "T",
                      "",
                      "",
                      "",
                      "",
                      "",
                      "",
                      "",
                      "",
                      "",
                      "",
                      "",
                      "",
                      "",
                    ],
                    datasets: {
                      label: "Temperatura",
                      data: [
                        0,
                        0,
                        0,
                        0,
                        0,
                        statTemperature,
                        0,
                        statTemperature,
                        0,
                        statTemperature,
                        0,
                        statTemperature,
                        0,
                        statTemperature,
                        0,
                        statTemperature,
                        0,
                        statTemperature,
                        0,
                        statTemperature,
                        0,
                        statTemperature,
                      ],
                    },
                  }}
                  date="VER GRAFICA A TRAVES DEL TIEMPO"
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
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
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="VELOCIDAD"
                  description={
                    <>
                      (<strong>Velocidad del viento {statSpeed} (K/h)</strong>)
                    </>
                  }
                  chart={{
                    labels: [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
                    datasets: { label: "PRESION", data: [0, 0, 4, 0, 4, 0, 4, 0, 4, 0, 4, 0, 0] },
                  }}
                  date="VER GRAFICA A TRAVES DEL TIEMPO"
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
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
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="thunderstorm"
                title="HUMEDAD RELATIVA"
                count={statHumidityRel}
                percentage={{
                  color: "success",
                  amount: "GRAFICA EN EL TIEMPO",
                  label: statHumidityRel,
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="info"
                icon="cloud"
                title="HUMEDAD ABSOLUTA"
                count={statHumidityAbs}
                percentage={{
                  color: "success",
                  amount: "GRAFICA EN EL TIEMPO",
                  label: statHumidityAbs,
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="*"
                title="PRESION"
                count={statPressure}
                percentage={{
                  color: "success",
                  amount: "GRAFICA EN EL TIEMPO",
                  label: statPressure,
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox py={1}>
          <div align="center">
            <Sketch setup={setup0} draw={draw0} />
          </div>
          {/* <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid> */}
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default Dashboard;
