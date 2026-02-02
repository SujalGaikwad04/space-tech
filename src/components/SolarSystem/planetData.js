export const sunInfo = {
    name: "The Sun",
    description: "The Sun is the star at the center of our Solar System. It is a nearly perfect sphere of hot plasma, heated to incandescence by nuclear fusion reactions in its core.",
    facts: {
        type: "G-type Main-Sequence Star (Yellow Dwarf)",
        diameter: "1,391,000 km",
        mass: "1.989 × 10³⁰ kg (333,000 Earths)",
        temperature: "5,500°C (surface), 15,000,000°C (core)",
        age: "4.6 billion years",
        composition: "73% Hydrogen, 25% Helium, 2% Other",
        luminosity: "3.828 × 10²⁶ watts",
        rotationPeriod: "25-35 days (varies by latitude)"
    },
    funFacts: [
        "The Sun accounts for 99.86% of the mass in the Solar System",
        "Light from the Sun takes 8 minutes and 20 seconds to reach Earth",
        "The Sun's core produces 620 million metric tons of hydrogen fusion per second",
        "In about 5 billion years, the Sun will become a red giant"
    ],
    lifeExpectancy: {
        possible: false,
        rating: "Impossible",
        reasons: [
            "Extreme temperatures: 5,500°C surface, 15 million°C core",
            "No solid surface - entirely plasma",
            "Intense radiation and solar wind",
            "Constant nuclear fusion reactions",
            "Gravitational forces would crush any matter"
        ],
        conditions: {
            temperature: "5,500°C to 15,000,000°C",
            atmosphere: "None (plasma state)",
            radiation: "Extreme - deadly to all known life",
            water: "None - too hot for molecules",
            gravity: "28 times Earth's gravity"
        },
    }
};

export const solarSystemInfo = {
    title: "Our Solar System",
    description: "The Solar System is the gravitationally bound system of the Sun and the objects that orbit it. It formed 4.6 billion years ago from the gravitational collapse of a giant interstellar molecular cloud.",
    facts: [
        "Contains 8 planets, 5 dwarf planets, and countless asteroids",
        "The Sun contains 99.86% of the system's mass",
        "Extends from the Sun to the Kuiper Belt and beyond",
        "Takes about 230 million years to orbit the Milky Way"
    ]
};

