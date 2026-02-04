import "./learn.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useBlog } from "../../context/BlogContext";
import RankProgressionModal from "./RankProgressionModal";

function Learn() {
  const { user, isAuthenticated, getLeaderboard, getRankName, getNextRankName } = useAuth();
  const { blogs } = useBlog();
  const navigate = useNavigate();

  // Rank modal state
  const [isRankModalOpen, setIsRankModalOpen] = useState(false);

  // Get leaderboard data
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [userRank, setUserRank] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getLeaderboard(10);
      setLeaderboardData(data || []);

      if (isAuthenticated && user) {
        // Get full leaderboard to find rank (simulated for now)
        const fullList = await getLeaderboard(1000);
        const rank = fullList.findIndex(player => player.username === user.username);
        setUserRank(rank !== -1 ? rank + 1 : 0);
      }
    };

    fetchData();
  }, [user, isAuthenticated, getLeaderboard]);

  // Calculate user's rank (now just returns state)
  const getUserRank = () => userRank;

  // Blog logic
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter, searchQuery]);

  const filteredNews = (blogs || []).filter(item => {
    const matchesFilter = activeFilter === "All" || item.category === activeFilter;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredNews.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="learn-page-wrapper">
      {/* Fixed background Deep Starfield */}
      <div className="learn-bg"></div>

      {/* Hero & Stats Section */}
      <section className="stu-sec">
        <h1 className="headers">
          {isAuthenticated ? `Welcome back, ${user.username}!` : "Welcome, Explorer!"}
        </h1>
        <p className="stu-lower">
          {isAuthenticated
            ? `You've maintained a ${user.learningStreak || 0}-day learning streak! The cosmos awaits your next discovery.`
            : "Embark on a journey through the stars. Start learning to earn XP and climb the leaderboard."}
        </p>

        <div className="box-container-2">
          <div className="boxy">
            <span className="svgs">🏆</span>
            <h1 className="titles">
              {isAuthenticated ? (getUserRank() > 0 ? `#${getUserRank()}` : 'N/A') : '--'}
            </h1>
            <span className="titles-info">Global Rank</span>
          </div>

          <div className="boxy">
            <span className="svgs">⚡</span>
            <h1 className="titles">{isAuthenticated ? user.totalXP || 0 : 0}</h1>
            <span className="titles-info">Total XP</span>
          </div>

          <div className="boxy" onClick={() => setIsRankModalOpen(true)} style={{ cursor: 'pointer' }}>
            <span className="svgs">🚀</span>
            <h1 className="titles" style={{ fontSize: '1.8rem' }}>{isAuthenticated ? getRankName(user.level) : getRankName(1)}</h1>
            <span className="titles-info">Rank (Click to View)</span>
          </div>

          <div className="boxy">
            <span className="svgs">🎯</span>
            <h1 className="titles">
              {isAuthenticated ? `${Math.min((user.totalXP || 0) % 50 * 2, 100)}%` : '0%'}
            </h1>
            <span className="titles-info">Level Progress</span>
          </div>
        </div>
      </section>

      {/* Dashboard Section */}
      <div className="app-bg">
        <div className="dashboard">

          {/* Card 1: Knowledge Hub */}
          <div className="card learning-card">
            <h3 className="card-title">Knowledge Hub</h3>
            <p className="card-subtitle">
              Challenge yourself with cosmic quizzes or explore fascinating "What If" scenarios.
            </p>

            <div className="mascot-container">
              <img src="banda.gif" alt="Study Companion" className="mascot-gif" />
            </div>

            <div style={{ marginTop: 'auto' }}>
              <button className="primary-btn" onClick={() => navigate("/quiz")}>
                <span>📘</span> Take the Quiz
              </button>
              <button className="secondary-btn" onClick={() => navigate("/whatif")}>
                <span>💡</span> Explore Scenarios
              </button>
            </div>
          </div>

          {/* Card 2: Interstellar Drive */}
          <div className="card space-card" onClick={() => navigate('/solar-system')} style={{ cursor: 'pointer' }}>
            <h3 className="card-title">Cosmic Explorer</h3>
            <p className="card-subtitle">Dive into the 3D Solar System and discover planetary secrets.</p>

            <div className="space-visual">🛸</div>

            <div className="stats">
              <div className="stat-row">
                <span>Destination</span>
                <span>Solar System</span>
              </div>
              <div className="stat-row">
                <span>System Status</span>
                <span>Fully Operational</span>
              </div>
            </div>
          </div>

          {/* Card 3: Hall of Fame */}
          <div className="card leaderboard-card">
            <h3 className="card-title">Hall of Fame</h3>
            <p className="card-subtitle">Compete with the top space explorers across the galaxy.</p>

            <div className="leaderboard-mini-list">
              {leaderboardData.length > 0 ? (
                leaderboardData.slice(0, 4).map((player, index) => {
                  const isCurrentUser = user && player.username === user.username;
                  const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`;
                  return (
                    <div key={player.username} className={`leader ${isCurrentUser ? 'current-user' : ''}`}>
                      <span>{medal} {player.username}</span>
                      <span>{getRankName(player.level)} • {player.totalXP || 0} XP</span>
                    </div>
                  );
                })
              ) : (
                <div className="leader"><span>Initializing...</span></div>
              )}
            </div>

            <button className="outline-btn" onClick={() => navigate('/leaderboard')}>
              View All Rankings
            </button>
          </div>
        </div>
      </div>

      {/* News & Stories Section */}
      <section className="news-page">
        <header className="news-header">
          <h1 className="headers">Space Stories</h1>
          <p className="stu-lower" style={{ marginBottom: '1.5rem', top: 0, left: 0, position: 'relative' }}>
            The latest transmissions and discoveries from across the cosmos.
          </p>

          <div className="search-container">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search cosmic transmissions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-bar">
            {["All", "Mission Updates", "Space Facts", "Technology", "Science", "Cosmology"].map(filter => (
              <button
                key={filter}
                className={`filter-btn ${activeFilter === filter ? "active" : ""}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
            <button
              className="filter-btn"
              onClick={() => navigate("/create-blog")}
              style={{ background: 'var(--accent-primary)', color: '#000', fontWeight: 'bold' }}
            >
              + Transmit Story
            </button>
          </div>
        </header>

        <div className="card-grid">
          {currentItems.map((item) => (
            <article className="news-card" key={item.id}>
              <img src={item.image} alt={item.title} loading="lazy" />
              <div className="card-content">
                <div style={{ marginBottom: '10px' }}>
                  <span className="tag">{item.category}</span>
                  <span className="date">{item.date}</span>
                </div>
                <h3 className="line-clamp-2">{item.title}</h3>
                <p className="line-clamp-3">{item.description}</p>
                <button className="read-more-btn" onClick={() => navigate(`/blog/${item.id}`)}>
                  Read Transmission <span>→</span>
                </button>
              </div>
            </article>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="pagination-wrapper">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={`page-btn ${currentPage === i + 1 ? "active" : ""}`}
                onClick={() => paginate(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Rank Progression Modal */}
      <RankProgressionModal
        isOpen={isRankModalOpen}
        onClose={() => setIsRankModalOpen(false)}
        currentLevel={isAuthenticated ? user.level || 1 : 1}
        currentXP={isAuthenticated ? user.totalXP || 0 : 0}
      />
    </div>
  );
}

export default Learn;
