import { useState } from "react";
import "./MissionFiltersSection.css";

const MissionFiltersSection = ({ onViewChange }) => {
  const [activeView, setActiveView] = useState("timeline");

  const filters = [
    { id: "timeline", label: "TIMELINE" },
    { id: "upcoming", label: "UPCOMING MISSIONS" },
    { id: "tracking", label: "LIVE CRAFT TRACKING" },
    { id: "stream", label: "LIVE STREAM" },
    { id: "model", label: "3D MODEL" }
  ];

  const handleViewChange = (viewId) => {
    setActiveView(viewId);
    if (onViewChange) onViewChange(viewId);
  };

  return (
    <section className="mission-filters-section">
      <div className="filter-buttons">
        {filters.map(filter => (
          <button
            key={filter.id}
            className={`filter-btn ${activeView === filter.id ? 'active' : ''}`}
            onClick={() => handleViewChange(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </section>
  );
};

export default MissionFiltersSection;
