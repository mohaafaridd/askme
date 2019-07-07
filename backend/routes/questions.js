const express = require('express');

const auth = require('../middlewares/auth');

const questionsController = require('../controllers/questions');

const router = express.Router();

router.post('/create', auth, questionsController.postQuestion);

router.get('/:id', questionsController.getQuestion);

router.get('/pinding/:username', questionsController.getUnansweredQuestions);

router.get('/user/:username', questionsController.getQuestionsByUser);

router.patch('/:id', auth, questionsController.updateQuestion);

router.delete('/:id', auth, questionsController.deleteQuestion);

module.exports = router;