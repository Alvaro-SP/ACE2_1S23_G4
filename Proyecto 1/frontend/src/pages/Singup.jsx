import React from 'react';
import { TextField, Button, Paper, Typography } from '@mui/material';
import { Link } from "react-router-dom";
import axios from 'axios';
import addUser from '../img/addUser.png'

export default function Singup() {
 
   const handleRegister = (e) => {
      e.preventDefault();
      const usuario = e.target[0].value
   
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

      axios
      .post(`https://${process.env.REACT_APP_PUERTO}:5000/register`, {
         username: usuario
      })
      .then((response) => {
         console.log(response.data);
         alert(response.data.mensaje);
         if(response.data.estado === "1"){
            e.target.reset();
         }
      })
      .catch((error) => {
         console.log(error);
      });
   }

   return (

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "70vh" }}>
         <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Typography variant="h5" component="div" mt={2}>
               Bienvenido!
            </Typography>
            <img src={addUser} alt="addUser" width={200} style={{marginTop:"2%"}} />
            <Paper elevation={3} style={{ padding: "4%", margin: "5%" }}>

               <b>Llena los campos para crear tu usuario:</b>
               <form onSubmit={handleRegister}>
               <TextField
               id="standard-basic"
               label="Usuario"
               variant="standard"
               fullWidth />
               <center>
                  <Button variant="contained"  style={{ marginTop: "4%" }} type="submit">
                     Registrar
                  </Button>
                  </center>
                  </form>
                  <br/>
                  <center>
                  Ya tienes un usuario?ㅤ
                  <Link to={'/Singin'}>Inicia Sesión</Link> 
                  </center>
              
            </Paper> 
         </div>
      </div>


   );
}

