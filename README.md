🌌 SpaceScope – Explore, Learn & Stay Connected with the Universe

🚀 SpaceScope is a student-friendly full-stack web platform that centralizes celestial events, space missions, space weather, and educational content into one simple and accessible dashboard.

Built during Code - A - Thone 2.0 Hackathon organised by CSI - CATT DMCE, where we became Finalists out of 500+ teams 🏆

🌍 Live Demo

🔗 Live Website:
https://space-tech-ashy.vercel.app/

💻 GitHub Repository:
https://github.com/SujalGaikwad04/space-tech

💡 Problem Statement

Space-related information is scattered across multiple platforms like NASA, ISRO, and SpaceX websites. Most data is:

Highly technical

Difficult for beginners to understand

Not centralized

Lacking real-time alerts

Students and common users often miss important celestial events and struggle to connect space data with real-world applications.

✨ Our Solution

SpaceScope simplifies complex space data into a visual, beginner-friendly platform. Users can:

Select their location to view visible sky events

Track upcoming meteor showers, eclipses, and ISS passes

Monitor space weather activity

Explore mission timelines

Learn through simplified educational content

Receive real-time email notifications before important events

🔑 Key Features

🌌 Location-Based Sky Event Filtering

📅 Interactive Events Calendar

🌦 Space Weather Dashboard

🚀 Visual Mission Timelines

📚 Beginner-Friendly Learning Section

📧 Real-Time Email Notifications

🔐 Privacy-Friendly Manual Location Input

⚡ Static JSON Fallback for Reliability

📬 Real-Time Notification System

When a user registers with their email and selected location:

User data is stored in PostgreSQL (Neon Database)

The backend checks upcoming celestial events

Events are matched with user location

If an event is approaching, an automated email alert is triggered using Node.js + Nodemailer

This ensures users never miss important sky events.

🛠️ Tech Stack
🎨 Frontend

React.js (v19)

CSS3

Responsive UI Design

⚙️ Backend

Node.js

Express.js

🗄 Database

PostgreSQL (Neon)

📡 Data Sources

NASA Open APIs

Static JSON fallback data

🚀 Deployment

Frontend: Vercel

Backend: Render

📂 Project Structure
space-tech/
│
├── client/          # React Frontend
├── server/          # Node.js Backend
├── components/      # Reusable UI Components
├── pages/           # Application Pages
├── api/             # API Calls & Logic
└── README.md

🚀 Getting Started – Run Locally
📦 Prerequisites

Make sure you have:

Node.js (v18+)

npm

Git

Neon PostgreSQL account

1️⃣ Clone the Repository
git clone https://github.com/SujalGaikwad04/space-tech.git
cd space-tech

2️⃣ Backend Setup
cd server
npm install


Create a .env file inside /server and add:

PORT=5000
DATABASE_URL=your_neon_database_url
JWT_SECRET=your_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password


Start backend:

npm start


Server runs on:

http://localhost:5000

3️⃣ Frontend Setup

Open a new terminal:

cd client
npm install
npm run dev


Frontend runs on:

http://localhost:5173

📨 Email Setup (For Notifications)

Enable Gmail App Password

Add EMAIL_USER & EMAIL_PASS in .env

Nodemailer handles automated alerts

🎯 Future Improvements

Push notifications

AI-based event recommendations

Advanced event visibility scoring

3D Earth visualization

Mobile app version

Multi-language support

👨‍💻 Team Hindavi

Built with passion by:

Sujal Gaikwad

Mayank

Harsh

Tejas

📈 What We Learned

Full-stack development

Real-time API integration

Email automation systems

PostgreSQL (Neon) database management

Team collaboration under pressure

🌠 Final Words

SpaceScope bridges the gap between raw scientific data and public accessibility.
Our mission is to make space exploration simple, engaging, and meaningful for everyone.
