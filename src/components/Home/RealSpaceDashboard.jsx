import React, { useEffect, useState } from "react";
import "./RealSpaceDashboard.css";
import { useNavigate } from "react-router-dom";

const RealSpaceDashboard = () => {
  const [astronauts, setAstronauts] = useState(null);

  useEffect(() => {
    fetch("https://api.open-notify.org/astros.json")
      .then(res => res.json())
      .then(data => setAstronauts(data))
      .catch(err => console.error(err));
  }, []);

  const navigate = useNavigate();

  return (
    <section className="dashboard-section">
      <div className="section-header-top">SECTION 4: REAL-SPACE DASHBOARD WIDGET</div>

      <div className="dashboard-content-box glass-panel">
        <h2 className="subsection-title">LIVE SPACE DASHBOARD WIDGET</h2>

        <div className="dashboard-grid">

          {/* SOLAR ACTIVITY */}
          <div className="dashboard-card" onClick={() => navigate("/weather")}>
            <div className="dash-content">
              <h3>SOLAR ACTIVITY</h3>
              <p className="highlight-text">No Flares</p>
              <p className="sub-text">Status: Normal</p>
              <button className="premium-btn dash-btn" onClick={(e) => { e.stopPropagation(); navigate("/weather"); }}>
                <span className="shimmer-effect"></span>
                <span className="scan-line"></span>
                Details →
              </button>
            </div>
            <div className="dash-visual solar-visual"></div>
          </div>

          {/* EARTH ORBIT */}
          <div className="dashboard-card" onClick={() => navigate("/weather")}>
            <div className="dash-content">
              <h3>EARTH ORBIT</h3>
              <p className="highlight-text">1,234</p>
              <p className="sub-text">active satellites</p>
              <button className="premium-btn dash-btn" onClick={(e) => { e.stopPropagation(); navigate("/weather"); }}>
                <span className="shimmer-effect"></span>
                <span className="scan-line"></span>
                Track →
              </button>
            </div>
            <div className="dash-visual orbit-visual"></div>
          </div>

          {/* SATELLITE TRAFFIC */}
          <div className="dashboard-card" onClick={() => navigate("/weather")}>
            <div className="dash-content">
              <h3>SATELLITE TRAFFIC</h3>
              <p className="highlight-text">4,872</p>
              <p className="sub-text">active objects</p>
              <button className="premium-btn dash-btn" onClick={(e) => { e.stopPropagation(); navigate("/weather"); }}>
                <span className="shimmer-effect"></span>
                <span className="scan-line"></span>
                View →
              </button>
            </div>
            <div className="dash-visual traffic-visual"></div>
          </div>

          {/* ASTRONAUTS */}
          <div className="dashboard-card" onClick={() => navigate("/weather")}>
            <div className="dash-content">
              <h3>ASTRONAUTS IN SPACE</h3>
              <p className="highlight-text">{astronauts ? astronauts.number : 12}</p>
              <p className="sub-text">on ISS</p>
              <button className="premium-btn dash-btn" onClick={(e) => { e.stopPropagation(); navigate("/weather"); }}>
                <span className="shimmer-effect"></span>
                <span className="scan-line"></span>
                Meet Crew →
              </button>
            </div>
            <div className="dash-visual astronaut-visual"></div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default RealSpaceDashboard;
