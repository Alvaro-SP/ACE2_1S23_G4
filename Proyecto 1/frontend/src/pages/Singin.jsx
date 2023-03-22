import React,{ useState }  from 'react';
import { useNavigate   } from 'react-router-dom'
import { TextField, Button, Paper, Typography } from '@mui/material';
import { Link } from "react-router-dom";
import axios from 'axios';
import pomodoro from '../img/pomodoro.png'
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default function Singin() {
   const [usuario, setUsuario] = useState('');
   const navigate = useNavigate();

   const handlelogin = (e) => {
      e.preventDefault();
      const dateTimeString = new Intl.DateTimeFormat('en-US', {
         timeZone: 'UTC',
         dateStyle: 'full',
         timeStyle: 'long'
      }).format(new Date());
      cookies.set('usr',{id:999,name:e.target[0].value,date:dateTimeString},{path: '/'});
      axios
      .post("http://localhost:5000/login", {
         username: usuario
      })
      .then((response) => {
         console.log(response.data);
         alert(response.data.Status);
         if(response.data.Status !== "User Not Found :("){
            // window.location.href = "/Singin#/singin";
            navigate('/');
         }
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
               Bienvenido de vuelta!
            </Typography>
            <img src={pomodoro} alt="pomodoro" width={200}/>
            <Paper elevation={3} style={{ padding: "4%", margin: "5%" }}>
               
               <b>Inicia sesión para continuar:</b>
               <form onSubmit={handlelogin}>
               <TextField id="standard-basic" label="Usuario" variant="standard" fullWidth 
               value={usuario}
               onChange={handleChange}/>
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

