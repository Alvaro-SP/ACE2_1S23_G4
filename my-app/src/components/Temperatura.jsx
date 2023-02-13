import React from 'react';
import Sketch from "react-p5";

const Temperatura=()=>{
   var array = [];
   for (var i = 0; i < 1000; i++) {
      var num = Math.floor(Math.random()*1000) + +Math.random(); 
      num *= Math.round(Math.random()) ? 1 : -1; 
      array.push(Math.floor(num));
   }

 
   const max = Math.floor(Math.max(...array))+1;
   const avg = Math.floor(array.reduce((a, b) => a + b, 0) / array.length);
   
   const min = Math.floor(Math.min(...array));
   console.log(array,"length",array.length,"max:",max,"min:",min)
   let a = 0; 
   let spacer = 10;
   const setup = (p5, canvasParentRef) => {
      p5.createCanvas(1120, 300).parent(canvasParentRef);
      console.log("size: length, width",100*spacer, 200)
   };
   
	const draw = (p5) => {
      let porcentajeX = (p5.width-(160))/array.length;
      let porcentajeY = ((p5.height-(15))/max)/2;
     
		p5.background(0);
      //p5.background(255);

      //titulo
      p5.fill(255, 255, 255);
      p5.stroke(0);
      p5.text('Temperatura (°C)', 400, 20);


      a = a + 1; 
      p5.stroke(255);
      p5.line(a, 25, a, p5.height);


      //paredes 
      p5.stroke(255);
      p5.line(p5.width-(160), 25, p5.width-(160), p5.height);
      p5.line(p5.width-110, 25, p5.width-110, p5.height);
      let Porcentaje10 = p5.height/11;
       //lineas de grafo
       for(let i=0;i<11;i++){
         p5.textSize(15);
         p5.stroke(140);
         p5.line(0, p5.height-i*Porcentaje10, p5.width-(160), p5.height-i*Porcentaje10);
         
         p5.stroke(255);

         
         if(i>5){
            p5.text(`${Math.floor(max/5*(i-5))}`,p5.width-(160)+5,p5.height-i*Porcentaje10-1);
         }
         if(i<5){
            p5.text(`${Math.floor(min/5*(5-i))}`,p5.width-(160)+5,p5.height-i*Porcentaje10-1);
         }


         if(i ==5){
            p5.text(`0`,p5.width-(160)+5,p5.height-i*Porcentaje10-1);
         }

      }
     
      //leyendas avg
      p5.textSize(20);
      p5.stroke(0);
      p5.text(`Avg:${avg}`, p5.width-100, 115);
      
      p5.stroke(255);
      p5.line(0, (p5.height+30)/2, p5.width, (p5.height+30)/2);

      for (let x = 0; x < array.length; x++) {
         p5.stroke(255, 211, 47);
        
         if(array[x]>=0)
            p5.stroke(14, 226, 255);
        

         if(porcentajeX*x<a)
            if(array[x]==0){
               p5.ellipse(porcentajeX*x, (p5.height+30)/2+array[x]*porcentajeY, 4, 4);
            }else{
               p5.line(porcentajeX*x, (p5.height+34)/2  , porcentajeX*x,  (p5.height+34)/2+array[x]*porcentajeY);
            }
      }

      if (a > p5.width-160) 
         a = 0;
      
	};

   return (
      <div>
         <p>Temperatura</p>
         <Sketch setup={setup} draw={draw} />
      </div>
   );
}

export default Temperatura ;