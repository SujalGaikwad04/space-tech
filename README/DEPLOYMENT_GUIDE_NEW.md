x1# 🚀 Deployment Guide: SpaceTech Full-Stack

I have prepared your code for production deployment. Follow these steps to get everything live!

## 1. 🗄️ Database (Neon) - ALREADY DONE
Your Neon PostgreSQL database is already set up and verified.
*   **Connection String:** (Found in your `.env` file)

---

## 2. 🧠 Backend (Render)
We will deploy the `server/` folder to Render.

### Steps on Render.com:
1.  **Create New**: Select **Web Service**.
2.  **Connect GitHub**: Select your `space-tech` repository.
3.  **Settings**:
    *   **Name**: `spacetech-backend` (or any name)
    *   **Root Directory**: `server`
    *   **Runtime**: `Node`
    *   **Build Command**: `npm install`
    *   **Start Command**: `node server.js`
4.  **Environment Variables (Advanced)**:
    Add these variables:
    *   `DATABASE_URL`: *(Your Neon connection string)*
    *   `JWT_SECRET`: *(A random long string)*
    *   `EMAIL_USER`: `sujalgaikwad0411@gmail.com`
    *   `EMAIL_PASSWORD`: `eiwnfaqpnawmastp`
    *   `FRONTEND_URL`: `https://your-app-name.vercel.app` (Add this *after* deploying frontend)
5.  **Deploy**: Click Create Web Service.
6.  **COPY URL**: Copy the provided Render URL (e.g., `https://spacetech-backend.onrender.com`).

---

## 3. 🎨 Frontend (Vercel)
We will deploy the main React app to Vercel.

### Steps on Vercel.com:
1.  **New Project**: Select your `space-tech` repository.
2.  **Settings**:
    *   **Framework Preset**: `Vite` (should be auto-detected)
    *   **Root Directory**: `.` (the root of the repo)
3.  **Environment Variables**:
    *   `VITE_API_URL`: *(The Render URL you copied in step 2 - **WITHOUT** the trailing slash)*
4.  **Deploy**: Click Deploy.

---

## 🛠️ Code Changes Made
I have already updated your code to support this setup:
1.  **Centralized API URL**: Created `src/apiConfig.js` to automatically switch between local and production backend.
2.  **CORS Support**: Updated `server/server.js` to allow requests from your Vercel frontend.
3.  **SPA Routing**: Fixed `vercel.json` to handle React Router navigation correctly.

**Action Required**: Once your Vercel app is live, remember to go back to **Render** settings and add/update the `FRONTEND_URL` environment variable so the backend accepts requests from it!
