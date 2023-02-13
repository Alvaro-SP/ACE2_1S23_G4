
import './App.css';
import Velocidad from './components/Velocidad';
import HumedadAbs from './components/HumedadAbs';
import HumedadRel from './components/HumedadRel';
import Temperatura from './components/Temperatura';

function App() {
  return (
    <div className="App">
      <Velocidad />
      <HumedadAbs />
      <HumedadRel />
      <Temperatura />
    </div>
  );
}

export default App;
