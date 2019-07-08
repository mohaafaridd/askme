const _ = require('lodash')
const Reply = require('../models/reply');
const Question = require('../models/question');
const User = require('../models/user');

const postReply = async (req, res) => {

  try {
    const io = req.app.get('io');


    const question = await Question.findOne({ id: req.body.question });

    const reply = new Reply(
      {
        reply: req.body.reply,
        question: question._id,
        questioner: question.questioner,
        replier: question.asked
      }
    );

    await reply.save();

    io.emit('newReply');

    res.send({ success: true, message: 'Reply posted!', reply });

  } catch (error) {

    res.send({ success: false, message: 'Reply not posted!' });

  }

}

const getReply = async (req, res) => {

  try {

    const reply = await Reply.findOne({ id: req.params.id });

    if (!reply) {

      throw new Error();

    }

    res.send({ success: true, message: 'Reply found!', reply });

  } catch (error) {

    res.send({ success: false, message: 'Reply not found!' });

  }

}

const getRepliesByUser = async (req, res) => {

  try {

    const { username } = req.params;

    const user = await User.findOne({ username });

    let replies = await Reply.find({ replier: user._id });

    await Promise.all(replies.map(reply => reply.populate('question').execPopulate()));

    replies = replies.map((reply) => _.pick(reply, ['_id', 'id', 'question', 'reply', 'questioner', 'replier', 'createdAt']));

    replies = replies.map((reply) => {
      reply.question = reply.question.question;
      return reply;
    });

    const x = _.groupBy(replies, 'question');
    const output = [];
    Object.keys(x).forEach(key => {
      const object = {
        question: key,
        replies: x[key].map(reply => ({ reply: reply }))
      }

      output.push(object);
    });

    // replies = _.groupBy(replies, 'question');

    if (!replies) {
      throw new Error('empty');
    }

    res.send({ success: true, message: 'Replies found!', replies: output });

  } catch (error) {

    res.send({ success: false, message: 'Replies not found!', error });

  }

}

const updateReply = async (req, res) => {

  try {

    if ((req.body.reply.trim()).length < 2) {
      throw new Error();
    }

    const reply = await Reply.findOneAndUpdate(
      {
        id: req.params.id,
        replier: req.user.id,
        question: req.params.question
      },
      { reply: req.body.reply },
      { new: true }
    );

    if (!reply) {

      throw new Error();

    }

    res.send({ success: true, message: 'Reply edited!', reply });

  } catch (error) {

    res.send({ success: false, message: 'Reply not edited!' });

  }

}

const deleteReply = async (req, res) => {

  try {

    const reply = await Reply.findOneAndDelete({
      id: req.params.id,
      replier: req.user.id,
      question: req.params.question
    });

    if (!reply) {

      throw new Error();

    }

    res.send({ success: true, message: 'Reply deleted!', reply });

  } catch (error) {

    res.send({ success: false, message: 'Reply not deleted!' });

  }

}

module.exports = {
  postReply,
  getReply,
  getRepliesByUser,
  updateReply,
  deleteReply
}