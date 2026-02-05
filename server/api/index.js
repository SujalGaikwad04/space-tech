// Vercel serverless function entry point
// This imports the Express app and exports it as a serverless function handler

const app = require('../server.js');

// Export the Express app directly for Vercel
// Vercel will automatically wrap it with the serverless handler
module.exports = app;

