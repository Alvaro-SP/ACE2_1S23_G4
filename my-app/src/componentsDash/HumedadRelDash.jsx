import React from 'react';
import Sketch from "react-p5";

const HumedadAvsDash=()=>{
   let valor = 0;
   let last= valor;
    

   const setup = (p5, canvasParentRef) => {
      p5.createCanvas(400, 200).parent(canvasParentRef);
   
   };

   let millis = 0;
   let millis1 = 0;
	const draw = (p5) => {
      let crr_millis = p5.millis();
      if(crr_millis >= millis+5000 || p5.millis() <= 35){
         if(crr_millis >= millis+5000){
            millis = crr_millis
         }
         p5.background(255);
         valor = Math.floor(Math.random() * 10 );
         //titulo
         p5.stroke(255);
         p5.fill(0);
         p5.textSize(20);
         p5.text('Humedad Relativa ', 230, 25);


         p5.text('(%)', 230, 140);
         p5.textSize(40);
         p5.text(`${valor}`, 230, 110);

         //paredes 
         p5.stroke(0);
         p5.line(0, 0, 0, p5.height);
         p5.line(0, 0, p5.width, 0);
         p5.line(p5.width, 0, p5.width, p5.height);
         p5.line(0, p5.height, p5.width, p5.height);
         
         //300 - 150 - 50
      
         let porcent = last === 0 || valor ===0?  0:valor/last;
         p5.fill(0, 251, 255, 150*porcent+25);
         let x = Math.floor(Math.random() * (p5.width-200)) + 200
         let y = Math.floor(Math.random() * (p5.height-60-90)) + 100
         p5.ellipse(x-220, y, 150, 150);
         last = valor;  
      }
      
      if(crr_millis >= millis1+500){
         let x = Math.floor(Math.random() * (p5.width-200)) + 200
         let y = Math.floor(Math.random() * (p5.height)) 
         p5.ellipse(x-220, y, 15, 15);
         millis1 = crr_millis
      }   
	};

   return (
      <div>
         <p>Humedad Rel Dash</p>
         <Sketch setup={setup} draw={draw} />
      </div>
   );
}

export default HumedadAvsDash ;