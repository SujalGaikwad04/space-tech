import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { API_URL } from '../apiConfig';
import './LiveMap.css';

// Fix for default marker icon missing in React-Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// URL for ISS icon (optional, using default marker for now, or we can use a custom one)
const ISS_ICON_URL = "https://upload.wikimedia.org/wikipedia/commons/d/d0/International_Space_Station.svg";
const issIcon = L.icon({
    iconUrl: ISS_ICON_URL,
    iconSize: [50, 30],
    iconAnchor: [25, 15],
});


function LiveMap() {
    const [position, setPosition] = useState([0, 0]); // Latitude, Longitude
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchISSPosition = async () => {
        try {
            let response;
            let data;

            try {
                // Primary: Try backend proxy
                response = await fetch(`${API_URL}/iss-now`);
                if (!response.ok) throw new Error('Backend proxy failed');
                data = await response.json();
            } catch (proxyError) {
                console.warn("Backend proxy failed, trying fallback API...", proxyError);
                // Fallback: Fetch directly from a reliable public API
                response = await fetch("https://api.wheretheiss.at/v1/satellites/25544");
                if (!response.ok) throw new Error('Fallback API failed');
                const rawData = await response.json();
                // Map fallback data format to matches what the app expects
                data = {
                    iss_position: {
                        latitude: rawData.latitude.toString(),
                        longitude: rawData.longitude.toString()
                    }
                };
            }

            if (data && data.iss_position) {
                const { latitude, longitude } = data.iss_position;
                setPosition([parseFloat(latitude), parseFloat(longitude)]);
                setError(null);
            }
        } catch (error) {
            console.error("Error fetching ISS position:", error);
            setError("Could not fetch ISS position. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchISSPosition();
        const interval = setInterval(fetchISSPosition, 5000); // Update every 5 seconds
        return () => clearInterval(interval);
    }, []);

    const RecenterMap = ({ lat, lng }) => {
        const map = useMap();
        useEffect(() => {
            map.flyTo([lat, lng], map.getZoom());
        }, [lat, lng]);
        return null;
    };

    return (
        <div className="page-container">
            <h1 className="page-title" style={{ textAlign: 'center', marginTop: '1rem', color: 'var(--text-primary)' }}>Live ISS Tracker</h1>

            {loading ? (
                <div className="loading-map">Loading ISS Position...</div>
            ) : error ? (
                <div className="error-map" style={{ textAlign: 'center', padding: '2rem', color: '#ff4d4d' }}>
                    {error}
                </div>
            ) : (
                <div className="live-map-container">
                    <MapContainer center={position} zoom={3} scrollWheelZoom={true} style={{ height: "100%", width: "100%" }}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={position} icon={issIcon}>
                            <Popup>
                                ISS Current Location <br />
                                Lat: {position[0].toFixed(4)}, Lon: {position[1].toFixed(4)}
                            </Popup>
                        </Marker>
                        <RecenterMap lat={position[0]} lng={position[1]} />
                    </MapContainer>

                    <div className="map-info-panel">
                        <h2>Current Status</h2>
                        <p><strong>Latitude:</strong> {position[0].toFixed(4)}</p>
                        <p><strong>Longitude:</strong> {position[1].toFixed(4)}</p>
                        <p><strong>Altitude:</strong> ~408 km</p>
                        <p><strong>Speed:</strong> ~27,600 km/h</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default LiveMap;
