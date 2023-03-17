import React from 'react';

export default function Piechart({  percent }) {

   const porcentaje = 100;
   return (
      <svg viewBox="0 0 100 100">
         <linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#2ed8a7" />
            <stop offset="100%" stop-color="#a6ceff" />
         </linearGradient>
         <circle stroke-linecap="round"
            cx="50"
            cy="50"
            r="48"
            stroke="url(#linear)"
            stroke-width="4"
            fill="none"
            stroke-dasharray="315"
            stroke-dashoffset={`${315-porcentaje/100*315}`}
            stroke-mitterlimit="0"
            transform="rotate(-90 ) translate(-100 0)" />
            <text x="13" y="45" fill="red"   stroke="url(#linear)" font-size="0.7em">Cumplimiento:</text>
            <text x="39" y="65" fill="red"   stroke="url(#linear)"  font-size="0.7em"> {porcentaje} %</text>
      </svg>
   );
}


