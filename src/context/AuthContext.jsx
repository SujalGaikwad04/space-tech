import { createContext, useContext, useState, useEffect } from 'react';
import { getRankName, getNextRankName } from '../utils/rankUtils';

const AuthContext = createContext();

const API_URL = 'http://localhost:5000/api';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Load user from token on mount
  useEffect(() => {
    const loadUser = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        try {
          // Verify token and get user data from backend
          const response = await fetch(`${API_URL}/user/profile`, {
            headers: {
              'Authorization': `Bearer ${storedToken}`
            }
          });

          if (response.ok) {
            const data = await response.json();
            setUser(data.user);
            setToken(storedToken);
          } else {
            // Token invalid or expired
            localStorage.removeItem('token');
            setUser(null);
            setToken(null);
          }
        } catch (error) {
          console.error('Error loading user:', error);
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  // Register new user
  const register = async (userData) => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, message: data.message || 'Registration failed' };
      }

      // Save token and user
      localStorage.setItem('token', data.token);
      localStorage.setItem('currentUser', JSON.stringify(data.user)); // Keep for legacy components if needed
      setToken(data.token);
      setUser(data.user);

      return { success: true, message: 'Registration successful' };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, message: 'Server connection failed' };
    }
  };

  // Login existing user
  const login = async (identifier, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ identifier, password })
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, message: data.message || 'Login failed' };
      }

      // Save token and user
      localStorage.setItem('token', data.token);
      localStorage.setItem('currentUser', JSON.stringify(data.user)); // Keep for legacy components if needed
      setToken(data.token);
      setUser(data.user);

      return { success: true, message: 'Login successful' };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Server connection failed' };
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    setToken(null);
    setUser(null);
  };

  // Check if username exists
  const checkUsernameExists = async (username) => {
    try {
      const response = await fetch(`${API_URL}/auth/check-username/${username}`);
      const data = await response.json();
      return data.exists;
    } catch (error) {
      console.error('Error checking username:', error);
      return false;
    }
  };

  // Check if email exists
  const checkEmailExists = async (email) => {
    try {
      const response = await fetch(`${API_URL}/auth/check-email/${email}`);
      const data = await response.json();
      return data.exists;
    } catch (error) {
      console.error('Error checking email:', error);
      return false;
    }
  };

  // Get leaderboard (mock implementation for compatibility or fetch from API if exists)
  const getLeaderboard = async (limit = 10) => {
    // Ideally this should be an API call
    // For now returning empty array as backend endpoint wasn't explicitly created for this
    // You can add /api/leaderboard to server.js if needed
    return [];
  };

  // Update user stats
  const updateUserStats = async (points) => {
    if (!user || !token) return;

    const newXP = (user.totalXP || 0) + points;
    const newLevel = Math.floor(newXP / 50) + 1;

    const updatedStats = {
      learningStreak: user.learningStreak,
      totalXP: newXP,
      level: newLevel,
      progress: user.progress
    };

    try {
      await fetch(`${API_URL}/user/stats`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedStats)
      });

      // Update local state optimistic UI
      const updatedUser = { ...user, ...updatedStats };
      setUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser)); // Sync legacy storage
    } catch (error) {
      console.error("Failed to update user stats", error);
    }
  };

  // Update user location
  const updateUserLocation = async (newLocation) => {
    if (!user) return;

    // Note: We need a backend endpoint for this. 
    // For now we'll just update local state to keep the UI responsive
    // A proper implementation would require adding a location field update to user table in server.js

    const updatedUser = { ...user, location: newLocation };
    setUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    token, // Expose token for services
    loading,
    register,
    login,
    logout,
    checkUsernameExists,
    checkEmailExists,
    // getAllUsers, // Removed as it's not secure for frontend to have all users
    getLeaderboard,
    isAuthenticated: !!user,

    getRankName,
    getNextRankName,
    updateUserStats,
    updateUserLocation
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
