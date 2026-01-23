# Space Tech - Project Overview

## 🚀 Project Summary
**Space Tech** is a comprehensive web application designed to bring the cosmos closer to Earth. It serves as an interactive hub for space enthusiasts, providing real-time tracking, mission updates, educational content, and immersive simulations. The project aims to bridge the gap between complex space data and the general public through a modern, engaging user interface.

## ✨ Key Features

### 1. 🌍 Live ISS Tracker
-   **Real-time Visualization**: Tracks the current position of the International Space Station (ISS) on an interactive world map.
-   **Live Data**: Updates coordinates every 5 seconds.
-   **User Experience**: Features a "View Map" button on the home page for quick access.

### 2. 📚 Interactive Learning Hub
-   **Educational Blog**: A dedicated section for space news, technology updates, and mission stories.
-   **Functional Details**: Users can click "Read More" to view full articles (e.g., "Satellite Impact on Earth").
-   **Gamified Elements**: Includes "What If" scenarios and quizzes to engage users.

### 3. 📅 Cosmic Event Finder
-   **Upcoming Events**: A dashboard showing celestial events like meteor showers, eclipses, and ISS passes.
-   **Location Filtering**: Users can input their city (e.g., "Mumbai", "Delhi") to find events visible in their specific location.
-   **Time Filters**: Filter events by Today, This Week, or This Month.

### 4. 🛰️ Mission Control
-   **Mission Timeline**: Tracks past, present, and future space missions.
-   **Detailed Insights**: Provides information on launch vehicles, mission objectives, and agencies involved.

### 5. ☀️ Space Weather Dashboard
-   **Solar Activity**: Monitors solar flares and geomagnetic storms.
-   **Aurora Forecast**: Predicts aurora visibility based on Kp index data.

## 🛠️ Technology Stack
-   **Frontend**: React.js (Vite) for a fast, responsive UI.
-   **Routing**: React Router v6 for seamless navigation.
-   **Styling**: Custom CSS with Glassmorphism effects and responsive design.
-   **Maps**: Leaflet & React-Leaflet for interactive map visualizations.

## 📡 Data Sources & APIs
We utilize real-time data from trusted space agencies to power our application:

| Feature | API / Data Source | Description |
| :--- | :--- | :--- |
| **Live ISS Map** | **Open Notify API** | `http://api.open-notify.org/iss-now.json` - Provides real-time latitude/longitude of the ISS. |
| **Space Weather** | **NOAA SWPC** | `services.swpc.noaa.gov` - Fetches Solar Flare data and Kp Index for aurora forecasts. |
| **Missions** | **The Space Devs** | `ll.thespacedevs.com/2.2.0/launch/` - Comprehensive database of space launches and missions. |
| **Celestial Events** | **NASA DONKI** | `api.nasa.gov/DONKI` - Database of Notifications, Knowledge, Information (DONKI) for geomagnetic storms. |
| **Blog & Content** | **Local Data / Mock** | Curated educational content stored locally for fast access and reliability during demos. |

## 🔮 Future Scope
-   **User Accounts**: Saving favorite events and mission notifications.
-   **3D Simulations**: Integrating Three.js for 3D visualizations of solar system bodies.
-   **Community**: A forum for users to discuss space topics.
