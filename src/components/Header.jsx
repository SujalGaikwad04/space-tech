import { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

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
            <svg
              className="planet-icon"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
            >
              <circle cx="16" cy="16" r="8" stroke="currentColor" strokeWidth="2" />
              <ellipse cx="16" cy="16" rx="14" ry="5" stroke="currentColor" strokeWidth="2" />
            </svg>
            <span className="title-text">SpaceScope</span>
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

        <nav className={`nav ${isMenuOpen ? "nav-open" : ""}`}>
          <div className="nav-item">
            <Link to="/" className="nav-link">HOME</Link>
          </div>
          <div className="nav-item">
            <Link to="/events" className="nav-link">EVENTS</Link>
          </div>
          <div className="nav-item">
            <Link to="/mission" className="nav-link">MISSION</Link>
          </div>
          <div className="nav-item">
            <Link to="/weather" className="nav-link">WEATHER</Link>
          </div>
          <div className="nav-item">
            <Link to="/learn" className="nav-link">LEARN</Link>
          </div>
          <div className="nav-item">
            <Link to="/dashboard" className="nav-link">DASHBOARD</Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
  