const _ = require('lodash');
const pickedUserForQuestion = (user) => {
  return _.pick(user, [
    'username',
    'firstName',
    'middleName'
  ])
};

module.exports = {
  pickedUserForQuestion,
}