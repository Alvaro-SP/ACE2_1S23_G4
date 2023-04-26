
import React, { useState } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

export default function OverTimeGraphs() {
  const [Graph, setGraph] = useState('');
  const [startDate1, setStartDate1] = useState(new Date());
  const [startDate2, setStartDate2] = useState(new Date());

  const handleChange = (event) => {
    setGraph(event.target.value);
  };

  const data = [
    { name: 'Page A', uv: 400, pv: 2400, amt: 2400 },
    { name: 'Page A', uv: 200, pv: 2400, amt: 2400 },
    { name: 'Page A', uv: 100, pv: 2400, amt: 2400 },
    { name: 'Page A', uv: 400, pv: 2400, amt: 2400 },
    { name: 'Page A', uv: 420, pv: 2400, amt: 2400 },
    { name: 'Page A', uv: 420, pv: 2400, amt: 2400 },
    { name: 'Page A', uv: 300, pv: 2400, amt: 2400 },
    { name: 'Page A', uv: 100, pv: 2400, amt: 2400 },
  ];

  return (
    <div>
      <center>
        <h1>Graficas a travez de tiempo</h1>
      </center>


      <div className="displayDates">
        <div>
          <h4>Fecha Inicio:</h4>
          <DatePicker selected={startDate1} onChange={(date) => setStartDate1(date)} />
        </div>

        <div>
          <h4>Fecha Fin:</h4>
          <DatePicker selected={startDate2} onChange={(date) => setStartDate2(date)} />
        </div>

      </div>

      <FormControl fullWidth style={{ marginBottom: "15px", marginTop: "15px" }}>
        <InputLabel id="demo-simple-select-label">Grafo</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={Graph}
          label="Grafo"
          onChange={handleChange}
        >
          <MenuItem value={1}>emperatura externa a lo largo del tiempo</MenuItem>
          <MenuItem value={2}>Temperatura interna a lo largo del tiempo</MenuItem>
          <MenuItem value={3}>Humedad de la tierra a lo largo del tiempo</MenuItem>
          <MenuItem value={4}>Porcentaje de agua a lo largo del tiempo</MenuItem>
          <MenuItem value={5}>Periodo de activación de la bomba de agua a lo largo del tiempo </MenuItem>
        </Select>
      </FormControl>

      <center>
        <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <Line type="monotone" dataKey="uv" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </center>

    </div>
  );
}

