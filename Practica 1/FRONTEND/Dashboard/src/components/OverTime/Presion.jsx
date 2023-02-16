import React from 'react';
import Sketch from "react-p5";

const Direccion=({Crr_Arr})=>{
   let aaax = 0;
   var varPressure = Crr_Arr;
   const setup5 = (p5, canvasParentRef) => {
      p5.createCanvas(1120, 300).parent(canvasParentRef);
   };

   const draw5 = (p5) => {
      const max = Math.floor(Math.max(...varPressure)) + 1;
      const avg = Math.floor(varPressure.reduce((a, b) => a + b, 0) / varPressure.length);
      let porcentajeX = (p5.width - (160)) / varPressure.length;
      let porcentajeY = (p5.height - (30)) / max;
      let Porcentaje10 = p5.height / 11;
      p5.background(0);
      //p5.background(255);

      //titulo
      p5.fill(255, 255, 255);
      p5.stroke(0);
      p5.text('Presion (mmhg)', 400, 20);


      aaax = aaax + 3.2;
      p5.stroke(255);
      p5.line(aaax, 25, aaax, p5.height);

      //lineas de grafo
      for (let i = 0; i < 11; i++) {
         p5.textSize(15);
         p5.stroke(140);
         p5.line(0, p5.height - i * Porcentaje10, p5.width - (160), p5.height - i * Porcentaje10);
         p5.stroke(0);
         p5.text(`${(max / 10 * (i)).toFixed(2)}`, p5.width - (160) + 5, p5.height - i * Porcentaje10 - 1);
      }



      //paredes 
      p5.stroke(255);
      p5.line(p5.width - (160), 25, p5.width - (160), p5.height);
      p5.line(p5.width - 110, 25, p5.width - 110, p5.height);



      p5.textSize(20);

      //leyendas avg
      p5.stroke(0);
      p5.text(`Avg:${avg}`, p5.width - 100, 115);
      
      for (let x = 0; x < varPressure.length; x++) {
        
         p5.stroke("#00FFE4");
        
         if(varPressure[x]>avg)
            p5.stroke("#A200FF");
        

         if(porcentajeX*x<aaax){
            p5.ellipse(porcentajeX*x,  p5.height-varPressure[x]*porcentajeY, 2, 2);
            p5.line(porcentajeX*x,  p5.height , porcentajeX*x,  p5.height-varPressure[x]*porcentajeY);
         }
            
      }


      if (aaax > p5.width - 160)
         aaax = 0;

   };

   return (
      <div>
         <p>Direccion Barométrica</p>
         <Sketch setup={setup5} draw={draw5} />
      </div>
   );
}

export default Direccion ;