import React, {useState}from 'react';
import { IconButton, InputAdornment, ListItem, TextField,Button,Paper,Avatar,Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';

export default function Profile() {
  const [edit, setEdit] = useState(true);
  const [name, setName] = useState("Sergie_Arizandieta");
  const [newName, setNewName] = useState(""); 
  const sesiones = 10
  const regex = /^[a-zA-Z][a-zA-Z0-9_]*$/;
  
  const handleNameChange = (e) => {
    e.preventDefault();
    setNewName(e.target.value); 
  }


  const handleCloseSesion = (e) => {
    e.preventDefault();
    alert("Se cerro la sesion")
  }

  const handleEdit = (e) => {
    e.preventDefault();
    if(edit === false){
      if( newName !== name && regex.test(newName)){
        alert("Se guardo el usuario")
        setName(newName)
      }else{
        alert("El usuario solo permite letras, numeros y guion bajo / El usuario no puede iniciar con _ o un numero")
        return
      }
    }
    setEdit(!edit)
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
              onChange={handleNameChange}
              InputProps={{
                readOnly:  edit,
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton onClick={handleEdit}>
                      {edit ? <EditIcon /> : <SaveIcon /> }
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              fullWidth               
            />

          </ListItem>
          <ListItem>
          <TextField
              id="outlined-read-only-input"
              label="Sesiones Totales"
              defaultValue={sesiones}
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
