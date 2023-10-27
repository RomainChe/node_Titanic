import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Navbar = ({ user, onLogout }) => {
    const isAuthenticated = user !== null;
    const history = useNavigate();
  
    const handleLogout = async () => {
      try {
        const response = await axios.post("http://localhost:8000/logout");
  
        if (response.status === 200) {
          onLogout();
          history("/register");
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    return (
      <nav class="navbar custom-navbar">
        <Link to="/" class="navbar-brand custom-navbar-brand">Home</Link>
        <ul class="navbar-nav ml-auto custom-navbar-nav">
          {isAuthenticated ? (
            <>
              <li class="navbar-item">
                <Link to="/statistics" class="navbar-link custom-navbar-link">
                  Statistics
                </Link>
              </li>
              <li class="navbar-item">
                <button class="custom-button navbar-link" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li class="navbar-item">
                <Link to="/login" class="navbar-link custom-navbar-link">
                  Login
                </Link>
              </li>
              <li class="navbar-item">
                <Link to="/register" class="navbar-link custom-navbar-link">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    );
  };
  
  export default Navbar;
