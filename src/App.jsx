import { useState } from 'react';
import { NavLink, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import NavBar from './components/NavBar';
import About from './pages/About.jsx';
import HowItWorks from './pages/HowItWorks.jsx';

export default function App() {
  return (
    <>
      <NavBar></NavBar>
      {/* <Home></Home> */}
    </>
  );
}
