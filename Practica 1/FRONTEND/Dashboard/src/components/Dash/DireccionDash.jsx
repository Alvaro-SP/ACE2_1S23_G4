import React from 'react';
import Sketch from "react-p5";

const DireccionDash=({Crr_Data})=>{

   const setup4A = (p5, canvasParentRef) => {
      p5.createCanvas(400, 200).parent(canvasParentRef);
   };

   const draw4A = (p5) => {
      var direccionNum = Crr_Data;
      p5.background(255);
      p5.strokeWeight(8);
      p5.stroke(0);
      p5.fill(255);
      p5.ellipse(200, 100, 196, 196);
  
      p5.strokeWeight(1);
      p5.fill(0);
      p5.textSize(32);
  
      p5.fill(255);
      p5.ellipse(200, 100, 196, 196);
      p5.fill(0);
      p5.textAlign(p5.CENTER, p5.TOP);
      p5.text("N", 200, 2);
      p5.textSize(18);
      p5.text("NE", 270, 40);
      p5.textAlign(p5.RIGHT, p5.CENTER);
      p5.textSize(32);
      p5.text("E", 300, 100);
      p5.textSize(18);
      p5.text("SE", 280, 154);
      p5.textAlign(p5.CENTER, p5.BOTTOM);
      p5.textSize(32);
      p5.text("S", 200, 200);
      p5.textSize(18);
      p5.text("SW", 135, 165);
      p5.textAlign(p5.LEFT, p5.CENTER);
      p5.textSize(32);
      p5.text("W", 100, 100);
      p5.textSize(18);
      p5.text("NW", 120, 48);
  
      p5.strokeWeight(4);
      p5.fill(255, 0, 0);
      p5.push();
      p5.translate(200, 100);
      p5.rotate(p5.radians(direccionNum * 45 - 135));
      p5.push();
      p5.translate(0, 0);
      p5.rotate(p5.frameCount / 200.0);
      star(p5, 0, 0, 7, 40, 6);
      p5.pop();
      p5.strokeWeight(8);
      p5.line(0, 0, 60, 0);
      p5.strokeWeight(3);
      p5.triangle(75, 0, 45, -6, 45, 6);
      p5.pop();
    };
 
   function star(p5, x, y, radius1, radius2, npoints) {
    const angle = p5.TWO_PI / npoints;
    const halfAngle = angle / 2.0;
    p5.beginShape();
    for (let a = 0; a < p5.TWO_PI; a += angle) {
      let sx = x + p5.cos(a) * radius2;
      let sy = y + p5.sin(a) * radius2;
      p5.vertex(sx, sy);
      sx = x + p5.cos(a + halfAngle) * radius1;
      sy = y + p5.sin(a + halfAngle) * radius1;
      p5.vertex(sx, sy);
    }
    p5.endShape(p5.CLOSE);
  }

   return (
      <div>
         <p>TemperaturaDash </p>
         <Sketch setup={setup4A} draw={draw4A} />
      </div>
   );
}

export default DireccionDash ;