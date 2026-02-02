import { useState } from "react";
import "./MissionFiltersSection.css";

const MissionFiltersSection = ({ onViewChange, onFilterChange }) => {
  const [activeView, setActiveView] = useState("timeline");

  const handleViewChange = (view) => {
    setActiveView(view);
    if (onViewChange) onViewChange(view);
  };

  return (
    <section className="mission-filters-section">
      <div className="filter-buttons">
        <button 
          className={`filter-btn ${activeView === 'timeline' ? 'active' : ''}`}
          onClick={() => handleViewChange('timeline')}
        >
          TIMELINE VIEW
        </button>
        <button 
          className={`filter-btn ${activeView === 'list' ? 'active' : ''}`}
          onClick={() => handleViewChange('list')}
        >
          LIST VIEW
        </button>
        <button className="filter-btn">AGENCY FILTER</button>
        <button className="filter-btn">STATUS FILTER</button>
      </div>
    </section>
  );
};

export default MissionFiltersSection;
