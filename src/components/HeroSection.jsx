import { useEffect, useState } from "react";
import "./HeroSection.css";

export default function HeroSection() {
  const [iss, setIss] = useState("Fetching ISS location...");
  const [solar, setSolar] = useState("Checking solar activity...");
  const [meteor, setMeteor] = useState("Loading meteor data...");

  // ISS LOCATION (live)
  useEffect(() => {
    const fetchISS = async () => {
      try {
        const res = await fetch(
          "https://api.wheretheiss.at/v1/satellites/25544"
        );
        const data = await res.json();

        setIss(
          `ISS currently over ${data.latitude.toFixed(
            1
          )}°, ${data.longitude.toFixed(1)}°`
        );
      } catch {
        setIss("Unable to fetch ISS data");
      }
    };

    fetchISS();
    const interval = setInterval(fetchISS, 5000); // refresh every 5 sec
    return () => clearInterval(interval);
  }, []);

  // SOLAR ACTIVITY
  useEffect(() => {
    const fetchSolar = async () => {
      try {
        const res = await fetch(
          "https://api.nasa.gov/DONKI/FLR?api_key=DEMO_KEY"
        );
        const data = await res.json();

        if (data.length > 0) setSolar("Solar activity: Elevated");
        else setSolar("Solar activity: Low");
      } catch {
        setSolar("Solar activity: Unknown");
      }
    };

    fetchSolar();
  }, []);

  // METEOR SHOWER (cached/static – changes rarely)
  useEffect(() => {
    setMeteor("Next meteor shower: Orionids (Oct 21)");
  }, []);

  return (
    <section className="hero">
      <div className="hero-content">
        {/* Icon */}
        <div className="hero-icon">🚀</div>

        {/* Title */}
        <h1 className="hero-title">
          Welcome to <span className="highlight">SpaceScope</span>
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle">
          Explore, Learn & Stay Connected with the Universe
        </p>

        {/* Search Bar */}
        <div className="search-container">
          <input 
            type="text" 
            placeholder="[Enter Your City]" 
            className="search-input"
          />
          <button className="search-btn">
            <span className="search-icon">🔍</span> Find Events
          </button>
        </div>

        {/* LIVE DATA BOX */}
        <div className="live-data-box">
          <div className="live-header">
            <h3>LIVE NOW:</h3>
            <div className="live-icons">
              <span className="icon">🚀</span>
              <span className="icon">🛰️</span>
              <span className="icon">☀️</span>
              <span className="icon">📡</span>
            </div>
          </div>
          <ul className="live-list">
            <li><span className="bullet">•</span> {iss}</li>
            <li><span className="bullet">•</span> {solar}</li>
            <li><span className="bullet">•</span> {meteor}</li>
          </ul>
        </div>

        {/* Warning */}
        <div className="notification-alert">
          <span className="alert-icon">⚠️</span>
          <span>Set up notifications to never miss a sky event!</span>
        </div>
      </div>
    </section>
  );
}
