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
  "http://localhost:5173"
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // allow Postman/curl
      if (allowedOrigins.includes(origin)) return callback(null, true);
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
