import React from 'react';
import Sketch from "react-p5";

const Direccion=({Crr_Arr})=>{
   // var array = [1,1,2,3,4,5,6,7,8];
   var array = Crr_Arr
   
   // for (var i = 0; i < 1000; i++) {
   //    array.push(Math.floor(Math.random() * 9 ));
   //    } 
   const max = Math.floor(Math.max(...array))+1;
   let avg = Math.floor(array.reduce((a, b) => a + b, 0) / array.length);
   if(avg==0){
      avg = "";
   }else if(avg==1){
      avg = "N";
   }else if(avg==2){
      avg = "NE";
   }else if(avg==3){   
      avg = "E";
   }else if(avg==4){
      avg = "SE";
   }else if(avg==5){
      avg = "S";
   }else if(avg==6){
      avg = "SW";
   }else if(avg==7){
      avg = "W";
   }else if(avg==8){
      avg = "NW";
   }
   //console.log(array,"length",array.length,"max:",max)

   let a = 0; 
   let spacer = 10;
   const setup = (p5, canvasParentRef) => {
      p5.createCanvas(1120, 300).parent(canvasParentRef);
      //console.log("size: length, width",100*spacer, 200)
   };
   
	const draw = (p5) => {
      let porcentajeX = (p5.width-(160))/array.length;
      let porcentajeY = (p5.height)/9;
      let Porcentaje10 = (p5.height)/9;
		p5.background(0);
      //p5.background(255);

      //titulo
      p5.fill(255, 255, 255);
      p5.stroke(0);
      p5.text('Direccion ', 400, 20);


      a = a + 3.2; 
      p5.stroke(255);
      p5.line(a, 25, a, p5.height);

       //lineas de grafo
       for(let i=0;i<9;i++){
         p5.textSize(15);
         p5.stroke(140);
         p5.line(0, p5.height-i*Porcentaje10, p5.width-(160), p5.height-i*Porcentaje10);
         p5.stroke(0);
         let text = ""
         if(i==0){
            text = "";
         }else if(i==1){
            text = "N";
         }else if(i==2){
            text = "NE";
         }else if(i==3){   
            text = "E";
         }else if(i==4){
            text = "SE";
         }else if(i==5){
            text = "S";
         }else if(i==6){
            text = "SW";
         }else if(i==7){
            text = "W";
         }else if(i==8){
            text = "NW";
         }
         p5.text(`${text}`,p5.width-(160)+5,p5.height-i*Porcentaje10-1);
      }

      //leyendas avg
      p5.textSize(20);
      p5.text(`Avg:${avg}`, p5.width-100, 115);

      //paredes 
      p5.stroke(255);
      p5.line(p5.width-(160), 25, p5.width-(160), p5.height);
      p5.line(p5.width-110, 25, p5.width-110, p5.height);
     


      p5.textSize(20);
    
      //leyendas avg
      p5.stroke(0);
      
  
      for (let x = 0; x < array.length; x++) {
      
         
         if(porcentajeX*x<a){
            if(array[x]==1){
               p5.stroke(255, 14, 14);
            }else if(array[x]==2){
               p5.stroke(255, 248, 14);
            }else if(array[x]==3){   
               p5.stroke(14, 255, 25);
            }else if(array[x]==4){
               p5.stroke(14, 211, 251);
            }else if(array[x]==5){
               p5.stroke(14, 98, 255);
            }else if(array[x]==6){
               p5.stroke(215, 14, 255);
            }else if(array[x]==7){
               p5.stroke(255, 14, 98);
            }else if(array[x]==8){
               p5.stroke(255, 142, 14);
            }else{
               continue;
            }

            p5.ellipse(porcentajeX*x,  p5.height-array[x]*porcentajeY, 4, 4);
            p5.line(porcentajeX*x,  p5.height , porcentajeX*x,  p5.height-array[x]*porcentajeY);
         }
            
      }

     

      if (a > p5.width-160) 
         a = 0;
      
	};

   return (
      <div>
         <p>Direccion del viento</p>
         <Sketch setup={setup} draw={draw} />
      </div>
   );
}

export default Direccion ;