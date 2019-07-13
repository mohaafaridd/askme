const _ = require('lodash')
const Reply = require('../models/reply');
const Question = require('../models/question');
const User = require('../models/user');

const replyHelpers = require('./helpers/replies');

const postReply = async (req, res) => {

  try {
    const io = req.app.get('io');

    const { reply: passedReply } = req.body;

    const question = await Question.findOne({ id: passedReply.question });

    const reply = new Reply(
      {
        content: passedReply.content,
        question: question._id,
        by: passedReply.by
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

    const question = await Question.findOne({ _id: reply.question });

    if (!question) {
      throw new Error();
    }

    const picked = replyHelpers.pickReply(reply, question);

    res.send({ success: true, message: 'Reply found!', picked });

  } catch (error) {

    res.send({ success: false, message: 'Reply not found!' });

  }

}

const updateReply = async (req, res) => {

  try {

    if ((req.body.reply.content.trim()).length < 2) {
      throw new Error();
    }

    const reply = await Reply.findOneAndUpdate(
      { id: req.body.reply.id },
      { content: req.body.reply.content },
      { new: true }
    );

    if (!reply) {
      throw new Error();
    }

    await reply.save();

    io.emit('newReply');

    res.send({ success: true, message: 'Reply edited!', reply });

  } catch (error) {

    res.send({ success: false, message: 'Reply not edited!' });

  }

}

const deleteReply = async (req, res) => {

  try {

    const reply = await Reply.findOneAndDelete({
      id: req.params.id,
    });

    if (!reply) {
      throw new Error();
    }

    await reply.remove();

    res.send({ success: true, message: 'Reply deleted!', reply });

  } catch (error) {

    res.send({ success: false, message: 'Reply not deleted!' });

  }

}

module.exports = {
  postReply,
  getReply,
  updateReply,
  deleteReply
}