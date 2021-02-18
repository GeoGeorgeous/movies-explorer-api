const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { isEmail } = require('validator'); // Валидатор для email

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

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль.'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильные почта или пароль.'));
          }
          return user; // теперь user доступен
        });
    });
};

module.exports = mongoose.model('user', userSchema);
