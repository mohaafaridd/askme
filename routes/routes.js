const express = require('express');

const usersRoutes = require('./users');
const questionsRoutes = require('./questions');
const repliesRoutes = require('./replies');
const indexRoutes = require('./index');

const router = express.Router();

const connectRoutes = () => {

  router.use('/users', usersRoutes);

  router.use('/questions', questionsRoutes);

  router.use('/replies', repliesRoutes);

  router.use('/', indexRoutes);

  return router;
}

module.exports = {
  connectRoutes,
}