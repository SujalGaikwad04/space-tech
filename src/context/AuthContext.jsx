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

  const value = {
    user,
    loading,
    register,
    login,
    logout,
    checkUsernameExists,
    checkEmailExists,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
