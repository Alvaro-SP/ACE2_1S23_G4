import  React,{useState} from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, InputLabel, MenuItem, FormControl, Select } from '@mui/material';

export default function DialogSelect({timestamps}) {
  const [open, setOpen] = useState(false);
  const [date1, setDate1] = useState('');
  const [date2, setDate2] = useState('');

  const GetFechas = () => {
    // ! seteamos las fechas en el select
    let fechas = [];
    for (let i = 0; i < timestamps.length; i++) {
      fechas.push(<MenuItem value={i}>{new Date(timestamps[i]).toLocaleString("es-ES", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
        second: "numeric"
      }).replace(",", " a las")}</MenuItem>);
    }
    return fechas;
  };

  const fechas = GetFechas();

  const handleClickOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleClose = (e) => {
    e.preventDefault();
    setOpen(false);
  };

  const handleSend = (e) => {
    e.preventDefault();
    alert("se envio")
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>Elegir rango de fecha y hora</Button>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Elegir un rango de fecha y hora</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel>Inicio</InputLabel>
              <Select
                value={date1}
                onChange={ (e) => setDate1(e.target.value)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {fechas}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel >Fin</InputLabel>
              <Select
                value={date2}
                onChange={(e) => setDate2(e.target.value)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {fechas}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSend}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
