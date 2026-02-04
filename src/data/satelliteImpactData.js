export const satelliteImpactData = {
    "atmospheric-sounding": {
        id: "SA-1",
        title: "Atmospheric Sounding",
        subtitle: "Mapping the vertical structure of the atmosphere to predict global weather patterns.",
        image: "/sounding-bg.png",
        description: "Vertical temperature profile at 0.01 hPa resolution",
        color: "#00d9ff",
        explainerBlocks: [
            {
                title: "Thermal Mapping",
                text: "Measures microwave and infrared emissions from atmospheric oxygen and water vapor molecules to determine temperature levels.",
                icon: "temp"
            },
            {
                title: "Stability Analysis",
                text: "Identifies temperature inversions and lapse rates, which are critical for predicting thunderstorm development and air quality.",
                icon: "cloud"
            },
            {
                title: "Climate Trending",
                text: "Long-term data collection helps track shifts in the troposphere and stratosphere, providing evidence for global warming patterns.",
                icon: "globe"
            }
        ],
        visualFlow: [
            { label: "Radiometer Sat", description: "SA-1 Polar Orbit" },
            { label: "Microwave Emission", description: "Atmo. Absorption" },
            { label: "Layer Profile", description: "Pressure vs Temp" },
            { label: "Storm Forecast", description: "Frontal Detection" }
        ],
        fromSpaceToEarth: [
            { step: "1", title: "Photon Capture", desc: "Sensors capture raw infrared radiation emitted from Earth's atmosphere." },
            { step: "2", title: "Spectral Analysis", desc: "Radiation is broken down into specific wavelengths to identify gases." },
            { step: "3", title: "Model Injection", desc: "Data is fed into Supercomputers to refine GFS and ECMWF models." }
        ],
        quickFacts: [
            { label: "Orbit Type", value: "Sun-Synchronous" },
            { label: "Resolution", value: "0.01 hPa / 12km" },
            { label: "Update Frequency", value: "Every 15 Minutes" },
            { label: "Primary Application", value: "Numerical Weather Prediction" }
        ]
    },
    "precipitation-mapping": {
        id: "PM-5",
        title: "Precipitation Mapping",
        subtitle: "Tracking global water cycles using advanced microwave radiometry.",
        image: "https://images.unsplash.com/photo-1517483000871-1dbf64a6e1c6?auto=format&fit=crop&q=80&w=800",
        description: "Global rainfall estimation using microwave radiometry",
        color: "#4facfe",
        explainerBlocks: [
            {
                title: "Rainfall Intensity",
                text: "Quantifies the amount of liquid water in the atmosphere to estimate surface rainfall rates.",
                icon: "rain"
            },
            {
                title: "Snowfall Detection",
                text: "Distinguishes between liquid and frozen precipitation layers in cold-front systems.",
                icon: "snow"
            },
            {
                title: "Hydrological Cycle",
                text: "Provides essential data for flood risk management and reservoir planning globally.",
                icon: "water"
            }
        ],
        visualFlow: [
            { label: "GPM Satellite", description: "Microwave Imager" },
            { label: "Surface Scatter", description: "Ocean & Land Signal" },
            { label: "Retrieval Algo", description: "IMERG Processing" },
            { label: "Flood Warning", description: "Civic Response" }
        ],
        fromSpaceToEarth: [
            { step: "1", title: "Microwave Scan", desc: "Passive sensors detect microwave energy scattered by raindrops." },
            { step: "2", title: "Dual-Freq Radar", desc: "Active radar pulses provide a 3D view of the storm structure." },
            { step: "3", title: "Gridded Map", desc: "Data is combined into a global 0.1° resolution rain map." }
        ],
        quickFacts: [
            { label: "Orbit Type", value: "Non-Sun-Synchronous" },
            { label: "Resolution", value: "10km Spatial" },
            { label: "Update Frequency", value: "30-Minute Latency" },
            { label: "Primary Application", value: "Disaster Management" }
        ]
    },
    "oceanic-heat-flux": {
        id: "HF-11",
        title: "Oceanic Heat Flux",
        subtitle: "Monitoring the planet's heat engine through sea surface temperature dynamics.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
        description: "Sea surface temperature thermal monitoring",
        color: "#00f2fe",
        explainerBlocks: [
            {
                title: "Thermal Energy",
                text: "Measures the net energy exchange between the ocean surface and the atmosphere.",
                icon: "thermometer"
            },
            {
                title: "El Niño Tracking",
                text: "Monitors Pacific temperature anomalies to predict global climatic shifts like ENSO.",
                icon: "waves"
            },
            {
                title: "Marine Ecology",
                text: "Helps identify coral bleaching risks and shifts in plankton distribution.",
                icon: "fish"
            }
        ],
        visualFlow: [
            { label: "Sentinel-3", description: "SLSTR Instrument" },
            { label: "SST Anomaly", description: "Heat Content Analysis" },
            { label: "Current Flow", description: "Gulf Stream Velocity" },
            { label: "Hurricane Fuel", description: "Intensity Forecast" }
        ],
        fromSpaceToEarth: [
            { step: "1", title: "SST Measurement", desc: "Satellite measures the 'skin' temperature of the ocean top layer." },
            { step: "2", title: "Flux Calculation", desc: "Algorithms combine SST with wind speed to calculate heat transfer." },
            { step: "3", title: "Climate Prediction", desc: "Data informs seasonal forecasts and hurricane intensity models." }
        ],
        quickFacts: [
            { label: "Orbit Type", value: "Polar LEO" },
            { label: "Resolution", value: "1km Spatial" },
            { label: "Update Frequency", value: "Daily Global Map" },
            { label: "Primary Application", value: "Ocean Dynamics" }
        ]
    },
    "vegetation-index": {
        id: "VI-2",
        title: "Vegetation Index",
        subtitle: "Analyzing Earth's biomass health from orbit using multi-spectral imaging.",
        image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=800",
        description: "NDVI analysis for biomass health assessment",
        color: "#00ff88",
        explainerBlocks: [
            {
                title: "Photosynthetic Activity",
                text: "Measures the difference between near-infrared and visible light reflection to assess plant health.",
                icon: "leaf"
            },
            {
                title: "Deforestation Watch",
                text: "Detects rapid changes in forest cover to alert agencies of illegal logging activities.",
                icon: "tree"
            },
            {
                title: "Crop Monitoring",
                text: "Provides farmers with insights on crop stress, helping optimize irrigation and fertilizer.",
                icon: "sprout"
            }
        ],
        visualFlow: [
            { label: "Landsat / Sentinel", description: "MSI Instrument" },
            { label: "Red/NIR Ratio", description: "NDVI Computation" },
            { label: "Biomass Density", description: "GPP Modeling" },
            { label: "Drought Alert", description: "Agricultural Safety" }
        ],
        fromSpaceToEarth: [
            { step: "1", title: "Reflectance Capture", desc: "Satellite captures solar light reflected by the vegetation canopy." },
            { step: "2", title: "Atmospheric Corr.", desc: "Removing haze and cloud shadows to get true surface values." },
            { step: "3", title: "Zonal Statistics", desc: "Averaging data over farm plots or forest districts for reports." }
        ],
        quickFacts: [
            { label: "Orbit Type", value: "Sun-Synchronous" },
            { label: "Resolution", value: "10m - 30m" },
            { label: "Update Frequency", value: "5-10 Days" },
            { label: "Primary Application", value: "Agriculture & Forestry" }
        ]
    },
    "cloud-microphysics": {
        id: "CM-10",
        title: "Cloud Microphysics",
        subtitle: "Understanding the building blocks of clouds and their role in Earth's radiation budget.",
        image: "https://images.unsplash.com/photo-1534088568595-a066f710b721?auto=format&fit=crop&q=80&w=800",
        description: "Aerosol and droplet size distribution mapping",
        color: "#6dd5ed",
        explainerBlocks: [
            {
                title: "Droplet Size",
                text: "Determines whether a cloud will produce rain or remain as a stable mist.",
                icon: "droplet"
            },
            {
                title: "Aerosol Interaction",
                text: "Studies how smoke, dust, and pollution act as seeds for cloud formation.",
                icon: "wind"
            },
            {
                title: "Albedo Feedback",
                text: "Analyzes how different cloud types reflect sunlight back into space.",
                icon: "sun"
            }
        ],
        visualFlow: [
            { label: "CloudSat", description: "Cloud Profiling Radar" },
            { label: "Backscatter", description: "Droplets vs Crystals" },
            { label: "Optical Depth", description: "Transparency Index" },
            { label: "Climate Model", description: "Radiative Forcing" }
        ],
        fromSpaceToEarth: [
            { step: "1", title: "Lidar Pulse", desc: "Satellite fires light pulses to 'see' through thin cloud layers." },
            { step: "2", title: "Phase Detection", desc: "Determining if cloud tops are water, ice, or supercooled liquid." },
            { step: "3", title: "Aerosol Mapping", desc: "Tracking plumes of dust or ash that influence weather." }
        ],
        quickFacts: [
            { label: "Orbit Type", value: "A-Train Constellation" },
            { label: "Resolution", value: "Vertical Profiling" },
            { label: "Update Frequency", value: "Real-time Telemetry" },
            { label: "Primary Application", value: "Cloud-Climate Feedback" }
        ]
    },
    "surface-albedo": {
        id: "AL-3",
        title: "Surface Albedo",
        subtitle: "Measuring Earth's reflectivity and its critical impact on the global energy balance.",
        image: "https://images.unsplash.com/photo-1516939884455-1445c8652f83?auto=format&fit=crop&q=80&w=800",
        description: "Solar reflectance and energy absorption tracking",
        color: "#ffffff",
        explainerBlocks: [
            {
                title: "Ice-Albedo Feedback",
                text: "Monitors melting ice caps, which decreases reflectivity and accelerates warming.",
                icon: "snowflake"
            },
            {
                title: "Urban Heat Islands",
                text: "Identifies areas where dark pavement absorbs heat, increasing local temperatures.",
                icon: "building"
            },
            {
                title: "Desert Expansion",
                text: "Tracks changes in desert boundaries and their role in reflecting solar energy.",
                icon: "sun-bright"
            }
        ],
        visualFlow: [
            { label: "Terra Satellite", description: "MODIS Instrument" },
            { label: "Bidirectional Refl.", description: "BRDF Processing" },
            { label: "Surface Fraction", description: "Land Cover Class" },
            { label: "Net Radiation", description: "Energy Budget Calculation" }
        ],
        fromSpaceToEarth: [
            { step: "1", title: "Multi-Angle Scan", desc: "Satellite looks at the same spot from different angles to understand texture." },
            { step: "2", title: "Spectral Integr.", desc: "Combining all wavelengths to calculate the total broadband albedo." },
            { step: "3", title: "Climate Forcing", desc: "Feeding data into models to calculate Earth's energy imbalance." }
        ],
        quickFacts: [
            { label: "Orbit Type", value: "Sun-Synchronous" },
            { label: "Resolution", value: "500m Gridded" },
            { label: "Update Frequency", value: "8-Day Composites" },
            { label: "Primary Application", value: "Earth Radiation Budget" }
        ]
    }
};
