var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { apiKey: process.env.GOOGLE_MAPS_API_KEY });
});

module.exports = router;
