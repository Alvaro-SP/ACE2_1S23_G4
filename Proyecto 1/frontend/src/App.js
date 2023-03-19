import React from 'react';
import { Routes, Route, HashRouter  } from "react-router-dom";

import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Config from './pages/Config';
import Charts from './pages/Charts';
import Singin from './pages/Singin';
import Singup from './pages/Singup';

import { ProctectedRoute } from './security/ProctectedRoute';

import './App.css';
import './styles/styles.scss'

function App() {
  return (

    <HashRouter>
      
    <Navigation/>
    <Routes>

    <Route element={<ProctectedRoute  type={undefined}/>}>
      <Route path="/" element={<Dashboard/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/config" element={<Config/>} />
        <Route path="/charts" element={<Charts/>} />
    </Route>

    <Route element={<ProctectedRoute  type={"0"}/>}>
      <Route path="/Singin" element={<Singin/>} />
        <Route path="/Singup" element={<Singup/>} />
    </Route>
        
        
    </Routes>
  </HashRouter>  
  );
}

export default App;
