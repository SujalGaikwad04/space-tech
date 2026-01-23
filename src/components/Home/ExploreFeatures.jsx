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
        <div className="explore-card">
          <div className="card-visual map-visual"></div>
          <div className="card-content">
            <h3>VISIBILITY MAP</h3>
            <p>Check if you can see celestial events from your city</p>
            <button className="card-link" onClick={() => navigate("/live-map")} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, font: 'inherit', color: 'inherit' }}> [ Try Now → ] </button>
          </div>
        </div>

        {/* Mission Track */}
        <div className="explore-card">
          <div className="card-visual earth-visual"></div>
          <div className="card-content">
            <h3>MISSION TRACK</h3>
            <p>Follow current space missions in real-time</p>
            <button className="card-link" onClick={() => navigate("/mission")} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, font: 'inherit', color: 'inherit' }}> [ Try Now → ] </button>
          </div>
        </div>

        {/* Satellite Impact */}
        <div className="explore-card">
          <div className="card-visual satellite-visual"></div>
          <div className="card-content">
            <h3>SATELLITE IMPACT</h3>
            <p>See how space technology solves Earth problems</p>
           <button className="card-link" onClick={() => navigate("/blog/5")} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, font: 'inherit', color: 'inherit' }}> [ Try Now → ] </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreFeatures;
