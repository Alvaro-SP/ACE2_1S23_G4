import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SendIcon from '@mui/icons-material/Send';

function Settime() {
   const [hours, setHours] = useState("01");
   const [minutes, setMinutes] = useState("01");

   const handleHoursChange = (event) => {
      const value = event.target.value;
      if (value >= "01" && value <= "45") {
         setHours(value);
      }
   };

   const handleMinutesChange = (event) => {
      const value = event.target.value;
      if (value >= "01" && value <= "60") {
         setMinutes(value);
      }
   };

   const incrementHours = () => {
      if (hours < "45") {
         setHours((parseInt(hours, 10) + 1).toString().padStart(2, "0"));
      }
   };

   const decrementHours = () => {
      if (hours > "01") {
         setHours((parseInt(hours, 10) - 1).toString().padStart(2, "0"));
      }
   };

   const incrementMinutes = () => {
      if (minutes < "60") {
         setMinutes((parseInt(minutes, 10) + 1).toString().padStart(2, "0"));
      }
   };

   const decrementMinutes = () => {
      if (minutes > "01") {
         setMinutes((parseInt(minutes, 10) - 1).toString().padStart(2, "0"));
      }
   };

   const handleReset = (e) => {
      e.preventDefault();
      setHours("01");
      setMinutes("01");
      alert("Se restablecio la configuracion")
   }

   const handleSet = (e) => {
      e.preventDefault();
      console.log(hours, minutes);
      alert("Se guardo la configuracion")
   }

   return (
      <>
         <center>
         <Button variant="outlined"  color="error" startIcon={<RestartAltIcon />} onClick={handleReset}>
               Restablecer
            </Button>
            <br/>
            <br/>

            <Button variant="contained" onClick={incrementHours} style={{ marginRight: "5%", marginBottom: "5%" }} >+</Button>
            <Button variant="contained" onClick={incrementMinutes} style={{ marginBottom: "5%" }}>+</Button>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
               <TextField type="text" value={hours} onChange={handleHoursChange} sx={{ width: "14%" }} style={{ marginRight: "3%" }} />
               <Typography variant="h3" component="div" >
                  :
               </Typography>
               <TextField type="text" value={minutes} onChange={handleMinutesChange} sx={{ width: "14%" }} style={{ marginLeft: "3%" }} />
            </Box>
            <Button variant="contained" onClick={decrementHours} style={{ marginRight: "5%", marginTop: "5%" }}>-</Button>
            <Button variant="contained" onClick={decrementMinutes} style={{ marginTop: "5%" }}>-</Button>
            <Typography variant="h6" component="div" style={{ marginTop: "3%", marginLeft: "5%",marginBottom: "3%" }}>
               Min Trabajo / Min Descanso
            </Typography>
           
            <Button  variant="outlined" color="success" endIcon={<SendIcon />} onClick={handleSet}>
               Setear Configuracion
            </Button>
         </center>
      </>
   );
}

export default Settime;
