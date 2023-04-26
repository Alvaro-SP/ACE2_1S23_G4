
import React from "react";
import { Temperature } from 'react-environment-chart';
import { Humidity } from 'react-environment-chart';
import { Tvoc } from 'react-environment-chart';

export default function CrrGraphs() {
   return (
      <div>
         <center>
            <h1>Sistema de Riego</h1>
         </center>
         <div className="displayGraph">
            <div >
               <div>
                  <h1>
                     Temperaura externa
                  </h1>
                  <h2>
                     {10}°C
                  </h2>
               </div>
               <div  >
                  <Temperature value={10} height={315} tips={["CONGENLADO", "FRIO", "ACOGEDOR", "CALIENTE"]} />
               </div>
            </div>

            <div >
               <div>
                  <h1>
                     Temperaura interna
                  </h1>
                  <h2>
                     {0}°C
                  </h2>
               </div>
               <div >
                  <Temperature value={0} height={315} tips={["CONGENLADO", "FRIO", "ACOGEDOR", "CALIENTE"]} />
               </div>
            </div>
         </div>

         <div className="displayGraph">
            <div >
               <div>
                  <h1>
                     Porcentaje de Humedad
                  </h1>
                  <h2>
                     {25}%
                  </h2>
               </div>
               <div>
                  <Humidity value={50} height={152} tips={['SECO', 'CONFORT', 'MOJADO']} />
               </div>
            </div>

            <div >
               <div>
                  <h1>
                     Porcentaje de agua
                  </h1>
                  <h2>
                     {50}%
                  </h2>
               </div>
               <div >
                  <Humidity value={50} height={152} tips={['BAJO', 'MEDIO', 'ALTO']} />
             

               </div>
            </div>
         </div>


      </div>
   );
}

