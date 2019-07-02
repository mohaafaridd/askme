const express = require('express');

const auth = require('../middlewares/auth');

const usersController = require('../controllers/users');

const router = express.Router();

router.post('/register', usersController.postRegister);

router.post('/login', usersController.postLogin);

router.post('/logout', auth, usersController.postLogout);

router.get('/:id', usersController.getUser);

module.exports = router;