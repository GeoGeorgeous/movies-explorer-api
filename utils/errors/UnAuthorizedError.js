class UnAuthorizedError extends Error {
  constructor() {
    super();
    this.message = 'Необходима авторизация.';
    this.statusCode = 401;
  }
}

module.exports = UnAuthorizedError;
