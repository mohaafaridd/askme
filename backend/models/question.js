const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const questionSchema = mongoose.Schema({
  question: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 200,
    trim: true,
  },

  asker: {
    type: String,
    required: true,
  },

  asked: {
    type: String,
    required: true,
  },

  replies: [
    {
      type: String,
      replier: String,
    }
  ]

}, {
    timestamps: true
  });

questionSchema.plugin(AutoIncrement, { id: 'question_counter', inc_field: 'id' });

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;