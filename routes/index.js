const express = require('express');
const router = express.Router();
const fileNames = require('../filenames');

/* GET home page. */
router.get('/', function (req, res, next) {
  const vars = {
    apiKey: process.env.GOOGLE_MAPS_API_KEY,
    environment: process.env.ENVIRONMENT,
    fileNames: fileNames
  }
  res.render('index', vars);
});

module.exports = router;
