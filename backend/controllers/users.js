const User = require('../models/user');

const postRegister = async (req, res) => {
  const user = new User(req.body);
  await user.save();
  const token = await user.generateAuthToken();
  res.cookie('auth', token, { maxAge: process.env.EXP_DATE });
  res.status(201).json({ user });
}

module.exports = {
  postRegister,
}