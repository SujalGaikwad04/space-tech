import React, { useEffect, useState } from "react";
import "./RealSpaceDashboard.css";
import { useNavigate } from "react-router-dom";

const RealSpaceDashboard = () => {
  const [astronauts, setAstronauts] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://api.open-notify.org/astros.json")
      .then(res => res.json())
      .then(data => setAstronauts(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <section className="dashboard-section">
      <div className="hud-label-main">SYSTEM STATUS: OPTIMAL // SEC-001 // {new Date().toLocaleDateString()}</div>

      <div className="dashboard-main-container glass-hud">
        {/* Decorative Corners */}
        <div className="hud-corner top-left"></div>
        <div className="hud-corner top-right"></div>
        <div className="hud-corner bottom-left"></div>
        <div className="hud-corner bottom-right"></div>

        <div className="hud-header">
          <div className="hud-title-group">
            <h2 className="hud-main-title">COMMAND CENTER</h2>
            <div className="hud-subtitle">LIVE TELEMETRY FROM LOWER EARTH ORBIT</div>
          </div>
          <div className="hud-status-badge">
            <span className="pulse-dot"></span>
            DASH-771 // ACTIVE
          </div>
        </div>

        <div className="dashboard-hud-grid">
          {/* Card 1: SOLAR ACTIVITY - WIDE */}
          <div className="hud-card card-wide solar-card" onClick={() => navigate("/weather")}>
            <div className="hud-card-overlay"></div>
            <div className="hud-card-content">
              <div className="hud-category">SOLAR TELEMETRY</div>
              <h3 className="hud-value">NO FLARES</h3>
              <div className="hud-metric">
                <span className="metric-label">INTENSITY:</span>
                <span className="metric-value status-good">LOW RADIATION</span>
              </div>
              <div className="hud-mini-graph">
                <div className="graph-bar" style={{ height: '40%' }}></div>
                <div className="graph-bar" style={{ height: '60%' }}></div>
                <div className="graph-bar" style={{ height: '30%' }}></div>
                <div className="graph-bar" style={{ height: '80%' }}></div>
                <div className="graph-bar" style={{ height: '50%' }}></div>
                <div className="graph-bar" style={{ height: '20%' }}></div>
              </div>
            </div>
            <div className="hud-visual-bg solar-bg"></div>
            <div className="hud-card-tag">TX-5592</div>
          </div>

          {/* Card 2: EARTH ORBIT - NARROW */}
          <div className="hud-card card-narrow orbit-card" onClick={() => navigate("/live-map")}>
            <div className="hud-card-overlay"></div>
            <div className="hud-card-content">
              <div className="hud-category">ORBITAL DEPTH</div>
              <h3 className="hud-value">1,234</h3>
              <div className="hud-metric">
                <span className="metric-label">REL-POS:</span>
                <span className="metric-value">STABLE</span>
              </div>
              <button className="hud-btn">TRACK MISSION</button>
            </div>
            <div className="hud-visual-bg orbit-bg"></div>
            <div className="hud-card-tag">ALPHA-X</div>
          </div>

          {/* Card 3: SATELLITE TRAFFIC - WIDE */}
          <div className="hud-card card-wide traffic-card" onClick={() => navigate("/live-map")}>
            <div className="hud-card-overlay"></div>
            <div className="hud-card-content">
              <div className="hud-category">SATELLITE TRAFFIC</div>
              <h3 className="hud-value">4,872</h3>
              <div className="hud-metric">
                <span className="metric-label">DELTA-V:</span>
                <span className="metric-value">NOMINAL</span>
              </div>
              <div className="hud-scan-line"></div>
            </div>
            <div className="hud-visual-bg traffic-bg"></div>
            <div className="hud-card-tag">NET-99</div>
          </div>

          {/* Card 4: ASTRONAUTS - NARROW */}
          <div className="hud-card card-narrow crew-card" onClick={() => navigate("/mission")}>
            <div className="hud-card-overlay"></div>
            <div className="hud-card-content">
              <div className="hud-category">STATION CREW</div>
              <h3 className="hud-value">{astronauts ? astronauts.number : 12}</h3>
              <div className="hud-metric">
                <span className="metric-label">VESSEL:</span>
                <span className="metric-value status-good">ISS</span>
              </div>
              <button className="hud-btn">PERSONNEL</button>
            </div>
            <div className="hud-visual-bg crew-bg"></div>
            <div className="hud-card-tag">CREW-7</div>
          </div>
        </div>

        <div className="hud-footer">
          <div className="hud-coords">OS: ANTI-GRAVITY // SECTOR-1 // C: 32.1 // L: 78.4</div>
          <div className="hud-time">{new Date().toLocaleTimeString()} UTC</div>
        </div>
      </div>
    </section>
  );
};

export default RealSpaceDashboard;
