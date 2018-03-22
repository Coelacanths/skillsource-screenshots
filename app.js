// Require dependencies
const express = require('express');
const puppeteer = require('puppeteer');

// Initialize express app
const app = express();

// Logging middleware
app.use(`*`, (req, res, next) => {
  console.log(`Request type ${req.method} received for ${req.originalUrl}`);
  next();
});

// Routes
// Request a screenshot
app.get(`/api/screenshots/*`, (req, res) => {
  // Open connection with puppeteer

  // Save screenshot to tempFiles

  // Once screenshot completely saved, upload to cloudinary
  
  // Respond with cloudinary-provided location data
});

app.listen(3000, () => {
  console.log(`Server listening on port 3000`);
});
