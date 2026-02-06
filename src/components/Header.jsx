import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ThemeToggle from "./ThemeToggle";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const userMenuRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Scroll effect for transparent header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    setIsMenuOpen(false); // Close mobile menu on logout
    navigate("/auth");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showUserMenu]);

  return (
    <header className={`header ${scrolled ? "scrolled" : ""} ${isMenuOpen ? "header-menu-open" : ""}`}>
      <div className="header-container">
        {/* Logo Section */}
        <div className="logo-section" onClick={() => { navigate("/"); closeMenu(); }}>
          <img src="/logo.png" alt="SpaceScope Logo" className="logo-image" />
          <span className="logo-text">SpaceScope</span>
        </div>

        {/* Navigation */}
        <nav className={`nav ${isMenuOpen ? "nav-open" : ""}`}>
          <Link to="/" className={`nav-item ${location.pathname === "/" ? "active" : ""}`} onClick={closeMenu}>HOME</Link>
          <Link to="/events" className={`nav-item ${location.pathname.startsWith("/events") ? "active" : ""}`} onClick={closeMenu}>EVENTS</Link>
          <Link to="/mission" className={`nav-item ${location.pathname.startsWith("/mission") ? "active" : ""}`} onClick={closeMenu}>MISSION</Link>
          <Link to="/weather" className={`nav-item ${location.pathname.startsWith("/weather") || location.pathname.startsWith("/earth-weather-details") || location.pathname.startsWith("/satellite") ? "active" : ""}`} onClick={closeMenu}>WEATHER</Link>
          <Link to="/learn" className={`nav-item ${location.pathname.startsWith("/learn") ? "active" : ""}`} onClick={closeMenu}>LEARN</Link>
          <Link to="/dashboard" className={`nav-item ${location.pathname.startsWith("/dashboard") ? "active" : ""}`} onClick={closeMenu}>DASHBOARD</Link>

          {/* Mobile Only Auth Items */}
          <div className="mobile-auth-item">
            {isAuthenticated ? (
              <>
                <div className="nav-item user-info-mobile">
                  <span>👤 {user.username}</span>
                </div>
                <div className="nav-item logout-mobile" onClick={handleLogout}>Logout</div>
              </>
            ) : (
              <Link to="/Auth" className="nav-item get-started-mobile" onClick={closeMenu}>Get started</Link>
            )}
          </div>
        </nav>

        {/* Right Actions */}
        <div className="header-actions">
          {isAuthenticated ? (
            <div className="user-profile" ref={userMenuRef} onClick={() => setShowUserMenu(!showUserMenu)}>
              <div className="user-avatar-small">
                {user.username.charAt(0).toUpperCase()}
              </div>
              <span className="user-name">{user.username}</span>
              {showUserMenu && (
                <div className="user-dropdown">
                  <div className="dropdown-item" onClick={() => navigate("/dashboard")}>
                    <span>📊</span> Dashboard
                  </div>
                  <div className="dropdown-item" onClick={() => navigate("/learn")}>
                    <span>📚</span> Learn
                  </div>
                  <div className="dropdown-item" onClick={() => navigate("/auth")}>
                    <span>⚙️</span> Settings
                  </div>
                  <div className="dropdown-divider"></div>
                  <div className="dropdown-item logout" onClick={handleLogout}>
                    <span>🚪</span> Logout
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link to="/Auth" className="nav-item get-started">Get started</Link>
          )}
          <ThemeToggle />
        </div>

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
