import React, { useEffect, useState } from "react";
import "./LearnAbout.css";
import { useNavigate } from "react-router-dom";

const LearnAbout = () => {
  const [apod, setApod] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(
      "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY"
    )
      .then(res => res.json())
      .then(data => setApod(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <section className="learn-section">
      <div className="section-header-top">SECTION 3: LEARN ABOUT THE UNIVERSE</div>
      <div className="learn-content-box glass-panel">
        <h2 className="subsection-title">LEARN ABOUT THE UNIVERSE</h2>

        <div className="learn-grid">
          {/* For Students */}
          <div className="learn-card" onClick={() => navigate("/learn")}  >
            <div className="learn-content" >
              <h3>FOR STUDENTS</h3>
              <p>Age-appropriate explanations</p>
            </div>
            <div className="learn-icon student-icon"></div>
          </div>

          {/* For Enthusiasts */}
          <div className="learn-card" onClick={() => navigate("/whatif")}  >
            <div className="learn-content">
              <h3>FOR ENTHUSIASTS</h3>
              <p>Deep dives into space science</p>
            </div>
            <div className="learn-icon enthusiast-icon"></div>
          </div>

          {/* For Educators */}
          <div className="learn-card" onClick={() => navigate("/learn")}>
            <div className="learn-content">
              <h3>FOR EDUCATORS</h3>
              <p>Lesson plans and resources</p>
            </div>
            <div className="learn-icon educator-icon"></div>
          </div>

          {/* Quizzes */}
          <div className="learn-card" onClick={() => navigate("/quiz")}>
            <div className="learn-content">
              <h3>QUIZZES</h3>
              <p>Test your knowledge</p>
            </div>
            <div className="learn-icon quiz-icon"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearnAbout;
