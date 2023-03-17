import React from 'react';
import './App.css';
import { Routes, Route, HashRouter  } from "react-router-dom";
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Config from './pages/Config';
import Charts from './pages/Charts';
import './styles/styles.scss'

function App() {
  return (

    <HashRouter>
    <Navigation/>
    <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/config" element={<Config/>} />
        <Route path="/charts" element={<Charts/>} />
    </Routes>
  </HashRouter>  
  );
}

export default App;
