import React,{useState} from "react";
import { Button } from "@mui/material";
import EqualizerIcon from '@mui/icons-material/Equalizer';
import DashboardIcon from '@mui/icons-material/Dashboard';
import YardIcon from '@mui/icons-material/Yard';

import CrrGraphs from "./CrrGraphs";
import OverTimeGraphs from "./OverTimeGraphs";

export default function Dashboard() {
  const [option, setOption] = useState(1);

  const conditionalRender = () => {
    if (option === 1) {
      return <CrrGraphs/>;
    } else if (option === 2) {
      return <OverTimeGraphs/>;
    }
  };


  return (
    <div className="container">
      <div className="sidebar">
        <br />
        <h1 style={{ color: `black`, textAlign: 'center' }}> < YardIcon /> Invernadero < YardIcon /></h1>
        <br />

        <Button variant="outlined" startIcon={<DashboardIcon />} fullWidth onClick= {(e) => setOption(1)} >
          DashBoard
        </Button>

        <br /><br />

        <Button variant="outlined" startIcon={<EqualizerIcon />} fullWidth onClick= {(e) => setOption(2)}>
          Gráficas
        </Button>
      </div>


      <div className="main">
        {conditionalRender()}

      </div>
    </div>
  );
}

