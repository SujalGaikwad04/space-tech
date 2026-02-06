require("dotenv").config();

const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const app = express();
const JWT_SECRET = process.env.JWT_SECRET;

// --------------------
// ✅ CORS (FIXED)
// --------------------
const allowedOrigins = [
  "https://space-tech-t2yl.vercel.app",
  "https://space-tech-t2yl-b55yqlgut-sujalgaikwad04s-projects.vercel.app",
  "http://localhost:5173",
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1 || origin.endsWith('.vercel.app')) {
        return callback(null, true);
      }
      return callback(new Error("CORS blocked: " + origin));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

app.options("*", cors());
app.use(express.json());

// --------------------
// ✅ VERCEL API PATH FIX
// --------------------
app.use((req, _res, next) => {
  if (req.url.startsWith("/api/")) {
    req.url = req.url.replace("/api", "");
  }
  next();
});

// --------------------
// ✅ DATABASE
// --------------------
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// --------------------
// ✅ HEALTH CHECK
// --------------------
app.get("/health", (_req, res) => {
  res.json({
    status: "OK",
    message: "Server is running with Neon PostgreSQL"
  });
});

// --------------------
// ✅ AUTH ROUTES
// --------------------
app.post("/auth/register", async (req, res) => {
  const { fullName, email, username, password } = req.body;

  if (!fullName || !email || !username || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  try {
    const exists = await pool.query(
      "SELECT id FROM users WHERE email=$1 OR username=$2",
      [email, username]
    );

    if (exists.rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users ("fullName", email, username, password)
       VALUES ($1,$2,$3,$4) RETURNING id`,
      [fullName, email, username, hashed]
    );

    const token = jwt.sign(
      { id: result.rows[0].id, email, username },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      success: true,
      token,
      user: { id: result.rows[0].id, fullName, email, username }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/auth/login", async (req, res) => {
  const { identifier, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE email=$1 OR username=$1",
      [identifier]
    );

    const user = result.rows[0];
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, email: user.email, username: user.username },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        username: user.username
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/auth/check-email/:email", async (req, res) => {
  const result = await pool.query(
    "SELECT id FROM users WHERE email=$1",
    [req.params.email]
  );
  res.json({ exists: result.rows.length > 0 });
});

app.get("/auth/check-username/:username", async (req, res) => {
  const result = await pool.query(
    "SELECT id FROM users WHERE username=$1",
    [req.params.username]
  );
  res.json({ exists: result.rows.length > 0 });
});

// --------------------
// ✅ EMAIL CONFIGURATION
// --------------------
const transporter = nodemailer.createTransport({
  host: "smtp-relay.gmail.com",
  port: 587,
  secure: false,
  debug: true, // Show detailed logs
  logger: true, // Log to console
  connectionTimeout: 10000, // 10 seconds
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Verify email configuration on startup
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Email (Nodemailer) verification failed:", error);
  } else {
    console.log("✅ Email (Nodemailer) is ready to send notifications");
  }
});

// --------------------
// ✅ MIDDLEWARE: AUTHENTICATE TOKEN
// --------------------
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Access denied" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
};

// --------------------
// ✅ REMINDER ROUTES
// --------------------

// Ensure reminders table exists
const initRemindersTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS reminders (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        event_title TEXT NOT NULL,
        event_date TEXT NOT NULL,
        event_time TEXT,
        event_description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("Reminders table ready");
  } catch (err) {
    console.error("Error creating reminders table:", err);
  }
};
initRemindersTable();

// ADD REMINDER
app.post("/reminders/add", authenticateToken, async (req, res) => {
  const { eventTitle, eventDate, eventTime, eventDescription, location } = req.body;
  const userId = req.user.id;
  const userEmail = req.user.email;
  const userName = req.user.username;

  try {
    // Check duplication
    const check = await pool.query(
      "SELECT id FROM reminders WHERE user_id=$1 AND event_title=$2 AND event_date=$3",
      [userId, eventTitle, eventDate]
    );

    if (check.rows.length > 0) {
      return res.status(400).json({ message: "Reminder already exists" });
    }

    // Insert reminder
    const result = await pool.query(
      `INSERT INTO reminders (user_id, event_title, event_date, event_time, event_description)
       VALUES ($1, $2, $3, $4, $5) RETURNING id`,
      [userId, eventTitle, eventDate, eventTime, eventDescription]
    );

    // Send Email
    const mailOptions = {
      from: `"SpaceScope" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: `SpaceScope Reminder: ${eventTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0b0d17; color: #ffffff; padding: 20px; border-radius: 10px;">
          <h2 style="color: #00d9ff; text-align: center;">🌌 SpaceScope Reminder</h2>
          <p>Hi ${userName},</p>
          <p>You've successfully set a reminder for:</p>
          <div style="background: #15192b; padding: 15px; border-radius: 8px; border-left: 4px solid #7000ff; margin: 20px 0;">
            <h3 style="margin: 0 0 10px 0; color: #e0e0ff;">${eventTitle}</h3>
            <p style="margin: 5px 0;"><strong>📅 Date:</strong> ${eventDate}</p>
            <p style="margin: 5px 0;"><strong>⏰ Time:</strong> ${eventTime || "All Night"}</p>
            <p style="margin: 5px 0;"><strong>📍 Location:</strong> ${location || "Your Location"}</p>
          </div>
          <p>We'll notify you again before the event starts!</p>
          <p style="text-align: center; margin-top: 30px; font-size: 12px; color: #888;">
            Keep looking up! 🔭<br>
            SpaceScope Team
          </p>
        </div>
      `
    };

    console.log(`📡 Attempting to send reminder email to: ${userEmail} for event: ${eventTitle}`);

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("❌ Email error for", userEmail, ":", error);
      } else {
        console.log("✅ Email sent to", userEmail, ":", info.response);
      }
    });

    res.status(201).json({
      success: true,
      message: "Reminder added and email sent",
      reminderId: result.rows[0].id
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// CHECK REMINDER
app.post("/reminders/check", authenticateToken, async (req, res) => {
  const { eventTitle, eventDate } = req.body;
  const userId = req.user.id;

  try {
    const result = await pool.query(
      "SELECT id FROM reminders WHERE user_id=$1 AND event_title=$2 AND event_date=$3",
      [userId, eventTitle, eventDate]
    );

    if (result.rows.length > 0) {
      res.json({ hasReminder: true, reminderId: result.rows[0].id });
    } else {
      res.json({ hasReminder: false });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET ALL REMINDERS
app.get("/reminders", authenticateToken, async (req, res) => {
  const userId = req.user.id;
  try {
    const result = await pool.query(
      "SELECT * FROM reminders WHERE user_id=$1 ORDER BY created_at DESC",
      [userId]
    );
    res.json({ success: true, reminders: result.rows });
  } catch (err) {
    console.error("Error fetching reminders:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// REMOVE REMINDER
app.delete("/reminders/:id", authenticateToken, async (req, res) => {
  const reminderId = req.params.id;
  const userId = req.user.id;

  try {
    await pool.query(
      "DELETE FROM reminders WHERE id=$1 AND user_id=$2",
      [reminderId, userId]
    );
    res.json({ success: true, message: "Reminder removed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// --------------------
// ✅ GAME & LEADERBOARD ROUTES
// --------------------

// GET LEADERBOARD
app.get("/leaderboard", async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;

  try {
    // Check if totalXP column exists first/handle migration if needed
    // For now assuming the column exists or we might fail if schema isn't updated.
    // Ideally we should add a migration script, but here we'll just query.
    // If you haven't added columns to users table yet, this heavily relies on them being there.
    // Based on user.jsx context, users seem to have totalXP locally.
    // We'll proceed assuming columns exist or we add them. 
    // Actually, let's ALTER table if needed in initialization or just run safely.

    // Safety check / lazy migration
    await pool.query(`
      ALTER TABLE users ADD COLUMN IF NOT EXISTS "totalXP" INTEGER DEFAULT 0;
      ALTER TABLE users ADD COLUMN IF NOT EXISTS level INTEGER DEFAULT 1;
      ALTER TABLE users ADD COLUMN IF NOT EXISTS "learningStreak" INTEGER DEFAULT 0;
    `);

    const result = await pool.query(
      `SELECT username, "totalXP", level, "learningStreak" 
       FROM users 
       ORDER BY "totalXP" DESC 
       LIMIT $1`,
      [limit]
    );

    res.json(result.rows);
  } catch (err) {
    console.error("Leaderboard error:", err);
    res.status(500).json({ message: "Server error fetching leaderboard" });
  }
});

// UPDATE USER STATS (XP)
app.patch("/user/stats", authenticateToken, async (req, res) => {
  const { totalXP, level, learningStreak } = req.body;
  const userId = req.user.id;

  if (totalXP === undefined) {
    return res.status(400).json({ message: "totalXP is required" });
  }

  try {
    const result = await pool.query(
      `UPDATE users 
       SET "totalXP" = COALESCE($1, "totalXP"),
           level = COALESCE($2, level),
           "learningStreak" = COALESCE($3, "learningStreak")
       WHERE id = $4
       RETURNING id, username, "totalXP", level, "learningStreak"`,
      [totalXP, level, learningStreak, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ success: true, user: result.rows[0] });
  } catch (err) {
    console.error("Update stats error:", err);
    res.status(500).json({ message: "Server error updating stats" });
  }
});

// --------------------
// ✅ ISS PROXY (HTTPS SAFE)
// --------------------
app.get("/iss-now", async (_req, res) => {
  try {
    const r = await fetch("https://api.open-notify.org/iss-now.json");
    res.json(await r.json());
  } catch (e) {
    res.status(500).json({ error: "ISS fetch failed" });
  }
});

// --------------------
// ✅ 404 HANDLER
// --------------------
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    path: req.path
  });
});

// --------------------
// ✅ EXPORT FOR VERCEL
// --------------------
module.exports = app;

// --------------------
// ✅ START SERVER (LOCAL)
// --------------------
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
