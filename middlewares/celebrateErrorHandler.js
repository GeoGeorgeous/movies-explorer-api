const { isCelebrateError } = require('celebrate');
const BadRequestError = require('../utils/errors/BadRequestError');

module.exports = (err, req, res, next) => {
  if (isCelebrateError(err)) {
    throw new BadRequestError('Отправлен неправильный запрос.');
  }

  return next(err);
};
