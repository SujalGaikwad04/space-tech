import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ExploreFeatures.css";

const ExploreFeatures = () => {
  const navigate = useNavigate();
  const [issData, setIssData] = useState(null);

  useEffect(() => {
    fetch("http://api.open-notify.org/iss-now.json")
      .then(res => res.json())
      .then(data => setIssData(data.iss_position))
      .catch(err => console.error(err));
  }, []);

  return (
    <section className="explore-section">
      <div className="section-title">SECTION 2: EXPLORE WITH FEATURES</div>

      <div className="explore-cards">
        {/* Visibility Map */}
        <div className="explore-card glass-panel">
          <div className="card-visual map-visual"></div>
          <div className="card-content">
            <h3>ISS LIVE TRACKER</h3>
            <p>Check if you can see ISS from your city</p>
            <button className="premium-btn card-link" onClick={() => navigate("/live-map")}>
              <span className="shimmer-effect"></span>
              <span className="scan-line"></span>
              Try Now →
            </button>
          </div>
        </div>

        {/* Mission Track */}
        <div className="explore-card glass-panel">
          <div className="card-visual earth-visual"></div>
          <div className="card-content">
            <h3>MISSION TRACK</h3>
            <p>Follow current space missions in real-time</p>
            <button className="premium-btn card-link" onClick={() => navigate("/mission")}>
              <span className="shimmer-effect"></span>
              <span className="scan-line"></span>
              Try Now →
            </button>
          </div>
        </div>

        {/* Satellite Impact */}
        <div className="explore-card glass-panel">
          <div className="card-visual satellite-visual"></div>
          <div className="card-content">
            <h3>SATELLITE IMPACT</h3>
            <p>See how space technology solves Earth problems</p>
            <button className="premium-btn card-link" onClick={() => navigate("/blog/5")}>
              <span className="shimmer-effect"></span>
              <span className="scan-line"></span>
              Try Now →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreFeatures;
