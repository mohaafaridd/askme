const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const replySchema = mongoose.Schema({
  reply: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 200,
    trim: true,
  },

  question: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Question'
  },

  by: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
}, {
    timestamps: true
  });

replySchema.plugin(AutoIncrement, { inc_field: 'id' });

const Reply = mongoose.model('Reply', replySchema);

module.exports = Reply;