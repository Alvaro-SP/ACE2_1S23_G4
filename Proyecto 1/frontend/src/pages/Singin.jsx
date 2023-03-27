import React from 'react';
import { useNavigate   } from 'react-router-dom'
import { TextField, Button, Paper, Typography } from '@mui/material';
import { Link } from "react-router-dom";
import axios from 'axios';
import pomodoro from '../img/pomodoro.png'
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default function Singin() {
   const navigate = useNavigate();

   const handlelogin = (e) => {
      e.preventDefault();
      const dateTimeString = new Intl.DateTimeFormat('en-US', {
         timeZone: 'UTC',
         dateStyle: 'full',
         timeStyle: 'long'
      }).format(new Date());
      const usuario = e.target[0].value
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

      axios.post(`https://${process.env.REACT_APP_PUERTO}:5000/login`, {
         username: usuario
      })
      .then((response) => {
         console.log(response.data);
         alert(response.data.mensaje);
         if(response.data.estado === "1"){
            cookies.set('usr',{id:response.data.id,name:usuario,date:dateTimeString},{path: '/'});
            navigate('/');
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
               Bienvenido de vuelta!
            </Typography>
            <img src={pomodoro} alt="pomodoro" width={200}/>
            <Paper elevation={3} style={{ padding: "4%", margin: "5%" }}>
               
               <b>Inicia sesión para continuar:</b>
               <form onSubmit={handlelogin}>
               <TextField id="standard-basic" label="Usuario" variant="standard" fullWidth />
               <center>
                  <Button variant="contained" type='Submit' style={{ marginTop: "4%" }} >
                     Ingresar
                  </Button>
                  <br/><br/>
                  Aun no tines un usuario?ㅤ
                  <Link to={'/Singup'}>Registrate</Link> 
               </center>
               </form>
            </Paper> 
         </div>
      </div>
   );
}

