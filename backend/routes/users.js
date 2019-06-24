const express = require('express');

const usersController = require('../controllers/users');

const router = express.Router();

router.get('/', (req, res) => { res.send('hi') })

router.post('/register', usersController.postRegister);

module.exports = router;