import React, { useEffect, useState } from "react";
import "./RealSpaceDashboard.css";

const RealSpaceDashboard = () => {
  const [solar, setSolar] = useState(null);
  const [satellites, setSatellites] = useState(null);
  const [astronauts, setAstronauts] = useState(null);

  useEffect(() => {
    // Astronauts in space
    fetch("http://api.open-notify.org/astros.json")
      .then(res => res.json())
      .then(data => setAstronauts(data))
      .catch(err => console.error(err));

    // Satellite count (mocked real-world approximation)
    setSatellites(4872);

    // Solar activity (static example, real API needs auth)
    setSolar("Low (last 24h)");
  }, []);

  return (
    <section className="dashboard-section">
      <div className="section-header-top">SECTION 4: REAL-SPACE DASHBOARD WIDGET</div>
      <div className="dashboard-content-box">
        <h2 className="subsection-title">LIVE SPACE DASHBOARD WIDGET</h2>

        <div className="dashboard-grid">
          {/* Solar Activity */}
          <div className="dashboard-card">
            <div className="dash-content">
              <h3>SOLAR ACTIVITY</h3>
              <p>Status: No Flares</p>
              <p className="sub-text">min last 24h</p>
              <button className="dash-btn">[ Details → ]</button>
            </div>
            <div className="dash-visual solar-visual"></div>
          </div>

          {/* Earth Orbit */}
          <div className="dashboard-card">
            <div className="dash-content">
              <h3>EARTH ORBIT</h3>
              <p className="highlight-text">1,234</p>
              <p className="sub-text">active satellites</p>
              <button className="dash-btn">[ Track → ]</button>
            </div>
            <div className="dash-visual orbit-visual"></div>
          </div>

          {/* Satellite Traffic */}
          <div className="dashboard-card">
            <div className="dash-content">
              <h3>SATELLITE TRAFFIC</h3>
              <p className="highlight-text">4,872</p>
              <p className="sub-text">active objects</p>
              <button className="dash-btn">[ View → ]</button>
            </div>
            <div className="dash-visual traffic-visual"></div>
          </div>

          {/* Astronauts */}
          <div className="dashboard-card">
            <div className="dash-content">
              <h3>ASTRONAUTS IN SPACE</h3>
              <p className="highlight-text">{astronauts ? astronauts.number : 7}</p>
              <p className="sub-text">on ISS</p>
              <button className="dash-btn">[ Meet Crew → ]</button>
            </div>
            <div className="dash-visual astronaut-visual"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RealSpaceDashboard;