export const planetsData = [
    {
        id: "mercury",
        name: "Mercury",
        color: "#8C7853",
        size: 0.4,
        distance: 4,
        orbitSpeed: 0.04,
        rotationSpeed: 0.004,
        description: "The smallest planet in our solar system and closest to the Sun. Mercury is only slightly larger than Earth's Moon.",
        facts: {
            diameter: "4,879 km",
            mass: "3.285 × 10²³ kg",
            distanceFromSun: "57.9 million km",
            orbitalPeriod: "88 Earth days",
            dayLength: "59 Earth days",
            temperature: "-173°C to 427°C",
            moons: "0"
        },
        satellites: [],
        lifeExpectancy: {
            possible: false,
            rating: "Extremely Hostile",
            reasons: [
                "Extreme temperature swings: -173°C at night to 427°C during day",
                "No atmosphere to retain heat or protect from radiation",
                "Intense solar radiation - closest to the Sun",
                "No water or organic compounds detected",
                "Surface bombarded by micrometeorites"
            ],
            conditions: {
                temperature: "-173°C to 427°C",
                atmosphere: "Virtually none (exosphere only)",
                radiation: "Extreme solar radiation",
                water: "None detected",
                gravity: "38% of Earth's"
            },
            summary: "Mercury's proximity to the Sun creates extreme temperature variations and intense radiation. The lack of atmosphere means no protection from space hazards, making life impossible."
        },
        texture: {
            base: "#8C7853",
            crater: "#6B5D47"
        }
    },
    {
        id: "venus",
        name: "Venus",
        color: "#FFC649",
        size: 0.9,
        distance: 7,
        orbitSpeed: 0.015,
        rotationSpeed: -0.002,
        description: "Venus is the second planet from the Sun and Earth's closest planetary neighbor. It's the hottest planet in our solar system.",
        facts: {
            diameter: "12,104 km",
            mass: "4.867 × 10²⁴ kg",
            distanceFromSun: "108.2 million km",
            orbitalPeriod: "225 Earth days",
            dayLength: "243 Earth days",
            temperature: "462°C (average)",
            moons: "0"
        },
        satellites: [],
        lifeExpectancy: {
            possible: false,
            rating: "Extremely Hostile",
            reasons: [
                "Surface temperature of 462°C - hot enough to melt lead",
                "Crushing atmospheric pressure (92 times Earth's)",
                "Thick clouds of sulfuric acid",
                "Runaway greenhouse effect",
                "No liquid water - all evaporated billions of years ago"
            ],
            conditions: {
                temperature: "462°C (average)",
                atmosphere: "96.5% Carbon Dioxide, 3.5% Nitrogen",
                radiation: "Heavy (thick atmosphere blocks UV but traps heat)",
                water: "None - all evaporated",
                gravity: "90% of Earth's"
            },
            summary: "Venus is a hellish world where the runaway greenhouse effect has created extreme heat and crushing pressure, making it impossible for life as we know it."
        },
        texture: {
            base: "#FFC649",
            clouds: "#E8B048"
        }
    },
    {
        id: "earth",
        name: "Earth",
        color: "#4A90E2",
        size: 1,
        distance: 10,
        orbitSpeed: 0.01,
        rotationSpeed: 0.02,
        description: "Our home planet is the third planet from the Sun, and the only place we know of so far that's inhabited by living things.",
        facts: {
            diameter: "12,742 km",
            mass: "5.972 × 10²⁴ kg",
            distanceFromSun: "149.6 million km",
            orbitalPeriod: "365.25 days",
            dayLength: "24 hours",
            temperature: "-88°C to 58°C",
            moons: "1"
        },
        satellites: [
            {
                name: "Moon",
                discovered: "Known since ancient times",
                diameter: "3,474 km",
                orbitalPeriod: "27.3 days",
                description: "Earth's only natural satellite and the fifth largest moon in the Solar System."
            }
        ],
        lifeExpectancy: {
            possible: true,
            rating: "Ideal - Only Known Habitable Planet",
            reasons: [
                "Liquid water covers 71% of surface",
                "Oxygen-rich atmosphere (21% O₂)",
                "Moderate temperatures suitable for life",
                "Magnetic field protects from solar radiation",
                "Diverse ecosystems support billions of species"
            ],
            conditions: {
                temperature: "-89.2°C to 56.7°C (average 15°C)",
                atmosphere: "78% Nitrogen, 21% Oxygen, 1% Other",
                radiation: "Protected by magnetic field and atmosphere",
                water: "Abundant liquid water",
                gravity: "1.0 G (Baseline)"
            },
            summary: "Earth is the only known planet to harbor life, thanks to its perfect balance of temperature, atmosphere, and liquid water."
        },
        texture: {
            base: "#4A90E2",
            land: "#228B22",
            clouds: "#FFFFFF"
        }
    },
    {
        id: "mars",
        name: "Mars",
        color: "#E27B58",
        size: 0.5,
        distance: 15,
        orbitSpeed: 0.008,
        rotationSpeed: 0.018,
        description: "Mars is the fourth planet from the Sun – a dusty, cold, desert world with a very thin atmosphere. It's known as the Red Planet.",
        facts: {
            diameter: "6,779 km",
            mass: "6.39 × 10²³ kg",
            distanceFromSun: "227.9 million km",
            orbitalPeriod: "687 Earth days",
            dayLength: "24.6 hours",
            temperature: "-87°C to -5°C",
            moons: "2"
        },
        satellites: [
            {
                name: "Phobos",
                discovered: "1877 by Asaph Hall",
                diameter: "22.4 km",
                orbitalPeriod: "7.7 hours",
                description: "The larger and closer of Mars's two moons, named after the Greek god of fear."
            },
            {
                name: "Deimos",
                discovered: "1877 by Asaph Hall",
                diameter: "12.4 km",
                orbitalPeriod: "30.3 hours",
                description: "The smaller and outer moon of Mars, named after the Greek god of terror."
            }
        ],
        lifeExpectancy: {
            possible: false,
            rating: "Hostile (Potential for future colonization)",
            reasons: [
                "Extremely thin atmosphere (1% of Earth's)",
                "Very cold average temperatures (-63°C)",
                "High radiation levels due to lack of magnetic field",
                "No liquid water on surface (only ice)",
                "Frequent global dust storms"
            ],
            conditions: {
                temperature: "-153°C to 20°C (average -63°C)",
                atmosphere: "95% Carbon Dioxide, 2.7% Nitrogen",
                radiation: "High (0.66 mSv per day)",
                water: "Surface ice and subsurface reserves only",
                gravity: "38% of Earth's"
            },
            summary: "While Mars shows evidence of ancient water, its current state is a dry, cold desert with thin air and high radiation, making it inhospitable for unprotected life."
        },
        texture: {
            base: "#E27B58",
            dark: "#A0522D"
        }
    },
    {
        id: "asteroid-belt",
        name: "Main Asteroid Belt",
        color: "#8B7355",
        size: 0.2,
        distance: 18.5,
        isAsteroidBelt: true,
        description: "The asteroid belt is a torus-shaped region in the Solar System, located between the orbits of Mars and Jupiter. It contains millions of rocky bodies ranging from dust particles to dwarf planets.",
        facts: {
            location: "Between Mars and Jupiter",
            distance: "2.2 to 3.2 AU from Sun",
            totalMass: "3% of Moon's mass",
            largestObject: "Ceres (dwarf planet, 940 km)",
            numberOfAsteroids: "1-2 million (>1 km diameter)",
            composition: "Rocky and metallic",
            discovery: "First asteroid discovered 1801",
            spacing: "Very sparse, spacecraft pass safely"
        },
        notableAsteroids: [
            {
                name: "Ceres",
                diameter: "940 km",
                type: "Dwarf Planet",
                description: "The largest object in the asteroid belt, classified as a dwarf planet."
            },
            {
                name: "Vesta",
                diameter: "525 km",
                type: "Asteroid",
                description: "The brightest asteroid visible from Earth, with a large crater."
            },
            {
                name: "Pallas",
                diameter: "512 km",
                type: "Asteroid",
                description: "The third-largest asteroid, with an irregular shape."
            },
            {
                name: "Hygiea",
                diameter: "434 km",
                type: "Asteroid",
                description: "The fourth-largest asteroid, possibly a dwarf planet candidate."
            }
        ],
        lifeExpectancy: {
            possible: false,
            rating: "Impossible",
            reasons: [
                "No atmosphere to retain heat or protect from radiation",
                "Intense cosmic radiation exposure",
                "Extreme temperature fluctuations between shade and sun",
                "High risk of high-velocity collisions",
                "Gravitationally too weak to hold life-supporting conditions"
            ],
            conditions: {
                temperature: "-73°C to -103°C (average)",
                atmosphere: "None (vacuum)",
                radiation: "Extremely high cosmic rays",
                water: "Locked in ice within some asteroids",
                gravity: "Negligible (microgravity)"
            },
            summary: "The Asteroid Belt is a collection of airless, radiation-soaked rocks. The lack of air, liquid water, and extreme radiation make it an impossible environment for life."
        },
        texture: {
            base: "#8B7355",
            rock: "#A0826D"
        }
    },
    {
        id: "jupiter",
        name: "Jupiter",
        color: "#C88B3A",
        size: 2.5,
        distance: 22,
        orbitSpeed: 0.002,
        rotationSpeed: 0.04,
        description: "Jupiter is the fifth planet from the Sun and the largest in the Solar System. It's a gas giant with a mass more than two and a half times that of all the other planets combined.",
        facts: {
            diameter: "139,820 km",
            mass: "1.898 × 10²⁷ kg",
            distanceFromSun: "778.5 million km",
            orbitalPeriod: "11.9 Earth years",
            dayLength: "9.9 hours",
            temperature: "-108°C (average)",
            moons: "95+"
        },
        satellites: [
            {
                name: "Io",
                discovered: "1610 by Galileo Galilei",
                diameter: "3,643 km",
                orbitalPeriod: "1.8 days",
                description: "The most volcanically active body in the Solar System."
            },
            {
                name: "Europa",
                discovered: "1610 by Galileo Galilei",
                diameter: "3,122 km",
                orbitalPeriod: "3.6 days",
                description: "Has a subsurface ocean that may harbor life."
            },
            {
                name: "Ganymede",
                discovered: "1610 by Galileo Galilei",
                diameter: "5,268 km",
                orbitalPeriod: "7.2 days",
                description: "The largest moon in the Solar System, larger than Mercury."
            },
            {
                name: "Callisto",
                discovered: "1610 by Galileo Galilei",
                diameter: "4,821 km",
                orbitalPeriod: "16.7 days",
                description: "The most heavily cratered object in the Solar System."
            }
        ],
        lifeExpectancy: {
            possible: false,
            rating: "Impossible",
            reasons: [
                "No solid surface - mostly Hydrogen and Helium gas",
                "Crushing atmospheric pressure (millions of times Earth's)",
                "Intense radiation belts (deadly to any organic life)",
                "Extreme wind speeds reaching 600 km/h",
                "Freezing temperatures at visible cloud tops"
            ],
            conditions: {
                temperature: "-108°C (at cloud tops)",
                atmosphere: "90% Hydrogen, 10% Helium",
                radiation: "Extreme (10 million times Earth's)",
                water: "Traces of water vapor in cloud layers",
                gravity: "2.4 times Earth's"
            },
            summary: "Jupiter is a gas giant with no solid ground. The combination of intense radiation, crushing pressure, and freezing temperatures makes it impossible for life."
        },
        texture: {
            base: "#C88B3A",
            bands: "#D4A574",
            spot: "#CC6633"
        }
    },
    {
        id: "saturn",
        name: "Saturn",
        color: "#FAD5A5",
        size: 2.2,
        distance: 30,
        orbitSpeed: 0.0009,
        rotationSpeed: 0.038,
        description: "Saturn is the sixth planet from the Sun and the second largest in the Solar System. It's adorned with a dazzling system of icy rings.",
        facts: {
            diameter: "116,460 km",
            mass: "5.683 × 10²⁶ kg",
            distanceFromSun: "1.43 billion km",
            orbitalPeriod: "29.4 Earth years",
            dayLength: "10.7 hours",
            temperature: "-139°C (average)",
            moons: "146+"
        },
        satellites: [
            {
                name: "Titan",
                discovered: "1655 by Christiaan Huygens",
                diameter: "5,150 km",
                orbitalPeriod: "15.9 days",
                description: "The only moon with a dense atmosphere and liquid lakes on its surface."
            },
            {
                name: "Enceladus",
                discovered: "1789 by William Herschel",
                diameter: "504 km",
                orbitalPeriod: "1.4 days",
                description: "Shoots geysers of water ice into space from its south pole."
            },
            {
                name: "Rhea",
                discovered: "1672 by Giovanni Cassini",
                diameter: "1,527 km",
                orbitalPeriod: "4.5 days",
                description: "Saturn's second-largest moon with a heavily cratered surface."
            }
        ],
        lifeExpectancy: {
            possible: false,
            rating: "Impossible",
            reasons: [
                "No solid surface (Gas Giant)",
                "Extreme crushing pressure deep inside",
                "Intense cold reaching -178°C",
                "Atmosphere of Hydrogen and Helium",
                "Deadly radiation and extreme winds"
            ],
            conditions: {
                temperature: "-139°C (average at cloud tops)",
                atmosphere: "96% Hydrogen, 3% Helium",
                radiation: "High (though lower than Jupiter)",
                water: "Water-ice in cloud layers",
                gravity: "1.06 times Earth's"
            },
            summary: "Saturn is a gas giant with no solid ground. Its freezing temperatures, high pressure, and lack of breathable air make it impossible for life."
        },
        texture: {
            base: "#FAD5A5",
            bands: "#E8C89F"
        },
        hasRings: true
    },
    {
        id: "uranus",
        name: "Uranus",
        color: "#4FD0E7",
        size: 1.8,
        distance: 38,
        orbitSpeed: 0.0004,
        rotationSpeed: 0.03,
        description: "Uranus is the seventh planet from the Sun. It's an ice giant that rotates on its side, making it unique among the planets.",
        facts: {
            diameter: "50,724 km",
            mass: "8.681 × 10²⁵ kg",
            distanceFromSun: "2.87 billion km",
            orbitalPeriod: "84 Earth years",
            dayLength: "17.2 hours",
            temperature: "-197°C (average)",
            moons: "27+"
        },
        satellites: [
            {
                name: "Titania",
                discovered: "1787 by William Herschel",
                diameter: "1,578 km",
                orbitalPeriod: "8.7 days",
                description: "The largest moon of Uranus with a mix of ice and rock."
            },
            {
                name: "Oberon",
                discovered: "1787 by William Herschel",
                diameter: "1,523 km",
                orbitalPeriod: "13.5 days",
                description: "The second-largest and outermost major moon of Uranus."
            },
            {
                name: "Miranda",
                discovered: "1948 by Gerard Kuiper",
                diameter: "472 km",
                orbitalPeriod: "1.4 days",
                description: "Has one of the most extreme and varied topographies of any object in the Solar System."
            }
        ],
        lifeExpectancy: {
            possible: false,
            rating: "Impossible",
            reasons: [
                "Coldest planet in the solar system (-224°C)",
                "Extreme axial tilt (98 degrees) causes 21-year seasons",
                "Crushing pressure within the ice giant's mantle",
                "No solid surface - mostly ices and gas",
                "Atmosphere of Hydrogen, Helium, and Methane"
            ],
            conditions: {
                temperature: "-197°C (average)",
                atmosphere: "83% Hydrogen, 15% Helium, 2% Methane",
                radiation: "Low compared to Jupiter",
                water: "Abundant as high-pressure 'hot ice' deep inside",
                gravity: "89% of Earth's"
            },
            summary: "Uranus is an ice giant with extreme cold and no solid surface. Its vertical tilt and frozen atmosphere make it impossible for life."
        },
        texture: {
            base: "#4FD0E7",
            light: "#7FE5F0"
        }
    },
    {
        id: "neptune",
        name: "Neptune",
        color: "#4166F5",
        size: 1.7,
        distance: 45,
        orbitSpeed: 0.0001,
        rotationSpeed: 0.032,
        description: "Neptune is the eighth and farthest planet from the Sun. It's an ice giant with the strongest winds in the Solar System.",
        facts: {
            diameter: "49,244 km",
            mass: "1.024 × 10²⁶ kg",
            distanceFromSun: "4.5 billion km",
            orbitalPeriod: "164.8 Earth years",
            dayLength: "16.1 hours",
            temperature: "-201°C (average)",
            moons: "14+"
        },
        satellites: [
            {
                name: "Triton",
                discovered: "1846 by William Lassell",
                diameter: "2,707 km",
                orbitalPeriod: "5.9 days",
                description: "The only large moon with a retrograde orbit, likely a captured Kuiper Belt object."
            },
            {
                name: "Proteus",
                discovered: "1989 by Voyager 2",
                diameter: "420 km",
                orbitalPeriod: "1.1 days",
                description: "One of the darkest objects in the Solar System."
            }
        ],
        lifeExpectancy: {
            possible: false,
            rating: "Impossible",
            reasons: [
                "Strongest winds in the solar system (2,100 km/h)",
                "Extreme cold and distance from the Sun",
                "No solid surface - mostly volatile 'ices'",
                "Crushing gravitational pressure deep inside",
                "Frozen atmosphere with supersonic winds"
            ],
            conditions: {
                temperature: "-201°C (average)",
                atmosphere: "80% Hydrogen, 19% Helium, 1.5% Methane",
                radiation: "Low",
                water: "Exists as high-pressure ionic water deep inside",
                gravity: "1.14 times Earth's"
            },
            summary: "Neptune is a dark, cold world with supersonic winds and no solid ground. The combination of extreme wind, cold, and pressure makes life impossible."
        },
        texture: {
            base: "#4166F5",
            dark: "#2E4A9F"
        }
    },
    {
        id: "pluto",
        name: "Pluto",
        color: "#B8A89A",
        size: 0.3,
        distance: 52,
        orbitSpeed: 0.00007,
        rotationSpeed: 0.008,
        isDwarfPlanet: true,
        description: "Pluto is a dwarf planet in the Kuiper Belt. Once considered the ninth planet, it was reclassified in 2006. Despite its small size, Pluto has a complex geology and five known moons.",
        facts: {
            diameter: "2,377 km",
            mass: "1.303 × 10²² kg",
            distanceFromSun: "5.9 billion km",
            orbitalPeriod: "248 Earth years",
            dayLength: "6.4 Earth days",
            temperature: "-223°C (average)",
            moons: "5",
            classification: "Dwarf Planet"
        },
        satellites: [
            {
                name: "Charon",
                discovered: "1978 by James Christy",
                diameter: "1,212 km",
                orbitalPeriod: "6.4 days",
                description: "Pluto's largest moon, so large that Pluto and Charon orbit a common center of mass, making them a binary system."
            },
            {
                name: "Nix",
                discovered: "2005 by Hubble Space Telescope",
                diameter: "50 km",
                orbitalPeriod: "24.9 days",
                description: "One of Pluto's smaller moons, named after the Greek goddess of darkness."
            },
            {
                name: "Hydra",
                discovered: "2005 by Hubble Space Telescope",
                diameter: "55 km",
                orbitalPeriod: "38.2 days",
                description: "Named after the nine-headed serpent in Greek mythology."
            },
            {
                name: "Kerberos",
                discovered: "2011 by Hubble Space Telescope",
                diameter: "19 km",
                orbitalPeriod: "32.2 days",
                description: "Named after the three-headed dog guarding the underworld in Greek mythology."
            },
            {
                name: "Styx",
                discovered: "2012 by Hubble Space Telescope",
                diameter: "16 km",
                orbitalPeriod: "20.2 days",
                description: "The smallest known moon of Pluto, named after the river of the underworld."
            }
        ],
        lifeExpectancy: {
            possible: false,
            rating: "Impossible",
            reasons: [
                "Extreme cold nearing absolute zero (-230°C)",
                "Too small and far from the Sun to sustain life",
                "No significant atmosphere to protect or breathe",
                "Frozen nitrogen and methane surface",
                "Weak gravity cannot hold a complex environment"
            ],
            conditions: {
                temperature: "-223°C (average)",
                atmosphere: "Trace Nitrogen and Methane",
                radiation: "Exposed to cosmic rays",
                water: "Exists as water-ice bedrock",
                gravity: "7% of Earth's"
            },
            summary: "Pluto is a frozen world on the edge of the solar system. Its extreme distance from the Sun and lethal cold make it impossible for life."
        },
        texture: {
            base: "#B8A89A",
            dark: "#8B7355",
            heart: "#D4C4B4"
        }
    },
    {
        id: "kuiper-belt",
        name: "Kuiper Belt",
        color: "#4A5568",
        size: 0.15,
        distance: 60,
        isAsteroidBelt: true,
        description: "The Kuiper Belt is a circumstellar disc in the outer Solar System, extending from Neptune's orbit outward. It is similar to the asteroid belt but is far larger—20 times as wide and 20-200 times as massive.",
        facts: {
            location: "Beyond Neptune's orbit",
            distance: "30 to 50 AU from Sun",
            totalMass: "~1/10th Earth's mass (estimated)",
            largestObject: "Pluto (2,377 km)",
            numberOfObjects: "100,000+ (>100 km diameter)",
            composition: "Frozen volatiles (ices)",
            discovery: "Predicted 1951, confirmed 1992",
            temperature: "-223°C average"
        },
        notableDwarfPlanets: [
            {
                name: "Pluto",
                diameter: "2,377 km",
                type: "Dwarf Planet",
                description: "The largest known Kuiper Belt object and former ninth planet."
            },
            {
                name: "Eris",
                diameter: "2,326 km",
                type: "Dwarf Planet",
                description: "One of the most massive dwarf planets, slightly smaller than Pluto."
            },
            {
                name: "Makemake",
                diameter: "1,430 km",
                type: "Dwarf Planet",
                description: "The third-largest known dwarf planet in the Kuiper Belt."
            },
            {
                name: "Haumea",
                diameter: "1,632 km",
                type: "Dwarf Planet",
                description: "An elongated dwarf planet with a rapid rotation and two moons."
            }
        ],
        lifeExpectancy: {
            possible: false,
            rating: "Impossible",
            reasons: [
                "Vacuum of deep space beyond Neptune",
                "Extreme cold approaching absolute zero",
                "Intense cosmic radiation exposure",
                "No atmosphere or heat source",
                "Collection of frozen debris and ice"
            ],
            conditions: {
                temperature: "-223°C (average)",
                atmosphere: "None (Vacuum)",
                radiation: "Extremely high cosmic rays",
                water: "Exists as abundant frozen volatiles",
                gravity: "Negligible"
            },
            summary: "The Kuiper Belt is a vast frozen wasteland of ice and rock. The lack of air, heat, and liquid water make it an impossible environment for life."
        },
        texture: {
            base: "#4A5568",
            ice: "#6B7280"
        }
    }
];
