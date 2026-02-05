import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Auth.css";

export default function Auth() {
  const [mode, setMode] = useState("login");
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isAddingAccount, setIsAddingAccount] = useState(false);
  const navigate = useNavigate();
  const {
    user,
    isAuthenticated,
    register,
    login,
    logout,
    checkUsernameExists,
    checkEmailExists,
    sessions,
    switchAccount,
    activeSessionId
  } = useAuth();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    location: "",
    password: "",
    confirmPassword: "",
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Clear errors when user types
    setError("");
    setSuccess("");

    // Check if username exists (for register mode)
    if (name === "username" && mode === "register" && value.length > 3) {
      checkUsernameExists(value).then(exists => setShowPopup(exists));
    } else if (name === "email" && mode === "login" && value.length > 0) {
      // Show popup for login mode
      Promise.all([checkEmailExists(value), checkUsernameExists(value)]).then(([emailExists, userExists]) => {
        setShowPopup(emailExists || userExists);
      });
    } else if (value.length === 0) {
      setShowPopup(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("LOGIN SUBMIT TRIGGERED");
    console.log("LOGIN API URL:", `${import.meta.env.VITE_API_URL}/api/auth/login`);
    setError("");
    setSuccess("");

    if (mode === "register") {
      // Validation for registration
      if (!formData.fullName || !formData.email || !formData.username || !formData.location || !formData.password || !formData.confirmPassword) {
        setError("All fields are required");
        return;
      }

      if (formData.username.length < 3) {
        setError("Username must be at least 3 characters");
        return;
      }

      if (formData.password.length < 6) {
        setError("Password must be at least 6 characters");
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      // Attempt registration
      const result = await register({
        fullName: formData.fullName,
        email: formData.email,
        username: formData.username,
        location: formData.location,
        password: formData.password,
      });

      if (result.success) {
        setSuccess("Registration successful! Redirecting...");
        setTimeout(() => {
          setIsAddingAccount(false); // Return to profile view if we were adding
          navigate("/dashboard");
        }, 1000);
      } else {
        setError(result.message);
      }
    } else {
      // Validation for login
      if (!formData.email || !formData.password) {
        setError("Email/Username and password are required");
        return;
      }

      // Attempt login
      const result = await login(formData.email, formData.password);

      if (result.success) {
        setSuccess("Login successful! Redirecting...");
        setTimeout(() => {
          setIsAddingAccount(false); // Return to profile view if we were adding
          navigate("/dashboard");
        }, 1000);
      } else {
        setError(result.message);
      }
    }
  };

  const handleLogout = () => {
    logout();
    setSuccess("Logged out successfully!");
    setFormData({
      fullName: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      remember: false,
    });
    setTimeout(() => setSuccess(""), 3000);
  };

  // If user is logged in and not explicitly trying to add another account
  if (isAuthenticated && user && !isAddingAccount) {
    const otherSessions = sessions.filter(s => s.user.id !== activeSessionId);

    return (
      <div className="page-container">
        <div className="auth-wrapper">
          <div className="auth-card">
            <div className="logged-in-header">
              <h2>Mission Control</h2>
            </div>

            <div className="user-info">
              <div className="user-avatar">
                {user.username.charAt(0).toUpperCase()}
              </div>
              <div className="user-details">
                <h3>{user.fullName}</h3>
                <p className="username-display">@{user.username}</p>
                <div className="active-tag">ACTIVE COMMANDER</div>
              </div>
            </div>

            <div className="user-stats">
              <div className="stat-item">
                <span className="stat-value">{user.learningStreak}</span>
                <span className="stat-label">Day Streak</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{user.totalXP}</span>
                <span className="stat-label">Total XP</span>
              </div>
              <div className="stat-item">
                <span className="stat-value" style={{ fontSize: '1.6rem' }}>{useAuth().getRankName(user.level)}</span>
                <span className="stat-label">Rank</span>
              </div>
            </div>

            {otherSessions.length > 0 && (
              <div className="account-switcher">
                <h4 className="switcher-title">Switch Accounts</h4>
                <div className="switcher-list">
                  {otherSessions.map(session => (
                    <div key={session.user.id} className="switcher-item" onClick={() => switchAccount(session.user.id)}>
                      <div className="switcher-avatar">
                        {session.user.username.charAt(0).toUpperCase()}
                      </div>
                      <div className="switcher-details">
                        <span className="switcher-name">@{session.user.username}</span>
                        <span className="switcher-rank">Lvl {session.user.level}</span>
                      </div>
                      <button className="switch-btn">Switch</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {success && <div className="success-message">{success}</div>}

            <div className="logged-in-actions">
              <button className="dashboard-btn" onClick={() => navigate("/dashboard")}>
                Launch Dashboard
              </button>
              <button className="add-account-btn" onClick={() => setIsAddingAccount(true)}>
                + Add Another Account
              </button>
              <button className="logout-btn" onClick={handleLogout}>
                Logout @{user.username}
              </button>
            </div>
          </div>

          <div className="auth-hero">
            <h1>
              Welcome Back, <span>{user.username}</span>
            </h1>
            <div className="cyan-underline"></div>

            <div className="did-you-know">
              <div className="know-header">
                <svg className="lightbulb-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18h6"></path>
                  <path d="M10 22h4"></path>
                  <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8a6 6 0 0 0-12 0c0 1.33.47 2.48 1.5 3.5A4.65 4.65 0 0 0 8.91 14"></path>
                </svg>
                <span>DID YOU KNOW?</span>
              </div>
              <p className="space-fact">
                The universe is not only stranger than we suppose, but stranger than we can suppose.
              </p>
            </div>

            <div className="space-stats">
              <div className="stat-card">
                <div className="stat-number">2.5k+</div>
                <div className="stat-description">SATELLITES TRACKED</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">140+</div>
                <div className="stat-description">EXOPLANETS FOUND</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">0.8s</div>
                <div className="stat-description">SIGNAL LATENCY</div>
              </div>
            </div>
          </div>
        </div>

        {/* About Section - Appears below logged in page when scrolling */}
        <div className="about-section">
          <div className="mission-section">
            <div className="mission-content-wrapper">
              <div className="mission-text-column">
                <div className="section-label">LIVE TRACKING</div>
                <h2 className="mission-heading">
                  International Space Station: <span>Live tracking</span>
                </h2>

                <h3 className="iss-subtitle">Where is the ISS?</h3>
                <p className="mission-description">
                  The International Space Station (ISS) is a habitable space station that orbits Earth at an average speed of about 28,000 kilometers per hour (17,500 miles per hour). It serves as a laboratory and observatory, where astronauts and cosmonauts conduct experiments in fields such as biology, physics, astronomy, and materials science.
                </p>

                <p className="iss-fun-fact">
                  <strong>Fun fact:</strong> Astronauts on the ISS recycle <strong>93% of water</strong>, including moisture from sweat and urine, to ensure a sustainable water supply.
                </p>

              </div>

              <div className="mission-video-column">
                <div className="video-container">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/I6kcpC5USL8"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
          {/* Capabilities Section */}
          <div className="capabilities-section">
            <h3 className="capabilities-heading">Platform Capabilities</h3>
            <p className="capabilities-subtitle">Advanced tools for interstellar discovery.</p>

            <div className="capability-cards">
              <div className="capability-card">
                <div className="capability-icon satellite-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2v20M2 12h20M6.3 6.3l11.4 11.4M17.7 6.3L6.3 17.7"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </div>
                <h4 className="capability-title">Satellite Tracking</h4>
                <p className="capability-description">
                  Monitor 2,500+ active satellites in real-time. View orbital paths, perigee data, and upcoming flyovers for your specific coordinates.
                </p>
                <div className="capability-tag">LIVE TELEMETRY</div>
              </div>

              <div className="capability-card">
                <div className="capability-icon exoplanet-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <circle cx="12" cy="12" r="6"></circle>
                    <circle cx="12" cy="12" r="2"></circle>
                  </svg>
                </div>
                <h4 className="capability-title">Exoplanet Discovery</h4>
                <p className="capability-description">
                  Browse the catalog of confirmed worlds beyond our solar system. Analyze atmospheric compositions and habitability indexes.
                </p>
                <div className="capability-tag">NASA DATA INTEGRATION</div>
              </div>

              <div className="capability-card">
                <div className="capability-icon modules-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                </div>
                <h4 className="capability-title">Interactive Modules</h4>
                <p className="capability-description">
                  Engage with 3D celestial mechanics simulations. Master complex astrophysics concepts through gamified learning paths.
                </p>
                <div className="capability-tag">LXD OPTIMIZED</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // LOGIN PAGE RENDER (If not authenticated or adding account)
  return (
    <>
      <div className="page-container">
        <div className="auth-wrapper">
          <div className="auth-card">
            {isAddingAccount && (
              <div className="adding-header" onClick={() => setIsAddingAccount(false)}>
                <span className="back-arrow">←</span> Cancel
              </div>
            )}

            <div className="tab-switch">
              <button
                className={mode === "login" ? "active" : ""}
                onClick={() => setMode("login")}
              >
                Login
              </button>
              <button
                className={mode === "register" ? "active" : ""}
                onClick={() => setMode("register")}
              >
                Register
              </button>
            </div>

            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <form onSubmit={handleSubmit}>
              {mode === "register" && (
                <>
                  <label>FULL NAME</label>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleChange}
                  />

                  <label>MISSION CONTROL EMAIL</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="commander@spacescope.io"
                    value={formData.email}
                    onChange={handleChange}
                  />

                  <label>USERNAME / DISPLAY NAME</label>
                  <input
                    type="text"
                    name="username"
                    placeholder="Choose a username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                  {showPopup && formData.username && (
                    <div className="username-popup">
                      Wait.. I think I have seen this user before...
                    </div>
                  )}

                  <label>LOCATION</label>
                  <input
                    type="text"
                    name="location"
                    placeholder="e.g. Cape Canaveral, FL"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </>
              )}

              {mode === "login" && (
                <>
                  <label>MISSION CONTROL EMAIL</label>
                  <input
                    type="text"
                    name="email"
                    placeholder="commander@spacescope.io"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {showPopup && formData.email && (
                    <div className="username-popup">
                      Wait.. I think I have seen this user before...
                    </div>
                  )}
                </>
              )}

              <label>ACCESS KEY</label>
              <div className="password-input-wrapper">
                <input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <svg className="lock-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>

              {mode === "register" && (
                <>
                  <label>CONFIRM ACCESS KEY</label>
                  <div className="password-input-wrapper">
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Re-enter password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                    <svg className="lock-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                  </div>
                </>
              )}

              {mode === "login" && (
                <div className="login-options">
                  <div className="remember">
                    <input
                      type="checkbox"
                      name="remember"
                      checked={formData.remember}
                      onChange={handleChange}
                    />
                    <span className="remember-me">Remember?</span>
                  </div>
                  <a href="#" className="forgot-password">Forgot Password?</a>
                </div>
              )}

              <button className="submit-btn" type="submit">
                {mode === "login" ? "Launch Dashboard" : "Create Account →"}
              </button>
            </form>

            {mode === "login" && (
              <>
                <div className="social-login-divider">
                  <span>OR INITIATE LINK VIA</span>
                </div>

                <div className="social-login-buttons">
                  <button className="social-btn" type="button" aria-label="Login with option 1">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </button>
                  <button className="social-btn" type="button" aria-label="Login with option 2">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <circle cx="12" cy="12" r="4"></circle>
                      <line x1="4.93" y1="4.93" x2="9.17" y2="9.17"></line>
                      <line x1="14.83" y1="14.83" x2="19.07" y2="19.07"></line>
                      <line x1="14.83" y1="9.17" x2="19.07" y2="4.93"></line>
                      <line x1="14.83" y1="9.17" x2="18.36" y2="5.64"></line>
                      <line x1="4.93" y1="19.07" x2="9.17" y2="14.83"></line>
                    </svg>
                  </button>
                  <button className="social-btn" type="button" aria-label="Login with option 3">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="2" y1="12" x2="22" y2="12"></line>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z"></path>
                    </svg>
                  </button>
                </div>

                <p className="guest-link">
                  New cadet? <a href="#">Explore as Guest</a>
                </p>
              </>
            )}

            {mode === "register" && (
              <p className="warning">
                Restricted area. Unauthorized access will be logged.
              </p>
            )}
          </div>

          <div className="auth-hero">
            <h1>
              Explore the <span>Unknown.</span>
            </h1>
            <div className="cyan-underline"></div>

            <div className="did-you-know">
              <div className="know-header">
                <svg className="lightbulb-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18h6"></path>
                  <path d="M10 22h4"></path>
                  <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8a6 6 0 0 0-12 0c0 1.33.47 2.48 1.5 3.5A4.65 4.65 0 0 0 8.91 14"></path>
                </svg>
                <span>DID YOU KNOW?</span>
              </div>
              <p className="space-fact">
                Light from the Sun takes 8 minutes to reach Earth. By the time you see the sunrise, the Sun is already high in the sky.
              </p>
            </div>

            <div className="space-stats">
              <div className="stat-card">
                <div className="stat-number">2.5k+</div>
                <div className="stat-description">SATELLITES TRACKED</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">140+</div>
                <div className="stat-description">EXOPLANETS FOUND</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">0.8s</div>
                <div className="stat-description">SIGNAL LATENCY</div>
              </div>
            </div>
          </div>
        </div>

        {/* About Section - Appears below login page when scrolling */}
        <div className="about-section">
          <div className="mission-section">
            <div className="mission-content-wrapper">
              <div className="mission-text-column">
                <div className="section-label">LIVE TRACKING</div>
                <h2 className="mission-heading">
                  International Space Station: <span>Live tracking</span>
                </h2>

                <h3 className="iss-subtitle">Where is the ISS?</h3>
                <p className="mission-description">
                  The International Space Station (ISS) is a habitable space station that orbits Earth at an average speed of about 28,000 kilometers per hour (17,500 miles per hour). It serves as a laboratory and observatory, where astronauts and cosmonauts conduct experiments in fields such as biology, physics, astronomy, and materials science.
                </p>

                <p className="iss-fun-fact">
                  <strong>Fun fact:</strong> Astronauts on the ISS recycle <strong>93% of water</strong>, including moisture from sweat and urine, to ensure a sustainable water supply.
                </p>

              </div>

              <div className="mission-video-column">
                <div className="video-container">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/I6kcpC5USL8"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>

          <div className="capabilities-section">
            <h3 className="capabilities-heading">Platform Capabilities</h3>
            <p className="capabilities-subtitle">Advanced tools for interstellar discovery.</p>

            <div className="capability-cards">
              <div className="capability-card">
                <div className="capability-icon satellite-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2v20M2 12h20M6.3 6.3l11.4 11.4M17.7 6.3L6.3 17.7"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </div>
                <h4 className="capability-title">Satellite Tracking</h4>
                <p className="capability-description">
                  Monitor 2,500+ active satellites in real-time. View orbital paths, perigee data, and upcoming flyovers for your specific coordinates.
                </p>
                <div className="capability-tag">LIVE TELEMETRY</div>
              </div>

              <div className="capability-card">
                <div className="capability-icon exoplanet-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <circle cx="12" cy="12" r="6"></circle>
                    <circle cx="12" cy="12" r="2"></circle>
                  </svg>
                </div>
                <h4 className="capability-title">Exoplanet Discovery</h4>
                <p className="capability-description">
                  Browse the catalog of confirmed worlds beyond our solar system. Analyze atmospheric compositions and habitability indexes.
                </p>
                <div className="capability-tag">NASA DATA INTEGRATION</div>
              </div>

              <div className="capability-card">
                <div className="capability-icon modules-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                </div>
                <h4 className="capability-title">Interactive Modules</h4>
                <p className="capability-description">
                  Engage with 3D celestial mechanics simulations. Master complex astrophysics concepts through gamified learning paths.
                </p>
                <div className="capability-tag">LXD OPTIMIZED</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
