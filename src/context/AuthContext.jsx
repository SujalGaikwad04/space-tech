import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

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

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Register new user
  const register = (userData) => {
    try {
      // Get existing users
      const users = JSON.parse(localStorage.getItem('users') || '[]');

      // Check if username or email already exists
      const userExists = users.some(
        u => u.username === userData.username || u.email === userData.email
      );

      if (userExists) {
        return { success: false, message: 'Username or email already exists' };
      }

      // Create new user object
      const newUser = {
        id: Date.now().toString(),
        fullName: userData.fullName,
        email: userData.email,
        username: userData.username,
        location: userData.location,
        password: userData.password, // In production, this should be hashed
        createdAt: new Date().toISOString(),
        learningStreak: 0,
        totalXP: 0,
        level: 1,
        progress: 0
      };

      // Save to users array
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      // Set as current user (without password)
      const { password, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));

      return { success: true, message: 'Registration successful' };
    } catch (error) {
      return { success: false, message: 'Registration failed' };
    }
  };

  // Login existing user
  const login = (identifier, password) => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');

      // Find user by email or username
      const foundUser = users.find(
        u => (u.email === identifier || u.username === identifier) && u.password === password
      );

      if (!foundUser) {
        return { success: false, message: 'Invalid credentials' };
      }

      // Set as current user (without password)
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));

      return { success: true, message: 'Login successful' };
    } catch (error) {
      return { success: false, message: 'Login failed' };
    }
  };

  // Logout user
  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  // Check if username exists (for popup feature)
  const checkUsernameExists = (username) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    return users.some(u => u.username === username);
  };

  // Check if email exists
  const checkEmailExists = (email) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    return users.some(u => u.email === email);
  };

  // Get all users (without passwords)
  const getAllUsers = () => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      return users.map(({ password, ...userWithoutPassword }) => userWithoutPassword);
    } catch (error) {
      console.error('Failed to get users:', error);
      return [];
    }
  };

  // Get leaderboard sorted by level (desc) then XP (desc)
  const getLeaderboard = (limit = 10) => {
    try {
      const users = getAllUsers();

      // Sort by level (descending), then by totalXP (descending)
      const sortedUsers = users.sort((a, b) => {
        // First compare levels
        if (b.level !== a.level) {
          return b.level - a.level;
        }
        // If levels are equal, compare XP
        return (b.totalXP || 0) - (a.totalXP || 0);
      });

      // Return top users with rank
      return sortedUsers.slice(0, limit).map((user, index) => ({
        ...user,
        rank: index + 1
      }));
    } catch (error) {
      console.error('Failed to get leaderboard:', error);
      return [];
    }
  };

  const value = {
    user,
    loading,
    register,
    login,
    logout,
    checkUsernameExists,
    checkEmailExists,
    getAllUsers,
    getLeaderboard,
    isAuthenticated: !!user,
    updateUserStats: (points) => {
      if (!user) return;

      const newXP = (user.totalXP || 0) + points;
      // Level calculation: 0-50 = Level 1, 51-100 = Level 2, etc.
      // Formula: Math.floor(XP / 50) + 1
      const newLevel = Math.floor(newXP / 50) + 1;

      const updatedUser = {
        ...user,
        totalXP: newXP,
        level: newLevel
      };

      // Update state
      setUser(updatedUser);

      // Update localStorage 'currentUser'
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));

      // Update this user in the 'users' array
      try {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userIndex = users.findIndex(u => u.username === user.username);

        if (userIndex !== -1) {
          users[userIndex] = { ...users[userIndex], ...updatedUser };
          localStorage.setItem('users', JSON.stringify(users));
        }
      } catch (e) {
        console.error("Failed to update user stats in storage", e);
      }
    }
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
