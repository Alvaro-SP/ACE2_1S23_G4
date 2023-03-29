import React, { useState } from 'react';
import { AppBar, Box, Toolbar, Typography, IconButton,Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Route from './Route';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
export default function Navigation() {
  const [open, setOpen] = useState(false);
  var name="";
  try {
    name = cookies.get('usr').name;
  } catch (error) {
    name = "P";
  }
  const handleOpenMenu = () => {
    setOpen(true);
  }

  const handleCloseMenu = () => {
    setOpen(false);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>

            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleOpenMenu}
            >
              <MenuIcon sx={{ fontSize: 30 }} />
            </IconButton>

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Pomodoro Portátil - v{process.env.REACT_APP_VERSION}
            </Typography>
            {/* <Typography variant="h5" component="div" sx={{ flexGrow: 0 }}>
              {name}
            </Typography> */}
            <Avatar
              sx={{ bgcolor: "red", width: 40, height: 40, fontSize: 25 }}
              alt={name}
              src="/broken-image.jpg"
            />
          </Toolbar>
        </AppBar>
      </Box>
      {Route(handleCloseMenu, open)}
    </>
  );
}


