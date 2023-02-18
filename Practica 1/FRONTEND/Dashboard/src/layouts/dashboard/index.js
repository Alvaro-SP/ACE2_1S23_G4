import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import React, { useRef, useState, useEffect } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

//Dash
import HumedadAbsDash from "components/Dash/HumedadAbsDash";
import HumedadRelDash from "components/Dash/HumedadRelDash";
import TemperaturaDash from "components/Dash/TemperaturaDash";
import DireccionDash from "components/Dash/DireccionDash";
import VientoDash from "components/Dash/VientoDash";
import PresionDash from "components/Dash/PresionDash";



//Page
import Reports from "pages/Reports";
function Dashboard() {
  const [option, setOption] = useState(0);
  // ! *************** VARIABLES DE DASH PRINCIPAL LATEST *****************
  const [Temperature, setTemperature] = useState(0);
  const [HumidityRel, setHumidityRel] = useState(0);
  const [HumidityAbs, setHumidityAbs] = useState(0);
  const [StatSpeed, setStatSpeed] = useState(0);
  const [DireccionNum, setDireccionNum] = useState(0);
  const [Pressure, setPressure] = useState(0);
 

  const [ArrTemperature, setArrTemperature] = useState([]);
  const [ArrHumidityRel, setArrHumidityRel] = useState([]);
  const [ArrHumidityAbs, setArrHumidityAbs] = useState([]);
  const [ArrStatSpeed, setArrStatSpeed] = useState([]);
  const [ArrDireccionNum, setArrDireccionNum] = useState([]);
  const [ArrPressure, setArrPressure] = useState([]);
 
  useEffect(() => {

    const fetchDataL = async () => {
      const response = await fetch("http://localhost:5000/getAll");
      const data = await response.json();
      console.log("=====Inicio=====")
      console.log("Total", data.length)

      var IDuniques = []
      data.forEach(element => {
        if(!IDuniques.includes(element.Tipo)){
          IDuniques.push(element.Tipo)
        }
        });
      
      console.log("All Tipos", IDuniques)
 
      var ArrTemperatureTemp = [];
      var ArrHumidityRelTemp = [];
      var ArrHumidityAbsTemp = [];
      var ArrStatSpeedTemp = [];
      var ArrDireccionNumTemp = [];
      var ArrPressureTemp = [];


      data.forEach(element => {
        if(element.Tipo == 1){
          ArrTemperatureTemp.push(element)
        }else if(element.Tipo == 2){
          ArrHumidityRelTemp.push(element)
        }else if(element.Tipo == 3){
          ArrHumidityAbsTemp.push(element)
        }else if(element.Tipo == 4){
          ArrStatSpeedTemp.push(element)
        }else if(element.Tipo == 5){
          ArrDireccionNumTemp.push(element)
        }else if(element.Tipo == 6){
          ArrPressureTemp.push(element)
        }
      });
      console.log("=====Todos=====")
      console.log("Temperature", ArrTemperatureTemp.length)
      console.log("HumidityRel", ArrHumidityRelTemp.length)
      console.log("HumidityAbs", ArrHumidityAbsTemp.length)
      console.log("Speed", ArrStatSpeedTemp.length)
      console.log("Direccion", ArrDireccionNumTemp.length)
      console.log("Pressure", ArrPressureTemp.length)
      
      const err  ={
        ID: 0,
        Valor: 0
      }
      const maxObjTemp = ArrTemperatureTemp.length != 0 ? ArrTemperatureTemp.reduce((prev, curr) => {
        return prev.ID > curr.ID ? prev : curr;
      }) : err;
     
      const maxObjHumidityRel = ArrHumidityRelTemp.length != 0 ? ArrHumidityRelTemp.reduce((prev, curr) => {
        return prev.ID > curr.ID ? prev : curr;
      }): err;

      const maxObjHumudutyAbs = ArrHumidityAbsTemp.length != 0 ? ArrHumidityAbsTemp.reduce((prev, curr) => {
        return prev.ID > curr.ID ? prev : curr;
      }): err;

      const maxObjSpeed = ArrStatSpeedTemp.length != 0 ? ArrStatSpeedTemp.reduce((prev, curr) => {
        return prev.ID > curr.ID ? prev : curr;
      }): err;

      const maxObjDirection = ArrDireccionNumTemp.length != 0 ? ArrDireccionNumTemp.reduce((prev, curr) => {
        return prev.ID > curr.ID ? prev : curr;
      }): err;

      const maxObjPressurre = ArrPressureTemp.length != 0 ? ArrPressureTemp.reduce((prev, curr) => {
        return prev.ID > curr.ID ? prev : curr;
      }): err;

      setTemperature(maxObjTemp.Valor)
      setHumidityRel(maxObjHumidityRel.Valor)
      setHumidityAbs(maxObjHumudutyAbs.Valor)
      setStatSpeed(maxObjSpeed.Valor)
      setDireccionNum(maxObjDirection.Valor)
      setPressure(maxObjPressurre.Valor)
      console.log("=====ULTIMO=====")
      console.log("Ultimo temperature", maxObjTemp)
      console.log("Ultimo HumidityRel", maxObjHumidityRel)
      console.log("Ultimo HumidityAbs", maxObjHumudutyAbs)
      console.log("Ultimo StatSpeed", maxObjSpeed)
      console.log("Ultimo DireccionNum", maxObjDirection)
      console.log("Ultimo Pressure", maxObjPressurre)

      var arrayTemp = []
      ArrHumidityAbsTemp.forEach(element => {
        arrayTemp.push(element.Valor)
      });
      setArrHumidityAbs(arrayTemp)

      arrayTemp = []
      ArrHumidityRelTemp.forEach(element => {
        arrayTemp.push(element.Valor)
      });
      setArrHumidityRel(arrayTemp)

      arrayTemp = []
      ArrTemperatureTemp.forEach(element => {
        arrayTemp.push(element.Valor)
      });
      setArrTemperature(arrayTemp)

      arrayTemp = []
      ArrStatSpeedTemp.forEach(element => {
        arrayTemp.push(element.Valor)
      });
      setArrStatSpeed(arrayTemp)

      arrayTemp = []
      ArrDireccionNumTemp.forEach(element => {
        arrayTemp.push(element.Valor)
      });
      setArrDireccionNum(arrayTemp)

      arrayTemp = []
      ArrPressureTemp.forEach(element => {
        arrayTemp.push(element.Valor)
      }); 
      setArrPressure(arrayTemp)

    }

    const intervalId1 = setInterval(fetchDataL, 10000);

    return () => {
      clearInterval(intervalId1);
    };
  }, []);
  const handleClick0 = () => {
    setOption(0);
  };
  const handleClick1 = () => {
    setOption(1);
  };
  const handleClick2 = () => {
    setOption(2);
  };
  const handleClick3 = () => {
    setOption(3);
  };
  const handleClick4 = () => {
    setOption(4);
  };
  const handleClick5 = () => {
    setOption(5);
  };
  const handleClick6 = () => {
    setOption(6);
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>

        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>

              <MDBox mb={3} onClick={handleClick1}>
                <TemperaturaDash Crr_Data={Temperature}/>
                <ComplexStatisticsCard
                  color="error"
                  icon="air"
                  title="TEMPERATURA DEL AMBIENTE"
                  count={Temperature + " C °"}
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
               
                <DireccionDash Crr_Data={DireccionNum}/>
                <ComplexStatisticsCard
                  color="warning"
                  icon="air"
                  title="DIRECCION DEL VIENTO"
                  count={DireccionNum == 1 ? "NORTE" : DireccionNum == 2 ? "NORESTE" : DireccionNum == 3 ? "ESTE" : DireccionNum == 4 ? "SURESTE" : DireccionNum == 5 ? "SUR" : DireccionNum == 6 ? "SUROESTE" : DireccionNum == 7 ? "OESTE" : DireccionNum == 8 ? "NOROESTE" : "NORTE" }
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
                <VientoDash Crr_Data={StatSpeed}/>
                <ComplexStatisticsCard
                  color="info"
                  icon="air"
                  title="VELOCIDAD DEL VIENTO"
                  count={StatSpeed + " Km/h  "}
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
              <HumedadRelDash Crr_Data={HumidityRel}/>
              <ComplexStatisticsCard
                color="success"
                icon="thunderstorm"
                title="HUMEDAD RELATIVA"
                count={HumidityRel + " %  "}
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
              <HumedadAbsDash Crr_Data={HumidityAbs}/>
              <ComplexStatisticsCard
                color="info"
                icon="cloud"
                title="HUMEDAD ABSOLUTA"
                count={HumidityAbs + " g/m3  "}
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
              <PresionDash Crr_Data={Pressure}/>
              <ComplexStatisticsCard
                color="primary"
                icon="*"
                title="PRESION"
                count={Pressure + " mmHg     "}
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
          <div align="center">
            <Reports 
            option={option} 
            ArrHumidityAbs ={ArrHumidityAbs}
            ArrHumidityRel ={ArrHumidityRel}
            ArrTemperature={ArrTemperature}
            ArrStatSpeed={ArrStatSpeed}
            ArrDireccionNum={ArrDireccionNum}
            ArrPressure={ArrPressure}
            handleClick0={handleClick0}
            />
           
          </div>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default Dashboard;
