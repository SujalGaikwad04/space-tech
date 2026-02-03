import { useEffect } from 'react';
import './SkyObjectModal.css';

const SkyObjectModal = ({ objectId, onClose }) => {
    // Detailed information for each celestial object
    const skyObjects = {
        andromeda: {
            name: "Andromeda Nebula M31",
            category: "DISTANT GALAXY",
            distance: "2.537 million light years",
            image: "/andromeda-nebula.png",
            description: "The Andromeda Galaxy, also known as Messier 31 (M31), is a barred spiral galaxy and is the nearest major galaxy to the Milky Way. It is approximately 2.5 million light-years from Earth and is the largest galaxy of the Local Group.",
            details: {
                type: "Barred Spiral Galaxy",
                constellation: "Andromeda",
                apparentMagnitude: "3.44",
                diameter: "~220,000 light years",
                mass: "1.5 trillion solar masses",
                bestViewingTime: "September to February",
            },
            observationTips: [
                "Best viewed during autumn and winter months",
                "Visible to the naked eye under dark skies",
                "Use binoculars or telescope for better detail",
                "Avoid light pollution for optimal viewing"
            ],
            funFacts: [
                "Approaching the Milky Way at 110 km/s",
                "Contains approximately 1 trillion stars",
                "Will collide with our galaxy in 4.5 billion years",
                "Most distant object visible without a telescope"
            ]
        },
        tycho: {
            name: "Tycho Crater",
            category: "LUNAR OBSERVATION",
            distance: "384,400 km from Earth",
            image: "/moon-crater.png",
            description: "Tycho is a prominent lunar impact crater located in the southern lunar highlands. Named after Danish astronomer Tycho Brahe, it's notable for its extensive ray system radiating outward for over 1,500 kilometers.",
            details: {
                type: "Impact Crater",
                diameter: "85 km (53 miles)",
                depth: "4,800 meters",
                age: "~108 million years",
                centralPeak: "2,400 meters high",
                namedAfter: "Tycho Brahe (1546-1601)",
            },
            observationTips: [
                "Best viewed during full moon",
                "Visible with binoculars or small telescopes",
                "Look for the bright central peak",
                "Ray system is especially bright and prominent",
            ],
            funFacts: [
                "One of the youngest major craters on the Moon",
                "Bright rays caused by fresh ejected material",
                "Apollo 17 collected samples from its ejecta",
                "Visible with naked eye during full moon",
            ]
        }
    };

    const object = skyObjects[objectId];

    // Prevent body scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    // Close on Escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    if (!object) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {/* Close Button */}
                <button className="modal-close-btn" onClick={onClose}>✕</button>

                {/* Header */}
                <div className="modal-header">
                    <span className="modal-category">{object.category}</span>
                    <h2 className="modal-title">{object.name}</h2>
                    <p className="modal-distance">📍 {object.distance}</p>
                </div>

                {/* Hero Image */}
                <div className="modal-hero-image" style={{ backgroundImage: `url(${object.image})` }}>
                    <div className="modal-hero-overlay"></div>
                </div>

                {/* Scrollable Content */}
                <div className="modal-body">
                    {/* Description */}
                    <section className="modal-section">
                        <h3 className="modal-section-title">Overview</h3>
                        <p className="modal-description">{object.description}</p>
                    </section>

                    {/* Technical Details */}
                    <section className="modal-section">
                        <h3 className="modal-section-title">Technical Details</h3>
                        <div className="modal-details-grid">
                            {Object.entries(object.details).map(([key, value]) => (
                                <div key={key} className="modal-detail-item">
                                    <span className="modal-detail-label">
                                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                    </span>
                                    <span className="modal-detail-value">{value}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Observation Tips */}
                    <section className="modal-section">
                        <h3 className="modal-section-title">Observation Tips</h3>
                        <ul className="modal-tips-list">
                            {object.observationTips.map((tip, index) => (
                                <li key={index} className="modal-tip-item">
                                    <span className="modal-tip-icon">🔭</span>
                                    {tip}
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Fun Facts */}
                    <section className="modal-section">
                        <h3 className="modal-section-title">Fascinating Facts</h3>
                        <div className="modal-facts-grid">
                            {object.funFacts.map((fact, index) => (
                                <div key={index} className="modal-fact-card">
                                    <span className="modal-fact-number">{index + 1}</span>
                                    <p className="modal-fact-text">{fact}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default SkyObjectModal;
