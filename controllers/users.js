const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const BadRequestError = require('../utils/errors/BadRequestError');
const ConflictError = require('../utils/errors/ConflictError');
const UnAuthorizedError = require('../utils/errors/UnAuthorizedError');
const { ERR_MSG } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;
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
      });
    })
    .catch((err) => {
      if (err.name === 'MongoError') {
        // Если уже используется
        throw new ConflictError(ERR_MSG.USER.EMAIL_ALREADY_IN_USE);
      } else {
        throw new BadRequestError(ERR_MSG.USER.BAD_REQUEST_SIGNUP_USER);
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
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res
        .send({ token });
    })
    .catch(() => {
      throw new UnAuthorizedError(ERR_MSG.USER.BAD_LOGIN);
    })
    .catch(next);
};

// Контроллер возвращает информацию о текущем пользователе:
const returnUser = (req, res, next) => {
  const requestedId = req.user._id; // Запрашиваемый ID берём из user;
  User.findById(requestedId)
    .orFail()
    .then((user) => { res.send(user); })
    .catch(next);
};

// Контроллер обновляет данные пользователя:
const updateUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .orFail(() => {
      throw new BadRequestError(ERR_MSG.USER.BAD_REQUEST_UPDATE_USER);
    })
    .then((updatedUser) => res.send(updatedUser))
    .catch(next);
};

module.exports = {
  returnUser, updateUser, login, signUpUser,
};
