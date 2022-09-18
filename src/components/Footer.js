import React from 'react'
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="footer-container">
        <section className="footer-left">
          <h4 className="footer-left-title">Conceptial</h4>
          <p className='footer-left-desc'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis aut modi officia. Debitis, doloribus amet alias illum adipisci earum aut quibusdam ullam. Similique, odio odit!</p>
          <div className="footer-left-socials">
            <FaFacebookF />
            <FaInstagram />
            <FaTwitter />
            <FaYoutube />
          </div>
        </section>
        <section className="footer-center">
          <h5 className='footer-center-title'>Useful Links</h5>
          <nav className="footer-center-links">
            <span>Home</span>
            <span>About</span>
            <span>Contact Us</span>
            <span>Login</span>
          </nav>
        </section>
        <section className="footer-right">
          <h5 className="footer-right-title">Contact</h5>
          <div className="footer-right-text">
            <span className='footer-right-address'>12T, Westwood Lane, DATS SPS, Sidcup London, UK</span>
            <span className="footer-right-website">www.yoursite.com</span>
            <span className="footer-right-email">temp@gmail.com</span>
          </div>
        </section>
        <p className="footer-copyright">
          Copyright &copy; 2022 Food Blog | All Rights Reserved
        </p>
    </footer>
  )
}

export default Footer