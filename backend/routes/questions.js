const express = require('express');

const questionsController = require('../controllers/questions');

const router = express.Router();

router.post('/create', questionsController.postQuestion);

router.get('/:id', questionsController.getQuestion);

module.exports = router;