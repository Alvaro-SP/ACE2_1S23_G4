import React, { useState, useRef, useEffect } from "react";
import p5 from "p5";


function App() {
  const sketchRef = useRef(null);

  useEffect(() => {
    const sketch = p => {
      const pressures = [20, 22, 25, 23, 21, 19, 18, 21, 25, 28, 29, 32, 34, 33, 31, 28, 25, 23, 20, 18];
      let x = 0;

      p.setup = () => {
        p.createCanvas(400, 200);
        p.background("#F0FFFF");
        p.noFill();
        p.stroke("#006400");
        p.strokeWeight(2);
        p.rect(0, 0, 400, 200);
        p.fill("#000000");
        p.textSize(20);
        p.text("Pressure Over Time", 150, 30);
      };

      p.draw = () => {
        p.background("#F0FFFF");
        p.rect(0, 0, 400, 200);
        p.fill("#000000");
        p.textSize(20);
        p.text("Pressure Over Time", 150, 30);
        p.beginShape();
        for (let i = 0; i < pressures.length; i++) {
          p.vertex(i * 20, 200 - pressures[i] * 4);
        }
        p.endShape();
        p.stroke("#8B008B");
        p.line(x, 0, x, 200);
        x++;
        if (x > 400) {
          x = 0;
        }
      };
    };
    sketchRef.current = new p5(sketch);
    return () => sketchRef.current.remove();
  }, []);

  return <div ref={sketchRef} />;

};

export default App;
