import { useState, useEffect } from "react";
import "./LocationSelector.css";

const LocationSelector = ({ location = "Mumbai, India", onLocationChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(location);

  // Update local state when prop changes
  useEffect(() => {
    setInputValue(location);
  }, [location]);

  const handleSave = () => {
    onLocationChange(inputValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setInputValue(location);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') handleCancel();
  };

  return (
    <div className="location-selector">
      {isEditing ? (
        <div className="edit-mode">
          <input
            type="text"
            className="location-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            placeholder="Enter your location..."
          />
          <div className="edit-actions">
            <button className="change-btn save-btn" onClick={handleSave}>
              Save
            </button>
            <button className="change-btn cancel-btn" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <span className="location-text">
            Your Location: <strong>{location}</strong>
          </span>
          <button className="change-btn" onClick={() => setIsEditing(true)}>
            Change
          </button>
        </>
      )}
    </div>
  );
};

export default LocationSelector;
