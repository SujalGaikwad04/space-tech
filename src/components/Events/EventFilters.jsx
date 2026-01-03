import "./EventFilters.css";

const EventFilters = ({ activeFilters, onFilterChange }) => {
  const filters = [
    "[All]",
    "[Tonight]",
    "[This Week]",
    "[Meteor Showers]",
    "[Eclipses]",
    "[ISS Passes]",
    "[Planetary]",
    "[Aurora]",
    "[Custom Date Range]"
  ];

  const toggleFilter = (filter) => {
    if (onFilterChange) {
      onFilterChange(filter);
    }
  };

  return (
    <div className="event-filters-section">
      <div className="filters-label">FILTERS:</div>
      <div className="event-filters">
        {filters.map((filter) => (
          <button
            key={filter}
            className={`filter-btn ${activeFilters?.includes(filter) ? 'active' : ''}`}
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
