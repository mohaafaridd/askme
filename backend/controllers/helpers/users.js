const _ = require('lodash');
const pickedUserForQuestion = user => {
  return _.pick(user, ['username', 'firstname', 'lastname']);
};

module.exports = {
  pickedUserForQuestion
};
