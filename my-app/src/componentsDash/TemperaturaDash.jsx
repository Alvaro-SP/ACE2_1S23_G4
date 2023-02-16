import React from 'react';
import Sketch from "react-p5";

const TemperaturaDash=()=>{
   let valor = 0;
   let last= valor;
    

   const setup = (p5, canvasParentRef) => {
      p5.createCanvas(400, 200).parent(canvasParentRef);
   
   };

   let millis = 0;
   let millis1 = 0;

   var angle = 0.0;
   var offset = 100;
   var scalar = 40;
   var speed = 0.05;

   var Rred = '#FF0000'
   var Bred = '#002EFF'
   var Wred = '#FFFFFF'
   
	const draw = (p5) => {
      p5.background(0);
      var y1 = offset + p5.sin(angle) * scalar;
      var y2 = offset + p5.sin(angle + 0.4) * scalar;
      var y3 = offset + p5.sin(angle + 0.8) * scalar;
      
      var color= Wred
      if(last === valor){
         color = Wred
      }else if(valor > last){
         color = Rred      
      }else if(valor < last){
         color = Bred
         
      }
     
      p5.fill(color);

      p5.ellipse( 80, y1, 40, 40);
      p5.ellipse(120, y2, 40, 40);
      p5.ellipse(160, y3, 40, 40);
      angle += speed;

      p5.fill(255);
      p5.textSize(40);
      p5.text(`${valor}`, 230, 110);
      p5.textSize(20);
      p5.text('Temperatura', 230, 35);
      p5.text('(%)', 230, 140);

      let crr_millis = p5.millis();
      if(crr_millis >= millis+5000 || p5.millis() <= 35){
         if(crr_millis >= millis+5000){
            millis = crr_millis
         }
         last = valor; 
         var num  = Math.floor(Math.random() * 10 );
         num *= Math.round(Math.random()) ? 1 : -1; 
         valor = num
          
      }
	};

   

   return (
      <div>
         <p>TemperaturaDash </p>
         <Sketch setup={setup} draw={draw} />
      </div>
   );
}

export default TemperaturaDash ;