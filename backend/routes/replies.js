const express = require('express');

const auth = require('../middlewares/auth');

const repliesController = require('../controllers/replies');

const router = express.Router();

router.post('/:question/create', auth, repliesController.postReply);

router.get('/user/:id', repliesController.getRepliesByUser);

router.get('/:question/:id', repliesController.getReply);

router.patch('/:question/:id', auth, repliesController.updateReply);

router.patch('/:question/:id', auth, repliesController.updateReply);

router.delete('/:question/:id', auth, repliesController.deleteReply);

module.exports = router;