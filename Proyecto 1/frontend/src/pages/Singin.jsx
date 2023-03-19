import React from 'react';
import { useNavigate   } from 'react-router-dom'
import { TextField, Button, Paper, Typography } from '@mui/material';
import { Link } from "react-router-dom";
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
      cookies.set('usr',{id:999,name:e.target[0].value,date:dateTimeString},{path: '/'});
      alert("Se inicio sesion");
      navigate('/');
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

