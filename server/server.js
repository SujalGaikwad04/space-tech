require('dotenv').config();

const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';

// Middleware
const allowedOrigins = [
  "https://space-tech-t2yl.vercel.app",
  "https://space-tech-t2yl-b55yqlgut-sujalgaikwad04s-projects.vercel.app",
  "https://space-tech-l4nokgff3-sujalgaikwad04s-projects.vercel.app",
  "https://space-tech-git-main-sujalgaikwad04s-projects.vercel.app",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:3000"
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    } else {
      console.log("Blocked by CORS:", origin);
      return callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.options("*", cors()); // IMPORTANT for preflight
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

// Initialize PostgreSQL database connection
// Prioritize environment variable or use provided fallback
const connectionString = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_elhiFY8n4bsO@ep-morning-shadow-aj6mgc3s-pooler.c-3.us-east-2.aws.neon.tech/neondb?sslmode=require';

const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  console.log('Connected to Neon PostgreSQL database');
  release();
  initializeDatabase();
});

// Initialize database tables
async function initializeDatabase() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        "fullName" TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "learningStreak" INTEGER DEFAULT 0,
        "totalXP" INTEGER DEFAULT 0,
        level INTEGER DEFAULT 1,
        progress INTEGER DEFAULT 0
      );
    `);
    console.log('Users table ready');

    await pool.query(`
      CREATE TABLE IF NOT EXISTS event_reminders (
        id SERIAL PRIMARY KEY,
        "userId" INTEGER NOT NULL,
        "eventTitle" TEXT NOT NULL,
        "eventDate" TEXT NOT NULL,
        "eventTime" TEXT,
        "eventDescription" TEXT,
        "eventIcon" TEXT,
        location TEXT,
        "reminderSent" BOOLEAN DEFAULT FALSE,
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE CASCADE
      );
    `);
    console.log('Event reminders table ready');
  } catch (err) {
    console.error('Error initializing database:', err);
  }
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

// Root route for testing
app.get('/', (req, res) => {
  res.json({
    message: 'Space Tech Backend API',
    status: 'running',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth/*',
      reminders: '/api/reminders/*',
      iss: '/api/iss-now'
    }
  });
});

// Test route
app.get('/test', (req, res) => {
  res.json({ message: 'Test route working!', timestamp: new Date().toISOString() });
});

// Registration endpoint

app.post('/auth/register', async (req, res) => {
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
    const userCheck = await pool.query(
      'SELECT * FROM users WHERE email = $1 OR username = $2',
      [email, username]
    );

    if (userCheck.rows.length > 0) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    const newUser = await pool.query(
      'INSERT INTO users ("fullName", email, username, password) VALUES ($1, $2, $3, $4) RETURNING id',
      [fullName, email, username, hashedPassword]
    );

    const newUserId = newUser.rows[0].id;

    // Generate JWT token
    const token = jwt.sign(
      { id: newUserId, username, email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      token,
      user: {
        id: newUserId,
        fullName,
        email,
        username,
        learningStreak: 0,
        totalXP: 0,
        level: 1,
        progress: 0
      }
    });

  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login endpoint
app.post('/auth/login', async (req, res) => {
  const { identifier, password } = req.body;

  if (!identifier || !password) {
    return res.status(400).json({ message: 'Email/Username and password are required' });
  }

  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1 OR username = $2',
      [identifier, identifier]
    );

    const user = result.rows[0];

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
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user profile (protected route)
app.get('/user/profile', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, "fullName", email, username, "learningStreak", "totalXP", level, progress, "createdAt" FROM users WHERE id = $1',
      [req.user.id]
    );

    const user = result.rows[0];

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user });
  } catch (err) {
    console.error('Profile Error:', err);
    res.status(500).json({ message: 'Database error' });
  }
});

// Update user stats (protected route)
app.patch('/user/stats', authenticateToken, async (req, res) => {
  const { learningStreak, totalXP, level, progress } = req.body;

  try {
    await pool.query(
      'UPDATE users SET "learningStreak" = $1, "totalXP" = $2, level = $3, progress = $4 WHERE id = $5',
      [learningStreak, totalXP, level, progress, req.user.id]
    );
    res.json({ success: true, message: 'Stats updated successfully' });
  } catch (err) {
    console.error('Update Stats Error:', err);
    res.status(500).json({ message: 'Error updating stats' });
  }
});

// Check username availability
app.get('/auth/check-username/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const result = await pool.query('SELECT id FROM users WHERE username = $1', [username]);
    res.json({ exists: result.rows.length > 0 });
  } catch (err) {
    res.status(500).json({ message: 'Database error' });
  }
});

// Check email availability
app.get('/auth/check-email/:email', async (req, res) => {
  const { email } = req.params;
  try {
    const result = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    res.json({ exists: result.rows.length > 0 });
  } catch (err) {
    res.status(500).json({ message: 'Database error' });
  }
});

// Add event reminder endpoint (protected route)
app.post('/reminders/add', authenticateToken, async (req, res) => {
  const { eventTitle, eventDate, eventTime, eventDescription, eventIcon, location } = req.body;

  if (!eventTitle || !eventDate) {
    return res.status(400).json({ message: 'Event title and date are required' });
  }

  try {
    // Get user email
    const userResult = await pool.query('SELECT email, "fullName" FROM users WHERE id = $1', [req.user.id]);
    const user = userResult.rows[0];

    if (!user) {
      return res.status(500).json({ message: 'Error fetching user data' });
    }

    // Insert reminder
    const insertResult = await pool.query(
      `INSERT INTO event_reminders ("userId", "eventTitle", "eventDate", "eventTime", "eventDescription", "eventIcon", location) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
      [req.user.id, eventTitle, eventDate, eventTime, eventDescription, eventIcon, location]
    );

    const reminderId = insertResult.rows[0].id;

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
        return res.json({
          success: true,
          message: 'Reminder added successfully (email notification failed)',
          reminderId: reminderId
        });
      }

      res.json({
        success: true,
        message: 'Reminder added and email sent successfully',
        reminderId: reminderId
      });
    });

  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's reminders (protected route)
