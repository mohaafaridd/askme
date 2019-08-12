const _ = require('lodash')

const pickReply = (reply) => {

  reply.by = _.pick(reply.by, [
    'firstName',
    'middleName',
    'username',
    '_id'
  ]);

  return reply;

};

module.exports = {
  pickReply,
}