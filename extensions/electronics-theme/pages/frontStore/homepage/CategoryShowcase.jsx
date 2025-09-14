import React from 'react';
import './CategoryShowcase.scss';

export default function CategoryShowcase() {
  const categories = [
    {
      id: 1,
      name: 'Development Boards',
      icon: '🔲',
      description: 'Arduino, Raspberry Pi, ESP32',
      itemCount: '250+ items',
      color: '#00979d',
      featured: ['Arduino Uno R3', 'Raspberry Pi 4', 'ESP32 DevKit']
    },
    {
      id: 2,
      name: 'Sensors & Modules',
      icon: '📡',
      description: 'Temperature, Motion, GPS',
      itemCount: '500+ items',
      color: '#7c3aed',
      featured: ['DHT22', 'HC-SR04', 'MPU6050']
    },
    {
      id: 3,
      name: 'ICs & Microcontrollers',
      icon: '🔧',
      description: 'ATmega, PIC, ARM Cortex',
      itemCount: '800+ items',
      color: '#10b981',
      featured: ['ATmega328P', 'PIC16F877A', 'STM32F103']
    },
    {
      id: 4,
      name: 'Passive Components',
      icon: '⚡',
      description: 'Resistors, Capacitors, LEDs',
      itemCount: '2000+ items',
      color: '#f59e0b',
      featured: ['Carbon Resistors', 'Ceramic Caps', '5mm LEDs']
    },
    {
      id: 5,
      name: 'Power Supplies',
      icon: '🔋',
      description: 'Adapters, Batteries, Regulators',
      itemCount: '150+ items',
      color: '#ef4444',
      featured: ['12V 2A SMPS', 'LM7805', 'Li-ion 18650']
    },
    {
      id: 6,
      name: 'Tools & Equipment',
      icon: '🔨',
      description: 'Soldering, Multimeters, Kits',
      itemCount: '100+ items',
      color: '#8b5cf6',
      featured: ['Soldering Iron', 'Digital Multimeter', 'Breadboard']
    },
    {
      id: 7,
      name: 'Connectors & Cables',
      icon: '🔌',
      description: 'Headers, Jumpers, USB',
      itemCount: '300+ items',
      color: '#06b6d4',
      featured: ['Male Headers', 'Jumper Wires', 'USB Cables']
    },
    {
      id: 8,
      name: 'Display & LED',
      icon: '📺',
      description: 'LCD, OLED, LED Strips',
      itemCount: '120+ items',
      color: '#f97316',
      featured: ['16x2 LCD', '0.96" OLED', 'WS2812B Strip']
    }
  ];

  return (
    <section className="category-showcase electronics-categories">
      <div className="container">
        <div className="section-header">
          <h2>Browse by Category</h2>
          <p>Find the right components for your next project</p>
        </div>
        
        <div className="categories-grid">
          {categories.map((category) => (
            <div 
              key={category.id} 
              className="category-card"
              style={{ '--category-color': category.color }}
            >
              <div className="category-header">
                <div className="category-icon">
                  {category.icon}
                </div>
                <div className="category-info">
                  <h3>{category.name}</h3>
                  <p className="category-desc">{category.description}</p>
                  <span className="item-count">{category.itemCount}</span>
                </div>
              </div>
              
              <div className="category-featured">
                <h4>Popular Items:</h4>
                <ul>
                  {category.featured.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              
              <div className="category-overlay">
                <button className="browse-btn">
                  Browse Category →
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="category-footer">
          <div className="quick-stats">
            <div className="stat">
              <span className="stat-number">4,000+</span>
              <span className="stat-label">Total Products</span>
            </div>
            <div className="stat">
              <span className="stat-number">50+</span>
              <span className="stat-label">Brands</span>
            </div>
            <div className="stat">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Support</span>
            </div>
          </div>
          <a href="/catalog" className="view-all-btn">
            View All Products
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14m-7-7l7 7-7 7" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

export const layout = {
  areaId: 'content',
  sortOrder: 20
};
