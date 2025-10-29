
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './styles/Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActiveLink = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <Link to="/">
            <h2>Sermon</h2>
          </Link>
        </div>
        
        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <div className="nav-item">
            <Link 
              to="/" 
              className={`nav-link ${isActiveLink('/')}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
          </div>
          <div className="nav-item">
            <Link 
              to="/videos" 
              className={`nav-link ${isActiveLink('/videos')}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Videos
            </Link>
          </div>
          <div className="nav-item">
            <Link 
              to="/audios" 
              className={`nav-link ${isActiveLink('/audios')}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Audios
            </Link>
          </div>
          <div className="nav-item">
            <Link 
              to="/about" 
              className={`nav-link ${isActiveLink('/about')}`}
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
          </div>
          <div className="nav-item">
            <Link 
              to="/notes" 
              className={`nav-link ${isActiveLink('/notes')}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Notes
            </Link>
          </div>
          <div className="nav-item">
            <Link 
              to="/login" 
              className={`nav-link ${isActiveLink('/login')}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
          </div>
        </div>

        <div className="nav-toggle" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;