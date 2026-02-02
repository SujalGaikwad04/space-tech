import "./learn.css";
import Quiz from "../quiz/quiz";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useBlog } from "../../context/BlogContext";

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

function Learn() {
  const { user, isAuthenticated, getLeaderboard } = useAuth();
  const { blogs } = useBlog();

  // what if logic start
  const [activeScenario, setActiveScenario] = useState(scenarios[0]);
  const navigate = useNavigate();

  // Get leaderboard data
  const [leaderboardData, setLeaderboardData] = useState([]);

  // Update leaderboard when component mounts or user changes
  useEffect(() => {
    setLeaderboardData(getLeaderboard(10));
  }, [user]);

  // Calculate user's rank
  const getUserRank = () => {
    if (!isAuthenticated || !user) return 0;

    // Get full leaderboard (all users)
    const fullLeaderboard = getLeaderboard(1000); // Get all users
    const userRank = fullLeaderboard.findIndex(
      player => player.username === user.username
    );

    return userRank !== -1 ? userRank + 1 : 0; // +1 because index is 0-based
  };
  //  what if endedd

  // blog logic start
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredNews =
    activeFilter === "All"
      ? (blogs || []) // Safety check
      : (blogs || []).filter(item => item.category === activeFilter);
  //  blog section ended

  return (
    <>
      {/* fixed background  */}
      <img src="stars.gif" className="bg-video" alt="stars" />
      {/* fix background ended */}

      {/* stats showcase section */}
      <section className="stu-sec">
        <h1 className="headers">Welcome back, {isAuthenticated ? user.username : "Guest"}!</h1>
        <span className="stu-lower">
          Keep up the great work! You're on a {isAuthenticated ? user.learningStreak : 0}-day learning streak.
        </span>

        <div className="box-container-2">
          <div className="boxy">
            <div className="svgs" style={{
              fontSize: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #FFD700, #FFA500)',
              borderRadius: '12px'
            }}>
              🏆
            </div>
            <h1 className="titles">
              {isAuthenticated ? (getUserRank() > 0 ? `#${getUserRank()}` : 'N/A') : 'N/A'}
            </h1>
            <span className="titles-info">Your Rank</span>
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

      {/* new cards started */}
      <div className="app-bg">
        <div className="dashboard">

          {/* Left Card */}
          <div className="card learning-card">
            <h3 className="card-title">Learning Events</h3>
            <p className="card-subtitle">
              Test your knowledge and explore scenarios
            </p>

            <button className="primary-btn"
              onClick={() => navigate("/quiz")} >
              📘 Take Quiz
            </button>

            <button className="secondary-btn"
              onClick={() => navigate("/whatif")}>
              💡 What If Scenarios
            </button>
          </div>

          {/* Middle Card */}
          <div className="card space-card" onClick={() => navigate('/solar-system')} style={{ cursor: 'pointer' }}>
            <h3 className="card-title">3D Space Drive</h3>
            <p className="card-subtitle">Explore cosmic information</p>

            <div className="space-visual">
              🚀
            </div>

            <div className="stats">
              <div className="stat-row">
                <span>Event</span>
                <span>Solar system</span>
              </div>
              <div className="stat-row">
                <span>mission complete</span>
                <span>0</span>
              </div>
              <div className="stat-row">
                <span>xp earn</span>
                <span>0</span>
              </div>
            </div>
          </div>

          {/* Right Card */}
          <div className="card leaderboard-card">
            <h3 className="card-title">🏆 Leaderboard</h3>
            <p className="card-subtitle">Top space explorers</p>

            {leaderboardData.length > 0 ? (
              <>
                {leaderboardData.slice(0, 5).map((player, index) => {
                  const isCurrentUser = user && player.username === user.username;
                  const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`;

                  return (
                    <div
                      key={player.id || player.username}
                      className={`leader ${index > 2 ? 'muted' : ''} ${isCurrentUser ? 'current-user' : ''}`}
                    >
                      <span>{medal} {player.username || player.fullName}</span>
                      <span>
                        Lvl {player.level || 1} • {player.totalXP || 0} XP
                      </span>
                    </div>
                  );
                })}
              </>
            ) : (
              <div className="leader muted">
                <span>No users yet</span>
                <span>Be the first!</span>
              </div>
            )}

            {leaderboardData.length > 5 && (
              <button className="outline-btn" onClick={() => navigate('/leaderboard')}>
                View Full Leaderboard
              </button>
            )}
          </div>

        </div>
      </div>

      {/* blog section started*/}
      <section className="news-page">
        {/* Header */}
        <header className="news-header">
          <div className="icon">📘</div>
          <h1>Space News & Stories</h1>
          <p>Latest updates from the cosmos</p>

          {/* Filter Buttons */}
          <div className="filter-bar">
            {["All", "Mission Updates", "Space Facts", "Technology", "Science", "Cosmology", "Community", "Theory", "Observation", "Question"].slice(0, 6).map(
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
            <button
              className="filter-btn create-blog-btn"
              onClick={() => navigate("/create-blog")}
              style={{ background: 'linear-gradient(90deg, #00d2ff, #3a7bd5)', border: 'none', color: 'white' }}
            >
              + Write a Blog
            </button>
          </div>
        </header>

        {/* Cards Grid */}
        <div className="card-grid">
          {filteredNews.map((item) => (
            <article className="news-card" key={item.id}>
              <img src={item.image} alt={item.title} />
              <div className="card-content">
                <span className="tag">{item.category}</span>
                <span className="date">{item.date} • {item.authName || "SpaceTech Team"}</span>
                <h3 className="line-clamp-2">{item.title}</h3>
                <p className="line-clamp-3">{item.description}</p>
                <button className="read-more-btn" onClick={() => navigate(`/blog/${item.id}`)}>Read More →</button>
              </div>
            </article>
          ))}
        </div>
      </section>
      {/* blog section ended */}
    </>
  );
}

export default Learn;