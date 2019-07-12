const _ = require('lodash')
const User = require('../models/user');
const Question = require('../models/question');
const Reply = require('../models/reply');

const questionHelpers = require('./helpers/questions');

const postQuestion = async (req, res) => {

  try {

    const io = req.app.get('io');

    const question = new Question({
      content: req.body.content,
      questioner: req.body.questioner,
      asked: req.body.asked,
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
    const rawQuestion = await Question.findOne({ id });

    if (!rawQuestion) {
      throw new Error();
    }

    await rawQuestion.populate('questioner').execPopulate();
    await rawQuestion.populate('asked').execPopulate();
    await rawQuestion.populate('replies').execPopulate();

    /* Question Picking */
    const pickedQuestion = questionHelpers.pickQuestion(rawQuestion);

    res.send({ success: true, message: 'Question found!', question: pickedQuestion });

  } catch (error) {

    res.send({ success: false, message: 'Question not found!', error });

  }

}

const getQuestionsByUser = async (req, res) => {

  const { username } = req.params;
  try {

    const user = await User.findOne({ username });

    if (!user) {
      throw new Error();
    }

    const questions = await Question.find({ questioner: user._id });

    if (!questions) {
      throw new Error();
    }

    const populateRequests = questions.map(question => question.populate('replies').execPopulate());

    const populated = await Promise.all(populateRequests);

    const picked = populated.map(question => questionHelpers.pickQuestion(question));

    res.send({ success: true, message: `All questions by user ${username} found`, questions: picked });

  } catch (error) {

    res.send({ success: false, message: `No questions for user ${username} were found!` });

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
