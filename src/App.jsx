import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing/Landing';
import Signup from './pages/Signup/Signup';
import Home from './pages/Home/Home';
import { injectSpeedInsights } from '@vercel/speed-insights';


function App() {
  injectSpeedInsights();
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;