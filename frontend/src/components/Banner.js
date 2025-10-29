import React, { useState, useEffect } from 'react';
import './styles/Banner.css';

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: "https://via.placeholder.com/1200x400/3498db/ffffff?text=Welcome+to+Sermon",
      title: "Welcome to Sermon",
      description: "Your spiritual journey begins here",
      link: "/"
    },
    {
      id: 2,
      image: "https://via.placeholder.com/1200x400/2ecc71/ffffff?text=Daily+Inspiration",
      title: "Daily Inspiration",
      description: "Find peace and guidance in every message",
      link: "/videos"
    },
    {
      id: 3,
      image: "https://via.placeholder.com/1200x400/e74c3c/ffffff?text=Join+Our+Community",
      title: "Join Our Community",
      description: "Connect with believers worldwide",
      link: "/about"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="banner">
      <div className="carousel">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="slide-content">
              <h1>{slide.title}</h1>
              <p>{slide.description}</p>
              <a href={slide.link} className="cta-button">Learn More</a>
            </div>
          </div>
        ))}
      </div>

      <button className="carousel-btn prev" onClick={prevSlide}>
        &#10094;
      </button>
      <button className="carousel-btn next" onClick={nextSlide}>
        &#10095;
      </button>

      <div className="carousel-indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;