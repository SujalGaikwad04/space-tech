// Historical space missions data organized by decade
export const historicalMissions = {
    "1960s": [
        {
            name: "Vostok 1",
            year: 1961,
            agency: "Soviet Union",
            description: "First human spaceflight. Yuri Gagarin became the first human in space, orbiting Earth once in 108 minutes.",
            details: "Vostok 1 declared a new era in human history. The spacecraft consisted of a spherical descent module, which housed Gagarin and instruments, and a conical instrument module. The mission lasted just 108 minutes, but it proved humans could survive in microgravity. Gagarin ejected from the capsule at 7km altitude and parachuted safely to Earth, a detail kept secret for years to meet FAI records.",
            status: "Success",
            type: "Crewed",
            image: "https://upload.wikimedia.org/wikipedia/commons/1/17/Vostok-1_Spacecraft_01.jpg"
        },
        {
            name: "Mercury-Atlas 6",
            year: 1962,
            agency: "NASA",
            description: "John Glenn became the first American to orbit Earth, completing three orbits in Friendship 7.",
            details: "Friendship 7 was the third human spaceflight for the U.S. and the first to place an American in orbit. During the 4 hour, 55 minute mission, Glenn experienced a faulty sensor reading suggesting his heat shield was loose, creating a tense re-entry. The mission restored American confidence in the Space Race.",
            status: "Success",
            type: "Crewed",
            image: "https://upload.wikimedia.org/wikipedia/commons/e/eb/Friendship_7_capsule.jpg"
        },
        {
            name: "Mariner 2",
            year: 1962,
            agency: "NASA",
            description: "First successful planetary flyby mission, passing Venus and confirming its extreme surface temperatures.",
            details: "Mariner 2 was the first robotic space probe to conduct a successful planetary encounter. It revealed that Venus has cool clouds and an extremely hot surface (425°C), crushing hopes of a tropical, life-bearing world beneath the veil.",
            status: "Success",
            type: "Probe",
            image: "https://upload.wikimedia.org/wikipedia/commons/9/90/Mariner_2.jpg"
        },
        {
            name: "Mariner 4",
            year: 1965,
            agency: "NASA",
            description: "First successful flyby of Mars, returning the first close-up images revealing a cratered surface.",
            details: "Mariner 4 performed the first successful flyby of the planet Mars, returning the first close-up pictures of the Martian surface. These grainy images shocked scientists by revealing a cratered, moon-like world with a thin atmosphere, rather than a thriving biosystem.",
            status: "Success",
            type: "Probe",
            image: "https://upload.wikimedia.org/wikipedia/commons/f/f4/Mars_(Mariner_4).jpg"
        },
        {
            name: "Gemini 4",
            year: 1965,
            agency: "NASA",
            description: "Ed White performed the first American spacewalk (EVA), lasting 23 minutes.",
            details: "The highlight of the four-day Gemini 4 mission was the first Extravehicular Activity (EVA) by an American. Ed White floated in space for 23 minutes, secured by a 25-foot tether, maneuvering with a hand-held oxygen jet gun. He famously didn't want to come back inside, saying 'It's the saddest moment of my life.'",
            status: "Success",
            type: "Crewed",
            image: "https://upload.wikimedia.org/wikipedia/commons/1/18/Astronaut_Edward_White_first_American_spacewalk_Gemini_4.jpg"
        },
        {
            name: "Apollo 8",
            year: 1968,
            agency: "NASA",
            description: "First crewed mission to orbit the Moon. Crew took iconic 'Earthrise' photograph.",
            details: "Apollo 8 was a bold mission that sent Frank Borman, James Lovell, and William Anders to orbit the Moon on Christmas Eve. They were the first humans to leave Earth's gravity well, see the far side of the Moon, and witness the Earth rising over the lunar horizon, capturing the legendary 'Earthrise' photo.",
            status: "Success",
            type: "Crewed",
            image: "https://upload.wikimedia.org/wikipedia/commons/a/a8/NASA-Apollo8-Dec24-Earthrise.jpg"
        },
        {
            name: "Apollo 11",
            year: 1969,
            agency: "NASA",
            description: "First crewed Moon landing. Neil Armstrong and Buzz Aldrin walked on the lunar surface while Michael Collins orbited.",
            details: "The mission that defined a century. On July 20, 1969, the Lunar Module Eagle touched down at Tranquility Base. Neil Armstrong's 'one small step' signaled humanity's first footing on another world. They spent 21 hours on the lunar surface and collected 47.5 pounds of lunar material.",
            status: "Success",
            type: "Crewed",
            image: "https://upload.wikimedia.org/wikipedia/commons/9/98/Aldrin_Apollo_11_original.jpg"
        }
    ],
    "1970s": [
        {
            name: "Apollo 13",
            year: 1970,
            agency: "NASA",
            description: "\"Successful failure\" - oxygen tank explosion forced mission abort, but crew safely returned after lunar flyby.",
            details: "Two days after launch, an oxygen tank exploded, crippling the Service Module. The mission to land on the Moon was aborted. The crew had to use the Lunar Module as a lifeboat, conserving power and water while swinging around the Moon to return to Earth. It remains a masterclass in crisis management.",
            status: "Partial Success",
            type: "Crewed",
            image: "https://upload.wikimedia.org/wikipedia/commons/f/f7/Apollo_13_Service_Module.jpg"
        },
        {
            name: "Salyut 1",
            year: 1971,
            agency: "Soviet Union",
            description: "World's first space station. Operated for 175 days before controlled deorbit.",
            details: "Launched by the Soviet Union, Salyut 1 was the first space station of any kind. It was a monolithic station that hosted one crew (Soyuz 11) for 23 days. Tragically, the crew perished during re-entry due to a valve failure, but the station proved long-term habitation was possible.",
            status: "Success",
            type: "Station",
            image: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Salyut_1.jpg"
        },
        {
            name: "Mariner 9",
            year: 1971,
            agency: "NASA",
            description: "First spacecraft to orbit Mars. Mapped 85% of the planet and discovered Olympus Mons.",
            details: "Unlike previous flyby missions, Mariner 9 entered orbit around Mars. It arrived during a global dust storm but waited it out to map the entire planet. It discovered the massive Valles Marineris canyon system and Olympus Mons, the tallest volcano in the solar system.",
            status: "Success",
            type: "Orbiter",
            image: "https://upload.wikimedia.org/wikipedia/commons/8/80/Mariner_9_Mars_Mosaic.jpg"
        },
        {
            name: "Pioneer 10",
            year: 1972,
            agency: "NASA",
            description: "First spacecraft to traverse asteroid belt and make flyby of Jupiter. Still transmitting until 2003.",
            details: "Pioneer 10 was a pathfinder. It was the first to fly through the asteroid belt and the first to obtain close-up images of Jupiter. It carries a gold plaque with a message for any potential extraterrestrial intelligence it might encounter.",
            status: "Success",
            type: "Probe",
            image: "https://upload.wikimedia.org/wikipedia/commons/6/68/Pioneer_10_Construction.jpg"
        },
        {
            name: "Skylab",
            year: 1973,
            agency: "NASA",
            description: "America's first space station. Hosted three crews conducting experiments in microgravity.",
            details: "Built from an empty Saturn V third stage, Skylab was massive. It proved humans could live and work in space for extended periods (up to 84 days). It included a solar observatory and conducted hundreds of experiments.",
            status: "Success",
            type: "Station",
            image: "https://upload.wikimedia.org/wikipedia/commons/2/2d/Skylab.jpg"
        },
        {
            name: "Viking 1",
            year: 1976,
            agency: "NASA",
            description: "First successful Mars lander. Operated for over 6 years, searching for signs of life.",
            details: "Viking 1 was the first spacecraft to successfully land on Mars and perform its mission. It sent back the first color panoramic views of the Martian surface and conducted biological experiments to look for life, the results of which are still debated today.",
            status: "Success",
            type: "Lander",
            image: "https://upload.wikimedia.org/wikipedia/commons/3/3b/Viking_Lander_1_Martian_Surface.jpg"
        },
        {
            name: "Voyager 1 & 2",
            year: 1977,
            agency: "NASA",
            description: "Grand tour of outer planets. Still transmitting data from interstellar space 45+ years later.",
            details: "The Voyagers took advantage of a rare planetary alignment to tour Jupiter, Saturn, Uranus, and Neptune. Voyager 1 is now the most distant human-made object, having entered interstellar space. Both carry the Golden Record, a time capsule of Earth.",
            status: "Success",
            type: "Probe",
            image: "https://upload.wikimedia.org/wikipedia/commons/2/29/Voyager_spacecraft.jpg"
        }
    ],
    "1980s": [
        {
            name: "STS-1 (Columbia)",
            year: 1981,
            agency: "NASA",
            description: "First Space Shuttle mission, beginning the era of reusable spacecraft with John Young and Robert Crippen.",
            details: "STS-1 was the first orbital flight of NASA's Space Shuttle program. It proved the concept of a reusable winged spacecraft that launches like a rocket and lands like a plane. Columbia orbited Earth 37 times before gliding back to Edwards Air Force Base.",
            status: "Success",
            type: "Shuttle",
            image: "https://upload.wikimedia.org/wikipedia/commons/e/e8/STS-1_Launch.jpg"
        },
        {
            name: "Venera 13",
            year: 1982,
            agency: "Soviet Union",
            description: "Landed on Venus and returned first color images from the surface, surviving 127 minutes in extreme conditions.",
            details: "Venera 13 was a triumph of engineering against hellish conditions. It landed on Venus where the pressure is 90 times that of Earth and the temperature is 457°C. It analyzed soil samples and sent back the first color panoramas of the Venusian surface before succumbing to the heat.",
            status: "Success",
            type: "Lander",
            image: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Surface_of_Venus_taken_by_Venera_13_(panoramic).jpg"
        },
        {
            name: "STS-41-B",
            year: 1984,
            agency: "NASA",
            description: "First untethered spacewalk using Manned Maneuvering Unit (MMU) by Bruce McCandless.",
            details: "This mission produced one of the most famous images in space history: Bruce McCandless floating completely free in space, with no tether to the shuttle, using the nitrogen-propelled Manned Maneuvering Unit. It demonstrated the ability to work outside the spacecraft with total freedom.",
            status: "Success",
            type: "Shuttle",
            image: "https://upload.wikimedia.org/wikipedia/commons/9/91/Bruce_McCandless_II_during_EVA_in_1984.jpg"
        },
        {
            name: "Mir Space Station",
            year: 1986,
            agency: "Soviet Union",
            description: "First modular space station. Operated for 15 years, hosting international crews.",
            details: "Mir was the first modular space station, assembled in orbit from 1986 to 1996. It held the record for the longest continuous human presence in space (until the ISS) and hosted astronauts from many nations, bridging the gap between the Cold War and international cooperation.",
            status: "Success",
            type: "Station",
            image: "https://upload.wikimedia.org/wikipedia/commons/2/26/Mir_Space_Station.jpg"
        },
        {
            name: "Magellan",
            year: 1989,
            agency: "NASA",
            description: "Mapped 98% of Venus surface using radar, revealing volcanic features and impact craters.",
            details: "Magellan peered through the thick clouds of Venus using synthetic aperture radar. It revealed a young surface reshaped by volcanism, with vast lava plains and thousands of volcanoes. It transformed our understanding of Earth's 'evil twin'.",
            status: "Success",
            type: "Orbiter",
            image: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Magellan_Spacecraft.jpg"
        }
    ],
    "1990s": [
        {
            name: "Hubble Space Telescope",
            year: 1990,
            agency: "NASA/ESA",
            description: "Revolutionary space telescope that transformed our understanding of the universe. Still operational today.",
            details: "Hubble has arguably done more to shape our view of the universe than any other scientific instrument. Despite a flawed mirror at launch (fixed by astronauts in 1993), it has captured iconic images like the 'Pillars of Creation' and helped determine the age of the universe.",
            status: "Success",
            type: "Observatory",
            image: "https://upload.wikimedia.org/wikipedia/commons/3/3f/HST-SM4.jpeg"
        },
        {
            name: "Galileo",
            year: 1995,
            agency: "NASA",
            description: "First spacecraft to orbit Jupiter. Discovered evidence of subsurface oceans on Europa.",
            details: "Galileo orbited Jupiter for 8 years. It witnessed the impact of Comet Shoemaker-Levy 9, probed Jupiter's atmosphere, and discovered that Europa likely harbors a global subsurface ocean, making it a prime target in the search for life.",
            status: "Success",
            type: "Orbiter",
            image: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Galileo_Spacecraft.jpg"
        },
        {
            name: "Mars Pathfinder",
            year: 1997,
            agency: "NASA",
            description: "Delivered Sojourner rover to Mars, demonstrating airbag landing technology.",
            details: "Pathfinder was a proof-of-concept mission that delivered the first wheeled rover, Sojourner, to Mars. It used an innovative airbag landing system. The mission returned over 16,500 images and 8.5 million measurements of atmospheric pressure, temperature, and wind.",
            status: "Success",
            type: "Rover",
            image: "https://upload.wikimedia.org/wikipedia/commons/5/52/Mars_Pathfinder_and_Sojourner.jpg"
        },
        {
            name: "Cassini-Huygens",
            year: 1997,
            agency: "NASA/ESA",
            description: "Studied Saturn system for 13 years. Huygens probe landed on Titan in 2005.",
            details: "A joint NASA/ESA mission, Cassini orbited Saturn while the Huygens probe landed on its largest moon, Titan. It revealed the beauty of Saturn's rings, the hydrocarbon lakes of Titan, and the active water geysers of Enceladus.",
            status: "Success",
            type: "Orbiter",
            image: "https://upload.wikimedia.org/wikipedia/commons/b/b2/Cassini_Saturn_Orbit_Insertion.jpg"
        },
        {
            name: "ISS Assembly Begins",
            year: 1998,
            agency: "International",
            description: "First modules (Zarya and Unity) of the International Space Station launched and assembled.",
            details: "The launch of the Russian module Zarya and the US module Unity marked the beginning of the largest international engineering project in history. The ISS has been continuously inhabited since November 2000, serving as a unique laboratory in low Earth orbit.",
            status: "Success",
            type: "Station",
            image: "https://upload.wikimedia.org/wikipedia/commons/0/0d/ISS_Zarya_Unity.jpg"
        }
    ],
    "2000s": [
        {
            name: "ISS Expedition 1",
            year: 2000,
            agency: "International",
            description: "First permanent crew arrived at ISS. Continuous human presence in space since then.",
            details: "Commander William Shepherd (NASA) and cosmonauts Yuri Gidzenko and Sergei Krikalev (Roscosmos) became the first long-term residents of the station. This marked the start of an uninterrupted human presence in space that continues to this day.",
            status: "Success",
            type: "Crewed",
            image: "https://upload.wikimedia.org/wikipedia/commons/e/e2/ISS_Expedition_1_crew.jpg"
        },
        {
            name: "Mars Odyssey",
            year: 2001,
            agency: "NASA",
            description: "Discovered vast amounts of water ice beneath Mars surface. Still operational, longest-serving Mars spacecraft.",
            details: "Mars Odyssey's mapping of chemical elements and minerals revealed vast deposits of water ice just beneath the Martian surface. It also serves as a critical communications relay for rovers on the ground.",
            status: "Active",
            type: "Orbiter",
            image: "https://upload.wikimedia.org/wikipedia/commons/4/49/Mars_Odyssey_Concept.jpg"
        },
        {
            name: "Spirit & Opportunity",
            year: 2004,
            agency: "NASA",
            description: "Twin Mars rovers. Opportunity operated for 15 years (90-day mission), traveling 45 km.",
            details: "The twin rovers were designed to last 90 days but far exceeded all expectations. Spirit operated for 6 years, and Opportunity for nearly 15 years. They found conclusive evidence that Mars was once a wet world capable of supporting microbial life.",
            status: "Success",
            type: "Rover",
            image: "https://upload.wikimedia.org/wikipedia/commons/9/98/Mars_Exploration_Rover_Concept.jpg"
        },
        {
            name: "New Horizons",
            year: 2006,
            agency: "NASA",
            description: "First mission to Pluto (2015) and Kuiper Belt. Revealed Pluto's complex geology.",
            details: "After a 9-year / 3-billion-mile journey, New Horizons flew past Pluto in 2015. It revealed a complex world with nitrogen glaciers, water ice mountains, and a 'heart' feature (Tombaugh Regio). It continues to explore the Kuiper Belt.",
            status: "Active",
            type: "Probe",
            image: "https://upload.wikimedia.org/wikipedia/commons/0/04/New_Horizons_Pluto.jpg"
        },
        {
            name: "Phoenix",
            year: 2008,
            agency: "NASA",
            description: "Confirmed water ice in Martian arctic. Studied Mars polar region for 5 months.",
            details: "Phoenix landed in the Martian arctic plains. It used a robotic arm to dig into the soil, confirming the presence of water ice and identifying chemicals like perchlorates that are relevant to the search for life.",
            status: "Success",
            type: "Lander",
            image: "https://upload.wikimedia.org/wikipedia/commons/8/8d/Phoenix_Lander.jpg"
        },
        {
            name: "SpaceX Falcon 1",
            year: 2008,
            agency: "SpaceX",
            description: "First privately developed liquid-fuel rocket to reach orbit, pioneering commercial spaceflight.",
            details: "After three failed attempts, the fourth launch of Falcon 1 was a success. This historic achievement made SpaceX the first private company to launch a liquid-fueled rocket into orbit, paving the way for the Falcon 9 and the commercial space revolution.",
            status: "Success",
            type: "Launch Vehicle",
            image: "https://upload.wikimedia.org/wikipedia/commons/5/53/Falcon_1_Flight_4_lift-off.jpg"
        }
    ],
    "2020s": [
        {
            name: "Crew Dragon Demo-2",
            year: 2020,
            agency: "SpaceX/NASA",
            description: "First crewed commercial spacecraft to ISS. Restored US human spaceflight capability.",
            details: "Demo-2 was the final flight test of SpaceX's Crew Dragon. Astronauts Bob Behnken and Doug Hurley flew to the ISS, marking the first time astronauts launched from American soil since the Shuttle retired in 2011. It began the era of commercial crew flights.",
            status: "Success",
            type: "Crewed",
            image: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Crew_Dragon_Demo-2_Launch.jpg"
        },
        {
            name: "Perseverance Rover",
            year: 2021,
            agency: "NASA",
            description: "Mars rover searching for signs of ancient microbial life. Includes Ingenuity helicopter (first powered flight on another planet).",
            details: "Perseverance is the most advanced rover sent to Mars. It is collecting core samples for future return to Earth. It also carried Ingenuity, a small helicopter that proved powered flight is possible in the thin Martian atmosphere.",
            status: "Active",
            type: "Rover",
            image: "https://upload.wikimedia.org/wikipedia/commons/2/20/Perseverance_Selfie_at_Rochette.jpg"
        },
        {
            name: "James Webb Space Telescope",
            year: 2022,
            agency: "NASA/ESA/CSA",
            description: "Most powerful space telescope ever built. Observing the early universe in infrared, revealing galaxies 13+ billion years old.",
            details: "JWST observes the universe in infrared light, allowing it to peer through dust clouds and see the light from the very first stars and galaxies. It has already revolutionized astronomy with its stunningly detailed deep-field images.",
            status: "Active",
            type: "Observatory",
            image: "https://upload.wikimedia.org/wikipedia/commons/5/56/James_Webb_Space_Telescope_Mirror.jpg"
        },
        {
            name: "Artemis I",
            year: 2022,
            agency: "NASA",
            description: "Uncrewed test flight of Orion spacecraft around the Moon. Validated systems for future crewed missions.",
            details: "Artemis I was the first integrated flight test of NASA's Deep Space Exploration Systems: the Orion spacecraft, Space Launch System (SLS) rocket and the ground systems at Kennedy Space Center. It successfully sent an uncrewed Orion around the Moon and back.",
            status: "Success",
            type: "Test Flight",
            image: "https://upload.wikimedia.org/wikipedia/commons/6/68/Artemis_I_Launch.jpg"
        },
        {
            name: "DART Mission",
            year: 2022,
            agency: "NASA",
            description: "First planetary defense test. Successfully altered asteroid Dimorphos' orbit by kinetic impact.",
            details: "The Double Asteroid Redirection Test (DART) was a mission to test planetary defense methods. The spacecraft intentionally crashed into the asteroid moonlet Dimorphos to change its speed and path. The test was a smashing success, altering the orbit more than predicted.",
            status: "Success",
            type: "Probe",
            image: "https://upload.wikimedia.org/wikipedia/commons/3/39/DART_spacecraft_render.jpg"
        },
        {
            name: "Chandrayaan-3",
            year: 2023,
            agency: "ISRO",
            description: "India's successful Moon landing near south pole. Demonstrated precision landing technology.",
            details: "Chandrayaan-3 made India the fourth country to land on the Moon and the first to land near the lunar south pole. The Vikram lander and Pragyan rover conducted in-situ scientific experiments on lunar soil and rocks.",
            status: "Success",
            type: "Lander",
            image: "https://upload.wikimedia.org/wikipedia/commons/2/20/Chandrayaan-3_Launch.jpg"
        },
        {
            name: "Europa Clipper",
            year: 2024,
            agency: "NASA",
            description: "Mission to study Jupiter's moon Europa and its subsurface ocean. Launching to search for conditions suitable for life.",
            details: "Europa Clipper will conduct detailed reconnaissance of Jupiter's moon Europa to investigate whether the icy moon could harbor conditions suitable for life. It will perform dozens of close flybys to gather data on the moon's atmosphere, surface, and interior.",
            status: "Planned",
            type: "Orbiter",
            image: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Europa_Clipper.jpg"
        },
        {
            name: "Artemis II",
            year: 2025,
            agency: "NASA",
            description: "First crewed Artemis mission. Four astronauts will fly around the Moon.",
            details: "Artemis II will be the first crewed flight of the Artemis program. Four astronauts will venture around the Moon on a 10-day mission, paving the way for future lunar surface missions. It will be the first time humans have traveled to the Moon since 1972.",
            status: "Planned",
            type: "Crewed",
            image: "https://upload.wikimedia.org/wikipedia/commons/a/a1/Artemis_II_crew.jpg"
        },
        {
            name: "Artemis III",
            year: 2026,
            agency: "NASA",
            description: "Planned crewed Moon landing mission, returning humans to the lunar surface for the first time since 1972.",
            details: "Artemis III intends to land the first woman and the first person of color on the Moon. The mission will explore the lunar south pole region, searching for water ice and other resources.",
            status: "Planned",
            type: "Crewed",
            image: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Artemis_III_concept.jpg"
        }
    ]
};

export const getStatusColor = (status) => {
    switch (status) {
        case "Success":
            return "#00ff88";
        case "Active":
            return "#00d9ff";
        case "Planned":
            return "#ffa500";
        case "Partial Success":
            return "#ffff00";
        default:
            return "#888";
    }
};

export const getMissionByName = (name) => {
    // Search through all decades to find the mission
    for (const decade in historicalMissions) {
        const mission = historicalMissions[decade].find(m => m.name === name);
        if (mission) return mission;
    }
    return null;
};
