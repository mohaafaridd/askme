const Question = require('../models/question');

const postQuestion = async (req, res) => {
  const question = new Question(req.body);

  await question.save();

  res.json({ success: true, message: 'Question Posted!', question });
}

const getQuestion = async (req, res) => {
  try {

    const question = await Question.findOne({ id: req.params.id });

    res.json({ success: true, message: 'Question found!', question });

  } catch (error) {

    res.json({ success: false, message: 'Question not found!' });

  }
}

module.exports = {
  postQuestion,
  getQuestion
}
