import React from 'react';
import Sketch from "react-p5";

//Over Time
import HumedadAbs from "components/OverTime/HumedadAbs";
import HumedadRel from "components/OverTime/HumedadRel";
import Temperatura from "components/OverTime/Temperatura";
import Velocidad from "components/OverTime/Velocidad";
import Direccion from "components/OverTime/Direccion";
import Presion from "components/OverTime/Presion";

import Radial from 'components/OverTime/Radial';

import { Button } from '@mui/material';

const Reports=({option,ArrHumidityAbs,ArrHumidityRel,ArrTemperature,ArrStatSpeed,ArrDireccionNum,ArrPressure,handleClick0})=>{

   function condicional_render(){
      if(option=== 6){
         return(
            <HumedadAbs Crr_Arr={ArrHumidityAbs}/>
         )     
      }else if(option===2){
         return(
            <HumedadRel Crr_Arr={ArrHumidityRel}/>
         )
      }else if(option=== 1){
         return(  
            <Temperatura Crr_Arr={ArrTemperature}/>
         )
      }else if(option===3){
         return(
            <Velocidad Crr_Arr={ArrStatSpeed}/>
         )
      }else if(option=== 4){
         return(<>
            <Radial Crr_Arr={ArrDireccionNum}/>  
            <Direccion Crr_Arr={ArrDireccionNum}/>
            </>
         )
      }else if(option===5){
         return(  
            <Presion Crr_Arr={ArrPressure}/>
         )
      }
   }

   function condicional_render_b(){
      if(option!==0){
         return(
            <>
            <Button variant="contained" onClick={handleClick0} style={{color: "white"}}>Cerrar</Button>
            <h1>Reporte:</h1>
            
            </>
         )
      }
   }
   return (
      <div>
         
         {condicional_render_b()}
         {condicional_render()}
      </div>
   );
}

export default Reports ;