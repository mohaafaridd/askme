const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 15,
    trim: true,
    match: /^[a-zA-Z]+$/,
  },

  middleName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 15,
    trim: true,
    match: /^[a-zA-Z]+$/,
  },

  username: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 15,
    unique: true,
    trim: true,
    match: /^\w([-.]?\w)+\w$/,
    lowercase: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Invalid Email');
      }
    },
  },

  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 100,
  },

  tokens: [{
    token: {
      type: String,
      required: true,
    },
  }],
}, {
    timestamps: true
  });

userSchema.virtual('questions', {
  ref: 'Question',
  localField: '_id',
  foreignField: 'questioner'
});

userSchema.virtual('replies', {
  ref: 'Reply',
  localField: '_id',
  foreignField: 'by'
});

userSchema.plugin(AutoIncrement, { id: 'user_counter', inc_field: 'id' });

userSchema.pre('save', async function preSaveOperation(next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

userSchema.static('findByCredentials', async ({ input, password }) => {
  let user;
  if (validator.isEmail(input)) {
    user = await User.findOne({ email: input });
  } else {
    user = await User.findOne({ username: input });
  }

  if (!user) {
    throw new Error('Unable to login!');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Unable to login!');
  }

  return user;
});

userSchema.method('generateAuthToken', async function generateAuthToken() {
  const user = this;
  const token = jwt
    .sign({ _id: user._id.toString() },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.EXP_DATE,
      });
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
});

const User = mongoose.model('User', userSchema);

module.exports = User;