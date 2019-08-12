const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Reply = require('./reply');
const questionSchema = mongoose.Schema({
  content: {
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

questionSchema.pre('remove', async function (next) {
  const question = this
  await Reply.deleteMany({ question: question._id })
  next()
})

questionSchema.plugin(AutoIncrement, { id: 'question_counter', inc_field: 'id' });

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;