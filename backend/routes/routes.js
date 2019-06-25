const express = require('express');

const usersRoutes = require('./users');
const questionsRoutes = require('./questions');

const router = express.Router();

const connectRoutes = () => {

  router.use('/users', usersRoutes);

  router.use('/questions', questionsRoutes);

  return router;
}

module.exports = {
  connectRoutes,
}