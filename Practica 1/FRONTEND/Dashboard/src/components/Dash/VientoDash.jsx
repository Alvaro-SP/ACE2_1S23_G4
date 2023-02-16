import React from 'react';
import Sketch from "react-p5";

const VientoDash=({Crr_Data})=>{
   let maxSpeed = 80;
   let angle = 0;
   const setup3A = (p, canvasParentRef) => {
     p.createCanvas(400, 200).parent(canvasParentRef);;
     p.angleMode(p.DEGREES);
   };

   const draw3A = (p) => {
      var statSpeed = Crr_Data;
      p.background("white");
      p.translate(p.width / 2, p.height / 2);
      // Dibujamos el dial del velocímetro
      p.stroke(0);
      p.strokeWeight(2);
      p.noFill();
      for (let i = 0; i <= maxSpeed; i += 2) {
        let angle = p.map(i, 0, maxSpeed, -250, 750);
        let x = Math.cos(angle) * 80;
        let y = Math.sin(angle) * 80;
        p.line(0, 0, x, y);
      }
  
      // Dibujamos los números del dial
      p.textAlign(p.CENTER, p.CENTER);
      p.noStroke();
      p.fill(0);
      for (let i = 0; i <= maxSpeed; i += 5) {
        let angle = p.map(i, 0, maxSpeed, -230, 80);
        let x = p.cos(angle) * 90;
        let y = p.sin(angle) * 90;
        p.text(i, x, y);
      }
      // Dibujamos el indicador de velocidad
      p.fill(255, 0, 0);
      p.noStroke();
      angle = p.map(statSpeed, 0, maxSpeed, -140, 160); // se actualiza el ángulo del indicador
      p.rotate(angle);
      p.triangle(-10, -30, 10, -30, 0, -140);
    };
   

   return (
      <div>
         <p>TemperaturaDash </p>
         <Sketch setup={setup3A} draw={draw3A} />
      </div>
   );
}

export default VientoDash ;