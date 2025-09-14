import React from 'react';
import './HeroBanner.scss';

export default function HeroBanner() {
  return (
    <div className="hero-banner electronics-hero">
      <div className="hero-content">
        <div className="hero-text">
          <div className="hero-badge">
            <span>🔧 Electronics & Components</span>
          </div>
          <h1 className="hero-title">
            Professional <span className="text-electric">Electronic Components</span>
            <br />& Development Boards
          </h1>
          <p className="hero-subtitle">
            From basic resistors to advanced microcontrollers. Quality components 
            for hobbyists, students, and professionals. Fast shipping across India.
          </p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">10,000+</span>
              <span className="stat-label">Components</span>
            </div>
            <div className="stat">
              <span className="stat-number">500+</span>
              <span className="stat-label">Dev Boards</span>
            </div>
            <div className="stat">
              <span className="stat-number">24hr</span>
              <span className="stat-label">Shipping</span>
            </div>
          </div>
          <div className="hero-buttons">
            <a href="/catalog" className="btn btn-primary">
              <span>Browse Components</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14m-7-7l7 7-7 7" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </a>
            <a href="/categories/development-boards" className="btn btn-secondary">
              Development Boards
            </a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="component-grid">
            <div className="component-card arduino">
              <div className="component-icon">🔲</div>
              <span>Arduino</span>
            </div>
            <div className="component-card raspberry">
              <div className="component-icon">🍓</div>
              <span>Raspberry Pi</span>
            </div>
            <div className="component-card sensors">
              <div className="component-icon">📡</div>
              <span>Sensors</span>
            </div>
            <div className="component-card resistors">
              <div className="component-icon">⚡</div>
              <span>Resistors</span>
            </div>
            <div className="component-card ics">
              <div className="component-icon">🔧</div>
              <span>ICs</span>
            </div>
            <div className="component-card modules">
              <div className="component-icon">📱</div>
              <span>Modules</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="hero-features">
        <div className="feature">
          <div className="feature-icon">🚚</div>
          <div className="feature-text">
            <h4>Free Shipping</h4>
            <p>Orders above ₹500</p>
          </div>
        </div>
        <div className="feature">
          <div className="feature-icon">🔬</div>
          <div className="feature-text">
            <h4>Tested Quality</h4>
            <p>All components verified</p>
          </div>
        </div>
        <div className="feature">
          <div className="feature-icon">📋</div>
          <div className="feature-text">
            <h4>Datasheets</h4>
            <p>Complete documentation</p>
          </div>
        </div>
        <div className="feature">
          <div className="feature-icon">🎯</div>
          <div className="feature-text">
            <h4>Bulk Orders</h4>
            <p>Special pricing available</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export const layout = {
  areaId: 'content',
  sortOrder: 10
};
