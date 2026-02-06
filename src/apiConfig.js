// Centralized API configuration for deployment
const getApiUrl = () => {
    // Use VITE_API_URL if provided, else fallback to relative if in production (Vercel)
    // or localhost if in development
    if (import.meta.env.VITE_API_URL) {
        return import.meta.env.VITE_API_URL;
    }

    if (import.meta.env.PROD) {
        // If we're on Vercel and haven't provided a backend URL, 
        // it usually means we're using a relative path (if same platform)
        // but here we expect a distinct Render backend.
        return '';
    }

    return 'http://localhost:5000';
};

export const API_BASE_URL = getApiUrl();
export const API_URL = `${API_BASE_URL}/api`;
