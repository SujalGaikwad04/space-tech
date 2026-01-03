import React, { useEffect, useState } from "react";
import "./LearnAbout.css";

const LearnAbout = () => {
  const [apod, setApod] = useState(null);

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
      <h2 className="learn-title">LEARN ABOUT THE UNIVERSE</h2>

      <div className="learn-grid">
        {/* For Students */}
        <div className="learn-card">
          <h3>FOR STUDENTS</h3>
          <p>Age-appropriate explanations of space concepts.</p>
          <button>Explore →</button>
        </div>

        {/* For Enthusiasts */}
        <div className="learn-card">
          <h3>FOR ENTHUSIASTS</h3>
          <p>Deep dives into astronomy and space science.</p>

          {apod && (
            <div className="apod-preview">
              <img src={apod.url} alt="NASA APOD" />
              <span>NASA Image of the Day</span>
            </div>
          )}

          <button>Explore →</button>
        </div>

        {/* For Educators */}
        <div className="learn-card">
          <h3>FOR EDUCATORS</h3>
          <p>Lesson plans, activities, and teaching resources.</p>
          <button>Explore →</button>
        </div>

        {/* Quizzes */}
        <div className="learn-card">
          <h3>QUIZZES</h3>
          <p>Test your space knowledge interactively.</p>
          <button>Try Now →</button>
        </div>
      </div>
    </section>
  );
};

export default LearnAbout;
