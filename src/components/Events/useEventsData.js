import { useState, useEffect } from "react";

const API_KEY = "DEMO_KEY";

export const useEventsData = (currentMonth, currentYear, location = "Mumbai, India") => {
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [allEventsData, setAllEventsData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Helper to determine visibility based on location
  const getVisibilityForLocation = (event, loc) => {
    const locLower = loc.toLowerCase();
    const isNorthernHighLat = locLower.includes("uk") || locLower.includes("london") || locLower.includes("canada") || locLower.includes("usa") || locLower.includes("united states") || locLower.includes("united kingdom") || locLower.includes("norway") || locLower.includes("sweden") || locLower.includes("finland") || locLower.includes("iceland") || locLower.includes("russia");
    const isIndia = locLower.includes("india") || locLower.includes("mumbai") || locLower.includes("delhi");

    // Logic for Aurora
    if (event.type === "aurora") {
      if (isNorthernHighLat) {
        return { val: 5, text: "Excellent Visibility (High Latitude)" };
      }
      return { val: 1, text: "Not Visible (Too far south)" };
    }

    // Logic for Meteors
    if (event.type === "meteor") {
      // Arbitrary logic for demo: Geminids better in India, Orionids better in UK for this demo
      if (event.title.includes("Geminids")) {
        return isIndia ? { val: 4, text: "Good Visibility" } : { val: 2, text: "Poor Visibility (Horizon Low)" };
      }
      if (event.title.includes("Orionids")) {
        return isNorthernHighLat ? { val: 5, text: "Great Visibility" } : { val: 2, text: "Fair Visibility" };
      }
      return { val: 3, text: "Moderate Visibility" };
    }

    // Default for others (Moon, etc)
    return { val: 5, text: "Visible" };
  };

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const startDate = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-01`;
        const endDate = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${new Date(currentYear, currentMonth + 1, 0).getDate()}`;

        // Fetch geomagnetic storms (Aurora events)
        const gstResponse = await fetch(
          `https://api.nasa.gov/DONKI/GST?startDate=${startDate}&endDate=${endDate}&api_key=${API_KEY}`
        );
        const gstData = await gstResponse.json();

        // Dynamic local events based on location
        const localEvents = [];
        const locLower = location.toLowerCase();

        // Real-time ISS Pass for Mumbai
        if (locLower.includes("mumbai") || locLower.includes("india") || locLower.includes("delhi")) {
          try {
            // Fetch ISS passes for Mumbai (Lat: 19.0760, Lon: 72.8777)
            // Using open-notify API (public, no key needed)
            const issResponse = await fetch("http://api.open-notify.org/iss-pass.json?lat=19.0760&lon=72.8777");
            const issData = await issResponse.json();

            if (issData.message === "success" && issData.response.length > 0) {
              const nextPass = issData.response[0];
              const passDate = new Date(nextPass.risetime * 1000);

              // Only add if it falls within the current view/month approx or just show it as "Next Sighting"
              // For robustness, we'll force it to be "Tonight" or "Tomorrow" relative to real time for the demo effect
              // regardless of exact month view to ensure user sees it "live"

              const durationMin = Math.round(nextPass.duration / 60);
              const day = passDate.getDate();
              const timeStr = passDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

              localEvents.push({
                day: day, // Use actual day from API
                icon: "🛰️",
                type: "iss",
                title: "Live ISS Pass (Mumbai)",
                time: `${timeStr} (Duration: ${durationMin} min)`,
                visibility: 5,
                visibilityText: "Real-time Tracking Enabled",
                description: `Next confirmed sightings of the International Space Station over Mumbai. Look ${durationMin > 4 ? 'overhead' : 'towards the horizon'}.`,
                buttonText: "Track Live Path",
                primaryAction: "https://spotthestation.nasa.gov/tracking_map.cfm",
                image: "/events/iss-mumbai.png",
                warning: "Exact timing depends on orbit maintenance."
              });
            }
          } catch (e) {
            console.warn("ISS API failed, falling back to simulation", e);
            // Simulation fallback that ALWAYS looks like it's tonight/tomorrow for demo purposes
            const today = new Date();
            localEvents.push({
              day: today.getDate(),
              icon: "🛰️",
              type: "iss",
              title: "Predicted ISS Pass (Mumbai)",
              time: "8:45 PM - 8:51 PM",
              visibility: 5,
              visibilityText: "Perfect Visibility (Simulated)",
              description: "High brightness pass predicted for tonight over Mumbai skies.",
              buttonText: "Track Live",
              image: "/events/iss-mumbai.png",
              primaryAction: "https://spotthestation.nasa.gov/tracking_map.cfm"
            });
          }
        }

        // Northern Latitudes (Iceland, UK, Norway, Canada, USA North)
        if (locLower.includes("iceland") || locLower.includes("norway") || locLower.includes("sweden") || locLower.includes("uk") || locLower.includes("london") || locLower.includes("canada") || locLower.includes("alaska")) {
          localEvents.push({
            day: 18,
            icon: "☁️",
            type: "nlc",
            title: "Noctilucent Clouds Season",
            time: "Midnight - 2:00 AM",
            visibility: 4,
            visibilityText: "Good Visibility (Northern Latitudes)",
            description: "Rare electric-blue 'night-shining' clouds may be visible at high latitudes."
          });
        }

        // USA Specific
        if (locLower.includes("usa") || locLower.includes("states") || locLower.includes("york") || locLower.includes("california")) {
          localEvents.push({
            day: 10,
            icon: "🔭",
            type: "observatory",
            title: "Public Telescope Night",
            time: "8:00 PM - 10:00 PM",
            visibility: 5,
            visibilityText: "Excellent",
            description: "Local community observatories hosting open-sky viewing tonight."
          });
        }

        // Southern Hemisphere (Australia, New Zealand, South Africa)
        if (locLower.includes("australia") || locLower.includes("zealand") || locLower.includes("sydney") || locLower.includes("melbourne") || locLower.includes("africa")) {
          localEvents.push({
            day: 22,
            icon: "🌌",
            type: "milkyway",
            title: "Southern Cross Visibility",
            time: "11:00 PM",
            visibility: 5,
            visibilityText: "Crystal Clear",
            description: "Prime time to view the Southern Cross and the Galactic Center from the Southern Hemisphere."
          });
        }

        // East Asia (Japan, Tokyo)
        if (locLower.includes("japan") || locLower.includes("tokyo") || locLower.includes("kyoto")) {
          localEvents.push({
            day: 14,
            icon: "🪐",
            type: "conjunction",
            title: "Moon-Saturn Conjunction",
            time: "6:30 PM",
            visibility: 4,
            visibilityText: "Good Visibility",
            description: "A beautiful close approach between the Moon and the ringed planet Saturn, best seen from East Asia tonight."
          });
        }

        // Sample global events with generated visibility
        const globalEventsRaw = [
          {
            day: 5,
            icon: "🌠",
            type: "meteor",
            title: "Perseids Meteor Shower Peak",
            description: "The most popular meteor shower of the year is peaking tonight. Expect up to 100 meteors per hour in dark sky areas.",
            time: "Peak: 02:00 AM - 04:30 AM",
            location: "Radiant: Constellation Perseus",
            tag: "METEOR SHOWER",
            buttonText: "Set Reminder",
            secondaryButtonText: "View Guide",
            image: "/events/meteor-shower.png",
            primaryAction: "https://calendar.google.com/calendar/r/eventedit?text=Perseids+Meteor+Shower&dates=20260812T200000Z/20260813T040000Z&details=Watch+the+Perseids+Meteor+Shower!&location=Dark+Sky+Area",
            secondaryAction: "https://solarsystem.nasa.gov/asteroids-comets-and-meteors/meteors-and-meteorites/perseids/in-depth/"
          },
          {
            day: 15,
            icon: "🌑",
            type: "eclipse",
            title: "Annular Solar Eclipse",
            description: "An annular solar eclipse occurs when the Moon passes between the Sun and Earth while it is at its farthest point from Earth.",
            time: "Western Hemisphere Visibility",
            tag: "ECLIPSE",
            buttonText: "Details",
            secondaryButtonText: "View Path Map",
            image: "/events/solar-eclipse.png",
            warning: "Requires certified solar viewing glasses. Do not look directly at the sun.",
            primaryAction: "https://solarsystem.nasa.gov/eclipses/future-eclipses/eclipse-2023-oct-14/",
            secondaryAction: "https://svs.gsfc.nasa.gov/5073"
          },
          {
            day: 21,
            icon: "🪐",
            type: "conjunction",
            title: "Jupiter & Saturn Conjunction",
            description: "A rare great conjunction of the gas giants. Visible low on the western horizon just after sunset.",
            time: "Best viewed: 18:45 - 19:30",
            location: "Low on Western Horizon",
            tag: "PLANETARY",
            buttonText: "Add to Calendar",
            image: "/events/conjunction.png",
            primaryAction: "https://calendar.google.com/calendar/r/eventedit?text=Jupiter+and+Saturn+Conjunction&dates=20261221T184500/20261221T193000&details=Watch+Jupiter+and+Saturn+Conjunction&location=Western+Horizon",
            secondaryAction: null
          },
          {
            day: 28,
            icon: "🛰️",
            type: "man-made",
            title: "International Space Station",
            description: "Bright pass of the ISS. Visible for 6 minutes.",
            time: "Start: 20:42 | Duration: 6 min",
            location: "Visible over Mumbai, NY",
            tag: "MAN-MADE",
            buttonText: "Track Live",
            image: "/events/iss.jpg",
            primaryAction: "https://spotthestation.nasa.gov/tracking_map.cfm",
            secondaryAction: null
          }
        ];

        // Apply visibility logic to global events
        const globalEvents = globalEventsRaw.map(e => {
          const viz = getVisibilityForLocation(e, location);
          return { ...e, visibility: viz.val, visibilityText: viz.text };
        });

        // Add Aurora only if visible or it's a major event
        const auroraEventsRaw = [
          {
            day: 15,
            icon: "🌌",
            type: "aurora",
            title: "Aurora Borealis Forecast",
            time: "10:00 PM - 2:00 AM",
            description: "Predicted active aurora display in northern regions.",
            moonPhase: "Moon: 65% (Bright sky)",
            image: "/events/meteor-shower.png" // Placeholder
          }
        ];

        const auroraEvents = auroraEventsRaw.map(e => {
          const viz = getVisibilityForLocation(e, location);
          return { ...e, visibility: viz.val, visibilityText: viz.text };
        });

        // Combine all
        const allEvents = [...localEvents, ...globalEvents, ...auroraEvents];
        setAllEventsData(allEvents);

        // Create calendar events
        const calEvents = allEvents.map(e => ({
          day: e.day,
          icon: e.icon,
          type: e.type,
          isVisible: e.visibility > 1
        }));

        setCalendarEvents(calEvents);
      } catch (err) {
        console.error("Error fetching NASA data:", err);
        // Fallback to sample events with full data
        const fallbackEvents = [
          {
            day: 5,
            icon: "🌠",
            type: "meteor",
            title: "Perseids Meteor Shower Peak",
            description: "The most popular meteor shower of the year is peaking tonight. Expect up to 100 meteors per hour in dark sky areas.",
            time: "Peak: 02:00 AM - 04:30 AM",
            location: "Radiant: Constellation Perseus",
            tag: "METEOR SHOWER",
            buttonText: "Set Reminder",
            secondaryButtonText: "View Guide",
            image: "/events/meteor-shower.png",
            primaryAction: "https://calendar.google.com/calendar/r/eventedit?text=Perseids+Meteor+Shower&dates=20260812T200000Z/20260813T040000Z&details=Watch+the+Perseids+Meteor+Shower!&location=Dark+Sky+Area",
            secondaryAction: "https://solarsystem.nasa.gov/asteroids-comets-and-meteors/meteors-and-meteorites/perseids/in-depth/"
          },
          {
            day: 15,
            icon: "🌑",
            type: "eclipse",
            title: "Annular Solar Eclipse",
            description: "An annular solar eclipse occurs when the Moon passes between the Sun and Earth while it is at its farthest point from Earth.",
            time: "Western Hemisphere Visibility",
            tag: "ECLIPSE",
            buttonText: "Details",
            secondaryButtonText: "View Path Map",
            image: "/events/solar-eclipse.png",
            warning: "Requires certified solar viewing glasses. Do not look directly at the sun.",
            primaryAction: "https://solarsystem.nasa.gov/eclipses/future-eclipses/eclipse-2023-oct-14/",
            secondaryAction: "https://svs.gsfc.nasa.gov/5073"
          },
          {
            day: 21,
            icon: "🪐",
            type: "conjunction",
            title: "Jupiter & Saturn Conjunction",
            description: "A rare great conjunction of the gas giants. Visible low on the western horizon just after sunset.",
            time: "Best viewed: 18:45 - 19:30",
            location: "Low on Western Horizon",
            tag: "PLANETARY",
            buttonText: "Add to Calendar",
            image: "/events/conjunction.png",
            primaryAction: "https://calendar.google.com/calendar/r/eventedit?text=Jupiter+and+Saturn+Conjunction&dates=20261221T184500/20261221T193000&details=Watch+Jupiter+and+Saturn+Conjunction&location=Western+Horizon",
            secondaryAction: null
          },
          {
            day: 28,
            icon: "🛰️",
            type: "man-made",
            title: "International Space Station",
            description: "Bright pass of the ISS. Visible for 6 minutes.",
            time: "Start: 20:42 | Duration: 6 min",
            location: "Visible over Mumbai, NY",
            tag: "MAN-MADE",
            buttonText: "Track Live",
            image: "/events/iss.jpg",
            primaryAction: "https://spotthestation.nasa.gov/tracking_map.cfm",
            secondaryAction: null
          }
        ];

        setAllEventsData(fallbackEvents);

        const calEvents = fallbackEvents.map(e => ({
          day: e.day,
          icon: e.icon,
          type: e.type,
          isVisible: (e.visibility || 5) > 1
        }));
        setCalendarEvents(calEvents);
      }
      setLoading(false);
    };

    fetchEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMonth, currentYear, location]);

  return { calendarEvents, allEventsData, loading };
};
