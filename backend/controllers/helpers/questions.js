const _ = require('lodash')

const pickQuestion = (question) => {
  return _.pick(question,
    ['_id',
      'id',
      'content',
      'createdAt',
      'questioner',
      'asked',
      'replies'
    ]
  );
};

module.exports = {
  pickQuestion,
}