import { useState, useEffect } from "react";
import "./LocationSelector.css";

const LocationSelector = ({ location = "Mumbai, India", onLocationChange, hideButton = false }) => {
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

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setInputValue("Locating...");

    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      try {
        // Free reverse geocoding API (OpenStreetMap Nominatim)
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
        const data = await response.json();

        const city = data.address.city || data.address.town || data.address.village || data.address.state || "Unknown Location";
        const country = data.address.country || "";

        setInputValue(`${city}, ${country}`);
      } catch (error) {
        console.error("Error fetching location name:", error);
        setInputValue(`${latitude.toFixed(2)}, ${longitude.toFixed(2)}`);
      }
    }, (error) => {
      console.error("Geolocation error:", error);
      alert("Unable to retrieve your location. Please check your browser permissions.");
      setInputValue(location);
    });
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
            <button
              className="change-btn location-detect-btn"
              onClick={handleDetectLocation}
              title="Use my current location"
            >
              📍 Use Current
            </button>
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
          <span
            className={`location-text ${hideButton ? 'clickable-text' : ''}`}
            onClick={() => hideButton && setIsEditing(true)}
          >
            {hideButton ? "" : "Your Location: "}<strong>{location}</strong>
          </span>
          {!hideButton && (
            <button className="change-btn" onClick={() => setIsEditing(true)}>
              Change
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default LocationSelector;
