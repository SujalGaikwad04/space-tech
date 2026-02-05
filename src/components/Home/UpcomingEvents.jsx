import React, { useMemo, useState } from "react";
import "./UpcomingEvents.css";
import { useNavigate } from "react-router-dom";
import { useEventsData } from "../Events/useEventsData";

const FILTERS = [
  { id: "today", label: "Today" },
  { id: "week", label: "This Week" },
  { id: "month", label: "This Month" },
];

const CATEGORIES = [
  { id: "all", label: "All Events" },
  { id: "meteor", label: "Meteor" },
  { id: "eclipse", label: "Eclipse" },
  { id: "iss", label: "ISS Pass" },
  { id: "conjunction", label: "Planet Alignment" },
];

const UpcomingEvents = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("week"); // Time filter
  const [activeCategory, setActiveCategory] = useState("all"); // Category filter
  const [searchLocation, setSearchLocation] = useState("Mumbai, India");

  // Get current date info
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const currentDay = today.getDate();

  // Fetch real data
  const { allEventsData, loading } = useEventsData(currentMonth, currentYear, searchLocation);

  const filteredEvents = useMemo(() => {
    if (!allEventsData) return [];

    return allEventsData.filter((event) => {
      // 1. Time Filter
      let passesTime = false;
      if (activeFilter === "today") {
        passesTime = event.day === currentDay;
      } else if (activeFilter === "week") {
        passesTime = event.day >= currentDay && event.day <= currentDay + 7;
      } else if (activeFilter === "month") {
        passesTime = true; // Data is already for current month
      }

      // 2. Category Filter
      let passesCategory = true;
      if (activeCategory !== "all") {
        // Map UI category IDs to API types if needed, or simple string match
        if (activeCategory === "iss") {
          passesCategory = event.type === "iss" || event.type === "man-made";
        } else if (activeCategory === "conjunction") {
          passesCategory = event.type === "conjunction" || event.type === "planet" || event.type === "moon";
        } else {
          passesCategory = event.type === activeCategory;
        }
      }

      // 3. Location Filter (Search)
      // The hook already uses 'searchLocation' to generate some local events,
      // but we can also filter the visible list if needed.
      // For now, we assume the hook's return is relevant enough, 
      // but let's strictly filter text description if user typed something specific.
      // However, typical usage here is just setting context. We'll trust the hook.

      return passesTime && passesCategory;
    });
  }, [allEventsData, activeFilter, activeCategory, currentDay]);

  // Helper to format date label
  const getDateLabel = (day) => {
    if (day === currentDay) return "Today";
    if (day === currentDay + 1) return "Tomorrow";
    const date = new Date(currentYear, currentMonth, day);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <section className="upcoming-events">
      <div className="section-header-top">SECTION 1: UPCOMING EVENTS</div>
      <div className="upcoming-content-box glass-panel">
        <header className="upcoming-header">
          <h2 className="subsection-title">UPCOMING CELESTIAL EVENTS</h2>

          <input
            type="text"
            className="location-search-input"
            placeholder="Enter location (e.g., Mumbai, Delhi)..."
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
          />

          <div className="time-filters">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                className={
                  "time-filter-button" +
                  (activeFilter === f.id ? " active" : "")
                }
                onClick={() => setActiveFilter(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </header>

        <div className="upcoming-body">
          {/* Left sidebar: Event Cards list */}
          <aside className="event-cards-sidebar">
            <h3>Event Categories</h3>
            <ul>
              {CATEGORIES.map(cat => (
                <li
                  key={cat.id}
                  className={activeCategory === cat.id ? "active" : ""}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  {activeCategory === cat.id ? "▶ " : ""}{cat.label}
                </li>
              ))}
            </ul>
            <button className="view-calendar-btn" onClick={() => navigate("/events")}>
              View Full Calendar →
            </button>
          </aside>

          {/* Right: Event cards */}
          <div className="events-list">
            {loading ? (
              <div className="loading-state">Scanning local skies...</div>
            ) : filteredEvents.length === 0 ? (
              <div className="no-events">No events found for this time range.</div>
            ) : (
              filteredEvents.map((event, index) => (
                <article
                  key={index}
                  className="event-card horizontal-card"
                >
                  {/* Left: Image Column */}
                  <div
                    className="event-image-col"
                    style={event.image ? { backgroundImage: `url(${event.image})` } : {}}
                  />

                  {/* Right: Content Column */}
                  <div className="event-content-col">
                    <div className="event-header-row">
                      <div className="badge-group">
                        <span className="event-label">{getDateLabel(event.day)}</span>
                        <span className="event-type">{event.type}</span>
                      </div>
                      <div className="visibility-badge">
                        👁️ {event.visibilityText || "Visible"}
                      </div>
                    </div>

                    <div className="event-body">
                      <h4 className="event-title">{event.title}</h4>
                      <div className="event-time-row">
                        {event.time && (
                          <span className="event-time">
                            🕒 {event.time}
                          </span>
                        )}
                      </div>
                      <p className="event-desc-sim">{event.description}</p>
                    </div>

                    <div className="event-actions">
                      {event.primaryAction && (
                        <button
                          className="premium-btn event-btn primary"
                          onClick={() => window.open(event.primaryAction, '_blank')}
                        >
                          <span className="btn-text">{event.buttonText || "Track Live"}</span>
                        </button>
                      )}
                      <button
                        className="premium-btn event-btn secondary"
                        onClick={() => navigate("/events", { state: { selectedDay: event.day } })}
                      >
                        <span className="btn-text">More Info</span>
                      </button>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;