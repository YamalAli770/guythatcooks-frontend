import React from 'react'
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="footer-container">
        <section className="footer-left">
          <h4 className="footer-left-title">Guy That Cooks</h4>
          <p className='footer-left-desc'>Guy That Cooks is a personal food blog started as a hobby by a university student based in Karachi, Pakistan. Here, People could find amazing recipes to cure their Asian food desires.</p>
          <div className="footer-left-socials">
            <a href='http://www.facebook.com'><FaFacebookF /></a>
            <a href='http://www.instagram.com'><FaInstagram /></a>
            <a href='http://www.twitter.com'><FaTwitter /></a>
            <a href='http://www.youtube.com'><FaYoutube /></a>
          </div>
        </section>
        <section className="footer-center">
          <h5 className='footer-center-title'>Useful Links</h5>
          <nav className="footer-center-links">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="contact">Contact Us</Link>
            <Link to="/login">Login</Link>
          </nav>
        </section>
        <section className="footer-right">
          <h5 className="footer-right-title">Contact</h5>
          <div className="footer-right-text">
            <span className='footer-right-address'> 9-D, Cantt Bazar Area Malir Cantt Karachi, Pakistan</span>
            <span className="footer-right-website">www.guythatcooks.com</span>
            <span className="footer-right-email">guythatcooks@outlook.com</span>
          </div>
        </section>
        <p className="footer-copyright">
          Copyright &copy; 2022 Guy That Cooks | All Rights Reserved
        </p>
    </footer>
  )
}

export default Footer