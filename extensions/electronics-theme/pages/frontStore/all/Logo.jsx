import React from 'react';
import './Logo.scss';

export default function Logo() {
  return (
    <div className="logo md:ml-0 flex justify-center items-center">
      <a href="/" className="logo-icon">
        <div className="zyvolt-logo">
          <div className="logo-circle">
            <div className="lightning-bolt">⚡</div>
          </div>
          <div className="logo-text">
            <span className="brand-name">ZYVOLT</span>
            <span className="tagline">FROM INDIA, FOR THE FUTURE</span>
          </div>
        </div>
      </a>
    </div>
  );
}

export const layout = {
  areaId: 'header',
  sortOrder: 10
};
