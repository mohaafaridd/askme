const express = require('express');

const auth = require('../middlewares/auth');

const repliesController = require('../controllers/replies');

const router = express.Router();

router.post('/create', auth, repliesController.postReply);

// router.get('/user/:username', repliesController.getRepliesByUser);

router.get('/:id', repliesController.getReply);

router.patch('/:id', auth, repliesController.updateReply);

router.delete('/:id', auth, repliesController.deleteReply);

module.exports = router;