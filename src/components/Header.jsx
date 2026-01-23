import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
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
          <Link to="/" className={`nav-item ${location.pathname === "/" ? "active" : ""}`}>HOME</Link>
          <Link to="/events" className={`nav-item ${location.pathname.startsWith("/events") ? "active" : ""}`}>EVENTS</Link>
          <Link to="/mission" className={`nav-item ${location.pathname.startsWith("/mission") ? "active" : ""}`}>MISSION</Link>
          <Link to="/weather" className={`nav-item ${location.pathname.startsWith("/weather") ? "active" : ""}`}>WEATHER</Link>
          <Link to="/learn" className={`nav-item ${location.pathname.startsWith("/learn") ? "active" : ""}`}>LEARN</Link>
          <Link to="/dashboard" className={`nav-item ${location.pathname.startsWith("/dashboard") ? "active" : ""}`}>DASHBOARD</Link>

          {/* Auth Section */}
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
