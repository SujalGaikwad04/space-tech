import "./learn.css";
import Quiz from "../quiz/quiz";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";


// whatif data trial

const scenarios = [
  {
    id: "moon",
    icon: "🌙",
    title: "What if the Moon disappeared?",
    description:
      "Earth’s tilt would become unstable, causing extreme climate shifts. Tides would shrink to one-third their size, and nights would become significantly darker across the planet."
  },
  {
    id: "sun",
    icon: "☀️",
    title: "What if the Sun was twice as big?",
    description:
      "A much larger Sun would dramatically increase solar radiation. Earth’s oceans could evaporate, temperatures would soar, and life as we know it would likely not survive."
  },
  {
    id: "atmosphere",
    icon: "🌍",
    title: "What if Earth had no atmosphere?",
    description:
      "Without an atmosphere, Earth would lose its ability to retain heat, protect against radiation, and support liquid water. The surface would resemble the Moon—barren and lifeless."
  },
  {
    id: "gravity",
    icon: "⚛️",
    title: "What if gravity was 10x stronger?",
    description:
      "Stronger gravity would crush most life forms. Humans could barely move, buildings would collapse under their own weight, and Earth’s structure would dramatically change."
  }
];

// whatif data trial ended



const newsData = [
  {
    id: 1,
    category: "Mission Updates",
    image: "jems-web.jpeg",
    title: "The James Webb Space Telescope Discovers New Galaxies",
    description: "JWST reveals ancient galaxies from the dawn of time.",
    date: "15/01/2026"
  },
  {
    id: 2,
    category: "Space Facts",
    image: "mars-rover.webp",
    title: "Mars Rover Finds Evidence of Ancient Water",
    description: "New evidence suggests Mars once had flowing water.",
    date: "15/01/2026"
  },
  {
    id: 3,
    category: "Technology",
    image: "spacex.jpg",
    title: "SpaceX Launches Revolutionary Satellite Network",
    description: "Starlink expands global internet coverage.",
    date: "15/01/2026"
  },
  {
    id: 4,
    category: "Mission Updates",
    image: "iss.jpg",
    title: "International Space Station Celebrates 25 Years",
    description: "ISS milestone: 25 years of space research.",
    date: "15/01/2026"
  }
];






function Learn() {
  const { user, isAuthenticated } = useAuth();

  // what if logic start

  const [activeScenario, setActiveScenario] = useState(scenarios[0]);
  const navigate = useNavigate();

  //  what if endedd

  // blog logic start


  const [activeFilter, setActiveFilter] = useState("All");

  const filteredNews =
    activeFilter === "All"
      ? newsData
      : newsData.filter(item => item.category === activeFilter);

  //  blog section ended



  return (
    <>

      {/* fixed background  */}

      <img src="stars.gif" className="bg-video" />

      {/* fix background ended */}




      {/* stats showcase section */}

      <section className="stu-sec">
        {/* Video Background */}

        {/* Content */}





        <h1 className="headers">Welcome back, {isAuthenticated ? user.username : "Guest"}!</h1>
        <span className="stu-lower">
          Keep up the great work! You're on a {isAuthenticated ? user.learningStreak : 0}-day learning streak.
        </span>

        <div className="box-container-2">
          <div className="boxy">
            <img src="" alt="" className="svgs" />
            <h1 className="titles">{isAuthenticated ? user.learningStreak : 0} days</h1>
            <span className="titles-info">Learning Streak</span>
          </div>

          <div className="boxy">
            <img src="" alt="" className="svgs" />
            <h1 className="titles">{isAuthenticated ? user.totalXP || 0 : 0}</h1>
            <span className="titles-info">Total XP</span>
          </div>

          <div className="boxy">
            <img src="" alt="" className="svgs" />
            <h1 className="titles">Level {isAuthenticated ? user.level || 1 : 1}</h1>
            <span className="titles-info">Current Level</span>
          </div>

          <div className="boxy">
            <img src="" alt="" className="svgs" />
            <h1 className="titles">{isAuthenticated ? Math.min((user.totalXP || 0) % 50 * 2, 100) : 0}%</h1>
            <span className="titles-info">Level Progress</span>
          </div>
        </div>

      </section>


      {/* stats showcase section ended */}




      {/* text section starts */}
      <section className="hero-sec">
        <div className="hero-icon">
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
            <path d="M12 2c4 2 7 6 7 10-4 1-7 1-7 1s0-3-1-7c0 0-4 3-7 7 4 0 7 1 7 1s-3 3-5 5c4-1 8-4 10-8 2-4 2-8 1-9-1-1-5-1-9 1z" />
          </svg>
        </div>

        <h1 className="hero-title">EXPLORE THE COSMOS</h1>

        <p className="hero-desc">
          Dive into space exploration with interactive simulations, real mission
          stories, and cosmic discoveries that bridge the gap between space and
          Earth.
        </p>

        <a href="#" className="hero-cta">Start Exploring</a>

        <div className="hero-scroll"></div>
      </section>

      {/* text section ended */}



      {/* quiz section start */}
      <section className="quiz">
        <Quiz />
      </section>


      {/* quiz section  ended */}







      {/* blog section started*/}

      <section className="news-page">
        {/* Header */}
        <header className="news-header">
          <div className="icon">📘</div>
          <h1>Space News & Stories</h1>
          <p>Latest updates from the cosmos</p>

          {/* Filter Buttons */}
          <div className="filter-bar">
            {["All", "Mission Updates", "Space Facts", "Technology"].map(
              (filter) => (
                <button
                  key={filter}
                  className={`filter-btn ${activeFilter === filter ? "active" : ""
                    }`}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              )
            )}
          </div>
        </header>

        {/* Cards Grid */}
        <div className="card-grid">
          {filteredNews.map((item) => (
            <article className="news-card" key={item.id}>
              <img src={item.image} alt={item.title} />
              <div className="card-content">
                <span className="tag">{item.category}</span>
                <span className="date">{item.date}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <a href="#">Read More →</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* blog section ended */}






      {/* what if started */}
      <section className="whatif-container app">
        <header className="whatif-header">
          <h1>WHAT-IF SCENARIOS</h1>
          <p>Explore hypothetical cosmic events and their consequences</p>
        </header>

        <div className="whatif-content">
          {/* LEFT SIDE BUTTONS */}
          <div className="scenario-list">
            {scenarios.map((scenario) => (
              <button
                key={scenario.id}
                className={`scenario-btn ${activeScenario.id === scenario.id ? "active" : ""
                  }`}
                onClick={() => setActiveScenario(scenario)}
              >
                <span className="icon">{scenario.icon}</span>
                <span className="text">{scenario.title}</span>
              </button>
            ))}
          </div>

          {/* RIGHT SIDE DISPLAY */}
          <div className="scenario-display">
            <div className="display-icon">{activeScenario.icon}</div>

            <h2>{activeScenario.title}</h2>

            <p>{activeScenario.description}</p>

            <button
              className="simulate-btn"
              onClick={() => navigate("/whatif")}
            >
              ⚡ Explore now
            </button>
          </div>
        </div>
      </section>


    </>


  );
}

export default Learn;
