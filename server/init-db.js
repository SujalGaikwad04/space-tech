const { Pool } = require('pg');
const connectionString = 'postgresql://neondb_owner:npg_elhiFY8n4bsO@ep-morning-shadow-aj6mgc3s-pooler.c-3.us-east-2.aws.neon.tech/neondb?sslmode=require';
const pool = new Pool({ connectionString, ssl: { rejectUnauthorized: false } });

async function init() {
    try {
        console.log('Creating users table...');
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
        console.log('Users table ready.');

        console.log('Creating event_reminders table...');
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
        console.log('Event reminders table ready.');
        process.exit(0);
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
}

init();
