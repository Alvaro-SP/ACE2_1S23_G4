import  React from 'react';
import {  Typography } from "@mui/material";
import Settime from '../components/Settime';

export default function Config() {

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <Typography variant="h5" component="div" mt={2}>
          Congiración de Sesión 
        </Typography>
      </div>
      <br/>
      <Settime />

     </>
  );
}
