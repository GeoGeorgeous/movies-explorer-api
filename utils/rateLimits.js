const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 100, // лимит на каждый IP адресс — до 100 запросов за windowMs
});

module.exports = limiter;
