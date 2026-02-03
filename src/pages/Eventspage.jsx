import { useState, useEffect } from "react";
import EventFilters from "../components/Events/EventFilters";
import LocationSelector from "../components/Events/LocationSelector";
import EventsCalendar from "../components/Events/EventsCalendar";
import SelectedDayDetails from "../components/Events/SelectedDayDetails";
import EventsActions from "../components/Events/EventsActions";
import { useEventsData } from "../components/Events/useEventsData";
import { useSelectedEvent } from "../components/Events/useSelectedEvent";
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

  // Event handlers
  const handleDaySelect = (day) => {
    setSelectedDay(day);
  };

  const handleFilterChange = (filter) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter(f => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  const handleLocationChange = (newLocation) => {
    setLocation(newLocation);
  };

  return (
    <div className="events-page">
      {/* Cosmic decorations */}
      <div className="shooting-star"></div>
      <div className="shooting-star"></div>
      <div className="shooting-star"></div>
      <div className="cosmic-particle"></div>
      <div className="cosmic-particle"></div>
      <div className="cosmic-particle"></div>
      <div className="cosmic-particle"></div>
      <div className="cosmic-particle"></div>
      <div className="nebula nebula-1"></div>
      <div className="nebula nebula-2"></div>
      <div className="nebula nebula-3"></div>
      <div className="planet planet-1"></div>
      <div className="planet planet-2"></div>
      <div className="moon-decoration"></div>

      <div className="events-container">
        <div style={{ textAlign: 'center' }}>
          <div className="events-page-header">SPACE EVENTS</div>
        </div>

        <EventFilters
          activeFilters={activeFilters}
          onFilterChange={handleFilterChange}
        />

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

        <EventsActions />
      </div>
    </div>
  );
}

export default Eventspage;
