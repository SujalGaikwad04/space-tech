import { useState } from 'react';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-top">
          <div className="logo-section">
            <span className="logo-text">LOGO</span>
          </div>

          <div className="title-section">
            <svg className="planet-icon" width="32" height="32" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="8" stroke="currentColor" strokeWidth="2" fill="none"/>
              <ellipse cx="16" cy="16" rx="14" ry="5" stroke="currentColor" strokeWidth="2" fill="none"/>
            </svg>
            <span className="title-text">SpaceScope</span>
          </div>

          <div className="window-controls">
            <button className="control-btn minimize">—</button>
            <button className="control-btn maximize">▢</button>
            <button className="control-btn close">✕</button>
          </div>

          <button 
            className="hamburger" 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <div className="nav-item">
            <a className="nav-link">HOME</a>
          </div>
          <div className="nav-item">
            <a className="nav-link">EVENTS</a>
          </div>
          <div className="nav-item">
            <a className="nav-link">MISSION</a>
          </div>
          <div className="nav-item">
            <a className="nav-link">WEATHER</a>
          </div>
          <div className="nav-item">
            <a className="nav-link">LEARN</a>
          </div>
          <div className="nav-item">
            <a className="nav-link">DASHBOARD</a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
