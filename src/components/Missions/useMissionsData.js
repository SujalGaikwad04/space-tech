import { useState, useEffect } from "react";

const API = "https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=10";

export const useMissionsData = () => {
    const [missions, setMissions] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchMissions = async () => {
            setLoading(true);
            try {
                const response = await fetch(API);
                const data = await response.json();

                // Get the upcoming missions
                const upcomingMissions = data.results || [];
                setMissions(upcomingMissions);
            } catch (err) {
                console.error("Error fetching missions data:", err);
                // Fallback to sample data
                const fallbackMissions = [
                    {
                        id: 1,
                        name: "ISS Overhead Pass",
                        net: new Date().toISOString(),
                        mission: { type: "ISS" },
                        status: { name: "Go" }
                    },
                    {
                        id: 2,
                        name: "Hubble Transit",
                        net: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
                        mission: { type: "Telescope" },
                        status: { name: "TBD" }
                    },
                    {
                        id: 3,
                        name: "Mars Observation",
                        net: new Date(Date.now() + 1036800000).toISOString(), // 12 days
                        mission: { type: "Planetary" },
                        status: { name: "TBD" }
                    }
                ];
                setMissions(fallbackMissions);
            }
            setLoading(false);
        };

        fetchMissions();
    }, []);

    return { missions, loading };
};
