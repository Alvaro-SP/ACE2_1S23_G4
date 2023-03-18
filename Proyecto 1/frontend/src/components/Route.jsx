import * as React from 'react';
import { Link } from "react-router-dom";

import { Dialog, List, Divider, AppBar, Toolbar, IconButton, Typography, Slide, ListItemButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

//Impotar otros
import tomato from '../img/tomato.png'
import user from '../img/user.png'
import settings from '../img/settings.png'
import chart from '../img/chart.png'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Route(handleClose,open) {

  return (
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon sx={{ fontSize: 30 }}/>
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Menú
            </Typography>
          </Toolbar>
        </AppBar>

        <List>
          <Link to={'/profile'} style={{textDecoration: "none", color:"black"}}>
            <ListItemButton onClick={handleClose}>
              <img src={user} alt="user" width={40}/>
              <Typography sx={{ ml: 2, flex: 1,fontSize:25 }} variant="h6" component="div">
                 Perfil
              </Typography>
            </ListItemButton>
          </Link>

          
          <Divider />
        
          <Link to={'/'} style={{textDecoration: "none", color:"black"}}>
            <ListItemButton onClick={handleClose}>
              <img src={tomato} alt="tomato" width={45}/>
              <Typography sx={{ ml: 2, flex: 1,fontSize:25 }} variant="h6" component="div">
              Sesión Actual
              </Typography>
            </ListItemButton>
          </Link>

          <Divider />
        
          <Link to={'/config'} style={{textDecoration: "none", color:"black"}}>
            <ListItemButton onClick={handleClose}>
              <img src={settings} alt="settings" width={40}/>
              <Typography sx={{ ml: 2, flex: 1,fontSize:25 }} variant="h6" component="div">
                Configuración de Sesión 
              </Typography>
            </ListItemButton>
          </Link>

          <Divider />
        
          <Link to={'/charts'} style={{textDecoration: "none", color:"black"}}>
            <ListItemButton onClick={handleClose}>
              <img src={chart} alt="chart" width={40}/>
            
              <Typography sx={{ ml: 2, flex: 1,fontSize:25 }} variant="h6" component="div">
                Gráficas
              </Typography>
            </ListItemButton>
          </Link>

          <Divider />
          
        </List>
      </Dialog>
  );
}