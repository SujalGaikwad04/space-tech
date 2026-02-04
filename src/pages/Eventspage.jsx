import { useState, useEffect } from "react";
import ParticleBackground from "../components/Home/ParticleBackground";
import EventFilters from "../components/Events/EventFilters";
import LocationSelector from "../components/Events/LocationSelector";
import EventsCalendar from "../components/Events/EventsCalendar";
import SelectedDayDetails from "../components/Events/SelectedDayDetails";

import EventsList from "../components/Events/EventsList";
import { useEventsData } from "../components/Events/useEventsData";
import { useSelectedEvent } from "../components/Events/useSelectedEvent";
import EventCountdown from "../components/Events/EventCountdown";
import "../components/Events/EventsPageContainer.css";

function Eventspage() {
  const now = new Date();
  const [currentMonth, setCurrentMonth] = useState(now.getMonth());
  const [currentYear, setCurrentYear] = useState(now.getFullYear());
  const [selectedDay, setSelectedDay] = useState(now.getDate());
  const [activeFilters, setActiveFilters] = useState([]);
  const [location, setLocation] = useState("Mumbai, India");
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getLocalTimeInfo = () => {
    const city = location.split(',')[0].trim().toLowerCase();

    const cityToTimezone = {
      "mumbai": "Asia/Kolkata",
      "mumabi": "Asia/Kolkata",
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

      return { timeString: timeStr, gmtOffset: gmt };
    } catch (e) {
      return {
        timeString: currentTime.toLocaleTimeString('en-GB'),
        gmtOffset: "GMT" + (currentTime.getTimezoneOffset() <= 0 ? "+" : "-") + Math.abs(currentTime.getTimezoneOffset() / 60)
      };
    }
  };

  const { timeString, gmtOffset } = getLocalTimeInfo();

  // Custom hooks for data management
  const { calendarEvents, allEventsData, loading } = useEventsData(currentMonth, currentYear, location);
  const selectedEventDetails = useSelectedEvent(selectedDay, allEventsData, currentMonth, currentYear);

  // Logic to find the NEXT MAJOR EVENT for the countdown
  const getNextMajorEvent = () => {
    if (!allEventsData || allEventsData.length === 0) return null;

    // Filter for future events only
    const today = new Date();
    const futureEvents = allEventsData.filter(event => {
      // Construct event date object
      const eventDate = new Date(currentYear, currentMonth, event.day);

      // If event is today, check if time has passed (simplified)
      if (event.day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()) {
        return true;
      }
      return eventDate >= today;
    });

    // Sort by day
    futureEvents.sort((a, b) => a.day - b.day);

    // Pick the first one that looks "Major" or just the immediate next one
    const majorTypes = ["eclipse", "meteor", "conjunction"];
    const nextMajor = futureEvents.find(e => majorTypes.includes(e.type)) || futureEvents[0];

    if (!nextMajor) return null;

    // Construct target date for countdown
    const targetDate = new Date(currentYear, currentMonth, nextMajor.day);
    targetDate.setHours(20, 0, 0); // Default to evening event

    return { ...nextMajor, targetDate };
  };

  const nextEvent = getNextMajorEvent();

  // Event handlers
  const handleDaySelect = (day) => {
    setSelectedDay(day);
  };

  // Filter Logic
  const getFilteredEvents = () => {
    if (activeFilters.length === 0 || activeFilters.includes("ALL")) {
      return allEventsData;
    }

    return allEventsData.filter(event => {
      return activeFilters.some(filter => {
        switch (filter) {
          case "METEOR SHOWERS":
            return event.type === "meteor";
          case "ECLIPSES":
            return event.type === "eclipse";
          case "ISS PASSES":
            return event.type === "man-made" || event.type === "iss";
          case "PLANETARY":
            return event.type === "conjunction" || event.type === "moon" || event.type === "planet";
          case "AURORA":
            return event.type === "aurora";
          case "TONIGHT":
            return event.day === selectedDay;
          case "THIS WEEK":
            return event.day >= selectedDay && event.day <= selectedDay + 7;
          default:
            return false;
        }
      });
    });
  };

  const filteredEventsForList = getFilteredEvents().filter(e => e.description);

  const handleFilterChange = (filter) => {
    if (filter === "ALL") {
      setActiveFilters(["ALL"]);
    } else {
      let newFilters = [...activeFilters];
      if (newFilters.includes("ALL")) {
        newFilters = [];
      }

      if (newFilters.includes(filter)) {
        newFilters = newFilters.filter(f => f !== filter);
      } else {
        newFilters.push(filter);
      }

      if (newFilters.length === 0) {
        newFilters = ["ALL"];
      }

      setActiveFilters(newFilters);
    }
  };

  const handleLocationChange = (newLocation) => {
    setLocation(newLocation);
  };

  return (
    <div className="events-page">
      {/* 🌍 GLOBAL BACKGROUND */}
      <ParticleBackground />

      <div className="events-container">
        <div style={{ textAlign: 'center' }}>
          <div className="events-page-header">SPACE EVENTS</div>
        </div>

        <EventFilters
          activeFilters={activeFilters}
          onFilterChange={handleFilterChange}
        />

        {/* Community Contribution Banner */}
        <div style={{
          margin: '20px 0 30px 0',
          padding: '25px',
          background: 'linear-gradient(90deg, rgba(0,229,255,0.1) 0%, rgba(138,43,226,0.1) 100%)',
          borderRadius: '16px',
          border: '1px solid rgba(0,229,255,0.2)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backdropFilter: 'blur(5px)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
        }}>
          <div>
            <h3 style={{ margin: '0 0 5px 0', fontFamily: 'Rajdhani', fontSize: '1.4rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Host a Community Event <span style={{ fontSize: '0.8rem', verticalAlign: 'middle' }}>🚀</span>
            </h3>
            <p style={{ margin: 0, color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem' }}>
              Organizing a watch party or workshop? Add it to the SpaceTech timeline.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '15px' }}>
            <button
              className="premium-btn"
              onClick={() => window.location.href = '/community-events'}
              style={{
                padding: '10px 20px',
                fontSize: '0.9rem',
                background: 'transparent',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.3)',
                cursor: 'pointer'
              }}
            >
              Browse Events
            </button>
            <button
              className="premium-btn"
              onClick={() => window.location.href = '/create-event'}
              style={{
                padding: '10px 25px',
                fontSize: '1rem',
                background: '#fff',
                color: '#000',
                fontWeight: 'bold',
                border: 'none',
                boxShadow: '0 0 15px rgba(255,255,255,0.2)',
                cursor: 'pointer'
              }}
            >
              <span className="shimmer-effect"></span>
              + Create Event
            </button>
          </div>
        </div>

        <div className="location-and-time-row">
          <LocationSelector
            location={location}
            onLocationChange={handleLocationChange}
          />
          <div className="current-time-info">
            <span className="time-val">{timeString}</span>
            <span className="gmt-val">{gmtOffset}</span>
          </div>
        </div>

        {/* Countdown Section (Moved) */}
        {nextEvent && (
          <EventCountdown
            targetDate={nextEvent.targetDate}
            eventName={nextEvent.title}
            onActionClick={() => window.open(nextEvent.primaryAction || "#", "_blank")}
          />
        )}

        <div className="calendar-and-details-wrapper">
          <EventsCalendar
            events={calendarEvents}
            selectedDate={selectedDay}
            onSelectDate={handleDaySelect}
            currentMonth={currentMonth}
            currentYear={currentYear}
          />

          <SelectedDayDetails
            event={selectedEventDetails}
            selectedDay={selectedDay}
          />
        </div>

        <EventsList events={filteredEventsForList} />

      </div>
    </div>
  );
}

export default Eventspage;
