import { useParams, useNavigate } from 'react-router-dom';
import './SkyObjectDetail.css';

const skyObjectsData = {
    andromeda: {
        name: "Andromeda Nebula M31",
        category: "DISTANT GALAXY",
        image: "/andromeda-nebula.png",
        distance: "2,537 million light years away",
        description: "The Andromeda Galaxy, also known as Messier 31 (M31), is a barred spiral galaxy and is the nearest major galaxy to the Milky Way. It is approximately 2.5 million light-years from Earth and is the largest galaxy in the Local Group.",
        quickStats: [
            { value: "~1 Trillion", label: "STARS" },
            { value: "220,000 ly", label: "DIAMETER" },
            { value: "Spiral Galaxy", label: "TYPE" },
            { value: "3.44", label: "MAGNITUDE" }
        ],
        facts: [
            "Contains approximately 1 trillion stars",
            "Visible to the naked eye from Earth",
            "On a collision course with the Milky Way (in 4.5 billion years)",
            "Home to at least 26 known satellite galaxies",
            "Diameter of approximately 220,000 light-years"
        ],
        observationTips: [
            "Best viewed in autumn months (September-November)",
            "Use binoculars or a telescope for detailed observation",
            "Look for it in the constellation Andromeda",
            "Dark sky locations provide the best views",
            "Appears as a fuzzy patch to the naked eye"
        ],
        technicalData: {
            "Right Ascension": "00h 42m 44.3s",
            "Declination": "+41° 16′ 9″",
            "Apparent Magnitude": "3.44",
            "Type": "Barred Spiral Galaxy (SA(s)b)",
            "Mass": "~1.5 × 10¹² M☉"
        }
    },
    tycho: {
        name: "Tycho Crater",
        category: "LUNAR OBSERVATION",
        image: "/moon-crater.png",
        distance: "384,400 km from Earth",
        description: "Tycho is a prominent lunar impact crater located in the southern lunar highlands. Named after the Danish astronomer Tycho Brahe, it is one of the most conspicuous craters on the Moon due to its extensive ray system.",
        quickStats: [
            { value: "85 km", label: "DIAMETER" },
            { value: "4.8 km", label: "DEPTH" },
            { value: "108M years", label: "AGE" },
            { value: "Impact Crater", label: "TYPE" }
        ],
        facts: [
            "Diameter of approximately 85 kilometers",
            "Depth of about 4,800 meters",
            "Age estimated at 108 million years",
            "Central peak rises 2,400 meters above the floor",
            "Ray system extends over 1,500 kilometers"
        ],
        observationTips: [
            "Best viewed during full moon when rays are most visible",
            "Use a telescope with at least 100mm aperture",
            "Look in the southern highlands of the Moon",
            "Optimal contrast at current lunar phase",
            "Bright rays make it easy to identify"
        ],
        technicalData: {
            "Selenographic Coordinates": "43.4°S 348.8°E",
            "Diameter": "85 km",
            "Depth": "4.8 km",
            "Crater Type": "Complex Impact Crater",
            "Formation Age": "~108 million years"
        }
    }
};

const SkyObjectDetail = () => {
    const { objectId } = useParams();
    const navigate = useNavigate();
    const object = skyObjectsData[objectId];

    if (!object) {
        return (
            <div className="sky-object-detail">
                <div className="error-message">
                    <h1>Object Not Found</h1>
                    <button onClick={() => navigate('/dashboard')}>Return to Dashboard</button>
                </div>
            </div>
        );
    }

    return (
        <div className="sky-object-detail">
            {/* Hero Section with Image Background */}
            <section className="detail-hero" style={{ backgroundImage: `url(${object.image})` }}>
                <div className="hero-overlay"></div>
                <div className="hero-container">
                    <button className="back-button" onClick={() => navigate('/dashboard')}>
                        ← Back to Dashboard
                    </button>

                    <div className="hero-content">
                        <span className="hero-category">{object.category}</span>
                        <h1 className="hero-title">{object.name}</h1>

                        {/* Quick Stats Inline */}
                        <div className="hero-stats">
                            {object.quickStats.map((stat, index) => (
                                <div key={index} className="hero-stat-card">
                                    <div className="hero-stat-value">{stat.value}</div>
                                    <div className="hero-stat-label">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Grid */}
            <div className="detail-content-wrapper">
                <div className="detail-content-grid">
                    {/* Description */}
                    <section className="detail-section overview-section">
                        <div className="section-header">
                            <h2 className="section-title">Overview</h2>
                        </div>
                        <p className="section-description">{object.description}</p>
                    </section>

                    {/* Two Column Layout */}
                    <div className="two-column-layout">
                        {/* Fascinating Facts */}
                        <section className="detail-section facts-section">
                            <div className="section-header">
                                <h2 className="section-title">Fascinating Facts</h2>
                            </div>
                            <ul className="facts-list">
                                {object.facts.map((fact, index) => (
                                    <li key={index} className="fact-item">
                                        <span className="fact-bullet">•</span>
                                        <span className="fact-text">{fact}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {/* Observation Tips */}
                        <section className="detail-section tips-section">
                            <div className="section-header">
                                <h2 className="section-title">Observation Tips</h2>
                            </div>
                            <ul className="tips-list">
                                {object.observationTips.map((tip, index) => (
                                    <li key={index} className="tip-item">
                                        <span className="tip-bullet">•</span>
                                        <span className="tip-text">{tip}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </div>

                    {/* Technical Data */}
                    <section className="detail-section technical-section">
                        <div className="section-header">
                            <h2 className="section-title">Technical Data</h2>
                        </div>
                        <div className="data-grid">
                            {Object.entries(object.technicalData).map(([key, value]) => (
                                <div key={key} className="data-item">
                                    <span className="data-label">{key}</span>
                                    <span className="data-value">{value}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default SkyObjectDetail;
