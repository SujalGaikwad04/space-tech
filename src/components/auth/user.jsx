import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

export default function Auth() {
  const [mode, setMode] = useState("login");
  const [showPopup, setShowPopup] = useState(false);

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

    if (name === "username" || (mode === "login" && name === "email")) {
      if (value.length > 0) {
        setShowPopup(true);
      } else {
        setShowPopup(false);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
  };

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

          <button className="submit-btn" onClick={() => navigate("/")}>
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
