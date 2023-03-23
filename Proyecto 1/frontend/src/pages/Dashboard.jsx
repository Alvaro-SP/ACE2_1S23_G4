import React from 'react';
import Typography from '@mui/material/Typography';
import Tomato from '../components/Tomato';
import Rest from '../components/Rest';
import Piechart from '../components/Piechart';

export default function Dashboard() {


  //varibles que se deben optener de la API
  const estado = true;
  const crr_time = 4;
  const crr_parte = 4;
  const conf_tiempo = 45;
  const conf_descanzo = 5;
  const penalizacionTotal = 30;

  //calculos para funcionamiento de la pagina
  const total_tiempo = ((conf_tiempo + conf_descanzo) * 4)
  const Cumplimiento = (100 - penalizacionTotal / total_tiempo * 100).toFixed(2);
  const Penalizacion = (100-Cumplimiento).toFixed(2);

  const percentPomodoro = (crr_time / conf_tiempo) * 100;
  const percentDescanzo = (crr_time / conf_descanzo) * 100;


  function conditionalRendering (id,index ) {
   
    if(crr_parte === id + 1 && [2, 4, 6, 8].includes(crr_parte))
      return( <Rest percent= {percentDescanzo} indice={index} /> )
    
    return( <Tomato pomodoro={crr_parte} percent={percentPomodoro} id={id} indice={index}/> )
      
  }

  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <Typography variant="h5" component="div" mt={2}>
          Sesión Actual - {estado ? 'en Porgreso':'Apagada'}
        </Typography>
      </div>
      <br />

      <div className="tabla">
        {[...Array(4)].map((_, index) => (
          <div className="celda" key={index}>
            {conditionalRendering(index* 2+1,index+1)}
            
          </div>
        ))}

      </div>

      <div style={{ textAlign: "center" }}>
        <Typography variant="h5" component="div" mt={2}>
          Gráfica de Productividad
        </Typography>
      </div>

      <div style={{ marginTop: "3%", border: "1px solid black" }}>
        <br />
        <Piechart porcentaje = {Cumplimiento} nombre={"Cumplimiento"}  color1={"#2ED8A7"} color2={"#a6ceff"} id={"1"} calculo={315-Cumplimiento/100*315} />
      </div>
      <div style={{ marginTop: "0%", border: "1px solid black" }}>
        <br />
        <Piechart porcentaje = {Penalizacion} nombre={"Penalización"} color1={"#D82E2E"} color2={"#D82EAA"} id={"2"} calculo={315-Penalizacion/100*315}/>
      </div>

    </div>

  );
}
