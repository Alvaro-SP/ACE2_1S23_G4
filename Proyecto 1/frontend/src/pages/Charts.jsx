import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import DialogSelect from '../components/DialogSelect';
import ChartTotalPomodoro from '../components/ChartTotalPomodoro';
import ChartPercentPomodoro from '../components/ChartPercentPomodoro';
import OverTime from '../components/OverTime';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export default function Charts() {


  const [type, setType] = useState('');
  const [sesion, setSesino] = useState('');

  const handleChangeType = (event) => {
    setType(event.target.value);
    console.log(event.target.value);
  };

  const handleChangeSesion = (event) => {
    setSesino(event.target.value);
    console.log(event.target.value);
  };

  const timestamps = [
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

  const names = [
    'Oliver Hansenssssssssssssssssss',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
  ];


  return (
    <>
      <div style={{ textAlign: "center" }}>
        <Typography variant="h5" component="div" mt={2}>
          Gráficas
        </Typography>
      </div>
      <br />
      <div style={{ textAlign: "center" }}>
        <DialogSelect timestamps={timestamps} />
        <br />

         {/* SELECTOR DE POMODORO A MOSTRAR */}
         <FormControl style={{width:"90%"}}>
          <InputLabel id="demo-simple-select-label">Sesion</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={sesion}
            label="Sesion"
            onChange={handleChangeSesion}
          >
            {names.map((name, index) => (
              <MenuItem value={index} key={index}>{name}</MenuItem>
            ))}
          </Select>
        </FormControl>

          {/* De Grafica a Mostrar */}
          <FormControl style={{width:"90%",marginTop:"5%"}}>
            <InputLabel id="demo-simple-select-label">Grafica</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={type}
              label="Grafica"
              onChange={handleChangeType}
            >
              <MenuItem value={0}>Penalización por no sentarse a tiempo</MenuItem>
              <MenuItem value={1}>Penalización por no pararse a tiempo</MenuItem>
              <MenuItem value={2}>Validación de que el usuario esté sentado</MenuItem>
              <MenuItem value={3}>Validación de que el usuario no esté sentado</MenuItem>
              <MenuItem value={4}>Cumplimiento de los 4 pomodoros</MenuItem>
              <MenuItem value={5}>Total de pomodoros</MenuItem>
            </Select>
          </FormControl>

        {type === '' ? <div style={{ maxWidth: '100%', height: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><img src="https://www.fotosdememes.com/wp-content/uploads/2021/09/esta-vacio-1024x597.jpg" alt="Imagen" style={{ maxWidth: '100%', height: 'auto', marginTop: "5%" }} />
        </div> : type >= 0 && type <= 3 ? <OverTime tipo={type} datos={{}} /> : type === 4 ? <ChartPercentPomodoro /> : <ChartTotalPomodoro />}
      </div>

    </>
  );
}









