const express = require('express');

const usersController = require('../controllers/users');

const router = express.Router();

router.post('/register', usersController.postRegister);

router.post('/login', usersController.postLogin);

router.get('/:id', usersController.getProfile);

module.exports = router;