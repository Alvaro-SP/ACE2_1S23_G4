import  React from 'react';
import { useState } from 'react';
// import axios from 'axios';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import DialogSelect from '../components/DialogSelect';
import ChartNotSitdown from '../components/ChartNotSitdown';
export default function Charts() {
  const handleChange = (event) => {
    const age = event.target.value;
    console.log(10);
  };
  // ! obtener las fechas almacenadas en la base de datos
  // axios.get("http://localhost:5000/getfechas").then((res) => {
  //   console.log(res.data);
  //   setTimestamps(res.data.res);
  // });
  const timestamps=[
    "2023-03-19 10:15:30",
    "2023-12-31 23:59:59",
    "2023-06-15 14:30:00",
    "2023-10-05 08:45:12",
    "2023-01-01 00:00:00",
    "2023-11-11 11:11:11",
    "2013-07-04 15:30:45",
    "2013-05-20 09:00:00",
    "2013-09-22 17:55:33",
    "2013-12-25 12:00:01"
  ];
  
  return (
    <>
      <div style={{ textAlign: "center" }}>
        <Typography variant="h5" component="div" mt={2}>
          Penalizacion Por No Sentarse a tiempo a lo largo del tiempo
        </Typography>
      </div>
      <br />
      <div style={{ textAlign: "center" }}>
        <DialogSelect timestamps={timestamps}/>
        <br />
        <ChartNotSitdown />
      </div>
      
    </>
  );
}









