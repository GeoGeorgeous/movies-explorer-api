const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const BadRequestError = require('../utils/errors/BadRequestError');
const ConflictError = require('../utils/errors/ConflictError');

// POST Создаёт пользователя
const signUpUser = (req, res, next) => {
  // хешируем пароль
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      email: req.body.email,
      password: hash,
      name: req.body.name,
    }))
    .then((user) => {
      res.status(201).send({
        _id: user._id,
        email: user.email,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
      });
    })
    .catch((err) => {
      if (err.name === 'MongoError') {
        // Если уже используется
        throw new ConflictError('Данный email уже зарегистрирован.');
      } else {
        throw new BadRequestError('Не получилось зарегистрировать пользователя, проверьте переданные данные. ');
      }
    })
    .catch(next);
};

// Получает из запроса почту и пароль и проверяет их.
// Если почта и пароль правильные, контроллер создаёт JWT сроком на неделю.
const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        'some-secret-key',
        { expiresIn: '7d' },
      );
      res
        .status(200)
        .send({ token });
    })
    .catch(() => {
      throw new BadRequestError('Неверный пароль или email');
    })
    .catch(next);
};

// Контроллер возвращает информацию о текущем пользователе:
const returnUser = (req, res, next) => {
  const requestedId = req.user._id; // Запрашиваемый ID берём из user;
  User.findById(requestedId)
    .orFail()
    .then((user) => { res.status(200).send(user); })
    .catch(next);
};

// Контроллер обновляет данные пользователя:
const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(() => {
      throw new BadRequestError('Не получилось обновить данные пользователя, проверьте переданные данные.');
    })
    .then((updatedUser) => res.send({ data: updatedUser }))
    .catch(next);
};

module.exports = {
  returnUser, updateUser, login, signUpUser,
};
