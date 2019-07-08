const _ = require('lodash')
const User = require('../models/user');
const Question = require('../models/question');
const Reply = require('../models/reply');

const postQuestion = async (req, res) => {

  try {

    const io = req.app.get('io');

    const { questioner, asked } = req.body;

    const question = new Question({
      question: req.body.question,
      questioner,
      asked
    });

    await question.save();

    io.emit('newQuestion');

    res.send({ success: true, message: 'Question posted!', question });

  } catch (error) {

    res.send({ success: false, message: 'Question not posted!', error });

  }

}

const getQuestion = async (req, res) => {

  try {

    const { id } = req.params;
    let question = await Question.findOne({ id });
    await question.populate('questioner').execPopulate();
    await question.populate('asked').execPopulate();
    await question.populate('replies').execPopulate();

    question = _.pick(question, ['_id', 'id', 'question', 'questioner', 'asked', 'replies', 'createdAt'])

    if (!question) {

      throw new Error();

    }

    res.send({ success: true, message: 'Question found!', question });

  } catch (error) {

    res.send({ success: false, message: 'Question not found!', error });

  }

}

const getQuestionsByUser = async (req, res) => {

  const { username } = req.params;
  try {


    const user = await User.findOne({ username });

    let questions = await Question.find({ questioner: user._id });

    await Promise.all(questions.map(question => question.populate('replies').execPopulate()));

    questions = questions.map((question) => _.pick(question, ['_id', 'id', 'question', 'questioner', 'asked', 'replies', 'createdAt']));

    if (!questions) {
      throw new Error();
    }

    res.send({ success: true, message: `All questions by user ${username} found`, questions });

  } catch (error) {

    res.send({ success: false, message: `No questions for user ${username} were found!`, error });

  }

}

const getUnansweredQuestions = async (req, res) => {

  try {

    const { username } = req.params;

    const user = await User.findOne({ username });

    /* we are using asked to search for the questions that were sent TO this user */
    let questions = await Question.find({ asked: user._id });

    await Promise.all(questions.map(question => question.populate('replies').execPopulate()));

    questions = questions.map((question) => _.pick(question, ['_id', 'id', 'question', 'questioner', 'asked', 'replies', 'createdAt']));

    questions = questions.filter((question) => question.replies.length === 0)

    res.send({ success: true, message: `All unanswered questions to user ${username} found`, questions });

  } catch (error) {

    res.send({ success: false, message: `Error finding questions`, error });

  }

}

const updateQuestion = async (req, res) => {

  try {

    if ((req.body.question.trim()).length < 2) {
      throw new Error();
    }

    const question = await Question.findOneAndUpdate(
      { id: req.params.id, asker: req.user.id },
      { question: req.body.question },
      { new: true }
    );

    if (!question) {

      throw new Error();

    }

    res.send({ success: true, message: 'Question edited!', question });

  } catch (error) {

    res.send({ success: false, message: 'Question not edited!' });

  }

}

const deleteQuestion = async (req, res) => {

  try {

    const question = await Question.findOneAndDelete(
      { id: req.params.id, asker: req.user.id }
    );

    if (!question) {

      throw new Error();

    }

    res.send({ success: true, message: 'Question deleted!', question });

  } catch (error) {

    res.send({ success: false, message: 'Question not deleted!' });

  }

}

module.exports = {
  postQuestion,
  getQuestion,
  getQuestionsByUser,
  getUnansweredQuestions,
  updateQuestion,
  deleteQuestion
}
