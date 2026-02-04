// Upcoming missions for 2026
export const upcomingMissions2026 = [
    {
        name: "Artemis III",
        launchDate: "September 2026",
        agency: "NASA",
        description: "First crewed Moon landing since Apollo 17 (1972). Will land near the lunar south pole to search for water ice. First woman and person of color to walk on the Moon.",
        destination: "Moon (South Pole)",
        type: "Crewed Landing",
        status: "In Development"
    },
    {
        name: "Europa Clipper",
        launchDate: "October 2024 (Arrival 2030)",
        agency: "NASA",
        description: "Currently en route to Jupiter's moon Europa. Will conduct 49 flybys to study the subsurface ocean and assess habitability. Largest planetary mission spacecraft ever built by NASA.",
        destination: "Jupiter's Moon Europa",
        type: "Orbiter",
        status: "In Transit"
    },
    {
        name: "Lunar Gateway - First Elements",
        launchDate: "Mid 2026",
        agency: "NASA/ESA/CSA/JAXA",
        description: "Assembly of the first modules of the Lunar Gateway space station in lunar orbit. Will serve as staging point for Artemis missions and deep space exploration.",
        destination: "Lunar Orbit",
        type: "Space Station",
        status: "In Development"
    },
    {
        name: "Mars Sample Return - Earth Return Orbiter",
        launchDate: "Late 2026",
        agency: "NASA/ESA",
        description: "Part of ambitious campaign to bring Mars samples to Earth. Will rendezvous with samples collected by Perseverance rover and return them to Earth by 2031.",
        destination: "Mars",
        type: "Sample Return",
        status: "In Development"
    },
    {
        name: "Starship Moon Mission (dearMoon)",
        launchDate: "TBD 2026",
        agency: "SpaceX",
        description: "First private crewed mission around the Moon. Japanese billionaire Yusaku Maezawa and crew of artists will fly on Starship for week-long lunar flyby.",
        destination: "Moon Flyby",
        type: "Crewed Tourism",
        status: "Planned"
    },
    {
        name: "VIPER (Volatiles Investigating Polar Exploration Rover)",
        launchDate: "November 2024 (Landing 2025)",
        agency: "NASA",
        description: "Mobile robot to explore Moon's south pole. Will map water ice deposits to help plan future crewed missions and lunar bases.",
        destination: "Moon (South Pole)",
        type: "Rover",
        status: "In Transit"
    },
    {
        name: "Dragonfly",
        launchDate: "July 2028 (Arrival 2034)",
        agency: "NASA",
        description: "Rotorcraft lander that will explore Saturn's moon Titan. Will fly to multiple locations to study prebiotic chemistry and search for signs of life.",
        destination: "Saturn's Moon Titan",
        type: "Rotorcraft",
        status: "In Development"
    },
    {
        name: "JUICE (Jupiter Icy Moons Explorer)",
        launchDate: "April 2023 (Arrival 2031)",
        agency: "ESA",
        description: "Currently en route to Jupiter. Will study Ganymede, Callisto, and Europa - three potentially habitable icy moons.",
        destination: "Jupiter System",
        type: "Orbiter",
        status: "In Transit"
    },
    {
        name: "Psyche",
        launchDate: "October 2023 (Arrival 2029)",
        agency: "NASA",
        description: "Currently traveling to metal-rich asteroid Psyche. Will study a unique world that may be the exposed core of an early planet.",
        destination: "Asteroid Psyche",
        type: "Orbiter",
        status: "In Transit"
    },
    {
        name: "Commercial Lunar Payload Services (CLPS)",
        launchDate: "Multiple 2026",
        agency: "NASA/Commercial",
        description: "Series of commercial lander missions delivering scientific instruments to the Moon. Part of NASA's strategy to establish lunar economy.",
        destination: "Moon",
        type: "Lander",
        status: "Ongoing Program"
    }
];

export const getStatusColor = (status) => {
    switch (status) {
        case "In Development":
            return "#00d9ff";
        case "In Transit":
            return "#00ff88";
        case "Planned":
            return "#ffa500";
        case "Ongoing Program":
            return "#9370db";
        default:
            return "#888";
    }
};
