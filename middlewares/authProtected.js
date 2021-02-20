const jwt = require('jsonwebtoken');
const UnAuthorizedError = require('../utils/errors/UnAuthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;

/*
* Проверяет наличие токена в заголовках
* Извелкает и верифицирует его
*/
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  // Ошибка, если нет authorization в headers / нет Bearer в начале
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnAuthorizedError();
  }

  // Извлечём token
  const token = authorization.replace('Bearer ', '');
  let payload;

  // Верифицируем токен
  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
    );
  } catch (err) {
    throw new UnAuthorizedError();
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
