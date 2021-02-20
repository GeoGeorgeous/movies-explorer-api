const { ERR_MSG } = require('../constants');

class UnAuthorizedError extends Error {
  constructor(message = ERR_MSG.MUST_AUTH) {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = UnAuthorizedError;
