import React from 'react';
import Sketch from "react-p5";

const HumedadRel=({Crr_Arr})=>{
   var array = Crr_Arr;
    
   const max = Math.floor(Math.max(...array))+1;
   const avg = Math.floor(array.reduce((a, b) => a + b, 0) / array.length);
   //console.log(array,"length",array.length,"max:",max)

   let a = 0; 
   let spacer = 10;
   const setup = (p5, canvasParentRef) => {
      p5.createCanvas(1120, 300).parent(canvasParentRef);
      //console.log("size: length, width",100*spacer, 200)
   };
   
	const draw = (p5) => {
      let porcentajeX = (p5.width-(160))/array.length;
      let porcentajeY = (p5.height-(30))/max;
      let Porcentaje10 = p5.height/11;
		p5.background(0);

      //titulo
      p5.stroke(0);
      p5.text('Humedad Relativa (%)', 400, 20);


      a = a  + 3.2; 
      p5.stroke(255);
      p5.line(a, 25, a, p5.height);

      //lineas de grafo

      for(let i=0;i<11;i++){
         p5.stroke(100);
         p5.line(0, p5.height-i*Porcentaje10, p5.width-(160), p5.height-i*Porcentaje10);
         
         p5.stroke(0);
         p5.textSize(15);
         p5.fill(255, 255, 255);
         p5.text(`${(max/10*(i)).toFixed(2)}`,p5.width-(160)+5,p5.height-i*Porcentaje10-1);
         
      }

      //leyendas avg
      p5.textSize(20);
      p5.text(`Avg:${avg}`, p5.width-100, 115);


      //paredes
      p5.stroke(255); 
      p5.line(p5.width-(160), 25, p5.width-(160), p5.height);
      p5.line(p5.width-110, 25, p5.width-110, p5.height);
      
      for (let x = 0; x < array.length; x++) {
         p5.stroke(218, 126, 255);
        
         if(array[x]>=avg)
            p5.stroke(0, 100, 255 );

         if(porcentajeX*x<a)
            p5.ellipse(porcentajeX*x,  p5.height-array[x]*porcentajeY, 1, 1);
            //p5.line(porcentajeX*x,  p5.height , porcentajeX*x,  p5.height-array[x]*porcentajeY);
      }

      if (a > p5.width-160) 
         a = 0;
      
	};

   return (
      <div>
         <p>Humedad</p>
         <Sketch setup={setup} draw={draw} />
      </div>
   );
}

export default HumedadRel ;