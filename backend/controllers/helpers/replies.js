const _ = require('lodash')

const pickReply = (reply, question) => {
  return {
    'questionId': question._id,
    'question': question.content,
    'questionDate': question.createdAt,
    'questioner': question.questioner,

    'replyId': reply._id,
    'reply': reply.content,
    'replyDate': reply.createdAt,
    'by': reply.by
  }
};

module.exports = {
  pickReply,
}