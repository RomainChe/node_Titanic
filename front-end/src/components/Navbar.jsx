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
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/" className="navbar-brand">Home</Link>
        <ul className="navbar-nav ml-auto">
          {isAuthenticated ? (
            <>
              <li className="nav-item">
                <Link to="/account" className="nav-link">
                  Compte
                </Link>
              </li>
              <li className="nav-item">
                <button className="btn btn-link nav-link" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link">
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
