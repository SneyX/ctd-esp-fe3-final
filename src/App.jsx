import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import DentistDetail from './components/DentistDetail';
import Contact from './components/Contact';
import Favorites from './components/Favorites';

function App() {
  return (
    <Router>
      <Navbar/>

      <Routes>
        <Route path="/" element={<Home/>} /> 
        <Route path='/dentist/:id' element={<DentistDetail/>}/>
        <Route path="/contact" element={<Contact />} />
        <Route path="/favs" element={<Favorites />} />
      </Routes>

      <Footer/>
    </Router>
  );
}

export default App;

