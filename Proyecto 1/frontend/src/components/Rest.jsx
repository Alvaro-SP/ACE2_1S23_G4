import React from 'react';
import Typography from '@mui/material/Typography';

export default function Rest({ percent, indice }) {
   const colorInicio = '#46E7CD'; // celeste
   const colorFin = '#000000'; // negro
   const porcentaje = percent

   return ( 
      <>
      <div style={{ textAlign: "center" }}>
        <Typography variant="h5" component="div" mt={2}>
          Descanzo {indice}
        </Typography>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg"  fill="#000000"  version="1.1" id="Layer_1" viewBox="0 0 256 256" >
      <defs>
            <linearGradient id="Gradient1" x1="0" x2="0" y1="0" y2="1">
               <stop offset={`${99 - porcentaje}%`} stopColor={colorFin} />
               <stop offset={`${100 - porcentaje}%`} stopColor={colorInicio} />
            </linearGradient>
         </defs>
         <g fill="url(#Gradient1)" stroke='black' strokeWidth="0">
            <path d="M62.6,134.3c9.7,1.7,15.9,11,14.1,20.7c-1.8,9.6-11,15.9-20.7,14.1c-9.6-1.9-15.9-11.2-14.1-20.7  C43.6,138.8,52.9,132.5,62.6,134.3z M257.1,172.3c-3.6,2.9-13.3,11.1-17.1,13.7l10.5,10.4c4.2,4.5,4.1,11.4-0.2,15.6  c-4.5,4.2-11.4,4.1-15.6-0.2l-14.2-14.1c-15.2,7.6-31.4,12.9-47.9,15.7c-9.5,1.6-19.1,2.3-28.5,2.2c-11.5-0.2-23.1-1.7-34.4-4.5  l4.6,15.5c1.4,5.3-1.8,10.7-7.2,12c-1.4,0.4-2.9,0.4-4.2,0.2c-3.8-0.7-7-3.4-7.9-7.3c0,0-4-13.4-8.1-27.7  c-19.8-7.9-38.1-19.6-53.9-34.5c-5.3-5.1-10.2-10.4-14.7-15.9l6.9-9.6c4.7,6.1,10,12,15.9,17.5c12.4,11.7,26.5,21.4,41.9,28.6  c-2.6-9.6-4.7-17.6-4.8-19.7c0-0.6-0.1-1.3,0-1.8c0-0.9,0-2.1,0.1-3.2c0.5-6.9,2-11,7.4-11.4c5-0.2,66.2,10.7,77.9,12.7l27.3-17.4  c4.3-2.8,10.2-2.1,13.8,1.7l27.5,27.4c5.9-3.9,17.6-13.6,23-18.5L257.1,172.3z M212.1,189.3l-17.1-17L169,191.9  c-5,6.6-18.8,9.7-27.5,8.1c0,0-23.9-4.4-37.4-6.9l1.5,5.4c12.5,3.7,25.5,5.6,38.5,5.9C167.3,204.7,190.7,199.4,212.1,189.3z   M124,20.1c3.5,8.1,5.4,16.9,5.4,26.2c0,36.4-29.6,66-66,66c-4.6,0-9.1-0.4-13.4-1.3l-21.6,71l5.9,75H0V0h132.1  C130.9,7.4,128.1,14.3,124,20.1z M37.9,107.2c-6.5-2.7-12-11.2-12.2-11.4c0.2,7,0.6,36.3,0.8,46.8L37.9,107.2z"/>
         </g>
         <text x="100" y="130" fill="dark"  fontSize="2em"> {porcentaje.toFixed(2)} %</text>
      </svg>
      </>
   );
}


