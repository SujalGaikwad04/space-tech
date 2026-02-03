import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "./RealSpaceDashboard.css";

const RealSpaceDashboard = () => {
  const { user, isAuthenticated, getRankName, getNextRankName } = useAuth();
  const [activeTab, setActiveTab] = useState("horizon");

  // Debug: Log user data
  console.log('Dashboard - User:', user);
  console.log('Dashboard - isAuthenticated:', isAuthenticated);
  if (user) {
    console.log('Dashboard - totalXP:', user.totalXP);
    console.log('Dashboard - level:', user.level);
    console.log('Dashboard - Progress %:', Math.min((user.totalXP || 0) % 50 * 2, 100));
  }

  return (
    <div className="space-dashboard">
      {/* Background */}
      <div className="space-bg"></div>

      {/* Header */}
      <header className="space-header">
        <div className="header-left">
          <h1 className="welcome-title">WELCOME BACK, {isAuthenticated ? user.username.toUpperCase() : "GUEST"}</h1>
          <p className="location-info">
            <span className="location-icon">📍</span>
            GMT-7:00 | CAPE CANAVERAL, FL
          </p>
        </div>
        <div className="header-right">
          <div className="status-badge">
            <span className="status-label">SYSTEM STATUS</span>
            <span className="status-value nominal">NOMINAL</span>
          </div>
          <div className="status-badge">
            <span className="status-label">ORBIT</span>
            <span className="status-value">408 KM</span>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <nav className="tab-navigation">
        <button
          className={`tab-btn ${activeTab === "horizon" ? "active" : ""}`}
          onClick={() => setActiveTab("horizon")}
        >
          HORIZON OVERVIEW
        </button>
      </nav>

      {/* Main Content */}
      <div className="dashboard-grid">
        {/* Left Column - Main Content */}
        <div className="main-content">
          {/* Celestial Events */}
          <section className="celestial-events">
            <div className="section-header">
              <h2>Celestial Events</h2>
              <span className="live-indicator">LIVE UPDATES</span>
            </div>

            <div className="events-grid">
              <div className="event-card">
                <div className="event-time-badge">
                  <div className="badge-countdown">T-MINUS</div>
                  <div className="badge-time">4H 20M</div>
                </div>
                <div className="event-content">
                  <h3 className="event-title">Perseids Meteor Shower</h3>
                  <p className="event-description">
                    Peak visibility expected tonight at 02:00 UTC. Clear skies predicted.
                  </p>
                </div>
                <button className="event-action-btn">JOIN OBSERVATION</button>
              </div>

              <div className="event-card">
                <div className="event-time-badge tomorrow">
                  <div className="badge-countdown">TOMORROW</div>
                </div>
                <div className="event-content">
                  <h3 className="event-title">Partial Lunar Eclipse</h3>
                  <p className="event-description">
                    Visual alignment of Earth, Moon, and Sun occurring at 14:30 UTC.
                  </p>
                </div>
                <button className="event-action-btn">SET ALERT</button>
              </div>
            </div>
          </section>

          {/* Deep Sky Recommendations */}
          <section className="deep-sky-section">
            <h2 className="section-title">Deep Sky Recommendations</h2>

            <div className="sky-recommendations-grid">
              <div className="sky-card">
                <div className="sky-image" style={{ backgroundImage: 'url(/andromeda-nebula.jpeg)' }}>
                  <div className="sky-overlay"></div>
                </div>
                <div className="sky-content">
                  <span className="sky-category">DISTANT GALAXY</span>
                  <h3 className="sky-title">Andromeda Nebula M31</h3>
                  <p className="sky-distance">2,537 million light years away</p>
                </div>
              </div>

              <div className="sky-card">
                <div className="sky-image" style={{ backgroundImage: 'url(/moon-crater.jpeg)' }}>
                  <div className="sky-overlay"></div>
                </div>
                <div className="sky-content">
                  <span className="sky-category">LUNAR OBSERVATION</span>
                  <h3 className="sky-title">Tycho Crater Detail</h3>
                  <p className="sky-distance">Optimal contrast at current phase</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right Sidebar */}
        <aside className="sidebar">
          {/* Mission Reminders */}
          <section className="mission-reminders">
            <div className="section-header">
              <span className="reminder-icon">🔔</span>
              <h2>MISSION REMINDERS</h2>
            </div>

            <div className="reminder-list">
              <div className="reminder-item active">
                <h4>ISS Overhead Pass</h4>
                <p className="reminder-time">15:28 PM • MAG -3.5</p>
              </div>

              <div className="reminder-item">
                <h4>Hubble Transit</h4>
                <p className="reminder-time">TOMORROW 03:12 AM</p>
              </div>

              <div className="reminder-item">
                <h4>Mars Retrograde</h4>
                <p className="reminder-time">IN 12 DAYS</p>
              </div>
            </div>
          </section>

          {/* Astron Rank */}
          <section className="astron-rank">
            <div className="rank-circle-container">
              <svg className="rank-circle" viewBox="0 0 120 120">
                <circle
                  className="rank-bg"
                  cx="60"
                  cy="60"
                  r="50"
                />
                <circle
                  className="rank-progress"
                  cx="60"
                  cy="60"
                  r="50"
                  strokeDasharray="314"
                  strokeDashoffset={314 - (314 * (isAuthenticated ? Math.min((user.totalXP || 0) % 50 * 2, 100) : 0) / 100)}
                />
              </svg>
              <div className="rank-text">
                <span className="rank-level" style={{ fontSize: '1.4rem' }}>{isAuthenticated ? getRankName(user.level) : getRankName(1)}</span>
                <span className="rank-label">RANK</span>
              </div>
            </div>

            <p className="rank-xp">{isAuthenticated ? (50 - ((user.totalXP || 0) % 50)) : 50} XP to next rank: <strong>{isAuthenticated ? getNextRankName(user.level) : getNextRankName(1)}</strong></p>

            <div className="rank-badges">
              <button className="badge-btn">🌙</button>
              <button className="badge-btn">⚙️</button>
              <button className="badge-btn">👤</button>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
};

export default RealSpaceDashboard;