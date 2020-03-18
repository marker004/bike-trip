var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  const vars = { apiKey: process.env.GOOGLE_MAPS_API_KEY, environment: process.env.ENVIRONMENT }
  res.render('index', vars);
});

module.exports = router;
