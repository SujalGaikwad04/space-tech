import "./LocationSelector.css";

const LocationSelector = ({ location = "Mumbai, India", onLocationChange }) => {
  return (
    <div className="location-selector">
      <span className="location-text">
        Your Location: <strong>{location}</strong>
      </span>
      <button className="change-btn" onClick={onLocationChange}>
        Change
      </button>
    </div>
  );
};

export default LocationSelector;
