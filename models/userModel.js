const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Podaj swoje imie!'],
    trim: true,
    maxlength: 25,
  },
  email: {
    type: String,
    required: [true, 'Email jest wymagany!'],
    validate: [validator.isEmail, 'Wprowadź poprawny adres email'],
    lowercase: true,
    unique: [true, 'Email jest jest zajęty'],
  },
  password: {
    type: String,
    required: [true, 'Podaj hasło'],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Proszę powtórz hasło'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Hasła są różne',
    },
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
const User = mongoose.model('User', userSchema);

module.exports = User;
