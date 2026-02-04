import React, { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './EventDetailsPage.css';

const EventDetailsPage = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const event = state?.event;
    const pageRef = useRef(null);

    // Redirect if no event data
    if (!event) {
        return (
            <div className="event-detail-page">
                <div className="error-message">
                    <h1>Event Not Found</h1>
                    <button onClick={() => navigate('/events')}>Return to Events</button>
                </div>
            </div>
        );
    }

    // Dynamic background based on event type
    const getBackgroundStyle = (type) => {
        // Priority 1: Use specific event image if available
        if (event.image) {
            return {
                backgroundImage: `url(${event.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            };
        }

        // Priority 2: Fallback to high-quality category images
        let imageUrl;
        const lowerType = type?.toLowerCase() || '';

        if (lowerType.includes('meteor')) {
            imageUrl = 'https://images.unsplash.com/photo-1532960401447-b16e13b8fc76?q=80&w=1600&auto=format&fit=crop';
        } else if (lowerType.includes('aurora')) {
            imageUrl = 'https://images.unsplash.com/photo-1531306728370-e2ebd9d7bb99?q=80&w=1600&auto=format&fit=crop';
        } else if (lowerType.includes('moon') || lowerType.includes('lunar')) {
            imageUrl = 'https://images.unsplash.com/photo-1532693322450-2cb5c511067d?q=80&w=1600&auto=format&fit=crop';
        } else if (lowerType.includes('eclipse')) {
            imageUrl = 'https://images.unsplash.com/photo-1529753253655-470be9a42781?q=80&w=1600&auto=format&fit=crop';
        } else if (lowerType.includes('iss') || lowerType.includes('satellite') || lowerType.includes('man-made')) {
            imageUrl = 'https://images.unsplash.com/photo-1457364887197-9150188c107b?q=80&w=1600&auto=format&fit=crop'; // ISS
        } else if (lowerType.includes('planet') || lowerType.includes('conjunction')) {
            imageUrl = 'https://images.unsplash.com/photo-1614730341194-75c60740a2d3?q=80&w=1600&auto=format&fit=crop';
        } else {
            // Default Deep Space
            imageUrl = 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1600&auto=format&fit=crop';
        }

        return {
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        };
    };

    // Generate quick facts based on type (mock data for demo)
    const getQuickFacts = (type) => {
        switch (type) {
            case 'meteor':
                return [
                    { label: 'Parent Body', value: '3200 Phaethon' },
                    { label: 'ZHR (Rate)', value: '120 meteors/hr' },
                    { label: 'Velocity', value: '35 km/s' },
                    { label: 'Radiant', value: 'Gemini Constellation' }
                ];
            case 'aurora':
                return [
                    { label: 'Kp Index', value: '5 (Storm)' },
                    { label: 'Solar Wind', value: '450 km/s' },
                    { label: 'Source', value: 'Coronal Mass Ejection' },
                    { label: 'Best Lat', value: '> 60° North' }
                ];
            case 'moon':
                return [
                    { label: 'Illumination', value: event.moonPhase ? event.moonPhase.replace('Moon: ', '') : '100%' },
                    { label: 'Distance', value: '384,400 km' },
                    { label: 'Age', value: '14.8 days' },
                    { label: 'Next Phase', value: 'Waning Gibbous' }
                ];
            default:
                return [
                    { label: 'Category', value: 'Astronomical Event' },
                    { label: 'Frequency', value: 'Annual' },
                    { label: 'Best Time', value: 'Midnight' },
                    { label: 'Equipment', value: 'None / Binoculars' }
                ];
        }
    };

    const quickFacts = getQuickFacts(event.type);

    const handleDownloadPDF = async () => {
        const doc = new jsPDF();

        // Colors
        const primaryColor = '#0066cc'; // Darker Blue for print readability
        const secondaryColor = '#00d9ff'; // Cyan accent
        const textColor = '#000000';
        const secondaryText = '#555555';

        // Helper to get detailed info based on type
        const getExtendedInfo = (type) => {
            switch (type) {
                case 'meteor':
                    return {
                        context: "Meteor showers are celestial events in which a number of meteors are observed to radiate, or originate, from one point in the night sky. These meteors are caused by streams of cosmic debris called meteoroids entering Earth's atmosphere at extremely high speeds on parallel trajectories.",
                        equipment: "Naked eye is best. Binoculars limit your field of view.",
                        funFact: "Most meteors are smaller than a grain of sand, yet they burn brightly enough to be seen from Earth due to their immense speed (up to 71 km/s)!"
                    };
                case 'aurora':
                    return {
                        context: "An aurora, also known as the polar lights, is a natural light display in the Earth's sky, predominantly seen in high-latitude regions. Auroras are the result of disturbances in the magnetosphere caused by solar wind.",
                        equipment: "Camera with long exposure capability (10-30 seconds) and a tripod. Wide-angle lens recommended.",
                        funFact: "Auroras also occur on other planets! Jupiter and Saturn have powerful magnetic fields and produce massive auroras."
                    };
                case 'eclipse':
                    return {
                        context: "An eclipse occurs when an astronomical object or spacecraft is temporarily obscured, by passing into the shadow of another body or by having another body pass between it and the viewer.",
                        equipment: "Solar Eclipse: ISO-certified solar glasses are MANDATORY. Lunar Eclipse: Naked eye or binoculars.",
                        funFact: "A total solar eclipse can last up to 7.5 minutes, but at any specific location, the duration of totality is usually even shorter."
                    };
                case 'moon':
                    return {
                        context: "The Moon is Earth's only natural satellite. Its phases are caused by its orbit around Earth, changing how much of the sunlit side we can see.",
                        equipment: "Binoculars (10x50) or a small telescope. Use a moon filter to reduce glare during full moon.",
                        funFact: "The Moon is moving away from Earth at a rate of about 3.8 cm per year."
                    };
                default:
                    return {
                        context: "This celestial event offers a unique opportunity to observe the mechanics of our solar system in action.",
                        equipment: "Standard binoculars (7x50 or 10x50) are a great starting point for most astronomical events.",
                        funFact: "Light from the Sun takes about 8 minutes and 20 seconds to reach Earth."
                    };
            }
        };

        const extendedInfo = getExtendedInfo(event.type);

        // --- PDF GENERATION ---

        // Header / Title
        doc.setFontSize(24);
        doc.setTextColor(primaryColor);
        doc.text(event.title || 'Event Details', 20, 20);

        // Sub-header (Date/Time)
        doc.setFontSize(12);
        doc.setTextColor(secondaryText);
        doc.text(`DATE: ${event.date}   |   TIME: ${event.time}`, 20, 28);

        // Separator Line
        doc.setLineWidth(0.5);
        doc.setDrawColor(200, 200, 200);
        doc.line(20, 32, 190, 32);

        let yPos = 40;

        // --- IMAGE HANDLING ---
        // Get correct image URL (reuse logic from getBackgroundStyle or use direct URL)
        let imageUrl = event.image;
        if (!imageUrl) {
            const lowerType = event.type?.toLowerCase() || '';
            if (lowerType.includes('meteor')) imageUrl = 'https://images.unsplash.com/photo-1532960401447-b16e13b8fc76?q=80&w=1600&auto=format&fit=crop';
            else if (lowerType.includes('aurora')) imageUrl = 'https://images.unsplash.com/photo-1531306728370-e2ebd9d7bb99?q=80&w=1600&auto=format&fit=crop';
            else if (lowerType.includes('moon') || lowerType.includes('lunar')) imageUrl = 'https://images.unsplash.com/photo-1532693322450-2cb5c511067d?q=80&w=1600&auto=format&fit=crop';
            else if (lowerType.includes('eclipse')) imageUrl = 'https://images.unsplash.com/photo-1529753253655-470be9a42781?q=80&w=1600&auto=format&fit=crop';
            else if (lowerType.includes('iss') || lowerType.includes('satellite') || lowerType.includes('man-made')) imageUrl = 'https://images.unsplash.com/photo-1457364887197-9150188c107b?q=80&w=1600&auto=format&fit=crop';
            else if (lowerType.includes('planet') || lowerType.includes('conjunction')) imageUrl = 'https://images.unsplash.com/photo-1614730341194-75c60740a2d3?q=80&w=1600&auto=format&fit=crop';
            else imageUrl = 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1600&auto=format&fit=crop';
        }

        try {
            // Function to load image and return base64
            const loadImage = (url) => {
                return new Promise((resolve, reject) => {
                    const img = new Image();
                    img.crossOrigin = 'Anonymous';
                    img.src = url;
                    img.onload = () => {
                        const canvas = document.createElement('canvas');
                        canvas.width = img.width;
                        canvas.height = img.height;
                        const ctx = canvas.getContext('2d');
                        ctx.drawImage(img, 0, 0);
                        resolve(canvas.toDataURL('image/jpeg'));
                    };
                    img.onerror = reject;
                });
            };

            const imgData = await loadImage(imageUrl);
            // Add image to PDF (x, y, w, h)
            doc.addImage(imgData, 'JPEG', 20, yPos, 170, 80);
            yPos += 85;

        } catch (err) {
            console.error("Could not load image for PDF", err);
            // If image fails, just skip it and continue text
            doc.setFontSize(10);
            doc.setTextColor('#ff0000');
            doc.text("[Image could not be loaded]", 20, yPos);
            yPos += 10;
        }

        // 1. Overview Section
        doc.setFontSize(14);
        doc.setTextColor(primaryColor);
        doc.text('EVENT OVERVIEW', 20, yPos);
        yPos += 8;

        doc.setFontSize(11);
        doc.setTextColor(textColor);
        const description = event.description || "Join us for this spectacular celestial event. Ensure clear skies for the best viewing experience.";
        const splitDescription = doc.splitTextToSize(description, 170);
        doc.text(splitDescription, 20, yPos);
        yPos += (splitDescription.length * 5) + 8;

        // 2. Cosmic Context (Education)
        doc.setFontSize(14);
        doc.setTextColor(primaryColor);
        doc.text('COSMIC CONTEXT', 20, yPos);
        yPos += 8;

        doc.setFontSize(11);
        doc.setTextColor(textColor);
        const splitContext = doc.splitTextToSize(extendedInfo.context, 170);
        doc.text(splitContext, 20, yPos);
        yPos += (splitContext.length * 5) + 8;

        // Check page break needed
        if (yPos > 250) {
            doc.addPage();
            yPos = 20;
        }

        // 3. Quick Facts Table Style
        doc.setFontSize(14);
        doc.setTextColor(primaryColor);
        doc.text('QUICK FACTS', 20, yPos);
        yPos += 8;

        doc.setFontSize(11);
        doc.setTextColor(textColor);
        quickFacts.forEach(fact => {
            doc.setFont('helvetica', 'bold');
            doc.text(`${fact.label}:`, 20, yPos);
            doc.setFont('helvetica', 'normal');
            doc.text(`${fact.value}`, 60, yPos);
            yPos += 6;
        });
        yPos += 8;

        // 4. Equipment Guide & Tips
        doc.setFontSize(14);
        doc.setTextColor(primaryColor);
        doc.text('VIEWING GUIDE & EQUIPMENT', 20, yPos);
        yPos += 8;

        doc.setFontSize(11);
        doc.setTextColor(textColor);

        // Equipment
        doc.setFont('helvetica', 'bold');
        doc.text("Recommended Gear:", 20, yPos);
        doc.setFont('helvetica', 'normal');
        const splitEquip = doc.splitTextToSize(extendedInfo.equipment, 130);
        doc.text(splitEquip, 65, yPos);
        yPos += (splitEquip.length * 6) + 4;

        // Tips List
        const tips = [
            "Find a dark location away from city lights.",
            "Allow 20-30 minutes for dark adaptation.",
            "Check local cloud cover forecast before heading out."
        ];
        if (event.type === 'meteor') tips.push("Lie flat on your back for the best view.");

        tips.forEach(tip => {
            doc.text(`• ${tip}`, 20, yPos);
            yPos += 6;
        });
        yPos += 8;

        // Check page break needed
        if (yPos > 250) {
            doc.addPage();
            yPos = 20;
        }

        // 5. Fun Fact (Boxed)
        doc.setDrawColor(primaryColor);
        doc.setLineWidth(0.5);
        doc.setFillColor(245, 250, 255); // Very light blue bg
        doc.rect(20, yPos, 170, 25, 'FD');

        doc.setFont('helvetica', 'bold');
        doc.setTextColor(primaryColor);
        doc.text("DID YOU KNOW?", 25, yPos + 8);

        doc.setFont('helvetica', 'italic');
        doc.setTextColor(textColor);
        doc.setFontSize(10);
        const splitFact = doc.splitTextToSize(extendedInfo.funFact, 160);
        doc.text(splitFact, 25, yPos + 15);


        // Footer
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(secondaryText);
        doc.text("Generated by RealSpace - Your Cosmic Companion application", 105, 285, { align: 'center' });

        doc.save(`${event.title || 'event-details'}_full_report.pdf`);
    };

    return (
        <div className="event-detail-page" ref={pageRef}>
            {/* Hero Section */}
            <section className="detail-hero" style={getBackgroundStyle(event.type)}>
                <div className="hero-overlay"></div>
                <div className="hero-container">
                    <div className="hero-actions-row">
                        <button className="back-button" onClick={() => navigate('/events')}>
                            ← Back to Events
                        </button>
                        <button className="download-pdf-btn" onClick={handleDownloadPDF}>
                            Download as PDF 📥
                        </button>
                    </div>

                    <div className="hero-content">
                        <span className="hero-category">{event.type?.toUpperCase() || 'CELESTIAL EVENT'}</span>
                        <h1 className="hero-title">{event.title}</h1>

                        {/* Quick Stats Inline */}
                        <div className="hero-stats">
                            <div className="hero-stat-card">
                                <div className="hero-stat-value">{event.time}</div>
                                <div className="hero-stat-label">TIME</div>
                            </div>
                            <div className="hero-stat-card">
                                <div className="hero-stat-value">{event.date}</div>
                                <div className="hero-stat-label">DATE</div>
                            </div>
                            <div className="hero-stat-card">
                                <div className="hero-stat-value">{event.visibilityText || 'Good'}</div>
                                <div className="hero-stat-label">VISIBILITY</div>
                            </div>
                            <div className="hero-stat-card">
                                <div className="hero-stat-value">{event.moonPhase?.split(':')[1] || 'N/A'}</div>
                                <div className="hero-stat-label">MOON PHASE</div>
                            </div>
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
                            <h2 className="section-title">Event Overview</h2>
                        </div>
                        <p className="section-description">
                            {event.description || `Join us for the spectacular ${event.title}. This celestial event offers a unique opportunity for stargazers and astronomy enthusiasts. Ensure you have a clear view of the sky and check local weather conditions for the best experience.`}
                        </p>
                    </section>

                    {/* Two Column Layout */}
                    <div className="two-column-layout">
                        {/* Observation Tips */}
                        <section className="detail-section tips-section">
                            <div className="section-header">
                                <h2 className="section-title">Observation Tips</h2>
                            </div>
                            <ul className="tips-list">
                                <li className="tip-item">
                                    <span className="tip-bullet">•</span>
                                    <span className="tip-text">Find a dark location away from city lights for best visibility.</span>
                                </li>
                                <li className="tip-item">
                                    <span className="tip-bullet">•</span>
                                    <span className="tip-text">Allow 20-30 minutes for your eyes to adjust to the darkness.</span>
                                </li>
                                <li className="tip-item">
                                    <span className="tip-bullet">•</span>
                                    <span className="tip-text">Bring warm clothing and a comfortable chair.</span>
                                </li>
                                {event.type === 'meteor' && (
                                    <li className="tip-item">
                                        <span className="tip-bullet">•</span>
                                        <span className="tip-text">No special equipment needed; naked eye is best for meteors.</span>
                                    </li>
                                )}
                                {event.type === 'aurora' && (
                                    <li className="tip-item">
                                        <span className="tip-bullet">•</span>
                                        <span className="tip-text">Look towards the northern horizon. Camera sensors may see more than eyes.</span>
                                    </li>
                                )}
                            </ul>
                        </section>

                        {/* Technical / Extra Info */}
                        <section className="detail-section facts-section">
                            <div className="section-header">
                                <h2 className="section-title">Quick Facts</h2>
                            </div>
                            <div className="data-grid">
                                {quickFacts.map((fact, index) => (
                                    <div key={index} className="data-item">
                                        <span className="data-label">{fact.label}</span>
                                        <span className="data-value">{fact.value}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetailsPage;
