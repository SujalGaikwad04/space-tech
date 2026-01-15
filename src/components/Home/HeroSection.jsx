import { useEffect, useState } from "react";
import "./HeroSection.css";

export default function HeroSection() {
  const [iss, setIss] = useState("ISS currently over Pacific Ocean");
  const [city, setCity] = useState("");

  // ISS LOCATION (live)
  useEffect(() => {
    const fetchISS = async () => {
      try {
        const res = await fetch(
          "https://api.wheretheiss.at/v1/satellites/25544"
        );
        const data = await res.json();
        setIss(`ISS currently over Lat ${data.latitude.toFixed(1)}°, Lon ${data.longitude.toFixed(1)}°`);
      } catch {
        setIss("ISS currently over Pacific Ocean");
      }
    };

    fetchISS();
    const interval = setInterval(fetchISS, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero-section">
      <div className="hero-container">
        {/* Welcome Header */}
        <div className="hero-header">
          <h1 className="hero-title">Welcome to SpaceScope</h1>
          <p className="hero-subtitle">Explore, Learn & Stay Connected with the Universe</p>
        </div>

        {/* Main Content Box */}
        <div className="hero-content-box">
          {/* Search Input */}
          <div className="hero-search">
            <input
              type="text"
              placeholder="[Enter Your City]"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="hero-input"
            />
            <button className="hero-search-btn">
              <span className="search-icon">🔍</span>
              Find Events
            </button>
          </div>

          {/* Live Updates */}
          <div className="hero-live-section">
            <div className="live-badge">LIVE NOW:</div>
            <div className="live-updates">
              <div className="live-item">
                <span className="live-icon">🛰️</span>
                <span>{iss}</span>
              </div>
              <div className="live-item">
                <span className="live-icon">☄️</span>
                <span>Geminids meteor shower peaking</span>
              </div>
              <div className="live-item">
                <span className="live-icon">🚀</span>
                <span>Next solstar shower: Orionids (Oct 21)</span>
              </div>
            </div>
          </div>

          {/* Notification Setup */}
          <div className="hero-notification">
            <span className="notification-icon">🔔</span>
            <span className="notification-text">Set up notifications to never miss a sky event!</span>
          </div>
        </div>
      </div>
    </section>
  );
}
