import React, { useState } from 'react';
import { AppBar, Box, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Route from './Route';
export default function Navigation() {
  const [open, setOpen] = useState(false);

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
              Pomodoro Portátil
            </Typography>

          </Toolbar>
        </AppBar>
      </Box>
      {Route(handleCloseMenu, open)}
    </>
  );
}


