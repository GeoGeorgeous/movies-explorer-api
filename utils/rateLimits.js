const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 500, // лимит на каждый IP адресс — до 500 запросов за windowMs
});

module.exports = limiter;
