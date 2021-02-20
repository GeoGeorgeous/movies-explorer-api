const { isCelebrateError } = require('celebrate');
const BadRequestError = require('../utils/errors/BadRequestError');
const { ERR_MSG } = require('../utils/constants');

module.exports = (err, req, res, next) => {
  if (isCelebrateError(err)) {
    throw new BadRequestError(ERR_MSG.BAD_REQUEST);
  }

  return next(err);
};
