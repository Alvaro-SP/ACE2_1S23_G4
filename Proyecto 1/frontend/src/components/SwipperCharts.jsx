import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import BarChartIcon from '@mui/icons-material/BarChart';
import { useState } from 'react';
import ComponenteGrafica1 from './OverTime';
import ComponenteGrafica2 from './Piechart';

const Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function SwipeableTemporaryDrawer() {
    const [graph, setGraph] = useState(null);

    function handle1(componente) {
        setGraph(componente);
    }
    const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
    });
    const toggleDrawer =
    (anchor, open) =>
    (event) => {
        if (
        event &&
        event.type === 'keydown' &&
        ((event).key === 'Tab' ||
            (event).key === 'Shift')
        ) {
        return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
    <Box
        sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
    >
        <List>
        {[
            {text: 'Grafica de Penalización por no sentarse a tiempo a lo largo del tiempo', componente: 1},
            {text: 'Grafica de Penalización por no pararse a tiempo a lo largo del tiempo', componente: 2},
            {text: 'Grafica de Validación de que el usuario esté sentado a lo largo del tiempo', componente: 3},
            {text: 'Grafica de Validación de que el usuario no esté sentado en el tiempo de descanso', componente: 4},
            {text: 'Grafica de porcentajes de cumplimiento de los pomodoros, y penalizaciones', componente: 5},
            {text: 'Gráfica del total de pomodoros unificando los resultados de su cumplimiento y penalizaciones', componente: 6},
        ].map((item, index) => (
            <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={() => handle1(item.componente)}>
                <ListItemIcon>
                {index % 2 === 0 ? <BarChartIcon /> : <InsertChartIcon />}
                </ListItemIcon>
                <ListItemText primary={item.text} />
            </ListItemButton>
            </ListItem>
        ))}
        </List>
        <Divider />
    </Box>
    );

    return (
    <div>
        {(['bottom']).map((anchor) => (
        <React.Fragment key={anchor}>
            <Button onClick={toggleDrawer(anchor, true)}>ELEGIR EL TIPO DE GRAFICO</Button>
            <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
            >
            {list(anchor)}
            </SwipeableDrawer>
            {graph === 1 ? <ComponenteGrafica1 /> : null}
            {graph === 2 ? <ComponenteGrafica2 /> : null}
            {graph === 3 ? <ComponenteGrafica1 /> : null}
            {graph === 4 ? <ComponenteGrafica2 /> : null}
            {graph === 5 ? <ComponenteGrafica1 /> : null}
        </React.Fragment>
        ))}
    </div>
    );
}