app.get('/reminders', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM event_reminders WHERE "userId" = $1 ORDER BY "eventDate" ASC',
      [req.user.id]
    );
    res.json({ reminders: result.rows });
  } catch (err) {
    console.error('Get Reminders Error:', err);
    res.status(500).json({ message: 'Error fetching reminders' });
  }
});

// Remove event reminder (protected route)
app.delete('/reminders/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'DELETE FROM event_reminders WHERE id = $1 AND "userId" = $2',
      [id, req.user.id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Reminder not found' });
    }

    res.json({ success: true, message: 'Reminder removed successfully' });
  } catch (err) {
    console.error('Delete Reminder Error:', err);
    res.status(500).json({ message: 'Error removing reminder' });
  }
});

// Check if user has reminder for specific event (protected route)
app.post('/reminders/check', authenticateToken, async (req, res) => {
  const { eventTitle, eventDate } = req.body;

  try {
    const result = await pool.query(
      'SELECT id FROM event_reminders WHERE "userId" = $1 AND "eventTitle" = $2 AND "eventDate" = $3',
      [req.user.id, eventTitle, eventDate]
    );

    res.json({ hasReminder: result.rows.length > 0, reminderId: result.rows[0]?.id });
  } catch (err) {
    console.error('Check Reminder Error:', err);
    res.status(500).json({ message: 'Error checking reminder' });
  }
});

// Proxy endpoint for ISS data (avoids mixed content issues)
app.get('/iss-now', async (req, res) => {
  try {
    // Dynamic import for node-fetch if needed or use global fetch in Node 18+
    const response = await fetch("http://api.open-notify.org/iss-now.json");
    if (!response.ok) throw new Error('Upstream API failed');
    const data = await response.json();
    res.json(data);
  } catch (e) {
    console.error("ISS Proxy Error:", e);
    res.status(500).json({ error: e.message });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running with Neon PostgreSQL' });
});

// Start reminder scheduler (checks every minute)
// Start reminder scheduler (checks every 10 seconds for faster testing)
setInterval(() => {
  const checkReminders = async () => {
    try {
      const result = await pool.query('SELECT * FROM event_reminders WHERE "reminderSent" = FALSE');
      const reminders = result.rows;
      const today = new Date();

      for (const reminder of reminders) {
        // Parse event date (stored as "Month DD, YYYY" string)
        const eventDate = new Date(reminder.eventDate);

        // Check if event is today
        if (
          eventDate.getDate() === today.getDate() &&
          eventDate.getMonth() === today.getMonth() &&
          eventDate.getFullYear() === today.getFullYear()
        ) {
          // Get user email
          const userRes = await pool.query('SELECT email, "fullName" FROM users WHERE id = $1', [reminder.userId]);
          const user = userRes.rows[0];

          if (!user) continue;

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

          transporter.sendMail(mailOptions, async (emailErr, info) => {
            if (!emailErr) {
              // Mark as sent
              await pool.query('UPDATE event_reminders SET "reminderSent" = TRUE WHERE id = $1', [reminder.id]);
              console.log(`Reminder sent for event: ${reminder.eventTitle} to ${user.email}`);
            } else {
              console.error("Email error:", emailErr);
            }
          });
        }
      }
    } catch (e) {
      console.error("Scheduler Error:", e);
    }
  };

  checkReminders();
}, 10000); // Check every 10 seconds

// Export the app for Vercel
module.exports = app;

// Only listen if running directly (not imported as a module/function)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/api/health`);
  });
}

// Graceful shutdown
process.on('SIGINT', () => {
  pool.end(() => {
    console.log('PostgreSQL pool has ended');
    process.exit(0);
  });
});
