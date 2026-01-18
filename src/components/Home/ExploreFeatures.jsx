import React, { useEffect, useState } from "react";
import "./ExploreFeatures.css";

const ExploreFeatures = () => {
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
            <a className="card-link">[ Try Now → ]</a>
          </div>
        </div>

        {/* Mission Track */}
        <div className="explore-card">
          <div className="card-visual earth-visual"></div>
          <div className="card-content">
            <h3>MISSION TRACK</h3>
            <p>Follow current space missions in real-time</p>
            <a className="card-link">[ Explore → ]</a>
          </div>
        </div>

        {/* Satellite Impact */}
        <div className="explore-card">
          <div className="card-visual satellite-visual"></div>
          <div className="card-content">
            <h3>SATELLITE IMPACT</h3>
            <p>See how space technology solves Earth problems</p>
            <a className="card-link">[ Learn More → ]</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreFeatures;
