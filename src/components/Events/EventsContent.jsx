import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import EventFilters from "./EventFilters";
import LocationSelector from "./LocationSelector";
import EventsList from "./EventsList";

const API_KEY = "DEMO_KEY";

const EventsContent = () => {
  const { user, isAuthenticated, updateUserLocation } = useAuth();
  const routerLocation = useLocation();
  const [activeFilters, setActiveFilters] = useState(["ALL"]);
  const [location, setLocation] = useState(isAuthenticated && user?.location ? user.location : "Mumbai, India");
  const [loading, setLoading] = useState(false);
  const [eventsData, setEventsData] = useState([]);

  // Update location if user logs in or profile changes
  useEffect(() => {
    if (isAuthenticated && user?.location) {
      setLocation(user.location);
    }
  }, [user, isAuthenticated]);

  // Set up the events data to match the design request
  useEffect(() => {
    // Extract city name for dynamic title
    const city = location?.split(',')[0] || "Mumbai";

    const matchedEvents = [
      {
        id: 0,
        title: `Predicted ISS Pass (${city})`,
        location: "Overhead",
        type: "iss",
        tag: "",
        time: "8:45 PM - 8:51 PM",
        timeIcon: "⏱️",
        description: `High brightness pass predicted for tonight over ${city} skies.`,
        image: "https://images.unsplash.com/photo-1540198163009-7afda7da2945?q=80&w=2127&auto=format&fit=crop", // ISS/Night City
        buttonText: "Track Live",
        isWideButton: true,
        primaryAction: "/tracker"
      },
      {
        id: 1,
        title: "Perseids Meteor Shower Peak",
        location: "Radiant: Constellation Perseus",
        type: "meteor",
        tag: "METEOR SHOWER",
        time: "Peak: 02:00 AM - 04:30 AM",
        description: "The most popular meteor shower of the year is peaking tonight. Expect up to 100 meteors per hour in dark sky areas.",
        image: "https://images.unsplash.com/photo-1533208705002-980bf85fa0a0?q=80&w=2070&auto=format&fit=crop", // Starry sky
        buttonText: "Set Reminder",
        secondaryButtonText: "View Guide"
      },
      {
        id: 2,
        title: "Annular Solar Eclipse",
        location: "Global Visibility",
        type: "eclipse",
        tag: "ECLIPSE",
        time: "Western Hemisphere Visibility",
        timeIcon: "🌎",
        description: "An annular solar eclipse occurs when the Moon passes between the Sun and Earth while it is at its farthest point from Earth.",
        warning: "Requires certified solar viewing glasses. Do not look directly at the sun.",
        warningIcon: "❗",
        image: "https://images.unsplash.com/photo-1610296669228-602fa827fc1f?q=80&w=1975&auto=format&fit=crop", // Eclipse like
        buttonText: "Details",
        secondaryButtonText: "View Path Map"
      },
      {
        id: 3,
        title: "Jupiter & Saturn Conjunction",
        location: "Low on Western Horizon",
        type: "conjunction",
        tag: "PLANETARY",
        description: "A rare great conjunction of the gas giants. Visible low on the western horizon just after sunset.",
        image: "https://images.unsplash.com/photo-1614730341194-75c6076452be?q=80&w=2148&auto=format&fit=crop", // Galaxy/Planets
        buttonText: "Details",
        secondaryButtonText: "Sky Map"
      }
    ];
    setEventsData(matchedEvents);
  }, [location]);


  const handleFilterChange = (filter) => {
    if (filter === "ALL") {
      setActiveFilters(["ALL"]);
    } else {
      const newFilters = activeFilters.filter(f => f !== "ALL");
      if (activeFilters.includes(filter)) {
        const updated = newFilters.filter(f => f !== filter);
        setActiveFilters(updated.length === 0 ? ["ALL"] : updated);
      } else {
        setActiveFilters([...newFilters, filter]);
      }
    }
  };

  const handleLocationChange = (newLocation) => {
    if (!newLocation || newLocation.trim() === "") return;
    setLocation(newLocation);
    if (isAuthenticated && updateUserLocation) {
      updateUserLocation(newLocation);
    }
  };

  // Filter events based on activeFilters
  const getFilteredEvents = () => {
    if (activeFilters.includes("ALL")) {
      return eventsData;
    }

    return eventsData.filter(event => {
      return activeFilters.some(filter => {
        switch (filter) {
          case "METEOR SHOWERS":
            return event.type === "meteor";
          case "AURORA":
            return event.type === "aurora";
          case "PLANETARY":
            return event.type === "conjunction" || event.type === "planetary";
          case "ECLIPSES":
            return event.type === "eclipse";
          default:
            return false;
        }
      });
    });
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

      <EventsList events={getFilteredEvents()} />

      <div className="bottom-actions">
        <button className="action-btn-bottom">[Add to Google Calendar]</button>
        <button className="action-btn-bottom">[Download as PDF]</button>
        <button className="action-btn-bottom">[Email Reminder]</button>
      </div>
    </>
  );
};

export default EventsContent;
