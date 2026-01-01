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
      <h2 className="dashboard-title">LIVE SPACE DASHBOARD</h2>

      <div className="dashboard-grid">
        {/* Solar Activity */}
        <div className="dashboard-card">
          <h3>SOLAR ACTIVITY</h3>
          <p>Status:</p>
          <span className="highlight">
            {solar ? solar : "Loading..."}
          </span>
          <button>Details →</button>
        </div>

        {/* Earth Orbit */}
        <div className="dashboard-card">
          <h3>EARTH ORBIT</h3>
          <p>Active Satellites</p>
          <span className="highlight">1,234</span>
          <button>Track →</button>
        </div>

        {/* Satellite Traffic */}
        <div className="dashboard-card">
          <h3>SATELLITE TRAFFIC</h3>
          <p>Objects in Orbit</p>
          <span className="highlight">
            {satellites ? satellites : "..."}
          </span>
          <button>View →</button>
        </div>

        {/* Astronauts */}
        <div className="dashboard-card">
          <h3>ASTRONAUTS IN SPACE</h3>
          {astronauts ? (
            <>
              <p>Currently:</p>
              <span className="highlight">
                {astronauts.number}
              </span>
              <p className="sub-text">
                aboard {astronauts.people.length} spacecraft
              </p>
            </>
          ) : (
            <p>Fetching live data...</p>
          )}
          <button>Meet Crew →</button>
        </div>
      </div>
    </section>
  );
};

export default RealSpaceDashboard;
