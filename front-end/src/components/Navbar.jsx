import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        {/* Ajoutez d'autres liens de navigation ici si nécessaire */}
      </ul>
    </nav>
  );
};

export default Navbar;
