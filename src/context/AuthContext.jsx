import { createContext, useContext, useState, useEffect } from 'react';
import { getRankName, getNextRankName } from '../utils/rankUtils';

const AuthContext = createContext();

const API_URL = 'https://space-tech-l4nokgff3-sujalgaikwad04s-projects.vercel.app/api';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [sessions, setSessions] = useState([]); // Array of { token, user }
  const [activeSessionId, setActiveSessionId] = useState(null); // ID of active user
  const [loading, setLoading] = useState(true);

  // Derived state for backward compatibility
  const activeSession = sessions.find(s => s.user.id === activeSessionId) || null;
  const user = activeSession ? activeSession.user : null;
  const token = activeSession ? activeSession.token : null;

  // Load sessions from localStorage on mount
  useEffect(() => {
    const loadSessions = async () => {
      try {
        const storedSessions = JSON.parse(localStorage.getItem('auth_sessions') || '[]');
        const storedActiveId = JSON.parse(localStorage.getItem('active_user_id') || 'null');

        if (storedSessions.length > 0) {
          // Verify tokens are still valid (optional, but good practice)
          // For now, we trust the stored tokens to be valid until an API call fails
          setSessions(storedSessions);

          if (storedActiveId && storedSessions.some(s => s.user.id === storedActiveId)) {
            setActiveSessionId(storedActiveId);
          } else {
            setActiveSessionId(storedSessions[0].user.id);
          }
        }
      } catch (error) {
        console.error('Error loading sessions:', error);
        localStorage.removeItem('auth_sessions');
      }
      setLoading(false);
    };

    loadSessions();
  }, []);

  // Save sessions to localStorage whenever they change
  useEffect(() => {
    if (sessions.length > 0) {
      localStorage.setItem('auth_sessions', JSON.stringify(sessions));
    } else {
      localStorage.removeItem('auth_sessions');
    }
  }, [sessions]);

  // Save active ID whenever it changes
  useEffect(() => {
    if (activeSessionId) {
      localStorage.setItem('active_user_id', JSON.stringify(activeSessionId));
    } else {
      localStorage.removeItem('active_user_id');
    }
  }, [activeSessionId]);

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

      // Add session
      addSession(data.user, data.token);

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

      // Add or update session
      addSession(data.user, data.token);

      return { success: true, message: 'Login successful' };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Server connection failed' };
    }
  };

  // Helper to add or update a session
  const addSession = (newUser, newToken) => {
    setSessions(prev => {
      // Check if user already in sessions
      const existingIndex = prev.findIndex(s => s.user.id === newUser.id);
      let newSessions;

      if (existingIndex >= 0) {
        // Update existing session
        newSessions = [...prev];
        newSessions[existingIndex] = { user: newUser, token: newToken };
      } else {
        // Add new session
        newSessions = [...prev, { user: newUser, token: newToken }];
      }
      return newSessions;
    });
    setActiveSessionId(newUser.id);
  };

  // Logout specific user (or active user if no ID provided)
  const logout = (userId = activeSessionId) => {
    setSessions(prev => {
      const newSessions = prev.filter(s => s.user.id !== userId);

      // If we removed the active user, switch to another one if possible
      if (userId === activeSessionId) {
        if (newSessions.length > 0) {
          setActiveSessionId(newSessions[0].user.id);
        } else {
          setActiveSessionId(null);
        }
      }
      return newSessions;
    });
  };

  // Switch active account
  const switchAccount = (userId) => {
    if (sessions.some(s => s.user.id === userId)) {
      setActiveSessionId(userId);
    }
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

  // Get leaderboard
  const getLeaderboard = async (limit = 10) => {
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

      // Update local state in sessions array
      setSessions(prev => prev.map(s => {
        if (s.user.id === user.id) {
          return { ...s, user: { ...s.user, ...updatedStats } };
        }
        return s;
      }));
    } catch (error) {
      console.error("Failed to update user stats", error);
    }
  };

  // Update user location
  const updateUserLocation = async (newLocation) => {
    if (!user) return;

    // Update local state
    setSessions(prev => prev.map(s => {
      if (s.user.id === user.id) {
        return { ...s, user: { ...s.user, location: newLocation } };
      }
      return s;
    }));
  };

  const value = {
    user, // Current active user
    token, // Current active token
    sessions, // All logged in sessions
    activeSessionId,
    loading,
    register,
    login,
    logout,
    switchAccount,
    checkUsernameExists,
    checkEmailExists,
    getLeaderboard,
    isAuthenticated: !!user,
    getRankName,
    getNextRankName,
    updateUserStats,
    updateUserLocation
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
