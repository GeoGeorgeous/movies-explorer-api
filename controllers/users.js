const User = require('../models/user.js');
const BadRequestError = require('../utils/errors/BadRequestError');

// Контроллер Возвращает информацию о текущем пользователе:
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
  returnUser, updateUser,
};
