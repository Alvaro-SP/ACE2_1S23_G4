
import './App.css';
import Velocidad from './components/Velocidad';
import HumedadAbs from './components/HumedadAbs';
import HumedadRel from './components/HumedadRel';
import Temperatura from './components/Temperatura';
import Direccion from './components/Direccion';

import HumedadAbsDash from './componentsDash/HumedadAbsDash';
import HumedadRelDash from './componentsDash/HumedadRelDash';
import TemperaturaDash from './componentsDash/TemperaturaDash';
function App() {
  return (
    <div className="App">
      <TemperaturaDash/>
      <HumedadRelDash/>
      <HumedadAbsDash/>
      <Direccion />
      <Velocidad />
      <HumedadAbs />
      <HumedadRel />
      <Temperatura />
    </div>
  );
}

export default App;
