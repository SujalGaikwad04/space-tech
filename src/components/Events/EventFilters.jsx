import "./EventFilters.css";

const EventFilters = ({ activeFilters = [], onFilterChange }) => {
  const filters = [
    "ALL",
    "METEOR SHOWERS",
    "ECLIPSES",
    "PLANETARY",
    "AURORA"
  ];

  const toggleFilter = (filter) => {
    if (onFilterChange) {
      onFilterChange(filter);
    }
  };

  return (
    <div className="event-filters-section">
      {/* LABEL ABOVE BUTTONS */}
      <div className="filters-label">FILTER EVENTS</div>

      {/* FILTER BUTTONS */}
      <div className="event-filters">
        {filters.map((filter) => (
          <button
            key={filter}
            className={`filter-btn ${activeFilters.includes(filter) ? "active" : ""
              }`}
            onClick={() => toggleFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EventFilters;
