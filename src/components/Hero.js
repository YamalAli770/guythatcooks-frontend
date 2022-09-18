import React from 'react'

const Hero = () => {
  return (
    <main className="hero-container">
      <section className="hero-top">
        <div className="hero-top-image">
          <img src="/images/BuffaloPizza.jpg" alt="" />
        </div>
        <div className="hero-text-container">
          <h1>Just Like Grandma Used To Make</h1>
          <blockquote>
            <p>Struggling to impress your Asian MIL, We know just the way. Look nowhere beyond, Find mouth watering recipes, Cured to perfection, Guaranteed to impress</p>
          </blockquote>
        </div>
        <div className="hero-top-image">
          <img src="/images/CaliforniaPizza.jpg" alt="" />
        </div>
      </section>
      <section className="hero-bottom">
        <div className="hero-bottom-image">
          <img src="/images/PinaColada.jpg" alt="" />
        </div>
        <div className="hero-newsletter-container">
          <section className="hero-newsletter-text">
            <h1>Subscribe to our Newsletter</h1>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos, voluptate?</p>
          </section>
          <div className="hero-newsletter-input">
            <input type="text" name="" id="" placeholder='Enter Your Email' />
            <button type="submit">Sign Up</button>
          </div>
        </div>
        <div className="hero-bottom-image">
          <img src="/images/PastaAllaGricia.jpg" alt="" />
        </div>
      </section>
    </main>
  )
}

export default Hero