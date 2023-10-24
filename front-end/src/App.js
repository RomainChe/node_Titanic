import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importez Outlet
import Login from './components/Login';
import Register from './components/Register.jsx';
import Home from './components/Home.jsx';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    // Code pour gérer la déconnexion
    setUser(null); // Réinitialisez l'utilisateur
  }
  return (
    <Router>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/login" element={<Login setUser={setUser}/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;