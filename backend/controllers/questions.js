const Question = require('../models/question');
const Reply = require('../models/reply');

const postQuestion = async (req, res) => {

  try {

    const question = new Question({ question: req.body.question, asker: req.user.id });

    await question.save();

    res.send({ success: true, message: 'Question posted!', question });

  } catch (error) {

    res.send({ success: false, message: 'Question not posted!' });

  }

}

const getQuestion = async (req, res) => {

  try {

    const question = await Question.findOne({ id: req.params.id });

    if (!question) {

      throw new Error();

    }

    const reply = await Reply.find({ question: req.params.id });

    res.send({ success: true, message: 'Question found!', question, reply });

  } catch (error) {

    res.send({ success: false, message: 'Question not found!' });

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

    const question = await Question.findOneAndDelete({ id: req.params.id, asker: req.user.id });

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
  updateQuestion,
  deleteQuestion
}