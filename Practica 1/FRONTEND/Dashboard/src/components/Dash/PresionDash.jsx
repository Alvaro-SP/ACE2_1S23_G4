import React from 'react';
import Sketch from "react-p5";

const PresionDash=({Crr_Data})=>{
  
  const setup5A = (p5, canvasParentRef) => {
    p5.createCanvas(400, 200).parent(canvasParentRef);
  };

  const draw5A = (p5) => {
    var statPressure= Crr_Data;
    p5.background(220);
    
    // Título
    p5.stroke(255);
    p5.fill(0);
    p5.textSize(20);
    p5.text('Presión Atmosférica', 150, 25);
    
    // Valor de la presión
    p5.textSize(40);
    p5.text(`${statPressure} mmHg`, 150, 100);
    
    // Gráfico de la presión
    p5.noFill();
    p5.stroke(0);
    p5.beginShape();
    for (let i = 0; i < p5.width; i++) {
      let val = Math.floor(Math.random() * 20) + 100;
      let y = p5.map(val, 100, 120, p5.height - 10, 10);
      p5.vertex(i, y);
    }
    p5.endShape();
    
  };

  return (
    <div>
        <p>TemperaturaDash </p>
        <Sketch setup={setup5A} draw={draw5A} />
    </div>
  );
}

export default PresionDash ;