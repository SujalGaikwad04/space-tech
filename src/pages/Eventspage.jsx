import { useState } from "react";
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

  // Custom hooks for data management
  const { calendarEvents, allEventsData, loading } = useEventsData(currentMonth, currentYear);
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

  const handleLocationChange = () => {
    alert("Location change feature - coming soon!");
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
        <div style={{textAlign: 'center'}}>
          <div className="events-page-header">SPACE EVENTS</div>
        </div>
        
        <EventFilters 
          activeFilters={activeFilters}
          onFilterChange={handleFilterChange}
        />
        
        <LocationSelector 
          location={location}
          onLocationChange={handleLocationChange}
        />
        
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
