import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h1 className="logo-text"><span>Pharma</span>Care</h1>
          <p>
            Your trusted online pharmacy for all your health and wellness needs.
          </p>
        </div>
        <div className="footer-section links">
          <h2>Quick Links</h2>
          <ul>
            <li><Link to="/dashboard">Home</Link></li>
            <li><Link to="/cart">Your Cart</Link></li>
          </ul>
        </div>
        <div className="footer-section contact-form">
          <h2>Contact Us</h2>
          <form action="#">
            <input type="email" name="email" className="text-input contact-input" placeholder="Your email address..." />
            <textarea rows="3" name="message" className="text-input contact-input" placeholder="Your message..."></textarea>
            <button type="submit" className="btn btn-big contact-btn">Send</button>
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; pharmacare.com | Designed by You
      </div>
    </footer>
  );
};
export default Footer;