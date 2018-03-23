// Require dependencies
const express = require('express');
const path = require('path');
const pssg = require('pssg');
const cloudinary = require('cloudinary');
const cors = require('cors');

// Require or set configurations
let cloudinarySettings = null;

if (process.env.CLOUD_NAME) {
  cloudinarySettings = {
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
  };
} else {
  cloudinarySettings = require('./config/cloudinary.js');
}


// Set constants
const PORT = process.env.PORT || 4200;

// Configure cloudinary
cloudinary.config(cloudinarySettings);
// Initialize express app
const app = express();

app.use(cors());

// Logging middleware
app.use(`*`, (req, res, next) => {
  console.log(`Request type ${req.method} received for ${req.originalUrl}`);
  next();
});

// ROUTE: Request a screenshot
app.get(`/api/screenshot/*`, (req, res) => {
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

// Bounce all other requests
app.all(`*`, (req, res, next) => {
  res.send(`Request type not supported.`);
  next();
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
