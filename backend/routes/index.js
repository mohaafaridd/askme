const express = require('express');

const auth = require('../middlewares/auth');
const check = require('../middlewares/check');

const router = express.Router();

router.post('/', check, (req, res) => {
  res.json({
    success: true,
    message: 'Home',
    user: req.user || null,
    token: req.token || null
  })
});

module.exports = router;