import React from 'react';
import Sketch from "react-p5";

const Radial=({Crr_Arr})=>{

   let vertices = Crr_Arr;
   //[1,1,2,3,4,5,6,7,8];
   const arr = [];

   for (let i = 0; i < 1000; i++) {
   arr.push(Math.floor(Math.random() * 100) + 1); // generates random integers between 1 and 100
   }
   const setup = (p5, canvasParentRef) => {
      p5.createCanvas(850, 850).parent(canvasParentRef);
      p5.background(255);
     
   };
   
   // const draw = (p5) => {
   //    p5.background(204);
   //    p5.arc(90, 60, 80, 80, 0,  p5.radians(90));
   //    p5.arc(190, 60, 80, 80, 0,  p5.radians(270));
   //    p5.arc(290, 60, 80, 80,  p5.radians(180),  p5.radians(450));
   //    p5.arc(390, 60, 80, 80,  p5.radians(45),  p5.radians(225));
   // }

   const draw = (p5) => {
      p5.background(220);
      p5.translate(p5.width / 2, p5.height / 2);
      p5.stroke(0);
      p5.noFill();

      p5.fill(255);
      p5.noFill();
      for(let i=1;i<9;i++){
         p5.ellipse(0, 0, 100*i, 100*i);
      }
      
      
      p5.textAlign(p5.CENTER, p5.TOP);
      p5.text("N", -40, -50);
      p5.text("NE", -80, -80);
      p5.text("E", -120, -110);
      p5.text("SE", -160, -140);
      p5.text("S", -210, -170);
      p5.text("SW", -245, -200);
      p5.text("W", -285, -240);
      p5.text("NW", -320, -270);


      p5.text("Init", 410, 10);
      p5.text("Sentido Horario", 350, 300);

      let numColumns = 16; // Number of columns
      let angleStep = p5.TWO_PI/16; // Angle between columns
      let maxColumnHeight = 400; // Maximum height of columns
      let columnWidth = 10; // Width of columns
      let windDirection = p5.PI / 4; // Wind direction in radians

      
      // Draw the polar grid
      p5.stroke(150);
      for (let i = 0; i < numColumns; i++) {
        let angle = i * angleStep;
        let r = maxColumnHeight * p5.sin(4 * angle);
        let x = r * p5.cos(angle);
        let y = r * p5.sin(angle);
        p5.line(0, 0, x, y);
      }
      
      
      // Draw the columns
      p5.stroke(150);
      for (let i = 0; i < numColumns; i++) {
        let angle = i * angleStep;
        let r = maxColumnHeight * p5.sin(4 * angle);
        let x1 = r * p5.cos(angle);
        let y1 = r * p5.sin(angle);
        let x2 = (maxColumnHeight + columnWidth) * p5.cos(angle);
        let y2 = (maxColumnHeight + columnWidth) * p5.sin(angle);
       
        p5.line(x1, y1, x2, y2);
      }
      
      for(let i=0;i<vertices.length;i++){
         
         if(vertices[i]==1){
            p5.stroke("#A200FF");
         }else if(vertices[i]==2){
            p5.stroke("#FF0000");
         }else if(vertices[i]==3){
            p5.stroke("#00F2E0");
         }else if(vertices[i]==4){
            p5.stroke("#001DF2");
         }else if(vertices[i]==5){
            p5.stroke("#F200F2");
         }else if(vertices[i]==6){
            p5.stroke("#7A6FFF");
         }else if(vertices[i]==7){
            p5.stroke("#00E511");
         }else if(vertices[i]==8){
            p5.stroke("#FA9400");
         }else if(vertices[i]==9){
            p5.stroke("#37D500");
         }

         p5.line(0, 0, (maxColumnHeight * p5.cos(i))/8*(vertices[i]), ((400) * p5.sin(i))/8*(vertices[i]));
         p5.ellipse((maxColumnHeight * p5.cos(i))/8*(vertices[i]),  ((400) * p5.sin(i))/8*(vertices[i]), 4, 4);
      }
   
    }
    
    
    

    
   // const draw = (p5) => {
   //    p5.angleMode("DEGREES"); 
   //    p5.background(255);
   //    p5.clear();
   //    p5.fill("white"); 
   //    p5.noFill();
      
   //    // Draw shape using the current vertices array
   //    p5.beginShape();
   //    for (let i = 0; i < vertices.length; i++)
   //       p5.vertex(100+i*20, 100+i*5);

   //    p5.endShape("CLOSE");
   //    p5.fill("red");
   //    // Draw a circle at all the vertices
   //    for (let i = 0; i < vertices.length; i++)
   //       p5.circle(100+i*20, 100+i*5, 15);

   // }

  
   // const setup = (p5, canvasParentRef) => {
   //    p5.createCanvas(1120, 300).parent(canvasParentRef);
   //    p5.background(255);
     
   // };
   
   // const draw = (p5) => {
   //    // Update the vertices array with
   //    // current mouse position
   //    p5.background(255);
   //    vertices.push({ x: p5.mouseX, y: p5.mouseY });
   
   //    p5.clear();
   //    p5.fill("white");
   
      
   //    p5.noFill();
      
   //    // Draw shape using the current vertices array
   //    p5.beginShape();
   //    for (let i = 0; i < vertices.length; i++)
   //       p5.vertex(vertices[i].x, vertices[i].y);

   //    p5.endShape("CLOSE");
      
   //    p5.fill("red");
   //    // Draw a circle at all the vertices
   //    for (let i = 0; i < vertices.length; i++)
   //       p5.circle(vertices[i].x, vertices[i].y, 15);
      
   //    for(let i=0;i<999999999;i++){
        
   //    }
   // }
   
   return (
      <div>
         <p>Direccion del viento Radial</p>
         <Sketch setup={setup} draw={draw} />
      </div>
   );
}

export default Radial ;