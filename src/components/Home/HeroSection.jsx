import { useEffect, useState } from "react";
import "./HeroSection.css";

export default function HeroSection() {
  const [iss, setIss] = useState("ISS currently over Pacific Ocean");
  const [city, setCity] = useState("");

  useEffect(() => {
    const fetchISS = async () => {
      try {
        const res = await fetch(
          "https://api.wheretheiss.at/v1/satellites/25544"
        );
        const data = await res.json();
        setIss(
          `ISS currently over Lat ${data.latitude.toFixed(
            1
          )}°, Lon ${data.longitude.toFixed(1)}°`
        );
      } catch {
        setIss("ISS currently over Pacific Ocean");
      }
    };

    fetchISS();
    const interval = setInterval(fetchISS, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* 🌍 FIXED BACKGROUND FOR ENTIRE HOME */}
      <img
        src="/earth.jpg"
        alt="Earth from space"
        className="home-bg"
      />

      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-header">
            <h1 className="hero-title">Welcome to SpaceScope</h1>
            <p className="hero-subtitle">
              Explore, Learn & Stay Connected with the Universe
            </p>
          </div>

          <div className="hero-content-box">
            <div className="hero-search">
              <input
                type="text"
                placeholder="[Enter Your City]"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="hero-input"
              />
              <button className="premium-btn hero-search-btn">
                <span className="shimmer-effect"></span>
                <span className="scan-line"></span>
                🔍 Find Events
              </button>
            </div>

            <div className="hero-live-section">
              <div className="live-badge">LIVE NOW:</div>
              <div className="live-updates">
                <div className="live-item">🛰️ {iss}</div>
                <div className="live-item">☄️ Geminids meteor shower peaking</div>
                <div className="live-item">
                  🚀 Next solar shower: Orionids (Oct 21)
                </div>
              </div>
            </div>

            <div className="hero-notification">
              🔔 Set up notifications to never miss a sky event!
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
