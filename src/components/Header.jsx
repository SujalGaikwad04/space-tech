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
        <div className="logo">
          <span className="logo-icon">🚀</span>
          <span className="logo-text">SpaceScope</span>
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

        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <a className="nav-link">HOME</a>
          <a className="nav-link">EVENTS</a>
          <a className="nav-link">MISSION</a>
          <a className="nav-link">WEATHER</a>
          <a className="nav-link">LEARN</a>
          <a className="nav-link">DASHBOARD</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
