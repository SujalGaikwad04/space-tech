import React, { useMemo, useState } from "react";
import "./UpcomingEvents.css";

// Example data – later you can replace this with data from APIs
const MOCK_EVENTS = [
  {
    id: 1,
    title: "ISS Pass",
    type: "ISS Pass",
    startTime: "2025-12-30T20:42:00Z",
    location: "Visible Worldwide",
    label: "Today, 8:42 PM",
  },
  {
    id: 2,
    title: "Aurora Alert",
    type: "Aurora",
    startTime: "2026-01-15T02:00:00Z",
    endTime: "2026-01-17T06:00:00Z",
    location: "Northern Regions",
    label: "Jan 15–17",
  },
  {
    id: 3,
    title: "Meteor Shower Peak",
    type: "Meteor",
    startTime: "2025-12-31T23:00:00Z",
    location: "Best after midnight",
    label: "Tomorrow, 11:00 PM",
  },
];

const FILTERS = [
  { id: "today", label: "Today" },
  { id: "week", label: "This Week" },
  { id: "month", label: "This Month" },
  { id: "nextMonth", label: "Next Month" },
];

function isSameLocalDay(dateA, dateB) {
  return (
    dateA.getFullYear() === dateB.getFullYear() &&
    dateA.getMonth() === dateB.getMonth() &&
    dateA.getDate() === dateB.getDate()
  );
}

function filterEvents(events, filterId) {
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

  return events.filter((event) => {
    const start = new Date(event.startTime);

    switch (filterId) {
      case "today":
        return start >= startOfToday && start < endOfToday;

      case "week": {
        const inSevenDays = new Date(startOfToday);
        inSevenDays.setDate(startOfToday.getDate() + 7);
        return start >= startOfToday && start < inSevenDays;
      }

      case "month":
        return (
          start >= startOfToday &&
          start.getFullYear() === now.getFullYear() &&
          start.getMonth() === now.getMonth()
        );

      case "nextMonth": {
        const year = now.getMonth() === 11 ? now.getFullYear() + 1 : now.getFullYear();
        const month = (now.getMonth() + 1) % 12;
        return (
          start.getFullYear() === year &&
          start.getMonth() === month
        );
      }

      default:
        return true;
    }
  });
}

const UpcomingEvents = ({ events = MOCK_EVENTS }) => {
  const [activeFilter, setActiveFilter] = useState("week");

  const filteredEvents = useMemo(
    () => {
      console.log('Active filter:', activeFilter);
      console.log('All events:', events);
      const filtered = filterEvents(events, activeFilter);
      console.log('Filtered events:', filtered);
      return filtered;
    },
    [events, activeFilter]
  );

  return (
    <section className="upcoming-events">
      <header className="upcoming-header">
        <h2>Upcoming Celestial Events</h2>

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
          <h3>Event Cards</h3>
          <ul>
            <li>Meteor</li>
            <li>Eclipse</li>
            <li>ISS Pass</li>
            <li>Planet Alignment</li>
          </ul>
          <button className="view-calendar-btn">
            View Full Calendar →
          </button>
        </aside>

        {/* Right: Event cards */}
        <div className="events-list">
          {filteredEvents.length === 0 ? (
            <div className="no-events">No events in this time range.</div>
          ) : (
            filteredEvents.map((event) => (
              <article key={event.id} className="event-card">
                <div className="event-main">
                  <div className="event-title-row">
                    <span className="event-label">{event.label}</span>
                    <span className="event-type">{event.type}</span>
                  </div>
                  <h4 className="event-title">{event.title}</h4>
                  <div className="event-meta">
                    <span className="event-location">{event.location}</span>
                  </div>
                </div>

                <div className="event-actions">
                  <button className="event-btn secondary">
                    View Map
                  </button>
                  <button className="event-btn primary">
                    Interactive
                  </button>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;