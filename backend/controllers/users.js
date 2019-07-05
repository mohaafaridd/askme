const _ = require('lodash');

const User = require('../models/user');

const postRegister = async (req, res) => {

  try {
    let passedUser = req.body.user;

    let duplicateTest = await User.findOne({ username: passedUser.username });

    if (duplicateTest) {
      throw new Error('duplicated username');
    }

    duplicateTest = await User.findOne({ email: passedUser.email });

    if (duplicateTest) {
      throw new Error('duplicated email');
    }

    const user = new User(passedUser);

    await user.save();

    const token = await user.generateAuthToken();

    res.cookie('token', token, { maxAge: process.env.EXP_DATE });

    res.status(201).send({ success: true, message: 'user is created', user, token });

  } catch (error) {

    res.status(400).send({ success: false, message: 'failed creating user', cause: error.message });

  }

}

const postLogin = async (req, res) => {
  try {

    let passedUser = req.body.user;

    const user = await User.findByCredentials(passedUser);

    const token = await user.generateAuthToken();

    res.cookie('token', token, { maxAge: process.env.EXP_DATE });

    res.status(200).send({ success: true, message: 'user has logged in', user, token });

  } catch (error) {

    res.status(400).send({ success: false, message: 'Login failed' });

  }

}

const getUser = async (req, res) => {

  try {
    const { id } = req.params;

    const user = await User.findOne({ username: id });

    const picked = _.pick(user, ['id', 'firstName', 'middleName', 'username', 'createdAt']);

    res.send({ success: true, message: 'user found', user: picked });

  } catch {

    res.send({ success: false, message: 'user not found' });

  }

}

const postLogout = async (req, res) => {

  try {

    const { user: passedUser, token: passedToken } = req.body;

    const user = await User.findOne({ id: passedUser.id });

    user.tokens = user.tokens.filter(token => token.token !== passedToken);

    await user.save();

    res.clearCookie('token');

    res.clearCookie('user');

    await req.user.save();

    res.send({ success: true, message: 'user has logged out' });

  } catch (error) {

    res.status(500).send({ success: false, message: 'Error logging out' });

  }

};

module.exports = {
  postRegister,
  postLogin,
  getUser,
  postLogout
}