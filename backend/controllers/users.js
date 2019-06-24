const User = require('../models/user');

const postRegister = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    res.cookie('auth', token, { maxAge: process.env.EXP_DATE });
    res.status(201).json({ success: true, message: 'user is created', user });
  } catch (error) {
    res.status(400).json({ success: false, message: 'failed creating user' });
  }
}

const postLogin = async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body);
    const token = await user.generateAuthToken();
    res.cookie('auth', token, { maxAge: process.env.EXP_DATE });
    res.status(200).json({ success: true, message: 'user has logged in', user });
  } catch (error) {
    res.status(400).json({ success: false, message: 'login failed' });
  }
}

module.exports = {
  postRegister,
  postLogin
}