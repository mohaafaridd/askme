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

  // The one who asked the question
  questioner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },

  // the one who get asked
  asked: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },

}, {
    timestamps: true
  });

questionSchema.virtual('replies', {
  ref: 'Reply',
  localField: '_id',
  foreignField: 'question'
});

questionSchema.plugin(AutoIncrement, { id: 'question_counter', inc_field: 'id' });

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;