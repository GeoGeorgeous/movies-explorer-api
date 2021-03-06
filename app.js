/* ----- @group импорты */
const express = require('express');
require('dotenv').config();
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const limiter = require('./utils/rateLimits');
const mainRouter = require('./routes/index');
// const { errors } = require('celebrate');
const celebrateErrorHandler = require('./middlewares/celebrateErrorHandler'); // Кастомный error handler для JOI / celebrate
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const CFG = require('./utils/config');

// Для дебага —
// если нужно проверить работу валидатора запросов JOI / Celebrate
// и получить подробную ошибку:
//      1. Расскоментить строку:
//          const { errors } = require('celebrate');
//          чтобы включить встроенную проверку ошибок JOI / Celebrate
//      2. Закомментить celebrateErrorHandler;
//      3. Расскоментить app.use(errors());
/* ----- ----- */

/* ----- @group порт и express */
const {
  PORT = CFG.PORT,
  MONGO = CFG.MONGO,
} = process.env;
const app = express();
/* ----- ----- */

/* ----- @group база данных */
mongoose.connect(MONGO, { // Подключение БД
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
/* ----- ----- */

/* ----- @group мидлверы */
app.use(requestLogger); // Логгер
app.use(limiter);
app.use(helmet());
app.use(cors()); // CORS
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());
/* ----- ----- */

/* ----- @group роутинг */
app.use('/', mainRouter);
/* ----- ----- */

/* ----- @group логгирование и обработка ошибок */
app.use(errorLogger);
// app.use(errors()); // <- Включить для проверки ошибок JOI / Celebrate
app.use(celebrateErrorHandler);
app.use(errorHandler);
/* ----- ----- */

/* ----- @group run app */
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
/* ----- ----- */
