
import React from "react";
import { Temperature } from 'react-environment-chart';
import {Electricity} from 'react-environment-chart';

export default function CrrGraphs({tempIn, tempOut, humidity, waterPercent}) {
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
                     {tempOut}°C
                  </h2>
               </div>
               <div>
                  <Temperature value={tempOut} height={315} tips={["CONGENLADO", "FRIO", "ACOGEDOR", "CALIENTE"]} />
               </div>
            </div>

            <div >
               <div>
                  <h1>
                     Temperaura interna
                  </h1>
                  <h2>
                     {tempIn}°C
                  </h2>
               </div>
               <div >
                  <Temperature value={tempIn} height={315} tips={["CONGENLADO", "FRIO", "ACOGEDOR", "CALIENTE"]} />
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
                     {humidity}%
                  </h2>
               </div>
               <div>
               <div className="normal">
                  <div className="ss" >SECO</div>
                  <div className="cc">CONFORT</div>
                  <div className="mm">MOJADO</div>
                  <Electricity value={humidity} height={280}/>
                  </div>
               </div>
            </div>

            <div >
               <div>
                  <h1>
                     Porcentaje de agua
                  </h1>
                  <h2>
                     {waterPercent}%
                  </h2>
               </div>
               <div >
                  <div className="normal">
                  <div className="ss" >BAJO</div>
                  <div className="cc">MEDIO</div>
                  <div className="mm">ALTO</div>
                  <Electricity value={waterPercent} height={280}/>
                  </div>
               </div>
            </div>
         </div>


      </div>
   );
}

