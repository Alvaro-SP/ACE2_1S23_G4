import React from 'react';
import { TextField, Button, Paper, Typography } from '@mui/material';
import { Link } from "react-router-dom";
import addUser from '../img/addUser.png'
import { useState } from 'react';
import axios from 'axios';

export default function Singup() {
   const [usuario, setUsuario] = useState('');
   const handleRegister = (e) => {
      e.preventDefault();
      // alert(usuario)
      // fetch('http://3.15.186.222:5000/register', {
      axios
      .post("http://localhost:5000/register", {
         username: usuario
      })
      .then((response) => {
         console.log(response.data);
         alert(response.data.Status)
      })
      .catch((error) => {
         console.log(error);
      });
   }
   const handleChange = (event) => {
      setUsuario(event.target.value);
    };
   return (

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "70vh" }}>
         <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Typography variant="h5" component="div" mt={2}>
               Bienvenido!
            </Typography>
            <img src={addUser} alt="addUser" width={200} style={{marginTop:"2%"}} />
            <Paper elevation={3} style={{ padding: "4%", margin: "5%" }}>

               <b>Llena los campos para crear tu usuario:</b>

               <TextField
               id="standard-basic"
               label="Usuario"
               variant="standard"
               fullWidth
               value={usuario}
               onChange={handleChange} />
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

