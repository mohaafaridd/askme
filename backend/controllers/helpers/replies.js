const _ = require('lodash');

const pickReply = reply => {
  reply.by = _.pick(reply.by, ['firstname', 'lastname', 'username', '_id']);

  return reply;
};

module.exports = {
  pickReply
};
