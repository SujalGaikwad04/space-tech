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
  const [activeFilters, setActiveFilters] = useState(["[All]"]);
  const [location, setLocation] = useState("Mumbai, India");

  // Custom hooks for data management
  const { calendarEvents, allEventsData, loading } = useEventsData(currentMonth, currentYear);
  const selectedEventDetails = useSelectedEvent(selectedDay, allEventsData, currentMonth, currentYear);

  // Event handlers
  const handleDaySelect = (day) => {
    setSelectedDay(day);
  };

  const handleFilterChange = (filter) => {
    if (filter === "[All]") {
      setActiveFilters(["[All]"]);
    } else {
      const newFilters = activeFilters.filter(f => f !== "[All]");
      if (activeFilters.includes(filter)) {
        const updated = newFilters.filter(f => f !== filter);
        setActiveFilters(updated.length === 0 ? ["[All]"] : updated);
      } else {
        setActiveFilters([...newFilters, filter]);
      }
    }
  };

  const handleLocationChange = () => {
    alert("Location change feature - coming soon!");
  };

  return (
    <div className="events-page">
      <div className="events-container">
        <div className="events-page-header">EVENTS / CALENDAR</div>
        
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
