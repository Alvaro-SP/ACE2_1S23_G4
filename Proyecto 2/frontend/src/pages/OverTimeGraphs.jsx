
import React, { useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button } from "@mui/material";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import dayjs from 'dayjs';

import axios from 'axios';

export default function OverTimeGraphs() {
  const [Graph, setGraph] = useState('');
  const [startDate1, setStartDate1] = useState(new Date());
  const [startTime1, setStartTime1] = useState(dayjs('2022-04-17T15:30'));

  const [startDate2, setStartDate2] = useState(new Date());
  const [startTime2, setStartTime2] = useState(dayjs('2022-04-17T15:30'));

  const [data, setData] = useState([]);
  function postData(url, data) {
    axios.post(url, data)
      .then(response => {
        // console.log(response.data);
        var info = []
        for (let i = 0; i < response.data.length; i++) {
          const fecha = new Date(response.data[i][0])
          const dia = fecha.getDate().toString().padStart(2, '0')
          const mes = (fecha.getMonth() + 1).toString().padStart(2, '0')
          const anio = fecha.getFullYear().toString().slice(-2)
          const hora = fecha.getHours().toString().padStart(2, '0')
          const minutos = fecha.getMinutes().toString().padStart(2, '0')
          const segundos = fecha.getSeconds().toString().padStart(2, '0')
          const fechaFormateada = `${dia}/${mes}/${anio} ${hora}:${minutos}:${segundos}`
          info.push({ name: fechaFormateada, val: response.data[i][1] })
        }
        setData(info)
      })
      .catch(error => {
        console.error(error);
      });
  }

  const handleApply = (event) => {
    event.preventDefault();

   
    const dateTime1 = dayjs(startDate1).format('YYYY-MM-DD') + ' ' + dayjs(startTime1).format('HH:mm:ss');
    const dateTime2 = dayjs(startDate2).format('YYYY-MM-DD') + ' ' + dayjs(startTime2).format('HH:mm:ss');
    console.log("===== POST =====")
    console.log(dateTime1);
    console.log(dateTime2);
    console.log(Graph)

    postData('http://localhost:8000/graph', {
      dateTime1: dateTime1,
      dateTime2: dateTime2,
      graph: Graph
    });

  };

  const handleChange = (event) => {
    setGraph(event.target.value);
  };

  return (
    <div>
      <center>
        <h1>Graficas a travez de tiempo</h1>
      </center>


      <FormControl fullWidth style={{ marginBottom: "15px", marginTop: "15px" }}>
        <InputLabel id="demo-simple-select-label">Grafo</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={Graph}
          label="Grafo"
          onChange={handleChange}
        >
          <MenuItem value={1}>Temperatura externa a lo largo del tiempo</MenuItem>
          <MenuItem value={2}>Temperatura interna a lo largo del tiempo</MenuItem>
          <MenuItem value={3}>Humedad de la tierra a lo largo del tiempo</MenuItem>
          <MenuItem value={4}>Porcentaje de agua a lo largo del tiempo</MenuItem>
          <MenuItem value={5}>Periodo de activación de la bomba de agua a lo largo del tiempo </MenuItem>
        </Select>
      </FormControl>

      <div className="displayDates">
        <div>
          <h4>Hora y Fecha Inicio:</h4>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['TimePicker']}>
                <TimePicker
                  label="Seleccionar Hora"
                  value={startTime1}
                  onChange={(newValue) => setStartTime1(newValue)}
                />
            </DemoContainer>
          </LocalizationProvider>
          <br />
          <DatePicker selected={startDate1} onChange={(date) => setStartDate1(date)} />
        </div>

        <div>
          <h4>Hora y Fecha Fin:</h4>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['TimePicker']}>
            <TimePicker
                  label="Seleccionar Hora"
                  value={startTime2}
                  onChange={(newValue) => setStartTime2(newValue)}
                />
            </DemoContainer>
          </LocalizationProvider>
          <br />
          <DatePicker selected={startDate2} onChange={(date) => setStartDate2(date)} />
        </div>

        <Button variant="contained" style={{width: "90%"}} onClick={handleApply}   >
          Aplicar
        </Button>
      </div>

      <br /><br />

      <center>
        <div className="chart-container">
          <LineChart width={data.length*30} height={400} data={data} margin={{ top: 5, right: 100, bottom: 5, left: 0 }}>
            <Line type="monotone" dataKey="val" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </div>
      </center>

    </div>
  );
}

