const express = require('express');
const router = express.Router();
const driveIds = require('../drive-ids');

router.get('/', async function(req, res, next) {
  res.json(await driveIds());
})

module.exports = router;