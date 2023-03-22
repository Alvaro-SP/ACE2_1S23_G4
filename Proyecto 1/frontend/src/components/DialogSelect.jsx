import  React,{useState} from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, InputLabel, MenuItem, FormControl, Select } from '@mui/material';

export default function DialogSelect({datos,setData}) {
  const [open, setOpen] = useState(false);
  const [date1, setDate1] = useState('');
  const [date2, setDate2] = useState('');

  // axios.get('http://localhost:5000/get-for-graphs')
  fechastemp = [];
  const GetFechas = () => {
    // ! seteamos las fechas en el select
    
    for (let i = 0; i < datos.length; i++) {
      fechastemp.push(<MenuItem value={datos[i].idsesion} key={datos[i].idsesion}>{new Date(datos[i].fecha).toLocaleString("es-ES", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
        second: "numeric"
      }).replace(",", " a las")}</MenuItem>);
    }
    return fechastemp;
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
   
    // console.log(date1,date2);

    const fecha_real_1 = new Date(datos.find((e) => e.idsesion === date1).fecha);
    const fecha_real_2 = new Date(datos.find((e) => e.idsesion === date2).fecha);
    // console.log("fecha1:", fecha_real_1)
    // console.log("fecha2:", fecha_real_2)

    const fechas_validas = datos.filter((item) => {
      const fecha_actual = new Date(item.fecha);
      return fecha_actual >= fecha_real_1 && fecha_actual <= fecha_real_2;
    });

    // console.log("fechas validas", fechas_validas)
    setData(fechas_validas)
    setOpen(false);
    // alert("se envio")
  };

  return (
    <div>
      <Button   variant="outlined" onClick={handleClickOpen}>Elegir rango de fecha y hora</Button>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Elegir un rango de fecha y hora</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-label">Inicio</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Inicio"
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
              <InputLabel id="demo-simple-select-label">Fin</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Fin"
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
