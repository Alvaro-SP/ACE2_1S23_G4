import { Button } from '@mui/material'
import { Outlet, Link } from 'react-router-dom'
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export const ProctectedRoute = ({ type }) => {
  const usr = cookies.get('usr')
  console.log("validadndo", usr)
  if (type === undefined) {
    if (usr !== type) return <Outlet />
  } else {
    if (usr === undefined) return <Outlet />
  }

  return (

    <div id="warning">
      <br />
      <center>
        <h1>Acceso denegado</h1>
        <h3>{type === undefined ? "Para acceder a esta pagina debes iniciar sesion" : "Para acceder a esta pagina debes cerrar sesion"} </h3>
        {type === undefined ?
          <Link to={'/singin'} style={{ textDecoration: "none" }} >
            <Button type="submit" color="primary" variant="contained">
              Inicia sesion
            </Button>
          </Link>
          :
          <Link to={'/profile'} style={{ textDecoration: "none" }} >
            <Button type="submit" color="primary" variant="contained">
              Ir a Perfil
            </Button>
          </Link>
        }

      </center>
    </div>
  )

}


