const mongoose = require('mongoose');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
  email: { // Email пользователя
    type: String,
    required: true,
    unique: true,
    validate: [isEmail, { message: 'Email указан не верно.' }],
  },
  password: { // Хэш пароля пользователя
    type: String,
    required: true,
    select: false,
  },
  name: { // Имя пользователя
    type: String,
    required: true,
    maxlength: 30,
    minlength: 2,
  },
});

module.exports = mongoose.model('user', userSchema);
