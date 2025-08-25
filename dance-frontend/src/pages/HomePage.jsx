import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => (
  <div className="homepage">
    <div className="hero-section">
      <h1 className="hero-title">Welcome to DanceIns</h1>
      <p className="hero-subtitle">
        Connect with professional dance instructors, book classes, and perfect your moves. 
        Whether you're a beginner or advanced dancer, find the perfect instructor for your journey.
      </p>
      <div className="cta-buttons">
        <Link to="/login" className="btn btn-primary">Login</Link>
        <Link to="/register" className="btn btn-secondary">Register</Link>
      </div>
    </div>
    
    <div className="features-section">
      <div className="feature-card">
        <div className="feature-icon">💃</div>
        <h3 className="feature-title">Expert Instructors</h3>
        <p className="feature-description">
          Learn from certified dance professionals with years of experience in various dance styles.
        </p>
      </div>
      
      <div className="feature-card">
        <div className="feature-icon">📅</div>
        <h3 className="feature-title">Easy Booking</h3>
        <p className="feature-description">
          Book classes with just a few clicks. View schedules and reserve your spot instantly.
        </p>
      </div>
      
      <div className="feature-card">
        <div className="feature-icon">⭐</div>
        <h3 className="feature-title">Verified Reviews</h3>
        <p className="feature-description">
          Read authentic reviews from other students to choose the best instructor for you.
        </p>
      </div>
    </div>
  </div>
);

export default HomePage;
