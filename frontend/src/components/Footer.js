import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Sermon</h3>
          <p>Spreading faith, hope, and love through meaningful messages and teachings for spiritual growth and community connection.</p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/videos">Videos</Link></li>
            <li><Link to="/audios">Audios</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/notes">Notes</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Resources</h4>
          <ul>
            <li><Link to="/sermons">Sermons</Link></li>
            <li><Link to="/devotionals">Devotionals</Link></li>
            <li><Link to="/events">Events</Link></li>
            <li><Link to="/blog">Blog</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Us</h4>
          <ul>
            <li>Email: info@sermon.org</li>
            <li>Phone: (555) 123-4567</li>
            <li>Address: 123 Faith Street, City</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-container">
          <p>&copy; 2024 Sermon. All rights reserved.</p>
          <div className="social-links">
            <a href="#facebook" aria-label="Facebook">FB</a>
            <a href="#twitter" aria-label="Twitter">TW</a>
            <a href="#youtube" aria-label="YouTube">YT</a>
            <a href="#instagram" aria-label="Instagram">IG</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;