const express = require('express');

const auth = require('../middlewares/auth');

const questionsController = require('../controllers/questions');

const router = express.Router();

router.post('/create', auth, questionsController.postQuestion);

router.get('/pinding/:username', questionsController.getPindingQuestions);

router.get('/user/:username', questionsController.getQuestionsByUser);

router.get('/:id', questionsController.getQuestion);

router.patch('/:id', auth, questionsController.updateQuestion);

router.delete('/:id', auth, questionsController.deleteQuestion);

module.exports = router;