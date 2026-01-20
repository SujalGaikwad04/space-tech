import { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo Section */}
        <div className="logo-section">
          <svg
            className="planet-icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2.5 14.5C2.5 14.5 5.5 8.5 12 8.5C18.5 8.5 21.5 14.5 21.5 14.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="logo-text">SpaceScope</span>
        </div>

        {/* Navigation */}
        <nav className={`nav ${isMenuOpen ? "nav-open" : ""}`}>
          <Link to="/" className="nav-item">HOME</Link>
          <Link to="/events" className="nav-item">EVENTS</Link>
          <Link to="/mission" className="nav-item">MISSION</Link>
          <Link to="/weather" className="nav-item">WEATHER</Link>
          <Link to="/learn" className="nav-item">LEARN</Link>
          <Link to="/dashboard" className="nav-item">DASHBOARD</Link>
          <Link to="/Auth" className="nav-item">Get started</Link>

          
          {/* Search Section (Inside Nav for better responsive layout) */}
          <div className="search-section">
            <div className="search-box">
              <svg
                className="search-icon"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input type="text" placeholder="Find Events" />
            </div>
          </div>
        </nav>

        {/* Hamburger Menu for Mobile */}
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
    </header>
  );
};

export default Header;
  