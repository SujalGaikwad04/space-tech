import { useState, useEffect } from "react";

export const useSelectedEvent = (selectedDay, allEventsData, currentMonth, currentYear) => {
  const [selectedEventDetails, setSelectedEventDetails] = useState(null);

  useEffect(() => {
    const eventForDay = allEventsData.find(e => e.day === selectedDay);

    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];

    if (eventForDay) {
      setSelectedEventDetails({
        ...eventForDay, // Spread all existing properties (description, actions, etc.)
        date: `${monthNames[currentMonth]} ${selectedDay}, ${currentYear}`,
        // explicit overrides if needed for formatting
        time: eventForDay.time,
        title: eventForDay.title,
        icon: eventForDay.icon,
        visibility: eventForDay.visibility,
        visibilityText: eventForDay.visibilityText,
        moonPhase: eventForDay.moonPhase
      });
    } else {
      // No event on this day
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

  return selectedEventDetails;
};
