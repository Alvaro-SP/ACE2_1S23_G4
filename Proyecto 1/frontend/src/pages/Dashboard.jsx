import React from 'react';

import Typography from '@mui/material/Typography';

import Tomato from '../components/Tomato';
import Rest from '../components/Rest';
import Piechart from '../components/Piechart';

export default function Dashboard() {

  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <Typography variant="h5" component="div" mt={2}>
          Pomodoro en Proceso
        </Typography>
      </div>
      <br/>

      <div className="tabla">
        <div className="celda"><Tomato /></div>
        <div className="celda"><Rest /></div>
        <div className="celda"><Tomato /></div>
        <div className="celda"><Tomato /></div>
      </div>
      
      <div style={{ textAlign: "center" }}>
            <Typography variant="h5" component="div" mt={2}>
              Gráfica de Productividad
            </Typography>
         </div>
         
      <div style={{marginTop: "3%",border: "1px solid black"}}>
        <br/>
        <Piechart/>
      </div>

    </div>
           
  );
}

