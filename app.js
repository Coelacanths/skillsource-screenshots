// Require dependencies
const express = require('express');
const path = require('path');
const puppeteer = require('puppeteer');
const pssg = require('pssg');
const cloudinary = require('cloudinary');

// Require or set configurations 
let cloudinarySettings = null;
if (require('./config/cloudinary.js')) {
  cloudinarySettings = require('./config/cloudinary.js');
} else {
  cloudinarySettings = {
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
  };
}

// Set constants
const PORT = process.env.PORT || 3000;

// Configure cloudinary
cloudinary.config(cloudinarySettings);
// Initialize express app
const app = express();

// Logging middleware
app.use(`*`, (req, res, next) => {
  console.log(`Request type ${req.method} received for ${req.originalUrl}`);
  next();
});

// ROUTE: Request a screenshot
app.get(`/api/screenshots/*`, (req, res) => {
  const url = req.params[0];
  const host = url.split('.')[1];

  pssg.base64(url)
  .then((b64) => {
    cloudinary.uploader.upload('data:image/png;base64,' + b64, (results) => {
      res.send(results);
    });
  }).catch((err) => {
    res.send(`Error`);
  })

});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
