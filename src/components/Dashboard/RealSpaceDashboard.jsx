import { useState, useEffect } from "react";
import ParticleBackground from "../Home/ParticleBackground";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEventsData } from "../Events/useEventsData";
import { useMissionsData } from "../Missions/useMissionsData";
import LocationSelector from "../Events/LocationSelector";
import "./RealSpaceDashboard.css";

const RealSpaceDashboard = () => {
  const { user, isAuthenticated, updateUserLocation } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("horizon");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [guestLocation, setGuestLocation] = useState("Mumbai, India");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getLocalTimeInfo = () => {
    const locationStr = isAuthenticated ? (user?.location || "Mumbai, India") : guestLocation;
    const city = locationStr.split(',')[0].trim().toLowerCase();

    const cityToTimezone = {
      "mumbai": "Asia/Kolkata",
      "mumabi": "Asia/Kolkata", // Handling typo in user data
      "london": "Europe/London",
      "new york": "America/New_York",
      "tokyo": "Asia/Tokyo",
      "sydney": "Australia/Sydney",
      "paris": "Europe/Paris",
      "berlin": "Europe/Berlin",
      "dubai": "Asia/Dubai",
      "singapore": "Asia/Singapore",
      "los angeles": "America/Los_Angeles",
      "chicago": "America/Chicago",
      "san francisco": "America/Los_Angeles",
      "delhi": "Asia/Kolkata",
      "bangalore": "Asia/Kolkata",
      "chennai": "Asia/Kolkata",
      "kolkata": "Asia/Kolkata",
    };

    const timezone = cityToTimezone[city] || Intl.DateTimeFormat().resolvedOptions().timeZone;

    try {
      const options = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: timezone
      };

      const timeStr = new Intl.DateTimeFormat('en-GB', options).format(currentTime);

      const parts = new Intl.DateTimeFormat('en-GB', {
        timeZone: timezone,
        timeZoneName: 'shortOffset'
      }).formatToParts(currentTime);

      const gmt = parts.find(p => p.type === 'timeZoneName')?.value || "GMT+0";

      return { timeString: timeStr, gmtOffset: gmt, location: locationStr };
    } catch (e) {
      // Fallback to system time if timezone is invalid
      return {
        timeString: currentTime.toLocaleTimeString('en-GB'),
        gmtOffset: "GMT" + (currentTime.getTimezoneOffset() <= 0 ? "+" : "-") + Math.abs(currentTime.getTimezoneOffset() / 60),
        location: locationStr
      };
    }
  };

  const { timeString, gmtOffset, location: displayLocation } = getLocalTimeInfo();

  // Get current date info for events
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const currentDay = today.getDate();

  // Fetch real events from the same source as the Events page
  const { allEventsData, loading } = useEventsData(currentMonth, currentYear, displayLocation);

  // Fetch real missions from the same source as the Missions page
  const { missions, loading: missionsLoading } = useMissionsData();

  // Filter for upcoming events (today and future)
  const upcomingEvents = allEventsData
    .filter(event => event.day >= currentDay)
    .sort((a, b) => a.day - b.day)
    .slice(0, 3); // Show top 3

  // Get top 3 upcoming missions
  const upcomingMissions = missions.slice(0, 3);

  // Helper function to format mission time
  const formatMissionTime = (dateString) => {
    const missionDate = new Date(dateString);
    const now = new Date();
    const diffMs = missionDate - now;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

    if (diffDays === 0) {
      const hours = missionDate.getHours();
      const minutes = missionDate.getMinutes();
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${hours >= 12 ? 'PM' : 'AM'}`;
    } else if (diffDays === 1) {
      return `TOMORROW ${missionDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
    } else if (diffDays < 30) {
      return `IN ${diffDays} DAYS`;
    } else {
      return missionDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  // Helper function to get mission icon
  const getMissionIcon = (mission, index) => {
    if (mission.name?.toLowerCase().includes('iss') || mission.name?.toLowerCase().includes('station')) {
      return '🛰️';
    } else if (mission.name?.toLowerCase().includes('hubble') || mission.name?.toLowerCase().includes('telescope')) {
      return '🔭';
    } else if (mission.name?.toLowerCase().includes('mars') || mission.name?.toLowerCase().includes('planet')) {
      return '🔴';
    } else if (mission.name?.toLowerCase().includes('moon') || mission.name?.toLowerCase().includes('lunar')) {
      return '🌙';
    } else if (index === 0) {
      return '🚀';
    } else if (index === 1) {
      return '🛸';
    } else {
      return '🌌';
    }
  };

  const getEventBadge = (day) => {
    if (day === currentDay) return { text: "TODAY", class: "today" };
    if (day === currentDay + 1) return { text: "TOMORROW", class: "tomorrow" };

    // Format Month name (e.g., FEB 5)
    const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    return { text: `${monthNames[currentMonth]} ${day}`, class: "future" };
  };

  return (
    <div className="space-dashboard">
      {/* 🌍 GLOBAL BACKGROUND (Horizon) */}
      <ParticleBackground />

      <header className="space-header">
        <div className="header-left">
          <h1 className="welcome-title">WELCOME BACK, {isAuthenticated ? user.username.toUpperCase() : "GUEST"}</h1>
          <div className="location-info-container">
            <p className="location-info">
              <span className="location-icon">📍</span>
              <span className="time-display">{timeString}</span>
              <span className="gmt-display">| {gmtOffset}</span>
              <span className="divider">|</span>
              <span className="header-location-selector">
                <LocationSelector
                  location={displayLocation}
                  hideButton={true}
                  onLocationChange={(newLoc) => {
                    if (isAuthenticated) {
                      updateUserLocation(newLoc);
                    } else {
                      setGuestLocation(newLoc);
                    }
                  }}
                />
              </span>
            </p>
          </div>
        </div>
      </header>

      <nav className="tab-navigation">
        <button
          className={`tab-btn ${activeTab === "horizon" ? "active" : ""}`}
          onClick={() => setActiveTab("horizon")}
        >
          HORIZON OVERVIEW
        </button>
      </nav>

      <div className="dashboard-grid">
        <div className="main-content">
          <section className="celestial-events">
            <div className="section-header">
              <h2>Celestial Events</h2>
              <span className="live-indicator">LIVE UPDATES</span>
            </div>

            <div className="events-grid">
              {loading ? (
                <div className="loading-state">Syncing celestial data...</div>
              ) : upcomingEvents.length > 0 ? (
                upcomingEvents.map((event, index) => {
                  const badge = getEventBadge(event.day);
                  return (
                    <div
                      key={index}
                      className="event-card clickable"
                      onClick={() => navigate('/events', { state: { selectedDay: event.day } })}
                    >
                      <div className={`event-time-badge ${badge.class}`}>
                        <div className="badge-countdown">{badge.text}</div>
                        {event.day === currentDay && <div className="badge-time">LIVE</div>}
                      </div>
                      <div className="event-icon">
                        {event.icon}
                      </div>
                      <div className="event-content">
                        <h3 className="event-title">{event.title}</h3>
                        <p className="event-description">
                          {event.time} • {event.visibilityText} • {event.moonPhase}
                        </p>
                      </div>
                      <button className="event-action-btn">
                        <span>{event.day === currentDay ? "JOIN OBSERVATION" : "SET ALERT"}</span>
                      </button>
                    </div>
                  );
                })
              ) : (
                <div className="no-events">No upcoming events scheduled.</div>
              )}
            </div>
          </section>

          {/* Deep Sky Recommendations */}
          <section className="deep-sky-section">
            <h2 className="section-title">Deep Sky Recommendations</h2>

            <div className="sky-recommendations-grid">
              <div
                className="sky-card"
                onClick={() => navigate('/sky-object/andromeda')}
                style={{ cursor: 'pointer' }}
              >
                <div className="sky-image" style={{ backgroundImage: 'url(/andromeda-nebula.png)' }}>
                  <div className="sky-overlay"></div>
                </div>
                <div className="sky-content">
                  <span className="sky-category">DISTANT GALAXY</span>
                  <h3 className="sky-title">Andromeda Nebula M31</h3>
                  <p className="sky-distance">2,537 million light years away</p>
                </div>
              </div>

              <div
                className="sky-card"
                onClick={() => navigate('/sky-object/tycho')}
                style={{ cursor: 'pointer' }}
              >
                <div className="sky-image" style={{ backgroundImage: 'url(/moon-crater.png)' }}>
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
              {missionsLoading ? (
                <div className="loading-state">Loading missions...</div>
              ) : upcomingMissions.length > 0 ? (
                upcomingMissions.map((mission, index) => (
                  <div
                    key={mission.id || index}
                    className={`reminder-item ${index === 0 ? 'active' : ''} clickable`}
                    onClick={() => navigate('/missions')}
                  >
                    <div className="reminder-header">
                      <span className="reminder-mission-icon">
                        {getMissionIcon(mission, index)}
                      </span>
                      <div className="reminder-content">
                        <h4>{mission.name || 'Upcoming Mission'}</h4>
                        <p className="reminder-time">
                          {formatMissionTime(mission.net)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-events">No upcoming missions scheduled.</div>
              )}
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
                <span className="rank-level">L{isAuthenticated ? user.level || 1 : 1}</span>
                <span className="rank-label">STARGAZER</span>
              </div>
            </div>

            <p className="rank-xp">{isAuthenticated ? (50 - ((user.totalXP || 0) % 50)) : 50} XP to next rank: <strong>Level {isAuthenticated ? (user.level || 1) + 1 : 2}</strong></p>

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