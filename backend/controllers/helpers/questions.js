const _ = require('lodash')

const pickQuestion = (question) => {
  question.questioner = _.pick(question.questioner, ['firstName', 'middleName', 'username', '_id']);
  question.asked = _.pick(question.asked, ['firstName', 'middleName', 'username', '_id']);
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

    case 'pending': {
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