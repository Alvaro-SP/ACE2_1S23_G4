import React from 'react';
import { TextField, Button, Paper, Typography } from '@mui/material';
import { Link } from "react-router-dom";
import addUser from '../img/addUser.png'

export default function Singup() {
   const handleRegister = (e) => {
      e.preventDefault();
      alert("Se Registro el usuario")
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
              
               <TextField id="standard-basic" label="Usuario" variant="standard" fullWidth />
               <center>
                  <Button variant="contained"  style={{ marginTop: "4%" }} onClick={handleRegister}>
                     Registrar
                  </Button>
                  <br/><br/>
                  Ya tienes un usuario?ㅤ
                  <Link to={'/Singin'}>Inicia Sesión</Link> 
               </center>
            </Paper> 
         </div>
      </div>


   );
}

