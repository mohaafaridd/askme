const express = require('express');
const usersRoutes = require('./users');

const router = express.Router();

const connectRoutes = () => {
  router.use('/users', usersRoutes);
  return router;
}

module.exports = {
  connectRoutes,
}