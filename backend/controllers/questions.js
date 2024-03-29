const _ = require('lodash');
const User = require('../models/user');
const Question = require('../models/question');

const questionsHelpers = require('./helpers/questions');

const postQuestion = async (req, res) => {
  try {
    const question = new Question({
      content: req.body.question.content,
      questioner: req.body.question.questioner,
      asked: req.body.question.asked
    });
    await question.save();
    res.send({ success: true, message: 'Question posted!', question });
  } catch (error) {
    res.send({ success: false, message: 'Question not posted!', error });
  }
};

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
    const pickedQuestion = questionsHelpers.pickQuestion(rawQuestion);

    res.send({
      success: true,
      message: 'Question found!',
      question: pickedQuestion
    });
  } catch (error) {
    res.send({ success: false, message: 'Question not found!', error });
  }
};

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

    // Call connected replies
    const populateRequests = questions.map(question =>
      question.populate('replies').execPopulate()
    );
    await Promise.all(populateRequests);

    // Call connected user
    const questionerRequests = questions.map(question =>
      question.populate('questioner').execPopulate()
    );
    await Promise.all(questionerRequests);

    // Call connected user
    const askedRequests = questions.map(question =>
      question.populate('asked').execPopulate()
    );
    await Promise.all(askedRequests);

    // Picking the questions to fit the model
    const picked = questions.map(question =>
      questionsHelpers.pickQuestion(question)
    );

    res.send({
      success: true,
      message: `All questions by user ${username} found`,
      questions: picked
    });
  } catch (error) {
    res.send({
      success: false,
      message: `No questions for user ${username} were found!`
    });
  }
};

const getIncomingQuestions = async (req, res) => {
  try {
    const { username } = req.params;
    const { state } = req.query;

    const user = await User.findOne({ username });

    /* we are using asked to search for the questions that were sent TO this user */
    const questions = await Question.find({ asked: user._id });

    // Call connected replies
    const populateRequests = questions.map(question =>
      question.populate('replies').execPopulate()
    );
    await Promise.all(populateRequests);

    // Call connected user
    const questionerRequests = questions.map(question =>
      question.populate('questioner').execPopulate()
    );
    await Promise.all(questionerRequests);

    // Picking the questions to fit the model
    const picked = questions.map(question =>
      questionsHelpers.pickQuestion(question)
    );

    // Return filtered array with whether all answered questions or pending ones
    const filtered = questionsHelpers.filterOnState(state, picked);

    res.send({
      success: true,
      message: `All questions answered by user ${username}`,
      questions: filtered
    });
  } catch (error) {
    res.send({ success: false, message: `Error finding questions`, error });
  }
};

const updateQuestion = async (req, res) => {
  try {
    if (req.body.question.content.trim().length < 2) {
      throw new Error();
    }

    const question = await Question.findOneAndUpdate(
      { id: req.body.question.id },
      { content: req.body.question.content },
      { new: true }
    );

    if (!question) {
      throw new Error();
    }

    await question.save();

    res.send({ success: true, message: 'Question edited!', question });
  } catch (error) {
    res.send({ success: false, message: 'Question not edited!' });
  }
};

const deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findOneAndDelete({ id: req.params.id });

    if (!question) {
      throw new Error();
    }

    await question.remove();

    res.send({ success: true, message: 'Question deleted!', question });
  } catch (error) {
    res.send({ success: false, message: 'Question not deleted!' });
  }
};

module.exports = {
  postQuestion,
  getQuestion,
  getQuestionsByUser,
  getIncomingQuestions,
  updateQuestion,
  deleteQuestion
};
