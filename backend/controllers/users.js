const User = require('../models/user');
const Question = require('../models/question');

const postRegister = async (req, res) => {

  try {

    const user = new User(req.body);

    await user.save().catch(error => {
      console.log('err' + error);
    });

    const token = await user.generateAuthToken();

    res.cookie('auth', token, { maxAge: process.env.EXP_DATE });

    return res.status(201).json({ success: true, message: 'user is created', user });

  } catch (error) {

    return res.status(400).json({ success: false, message: 'failed creating user', error });

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

    const user = await User.findOne({ username: id });

    const questions = await Question.find({ asker: user.id });

    res.json({ success: true, message: 'user found', user, questions });

  } catch {

    res.json({ success: false, message: 'user not found' });

  }

}

module.exports = {
  postRegister,
  postLogin,
  getProfile
}