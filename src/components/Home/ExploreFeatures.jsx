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
      <div className="section-header-top">SECTION 2: EXPLORE WITH FEATURES</div>
      <div className="explore-content-box">
        <h2 className="subsection-title">EXPLORE WITH INTERACTIVE TOOLS</h2>

        <div className="explore-grid">
          {/* Visibility Map */}
          <div className="explore-card">
            <div className="card-content">
              <h3>VISIBILITY MAP</h3>
              <p>Check if you can see events them from your city</p>
              <button className="explore-btn">[ Try Now → ]</button>
            </div>
            <div className="card-visual map-visual"></div>
          </div>

          {/* Mission Track */}
          <div className="explore-card">
            <div className="card-content">
              <h3>MISSION TRACK</h3>
              <p>Follow current space missions in real-time</p>
              <button className="explore-btn">[ Explore → ]</button>
            </div>
            <div className="card-visual earth-visual"></div>
          </div>

          {/* Satellite Impact */}
          <div className="explore-card">
            <div className="card-content">
              <h3>SATELLITE IMPACT</h3>
              <p>See how space tech solves Earth problems</p>
              <button className="explore-btn">[ Learn More → ]</button>
            </div>
            <div className="card-visual satellite-visual"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreFeatures;
