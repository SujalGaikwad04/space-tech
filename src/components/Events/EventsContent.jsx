import React, { useEffect, useState } from "react";
import EventFilters from "./EventFilters";
import LocationSelector from "./LocationSelector";
import EventsCalendar from "./EventsCalendar";
import SelectedDayDetails from "./SelectedDayDetails";

const API_KEY = "DEMO_KEY";

const EventsContent = () => {
  const now = new Date();
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [allEventsData, setAllEventsData] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(now.getMonth());
  const [currentYear, setCurrentYear] = useState(now.getFullYear());
  const [selectedDay, setSelectedDay] = useState(now.getDate());
  const [selectedEventDetails, setSelectedEventDetails] = useState(null);
  const [activeFilters, setActiveFilters] = useState(["[All]"]);
  const [location, setLocation] = useState("Mumbai, India");
  const [loading, setLoading] = useState(false);

  // Fetch NASA API data for celestial events
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const startDate = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-01`;
        const endDate = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${new Date(currentYear, currentMonth + 1, 0).getDate()}`;
        
        // Fetch geomagnetic storms (Aurora events)
        const gstResponse = await fetch(
          `https://api.nasa.gov/DONKI/GST?startDate=${startDate}&endDate=${endDate}&api_key=${API_KEY}`
        );
        const gstData = await gstResponse.json();
        
        // Sample meteor shower events for current month
        const sampleEvents = [
          { 
            day: 5, 
            icon: "🌠", 
            type: "meteor",
            title: "Geminids Meteor Shower",
            time: "9:00 PM - 3:00 AM",
            visibility: 3,
            visibilityText: "Good Visibility",
            moonPhase: "Moon: 40% (Moderate sky)"
          },
          { 
            day: 15, 
            icon: "🌌", 
            type: "aurora",
            title: "Aurora Borealis Forecast",
            time: "10:00 PM - 2:00 AM",
            visibility: 2,
            visibilityText: "Moderate Visibility",
            moonPhase: "Moon: 65% (Bright sky)"
          },
          { 
            day: 21, 
            icon: "🌠", 
            type: "meteor",
            title: "Orionids Meteor Shower Peak",
            time: "2:00 AM - 5:00 AM",
            visibility: 4,
            visibilityText: "Excellent Visibility",
            moonPhase: "Moon: 15% (Dark sky)"
          },
          { 
            day: 28, 
            icon: "🌕", 
            type: "moon",
            title: "Full Moon",
            time: "All Night",
            visibility: 5,
            visibilityText: "Perfect Visibility",
            moonPhase: "Moon: 100% (Full Moon)"
          }
        ];

        // Process API aurora events
        const auroraEvents = gstData.slice(0, 3).map((item) => {
          const eventDate = new Date(item.startTime);
          const day = eventDate.getDate();
          return { 
            day, 
            icon: "🌌", 
            type: "aurora",
            title: "Geomagnetic Storm (Aurora Possible)",
            time: eventDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            visibility: 3,
            visibilityText: "Good Visibility (Weather Dependent)",
            moonPhase: "Check local conditions",
            apiData: item
          };
        });

        const allEvents = [...sampleEvents, ...auroraEvents];
        setAllEventsData(allEvents);
        
        // Create calendar events (just day + icon)
        const calEvents = allEvents.map(e => ({
          day: e.day,
          icon: e.icon,
          type: e.type
        }));
        
        setCalendarEvents(calEvents);
      } catch (err) {
        console.error("Error fetching NASA data:", err);
        // Fallback to sample events
        const fallback = [
          { day: 5, icon: "🌠", type: "meteor" },
          { day: 21, icon: "🌠", type: "meteor" },
          { day: 28, icon: "🌕", type: "moon" }
        ];
        setCalendarEvents(fallback);
      }
      setLoading(false);
    };

    fetchEvents();
  }, [currentMonth, currentYear]);

  // Update selected event when day changes
  useEffect(() => {
    const eventForDay = allEventsData.find(e => e.day === selectedDay);
    
    if (eventForDay) {
      const monthNames = ["January", "February", "March", "April", "May", "June", 
                          "July", "August", "September", "October", "November", "December"];
      setSelectedEventDetails({
        date: `${monthNames[currentMonth]} ${selectedDay}, ${currentYear}`,
        time: eventForDay.time,
        title: eventForDay.title,
        icon: eventForDay.icon,
        visibility: eventForDay.visibility,
        visibilityText: eventForDay.visibilityText,
        moonPhase: eventForDay.moonPhase
      });
    } else {
      // No event on this day
      const monthNames = ["January", "February", "March", "April", "May", "June", 
                          "July", "August", "September", "October", "November", "December"];
      setSelectedEventDetails({
        date: `${monthNames[currentMonth]} ${selectedDay}, ${currentYear}`,
        time: "No events scheduled",
        title: "No Celestial Events",
        icon: "🌙",
        visibility: 0,
        visibilityText: "Clear Night Sky",
        moonPhase: "Check for general stargazing"
      });
    }
  }, [selectedDay, allEventsData, currentMonth, currentYear]);

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
    <>
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
      <div className="bottom-actions">
        <button className="action-btn-bottom">[Add to Google Calendar]</button>
        <button className="action-btn-bottom">[Download as PDF]</button>
        <button className="action-btn-bottom">[Email Reminder]</button>
      </div>
    </>
  );
};

export default EventsContent;
