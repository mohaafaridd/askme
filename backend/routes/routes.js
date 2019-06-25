const express = require('express');

const usersRoutes = require('./users');
const questionsRoutes = require('./questions');
const repliesRoutes = require('./replies');

const router = express.Router();

const connectRoutes = () => {

  router.use('/users', usersRoutes);

  router.use('/questions', questionsRoutes);

  router.use('/replies', repliesRoutes);

  return router;
}

module.exports = {
  connectRoutes,
}