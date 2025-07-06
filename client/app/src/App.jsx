import React from 'react';

import './App.css';
import Home from './pages/Home';
import { Route, Routes } from 'react-router';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';


function App() {
  return (
    <>
      {/* <Home /> */}
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<Home />} />
        <Route path='/contact' element={<Home />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;