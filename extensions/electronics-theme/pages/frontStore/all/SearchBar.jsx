import React, { useState } from 'react';
import './SearchBar.scss';

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'arduino', label: 'Arduino' },
    { value: 'raspberry-pi', label: 'Raspberry Pi' },
    { value: 'sensors', label: 'Sensors' },
    { value: 'ics', label: 'ICs' },
    { value: 'resistors', label: 'Resistors' },
    { value: 'capacitors', label: 'Capacitors' },
    { value: 'leds', label: 'LEDs' },
    { value: 'modules', label: 'Modules' }
  ];

  const popularSearches = [
    'Arduino Uno', 'ESP32', 'DHT22', 'HC-SR04', 'LM7805', 
    'Raspberry Pi 4', 'OLED Display', 'Servo Motor'
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}&category=${selectedCategory}`;
    }
  };

  return (
    <div className="search-bar-container">
      <div className="container">
        <div className="search-bar">
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-input-group">
              <div className="category-selector">
                <select 
                  value={selectedCategory} 
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="category-select"
                >
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="search-input-wrapper">
                <input
                  type="text"
                  placeholder="Search for components, modules, boards..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
                <button type="submit" className="search-button">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                    <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </button>
              </div>
            </div>
          </form>

          <button 
            className="filter-toggle"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46" stroke="currentColor" strokeWidth="2"/>
            </svg>
            Filters
          </button>
        </div>

        {isFilterOpen && (
          <div className="filter-panel">
            <div className="filter-section">
              <h4>Price Range</h4>
              <div className="price-inputs">
                <input type="number" placeholder="Min ₹" className="price-input" />
                <span>to</span>
                <input type="number" placeholder="Max ₹" className="price-input" />
              </div>
            </div>
            
            <div className="filter-section">
              <h4>Brands</h4>
              <div className="filter-options">
                {['Arduino', 'Raspberry Pi', 'Espressif', 'STM', 'Atmel', 'Texas Instruments'].map(brand => (
                  <label key={brand} className="filter-option">
                    <input type="checkbox" />
                    <span>{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <h4>Availability</h4>
              <div className="filter-options">
                <label className="filter-option">
                  <input type="checkbox" defaultChecked />
                  <span>In Stock</span>
                </label>
                <label className="filter-option">
                  <input type="checkbox" />
                  <span>Include Out of Stock</span>
                </label>
              </div>
            </div>

            <div className="filter-actions">
              <button className="apply-filters-btn">Apply Filters</button>
              <button className="clear-filters-btn">Clear All</button>
            </div>
          </div>
        )}

        <div className="popular-searches">
          <span className="popular-label">Popular:</span>
          <div className="popular-tags">
            {popularSearches.map(search => (
              <button 
                key={search}
                className="popular-tag"
                onClick={() => setSearchQuery(search)}
              >
                {search}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export const layout = {
  areaId: 'header',
  sortOrder: 20
};
