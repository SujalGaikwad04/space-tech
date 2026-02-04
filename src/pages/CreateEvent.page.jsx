import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateEvent.css";

const CreateEvent = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        date: new Date().toISOString().split('T')[0],
        time: "20:00",
        location: "Global Visibility",
        description: "",
        image: null,
        imagePreview: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({
                    ...prev,
                    image: file,
                    imagePreview: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Mock API call / Save to localStorage
        setTimeout(() => {
            const newEvent = {
                id: Date.now(),
                title: formData.title,
                day: new Date(formData.date).getDate(), // Simplified for demo
                location: formData.location,
                type: "user-event",
                tag: "COMMUNITY",
                time: formData.time,
                description: formData.description,
                image: formData.imagePreview || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
                buttonText: "Details",
                isUserCreated: true
            };

            // Get existing events or init empty array
            const existingEvents = JSON.parse(localStorage.getItem('userEvents') || '[]');
            localStorage.setItem('userEvents', JSON.stringify([...existingEvents, newEvent]));

            setLoading(false);
            navigate("/community-events");
        }, 1500);
    };

    return (
        <div className="create-event-page">
            {/* 🌍 GLOBAL BACKGROUND */}
            <img
                src="/backgrounds/abstract-horizon.png"
                alt="Abstract planet horizon"
                className="home-bg"
            />

            <div className="create-event-container">
                <div className="create-event-header">
                    <h1>Add New Event</h1>
                    <p>Contribute to the SpaceTech community timeline</p>
                </div>

                <form className="event-form" onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label>Event Title</label>
                        <input
                            type="text"
                            name="title"
                            className="form-input"
                            placeholder="Ex: Mars Rover Landing Watch Party"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div className="form-group">
                            <label>Date</label>
                            <input
                                type="date"
                                name="date"
                                className="form-input"
                                value={formData.date}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Time</label>
                            <input
                                type="time"
                                name="time"
                                className="form-input"
                                value={formData.time}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Visibility / Location</label>
                        <input
                            type="text"
                            name="location"
                            className="form-input"
                            placeholder="Ex: Western Hemisphere / Online"
                            value={formData.location}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Event Image</label>
                        <div className="image-upload-area" onClick={() => document.getElementById('fileInput').click()}>
                            {formData.imagePreview ? (
                                <img src={formData.imagePreview} alt="Preview" className="image-preview" />
                            ) : (
                                <div className="upload-placeholder">
                                    <span className="upload-icon">📷</span>
                                    <span>Click to drop an image here</span>
                                    <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>(JPG, PNG, GIF)</span>
                                </div>
                            )}
                            <input
                                id="fileInput"
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={handleImageChange}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            name="description"
                            className="form-textarea"
                            placeholder="Detailed information about the event..."
                            value={formData.description}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>

                    <div className="form-actions">
                        <button type="button" className="cancel-btn" onClick={() => navigate('/events')}>
                            Cancel
                        </button>
                        <button type="submit" className="submit-btn" disabled={loading}>
                            {loading ? (
                                <span>Publishing <span className="scan-line"></span></span>
                            ) : (
                                <span>Publish Event <span className="shimmer-effect"></span></span>
                            )}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default CreateEvent;
