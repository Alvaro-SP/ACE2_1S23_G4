import React from 'react';
import { ListItem, TextField,Button,Paper,Avatar,Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';


export default function Profile() {

  const name = "Sergie_Arizandieta";
 
  const sesion_date = "xx/xx/xxxx xx:xx:xx";

  

  const handleCloseSesion = (e) => {
    e.preventDefault();
    alert("Se cerro la sesion")
  }



  return (
    <>
      <div style={{ textAlign: "center", alignItems: "center", marginBottom: "2%" }}>
        <Typography variant="h5" component="div" mt={2}>
          Perfil
        </Typography>
      </div>
      <center>

        <Avatar
          sx={{ bgcolor: "red", width: 100, height: 100, fontSize: 60 }}
          alt={name}
          src="/broken-image.jpg"
        />

        <Paper elevation={6} style={{ marginTop: "-13%", paddingTop: "12%", paddingBottom: "4%", marginBottom: "5%" }} >
          <Typography variant="h5" component="div" mt={2}>
            {name}
          </Typography>
          
          
          
          <ListItem >
          <TextField
              label="Usuario"
              defaultValue={name}
              InputProps={{
                readOnly: true,
              }}
              fullWidth 
            />
          </ListItem>
          <ListItem>



          <TextField
              id="outlined-read-only-input"
              label="Inicio Sesion hace:"
              defaultValue={sesion_date}
              InputProps={{
                readOnly: true,
              }}
              fullWidth 
            />
          </ListItem>

        </Paper>
        <Button variant="outlined" color="error" startIcon={<LogoutIcon />} onClick={handleCloseSesion} >
          Cerrar Sesión
        </Button>
      </center>

    </>
  );
}
