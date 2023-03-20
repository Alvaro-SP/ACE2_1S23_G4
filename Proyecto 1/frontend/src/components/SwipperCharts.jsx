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

const Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function SwipeableTemporaryDrawer() {
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
        {['Grafica de Penalización por no sentarse a tiempo a lo largo del tiempo',
        'Grafica de Penalización por no pararse a tiempo a lo largo del tiempo',
        'Grafica de Validación de que el usuario esté sentado a lo largo del tiempo',
        'Grafica de Validación de que el usuario no esté sentado en el tiempo de descanso',
        'Grafica de porcentajes de cumplimiento de los pomodoros, y penalizaciones',
        'Gráfica del total de pomodoros unificando los resultados de su cumplimiento y penalizaciones'].map((text, index) => (
            <ListItem key={text} disablePadding>
            <ListItemButton>
                <ListItemIcon>
                {index % 2 === 0 ? <BarChartIcon /> : <InsertChartIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
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
        </React.Fragment>
        ))}
    </div>
    );
}
