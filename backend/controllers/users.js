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

const getProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ id });

    // const questions = await user.populate('questions').execPopulate();
    // const replies = await user.populate('replies').execPopulate();

    res.json({ success: true, message: 'user found', user });
  } catch {
    res.json({ success: false, message: 'user not found' });
  }
}

module.exports = {
  postRegister,
  postLogin,
  getProfile
}