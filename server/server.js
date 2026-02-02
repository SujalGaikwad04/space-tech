const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';

// Middleware
app.use(cors());
app.use(express.json());

// Initialize SQLite database
const dbPath = path.join(__dirname, 'spacetech.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Connected to SQLite database');
    initializeDatabase();
  }
});

// Initialize database tables
function initializeDatabase() {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fullName TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      learningStreak INTEGER DEFAULT 0,
      totalXP INTEGER DEFAULT 0,
      level INTEGER DEFAULT 1,
      progress INTEGER DEFAULT 0
    )
  `, (err) => {
    if (err) {
      console.error('Error creating users table:', err);
    } else {
      console.log('Users table ready');
    }
  });
}

// Middleware to verify JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
}

// Registration endpoint
app.post('/api/auth/register', async (req, res) => {
  const { fullName, email, username, password } = req.body;

  // Validation
  if (!fullName || !email || !username || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (username.length < 3) {
    return res.status(400).json({ message: 'Username must be at least 3 characters' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters' });
  }

  try {
    // Check if user already exists
    db.get(
      'SELECT * FROM users WHERE email = ? OR username = ?',
      [email, username],
      async (err, existingUser) => {
        if (err) {
          return res.status(500).json({ message: 'Database error' });
        }

        if (existingUser) {
          return res.status(400).json({ message: 'Username or email already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user
        db.run(
          'INSERT INTO users (fullName, email, username, password) VALUES (?, ?, ?, ?)',
          [fullName, email, username, hashedPassword],
          function (err) {
            if (err) {
              return res.status(500).json({ message: 'Error creating user' });
            }

            // Generate JWT token
            const token = jwt.sign(
              { id: this.lastID, username, email },
              JWT_SECRET,
              { expiresIn: '7d' }
            );

            res.status(201).json({
              success: true,
              message: 'Registration successful',
              token,
              user: {
                id: this.lastID,
                fullName,
                email,
                username,
                learningStreak: 0,
                totalXP: 0,
                level: 1,
                progress: 0
              }
            });
          }
        );
      }
    );
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Login endpoint
app.post('/api/auth/login', (req, res) => {
  const { identifier, password } = req.body;

  if (!identifier || !password) {
    return res.status(400).json({ message: 'Email/Username and password are required' });
  }

  db.get(
    'SELECT * FROM users WHERE email = ? OR username = ?',
    [identifier, identifier],
    async (err, user) => {
      if (err) {
        return res.status(500).json({ message: 'Database error' });
      }

      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Compare password
      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Generate JWT token
      const token = jwt.sign(
        { id: user.id, username: user.username, email: user.email },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.json({
        success: true,
        message: 'Login successful',
        token,
        user: {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          username: user.username,
          learningStreak: user.learningStreak,
          totalXP: user.totalXP,
          level: user.level,
          progress: user.progress
        }
      });
    }
  );
});

// Get user profile (protected route)
app.get('/api/user/profile', authenticateToken, (req, res) => {
  db.get(
    'SELECT id, fullName, email, username, learningStreak, totalXP, level, progress, createdAt FROM users WHERE id = ?',
    [req.user.id],
    (err, user) => {
      if (err) {
        return res.status(500).json({ message: 'Database error' });
      }

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json({ user });
    }
  );
});

// Update user stats (protected route)
app.patch('/api/user/stats', authenticateToken, (req, res) => {
  const { learningStreak, totalXP, level, progress } = req.body;

  db.run(
    'UPDATE users SET learningStreak = ?, totalXP = ?, level = ?, progress = ? WHERE id = ?',
    [learningStreak, totalXP, level, progress, req.user.id],
    function (err) {
      if (err) {
        return res.status(500).json({ message: 'Error updating stats' });
      }

      res.json({ success: true, message: 'Stats updated successfully' });
    }
  );
});

// Check username availability
app.get('/api/auth/check-username/:username', (req, res) => {
  const { username } = req.params;

  db.get('SELECT id FROM users WHERE username = ?', [username], (err, user) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }

    res.json({ exists: !!user });
  });
});

// Check email availability
app.get('/api/auth/check-email/:email', (req, res) => {
  const { email } = req.params;

  db.get('SELECT id FROM users WHERE email = ?', [email], (err, user) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }

    res.json({ exists: !!user });
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err);
    } else {
      console.log('Database connection closed');
    }
    process.exit(0);
  });
});
