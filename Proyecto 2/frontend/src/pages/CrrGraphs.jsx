
import React from "react";
import { Temperature } from 'react-environment-chart';
import {Electricity} from 'react-environment-chart';

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
               <div>
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
               <div className="normal">
                  <div className="ss" >SECO</div>
                  <div className="cc">CONFORT</div>
                  <div className="mm">MOJADO</div>
                  <Electricity value={25} height={280}/>
                  </div>
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
                  <div className="normal">
                  <div className="ss" >BAJO</div>
                  <div className="cc">MEDIO</div>
                  <div className="mm">ALTO</div>
                  <Electricity value={50} height={280}/>
                  </div>
               </div>
            </div>
         </div>


      </div>
   );
}

