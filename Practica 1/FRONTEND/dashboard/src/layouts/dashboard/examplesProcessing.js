import React, { useState, useRef, useEffect } from "react";
import p5 from "p5";

function App() {
    const sketchRef = useRef(null);
    let angle = 0;

    useEffect(() => {
        const sketch = p => {
            p.setup = () => {
                p.createCanvas(200, 200);
                p.strokeWeight(4);
                p.stroke(0);
                p.fill(255);
                p.ellipse(100, 100, 150, 150);
                p.strokeWeight(1);
                p.fill(0);
                p.textAlign(p.CENTER, p.TOP);
                p.text("N", 100, 60);
                p.textAlign(p.RIGHT, p.CENTER);
                p.text("E", 170, 100);
                p.textAlign(p.CENTER, p.BOTTOM);
                p.text("S", 100, 140);
                p.textAlign(p.LEFT, p.CENTER);
                p.text("W", 30, 100);
            };
            p.draw = () => {
                p.background(255);
                p.fill(255);
                p.ellipse(100, 100, 150, 150);
                p.fill(0);
                p.textAlign(p.CENTER, p.TOP);
                p.text("N", 100, 60);
                p.textAlign(p.RIGHT, p.CENTER);
                p.text("E", 170, 100);
                p.textAlign(p.CENTER, p.BOTTOM);
                p.text("S", 100, 140);
                p.textAlign(p.LEFT, p.CENTER);
                p.text("W", 30, 100);
                p.fill(255, 0, 0);
                p.push();
                p.translate(100, 100);
                p.rotate(p.radians(angle));
                p.triangle(-10, 0, -10, -20, 10, 0);
                p.pop();
                angle += 1;
            };
        };
        sketchRef.current = new p5(sketch);
        return () => sketchRef.current.remove();
    }, []);

    return <div ref={sketchRef} />;


};


export default App;

