const _ = require('lodash')

const pickReply = (reply) => {

  reply.by = _.pick(reply.by, [
    'firstName',
    'middleName',
    'username'
  ]);

  return reply;

};

module.exports = {
  pickReply,
}