const express = require('express');
const router = express.Router();
const filenames = require('../filenames')

router.get('/', function(req, res, next) {
  res.json(filenames);
})

module.exports = router;