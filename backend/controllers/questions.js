const Question = require('../models/question');

const postQuestion = async (req, res) => {

  try {

    const question = new Question(req.body);

    await question.save();

    res.send({ success: true, message: 'Question Posted!', question });

  } catch (error) {

    res.send({ success: false, message: 'Question not posted!' });

  }

}

const getQuestion = async (req, res) => {

  try {

    const question = await Question.findOne({ id: req.params.id });

    res.send({ success: true, message: 'Question found!', question });

  } catch (error) {

    res.send({ success: false, message: 'Question not found!' });

  }

}

module.exports = {
  postQuestion,
  getQuestion
}
