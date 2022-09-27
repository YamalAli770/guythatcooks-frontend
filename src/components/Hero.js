import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const Hero = () => {
  return (
    <main className="hero-container">
      <section className="hero-top">
        <div className="hero-top-image">
          <LazyLoadImage src="/images/BuffaloPizza.jpg" alt="hero-image" />
        </div>
        <div className="hero-text-container">
          <h1>Just Like Grandma Used To Make</h1>
          <blockquote>
            <p>Struggling to impress your Asian MIL, We know just the way. Look nowhere beyond, Find mouth watering recipes, Cured to perfection, Guaranteed to impress</p>
          </blockquote>
        </div>
        <div className="hero-top-image">
          <LazyLoadImage src="/images/CaliforniaPizza.jpg" alt="hero-image" />
        </div>
      </section>
      <section className="hero-bottom">
        <div className="hero-bottom-image">
          <LazyLoadImage src="/images/PinaColada.jpg" alt="hero-image" />
        </div>
        <div className="hero-newsletter-container">
          <section className="hero-newsletter-text">
            <h1>Subscribe to our Newsletter</h1>
            <p>Get notified whenever we drop amazing new recipes.</p>
          </section>
          <div className="hero-newsletter-input">
            <input type="text" name="" id="" placeholder='Enter Your Email' />
            <button type="submit">Sign Up</button>
          </div>
        </div>
        <div className="hero-bottom-image">
          <LazyLoadImage src="/images/PastaAllaGricia.jpg" alt="hero-image" />
        </div>
      </section>
    </main>
  )
}

export default Hero