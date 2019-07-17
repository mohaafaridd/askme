const _ = require('lodash')

const pickQuestion = (question) => {
  question.questioner = _.pick(question.questioner, ['firstName', 'middleName', 'username']);
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

const filterOnState = (state, questions) => {
  switch (state) {
    case 'answered': {
      return questions.filter(question => question.replies.length !== 0);
    }

    case 'pinding': {
      return questions.filter(question => question.replies.length === 0);
    }

    default: {
      return questions;
    }
  }
}

module.exports = {
  pickQuestion,
  filterOnState
}