
import React,{useState,useEffect} from "react";
import { Button, Typography } from "@mui/material";

import ChartOverTime from "./ChartOverTime";

export default function OverTime({tipo,datos}) {
  
   const type = tipo;
   const division = type === 0 || type === 2 ? "Pomodoro": "descanzo";

   const data = {
      ejecucion: 45,
      descanso: 5,
      pomodoro1: 10, //penalizacion no estaba sentado cunado debia
      pomodoro2: 20,
      pomodoro3: 30,
      pomodoro4: 40,
      descanso1: 1, //penalizacion no estaba parado cunado debia
      descanso2: 2,
      descanso3: 3,
      descanso4: 4,
      fecha: "dd/mm/yyyy xx:yy:zz"
   }

   const [no, setNo] = useState(1);
   const [valores, setValores] = useState([1,0,0,"des",type]);

   function asignarValores (valor) {
      if(type === 0){
         setValores(
            [
            data.ejecucion,
            valor === "1" ? data.pomodoro1 :  valor === "2" ? data.pomodoro2 :  valor === "3" ? data.pomodoro3 : data.pomodoro4 ,
            type,
            "Penalización por no sentarse a tiempo" 
            ]
         );
      }else if(type === 1){
         setValores(
            [
            data.descanso,
            valor === "1" ? data.descanso1 :  valor === "2" ? data.descanso2 :  valor === "3" ? data.descanso3 : data.descanso4 ,
            type,
            "Penalización por no pararse a tiempo" 
            ]
         );
      }else if(type === 2){
         setValores(
            [
            data.ejecucion,
            valor === "1" ? data.ejecucion - data.pomodoro1 :  valor === "2" ? data.ejecucion - data.pomodoro2 :  valor === "3" ? data.ejecucion - data.pomodoro3 : data.ejecucion - data.pomodoro4 ,
            type,
            "Validación esta sentado" 
            ]
         );
      }else if(type === 3){
         setValores(
            [
            data.descanso,
            valor === "1" ? data.descanso - data.descanso1 :  valor === "2" ? data.descanso - data.descanso2 :  valor === "3" ? data.descanso - data.descanso3 : data.descanso - data.descanso4 ,
            type,
            "Validación no esta sentado" 
            ]
         );
      }
   }

   const handleClick = (e) => {
      e.preventDefault();
      setNo(e.target.value);
      asignarValores(e.target.value);
   }

   useEffect(() => {
      console.log("cambnio")
      asignarValores("1")

      
   }, 
    // eslint-disable-next-line
   [tipo]);

   return (
      <>
      {/* <Typography>
         {tipo}
      </Typography> */}
      <br/>
         <ChartOverTime 
            minutosMax={valores[0]} 
            minutosVal={valores[1]} 
            fecha={data.fecha} 
            banner={`${division} ${no}`} 
            posicion={valores[2]}
            description={valores[3]}
         />

         <br />
         <Typography>
            {division}:
         </Typography>
         <Button variant="outlined" value="1" style={{ marginRight: "2%" }} onClick={handleClick} >1</Button>
         <Button variant="outlined" value="2" style={{ marginRight: "2%" }} onClick={handleClick}>2</Button>
         <Button variant="outlined" value="3" style={{ marginRight: "2%" }} onClick={handleClick}>3</Button>
         <Button variant="outlined" value="4" onClick={handleClick}>4</Button>
         <br/>
         <br/>
         <br/>
         
      </>
   );
}


