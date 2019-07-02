const _ = require('lodash');

const User = require('../models/user');

const postRegister = async (req, res) => {

  try {

    let duplicateTest = await User.findOne({ username: req.body.username });

    if (duplicateTest) {
      throw new Error('duplicated username');
    }

    duplicateTest = await User.findOne({ email: req.body.email });

    if (duplicateTest) {
      throw new Error('duplicated email');
    }

    const user = new User(req.body);

    await user.save();

    const token = await user.generateAuthToken();

    res.cookie('auth', token, { maxAge: process.env.EXP_DATE });

    res.status(201).json({ success: true, message: 'user is created', user, token });

  } catch (error) {

    res.status(400).json({ success: false, message: 'failed creating user', cause: error.message });

  }

}

const postLogin = async (req, res) => {

  try {

    const user = await User.findByCredentials(req.body);

    const token = await user.generateAuthToken();

    res.cookie('auth', token, { maxAge: process.env.EXP_DATE });

    res.status(200).json({ success: true, message: 'user has logged in', user, token });

  } catch (error) {

    res.status(400).json({ success: false, message: 'login failed' });

  }

}

const getUser = async (req, res) => {

  try {
    const { id } = req.params;

    const user = await User.findOne({ username: id });

    const picked = _.pick(user, ['id', 'firstName', 'middleName', 'username', 'createdAt']);

    res.json({ success: true, message: 'user found', user: picked });

  } catch {

    res.json({ success: false, message: 'user not found' });

  }

}

const postLogout = async (req, res) => {

  try {

    req.user.tokens = req.user.tokens
      .filter(token => token.token !== req.token);

    res.clearCookie('auth');

    await req.user.save();

    res.json({ success: true, message: 'user has logged out' });

  } catch (error) {

    res.status(500).json({ success: false, message: 'Error logging out' });

  }

};

module.exports = {
  postRegister,
  postLogin,
  getUser,
  postLogout
}