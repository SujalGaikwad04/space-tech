import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Auth.css";

export default function Auth() {
  const [mode, setMode] = useState("login");
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const { user, isAuthenticated, register, login, logout, checkUsernameExists, checkEmailExists } = useAuth();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
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
      const exists = checkUsernameExists(value);
      setShowPopup(exists);
    } else if (name === "email" && mode === "login" && value.length > 0) {
      // Show popup for login mode
      const exists = checkEmailExists(value) || checkUsernameExists(value);
      setShowPopup(exists);
    } else if (value.length === 0) {
      setShowPopup(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (mode === "register") {
      // Validation for registration
      if (!formData.fullName || !formData.email || !formData.username || !formData.password || !formData.confirmPassword) {
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
      const result = register({
        fullName: formData.fullName,
        email: formData.email,
        username: formData.username,
        password: formData.password,
      });

      if (result.success) {
        setSuccess("Registration successful! Redirecting...");
        setTimeout(() => {
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
      const result = login(formData.email, formData.password);

      if (result.success) {
        setSuccess("Login successful! Redirecting...");
        setTimeout(() => {
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

  // If user is already logged in, show logout option
  if (isAuthenticated && user) {
    return (


      <div className="auth-wrapper">


        {/* fixed background  */}

        {/* <img src="moon.jpg" className="bg-video" /> */}

        {/* fix background ended */}




        <div className="auth-card">
          <div className="logged-in-header">
            <h2>Already Logged In</h2>
          </div>

          <div className="user-info">
            <div className="user-avatar">
              {user.username.charAt(0).toUpperCase()}
            </div>
            <div className="user-details">
              <h3>{user.fullName}</h3>
              <p className="username-display">@{user.username}</p>
              <p className="email-display">{user.email}</p>
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
              <span className="stat-value">Level {user.level}</span>
              <span className="stat-label">Current Level</span>
            </div>
          </div>

          {success && <div className="success-message">{success}</div>}

          <div className="logged-in-actions">
            <button className="dashboard-btn" onClick={() => navigate("/dashboard")}>
              Go to Dashboard
            </button>
            <button className="learn-btn" onClick={() => navigate("/learn")}>
              Continue Learning
            </button>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>

        <div className="auth-hero">
          <h1>
            Welcome Back, <span>{user.username}</span>
          </h1>
          <p>
            "The universe is not only stranger than we suppose, but stranger than
            we can suppose."
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
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

              <label>EMAIL ADDRESS</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
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
            </>
          )}

          {mode === "login" && (
            <>
              <label>EMAIL OR USERNAME</label>
              <input
                type="text"
                name="email"
                placeholder="Enter email or username"
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

          <label>PASSWORD</label>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
          />

          {mode === "register" && (
            <>
              <label>CONFIRM PASSWORD</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </>
          )}

          {mode === "login" && (
            <div className="remember">
              <input
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
              />
              <span className="remember-me">Remember?</span>
            </div>
          )}

          <button className="submit-btn" type="submit">
            {mode === "login" ? "Initiate Login →" : "Create Account →"}
          </button>
        </form>

        <p className="warning">
          Restricted area. Unauthorized access will be logged.
        </p>
      </div>

      <div className="auth-hero">
        <h1>
          Explore the <span>Unknown</span>
        </h1>
        <p>
          “The universe is not only stranger than we suppose, but stranger than
          we can suppose.”
        </p>
      </div>
    </div>
  );
}
