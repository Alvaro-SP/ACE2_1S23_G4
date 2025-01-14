import React, { useState, useEffect } from 'react';
import { FormControl, IconButton, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import axios from 'axios';
import DialogSelect from '../components/DialogSelect';
import ChartTotalPomodoro from '../components/ChartTotalPomodoro';
import ChartPercentPomodoro from '../components/ChartPercentPomodoro';
import OverTime from '../components/OverTime';
// eslint-disable-next-line
import datatemp from '../data/testfile.js';
export default function Charts() {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    axios.get(`https://${process.env.REACT_APP_PUERTO}/charts`)
      .then((response) => {
        setDatos(response.data.datos);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [type, setType] = useState('');
  const [sesion, setSesino] = useState('');

  //data mostrada segun el intervalo de fechas
  const [data, setData] = useState([]);

  //sesion a mostrar
  const [sesionData, setSesionData] = useState({});

  const handleChangeType = (event) => {
    setType(event.target.value);
    console.log(event.target.value);
  };

  const handleChangeSesion = (event) => {
    setSesino(event.target.value);
    const sesion_penalizacion_seg = datos.find((e) => e.idsesion === event.target.value);
    // eslint-disable-next-line
    console.log(sesion_penalizacion_seg);

    const sesion_penalizacion_minutos = {
      ejecucion: sesion_penalizacion_seg.ejecucion,
      descanso: sesion_penalizacion_seg.descanso,
      pomodoro1: (sesion_penalizacion_seg.pomodoro1 / 60).toFixed(2),
      pomodoro2: (sesion_penalizacion_seg.pomodoro2 / 60).toFixed(2),
      pomodoro3: (sesion_penalizacion_seg.pomodoro3 / 60).toFixed(2),
      pomodoro4: (sesion_penalizacion_seg.pomodoro4 / 60).toFixed(2),
      descanso1: (sesion_penalizacion_seg.descanso1 / 60).toFixed(2),
      descanso2: (sesion_penalizacion_seg.descanso2 / 60).toFixed(2),
      descanso3: (sesion_penalizacion_seg.descanso3 / 60).toFixed(2),
      descanso4: (sesion_penalizacion_seg.descanso4 / 60).toFixed(2),
      fecha: sesion_penalizacion_seg.fecha
    }
    setSesionData(sesion_penalizacion_minutos); //este debera ser en produccion
    //setSesionData(sesion_penalizacion_seg); //temporal porque nuetras puebas estan en minutos
  };

  //const link = "https://www.fotosdememes.com/wp-content/uploads/2021/09/esta-vacio-1024x597.jpg";
  const link = "https://cdn-icons-png.flaticon.com/512/6165/6165003.png"

  const handleRefresh = () => {
    window.location.reload();
  }

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <Typography variant="h5" component="div" mt={2}>
          Gráficas
        </Typography>
      </div>
      <IconButton aria-label="delete" style={{ marginTop: "-16%", marginLeft: "2%" }} onClick={handleRefresh}>
        <RefreshIcon />
      </IconButton>
      <br />
      <div style={{ textAlign: "center" }}>
        <DialogSelect datos={datos} setData={setData} />
        <br />

        {/* SELECTOR DE POMODORO A MOSTRAR */}
        {
          data.length > 0 &&
          <FormControl style={{ width: "90%" }}>
            <InputLabel id="demo-simple-select-label">Sesion</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sesion}
              label="Sesion"
              onChange={handleChangeSesion}
            >
              {data.map((item, index) => (
                <MenuItem value={item.idsesion} key={item.idsesion}>{item.fecha}</MenuItem>
              ))}
            </Select>
          </FormControl>
        }

        {/* De Grafica a Mostrar */}
        {
          sesion !== '' &&
          <FormControl style={{ width: "90%", marginTop: "5%", marginBottom: "5%" }}>
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
              <MenuItem value={2}>Validación usuario esté sentado</MenuItem>
              <MenuItem value={3}>Validación usuario no esté sentado</MenuItem>
              <MenuItem value={4}>Cumplimiento de los 4 pomodoros</MenuItem>
              <MenuItem value={5}>Total de pomodoros</MenuItem>
            </Select>
          </FormControl>
        }

        {type === '' ?
          <div style={{ maxWidth: '100%', height: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src={link} alt="Imagen" style={{ maxWidth: '100%', height: 'auto', marginTop: "5%" }} />
          </div>
          : type >= 0 && type <= 3 ? <OverTime tipo={type} datos={sesionData} /> : type === 4 ? <ChartPercentPomodoro datos={sesionData} /> : <ChartTotalPomodoro sesionData={sesionData} />}
        <br /><br /><br /><br /><br /><br /><br /><br />
      </div>

    </>
  );
}









