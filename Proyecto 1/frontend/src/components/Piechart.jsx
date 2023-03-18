import React from 'react';

export default function Piechart({  porcentaje }) {

   //const porcentaje = 100;
   return (
      <svg viewBox="0 0 100 100">
         <linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2ed8a7" />
            <stop offset="100%" stopColor="#a6ceff" />
         </linearGradient>
         <circle strokeLinecap="round"
            cx="50"
            cy="50"
            r="48"
            stroke="url(#linear)"
            strokeWidth="4"
            fill="none"
            strokeDasharray="315"
            strokeDashoffset={`${315-porcentaje/100*315}`}
            stroke-mitterlimit="0"
            transform="rotate(-90 ) translate(-100 0)" />
            <text x="13" y="45" fill="red"   stroke="url(#linear)" fontSize="0.7em">Cumplimiento:</text>
            <text x="39" y="65" fill="red"   stroke="url(#linear)"  fontSize="0.7em"> {porcentaje} %</text>
      </svg>
   );
}


