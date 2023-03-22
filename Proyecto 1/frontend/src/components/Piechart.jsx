import React from 'react';

export default function Piechart({  porcentaje,nombre,color1,color2,id,calculo }) {
   console.log("color",color1,color2)
   return (
      <svg viewBox="0 0 100 100">
         <linearGradient id={`linear${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={color1}/>
            <stop offset="100%" stopColor={color2}/>
         </linearGradient>
         <circle strokeLinecap="round"
            cx="50"
            cy="50"
            r="48"
            stroke={`url(#linear${id})`}
            strokeWidth="4"
            fill="none"
            strokeDasharray="315"
            strokeDashoffset={`${calculo}`}
            stroke-mitterlimit="0"
            transform="rotate(-90 ) translate(-100 0)" />

         <circle strokeLinecap="round"
            cx="50"
            cy="50"
            r="48"
            stroke="black"
            strokeWidth="1"
            fill="none"
            strokeDasharray="315"
            strokeDashoffset="0"
            stroke-mitterlimit="0"
            transform="rotate(-90 ) translate(-100 0)" />

            <line x1={50} y1={-10} x2={50} y2={5} stroke="black" />
            <text x="42" y="10" fill="black"  fontSize="0.4em">Start</text>
            <line x1={57} y1={8} x2={61} y2={8} stroke="black" />
            <line x1={58} y1={10} x2={61} y2={8} stroke="black" strokeWidth={"0.5"} />
            <line x1={58} y1={6} x2={61} y2={8} stroke="black" strokeWidth={"0.5"} />

            <text x="13" y="45" fill="red"   stroke={`url(#linear${id})`} fontSize="0.7em">{nombre}:</text>
            <text x="39" y="65" fill="red"   stroke={`url(#linear${id})`}  fontSize="0.7em"> {porcentaje} %</text>
      </svg>
   );
}


