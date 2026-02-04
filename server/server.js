require('dotenv').config();

const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';

// Middleware
app.use(cors());
app.use(express.json());

// Email transporter configuration
const emailUser = process.env.EMAIL_USER || 'your-email@gmail.com';
const emailPass = process.env.EMAIL_PASSWORD || 'your-app-password';

if (emailUser === 'your-email@gmail.com' || emailUser.includes('your-email')) {
  console.warn('\x1b[33m%s\x1b[0m', '⚠️ WARNING: You have not configured your email credentials in server/.env');
  console.warn('\x1b[33m%s\x1b[0m', '   Email notifications will NOT work until you set EMAIL_USER and EMAIL_PASSWORD.');
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: emailUser,
    pass: emailPass
  }
});


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

  // Create event_reminders table
  db.run(`
    CREATE TABLE IF NOT EXISTS event_reminders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER NOT NULL,
      eventTitle TEXT NOT NULL,
      eventDate TEXT NOT NULL,
      eventTime TEXT,
      eventDescription TEXT,
      eventIcon TEXT,
      location TEXT,
      reminderSent BOOLEAN DEFAULT 0,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    )
  `, (err) => {
    if (err) {
      console.error('Error creating event_reminders table:', err);
    } else {
      console.log('Event reminders table ready');
    }
  });
}

// Middleware to verify token (supports both JWT and simple tokens)
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ message: 'Access token required' });
  }

  // Check if it's a Bearer token (JWT) or simple token
  if (authHeader.startsWith('Bearer ')) {
    // JWT token
    const token = authHeader.split(' ')[1];
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid token' });
      }
      req.user = user;
      next();
    });
  } else {
    // Simple base64 token (for localStorage-based auth)
    try {
      const decoded = Buffer.from(authHeader, 'base64').toString('utf-8');
      const user = JSON.parse(decoded);

      if (!user.id || !user.username) {
        return res.status(403).json({ message: 'Invalid token format' });
      }

      req.user = user;
      next();
    } catch (error) {
      return res.status(403).json({ message: 'Invalid token' });
    }
  }
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

