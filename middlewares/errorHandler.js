const { ERR_MSG } = require('../utils/constants');

module.exports = (err, req, res, next) => {
  console.log(err);
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? ERR_MSG.SERVER_ISSUE
        : message,
    });
  next();
};
