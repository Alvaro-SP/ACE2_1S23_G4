import React,{useState,useEffect} from "react";
import { Button } from "@mui/material";
import EqualizerIcon from '@mui/icons-material/Equalizer';
import DashboardIcon from '@mui/icons-material/Dashboard';
import YardIcon from '@mui/icons-material/Yard';
import CrrGraphs from "./CrrGraphs";
import OverTimeGraphs from "./OverTimeGraphs";
import axios from 'axios';

export default function Dashboard() {
  const [option, setOption] = useState(1);
  const [tempIn, setTempIn] = useState(0);
  const [tempOut, setTempOut] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [waterPercent, setWaterPercent] = useState(0);

  const conditionalRender = () => {
    if (option === 1) {
      return <CrrGraphs tempIn ={tempIn} tempOut={tempOut} humidity={humidity} waterPercent={waterPercent}/>;
    } else if (option === 2) {
      return <OverTimeGraphs/>;
    }
  };

  useEffect(() => {
    console.log("===== START FRONT =====")
 
       const fetchData = async () => {
        
        if (option === 1) {
          axios.get(`http://localhost:8000/get-data`)
          .then((response) => {
            console.log("== get-data ==")
            setTempIn(response.data.tempIn)
            setTempOut(response.data.tempOut)
            setHumidity(response.data.humidity)
            setWaterPercent(response.data.waterPercent)
          })
          .catch((error) => {
            console.log("===== Get Err =====")
          });
        } else if (option === 2) {
          console.log("===== OTRO =====")
        }
        
        
       }
 
       const interval = setInterval(fetchData, 1000);
       return () => clearInterval(interval);
    }, [option]);


  return (
    <div className="container">
      <div className="sidebar">
        <br />
        <h1 style={{ color: `black`, textAlign: 'center' }}> < YardIcon /> Invernadero</h1>
        <br />
        <center>
        <Button variant="contained" style={{width: "90%"}} startIcon={<DashboardIcon />}  onClick= {(e) => setOption(1)} >
          DashBoard
        </Button>

        <br /><br />

        <Button variant="contained" style={{width: "90%"}} startIcon={<EqualizerIcon />}  onClick= {(e) => setOption(2)}>
          Gráficas
        </Button>
        </center>
      </div>


      <div className="main">
        {conditionalRender()}

      </div>
    </div>
  );
}