// Add event reminder endpoint (protected route)
app.post('/api/reminders/add', authenticateToken, async (req, res) => {
  const { eventTitle, eventDate, eventTime, eventDescription, eventIcon, location } = req.body;

  if (!eventTitle || !eventDate) {
    return res.status(400).json({ message: 'Event title and date are required' });
  }

  try {
    // Get user email
    db.get('SELECT email, fullName FROM users WHERE id = ?', [req.user.id], (err, user) => {
      if (err || !user) {
        return res.status(500).json({ message: 'Error fetching user data' });
      }

      // Insert reminder into database
      db.run(
        `INSERT INTO event_reminders (userId, eventTitle, eventDate, eventTime, eventDescription, eventIcon, location) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [req.user.id, eventTitle, eventDate, eventTime, eventDescription, eventIcon, location],
        function (err) {
          if (err) {
            console.error('Error adding reminder:', err);
            return res.status(500).json({ message: 'Error adding reminder' });
          }

          // Send confirmation email
          const mailOptions = {
            from: process.env.EMAIL_USER || 'your-email@gmail.com',
            to: user.email,
            subject: `🌌 Event Reminder Set: ${eventTitle}`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%); color: #fff; padding: 30px; border-radius: 10px;">
                <h1 style="color: #00d4ff; text-align: center; margin-bottom: 20px;">
                  ${eventIcon || '🌟'} Event Reminder Confirmed
                </h1>
                
                <div style="background: rgba(255,255,255,0.05); padding: 20px; border-radius: 8px; border-left: 4px solid #00d4ff;">
                  <h2 style="color: #00d4ff; margin-top: 0;">Hi ${user.fullName}!</h2>
                  <p style="font-size: 16px; line-height: 1.6;">
                    You've successfully set a reminder for the following celestial event:
                  </p>
                  
                  <div style="background: rgba(0,212,255,0.1); padding: 15px; border-radius: 6px; margin: 20px 0;">
                    <h3 style="color: #00d4ff; margin-top: 0;">${eventTitle}</h3>
                    <p style="margin: 5px 0;"><strong>📅 Date:</strong> ${eventDate}</p>
                    ${eventTime ? `<p style="margin: 5px 0;"><strong>⏰ Time:</strong> ${eventTime}</p>` : ''}
                    ${location ? `<p style="margin: 5px 0;"><strong>📍 Location:</strong> ${location}</p>` : ''}
                    ${eventDescription ? `<p style="margin: 10px 0 0 0;">${eventDescription}</p>` : ''}
                  </div>
                  
                  <p style="font-size: 14px; color: #a0a0a0; margin-top: 20px;">
                    We'll send you a reminder closer to the event date. Don't miss this amazing celestial phenomenon!
                  </p>
                </div>
                
                <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1);">
                  <p style="color: #a0a0a0; font-size: 12px;">
                    Keep exploring the cosmos with Social Tech Space Platform
                  </p>
                </div>
              </div>
            `
          };

          transporter.sendMail(mailOptions, (emailErr, info) => {
            if (emailErr) {
              console.error('Error sending email:', emailErr);
              // Still return success even if email fails
              return res.json({
                success: true,
                message: 'Reminder added successfully (email notification failed)',
                reminderId: this.lastID
              });
            }

            res.json({
              success: true,
              message: 'Reminder added and email sent successfully',
              reminderId: this.lastID
            });
          });
        }
      );
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's reminders (protected route)
app.get('/api/reminders', authenticateToken, (req, res) => {
  db.all(
    'SELECT * FROM event_reminders WHERE userId = ? ORDER BY eventDate ASC',
    [req.user.id],
    (err, reminders) => {
      if (err) {
        return res.status(500).json({ message: 'Error fetching reminders' });
      }

      res.json({ reminders });
    }
  );
});

// Remove event reminder (protected route)
app.delete('/api/reminders/:id', authenticateToken, (req, res) => {
  const { id } = req.params;

  db.run(
    'DELETE FROM event_reminders WHERE id = ? AND userId = ?',
    [id, req.user.id],
    function (err) {
      if (err) {
        return res.status(500).json({ message: 'Error removing reminder' });
      }

      if (this.changes === 0) {
        return res.status(404).json({ message: 'Reminder not found' });
      }

      res.json({ success: true, message: 'Reminder removed successfully' });
    }
  );
});

// Check if user has reminder for specific event (protected route)
app.post('/api/reminders/check', authenticateToken, (req, res) => {
  const { eventTitle, eventDate } = req.body;

  db.get(
    'SELECT id FROM event_reminders WHERE userId = ? AND eventTitle = ? AND eventDate = ?',
    [req.user.id, eventTitle, eventDate],
    (err, reminder) => {
      if (err) {
        return res.status(500).json({ message: 'Error checking reminder' });
      }

      res.json({ hasReminder: !!reminder, reminderId: reminder?.id });
    }
  );
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Start reminder scheduler (checks every minute)
setInterval(() => {
  const checkReminders = () => {
    db.all('SELECT * FROM event_reminders WHERE reminderSent = 0', (err, reminders) => {
      if (err) {
        return console.error('Error checking reminders:', err);
      }

      const today = new Date();

      reminders.forEach(reminder => {
        try {
          // Parse event date (stored as "Month DD, YYYY" string)
          const eventDate = new Date(reminder.eventDate);

          // Check if event is today
          if (
            eventDate.getDate() === today.getDate() &&
            eventDate.getMonth() === today.getMonth() &&
            eventDate.getFullYear() === today.getFullYear()
          ) {
            // Get user email
            db.get('SELECT email, fullName FROM users WHERE id = ?', [reminder.userId], (err, user) => {
              if (err || !user) return;

              // Send Notification Email
              const mailOptions = {
                from: process.env.EMAIL_USER || 'your-email@gmail.com',
                to: user.email,
                subject: `🔔 HUMANS! Your Event is TODAY: ${reminder.eventTitle}`,
                html: `
                  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0e27; color: #fff; padding: 30px; border-radius: 10px; border: 1px solid #00d4ff;">
                    <h1 style="color: #00d4ff; text-align: center;">🚀 Event Liftoff Today!</h1>
                    
                    <div style="padding: 20px; background: rgba(255,255,255,0.05); border-radius: 8px; margin: 20px 0;">
                      <h2 style="margin: 0 0 10px 0;">${reminder.eventTitle}</h2>
                      <p style="font-size: 18px; margin: 5px 0;">${reminder.eventIcon || '🌟'} This event is happening today!</p>
                      
                      <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1);">
                        <p><strong>Time:</strong> ${reminder.eventTime || 'Check local listing'}</p>
                        <p><strong>Location:</strong> ${reminder.location || 'Sky overhead'}</p>
                        ${reminder.eventDescription ? `<p><strong>Details:</strong> ${reminder.eventDescription}</p>` : ''}
                      </div>

                      <div style="text-align: center; margin-top: 30px;">
                        <a href="http://localhost:3000/dashboard" style="background: #00d4ff; color: #000; padding: 12px 24px; text-decoration: none; border-radius: 25px; font-weight: bold;">View on Dashboard</a>
                      </div>
                    </div>
                  </div>
                `
              };

              transporter.sendMail(mailOptions, (emailErr, info) => {
                if (!emailErr) {
                  // Mark as sent
                  db.run('UPDATE event_reminders SET reminderSent = 1 WHERE id = ?', [reminder.id]);
                  console.log(`Reminder sent for event: ${reminder.eventTitle} to ${user.email}`);
                }
              });
            });
          }
        } catch (e) {
          console.error("Error processing reminder date:", e);
        }
      });
    });
  };

  checkReminders();
}, 60000); // Check every 60 seconds

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
