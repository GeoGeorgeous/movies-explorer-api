/* ----- @group импорты */
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
// const { errors } = require('celebrate');
const authProtected = require('./middlewares/authProtected');
const userRouter = require('./routes/userRouter');
const movieRouter = require('./routes/movieRouter');
const authRouter = require('./routes/authRouter');
const NotFoundError = require('./utils/errors/NotFoundError');
const celebrateErrorHandler = require('./middlewares/celebrateErrorHandler'); // Кастомный error handler для JOI / celebrate
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

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
const { PORT = 3000 } = process.env;
const app = express();
/* ----- ----- */

/* ----- @group rate limiter */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
/* ----- ----- */

/* ----- @group база данных */
mongoose.connect('mongodb://localhost:27017/movie-explorer', { // Подключение БД
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
/* ----- ----- */

/* ----- @group мидлверы */
app.use(limiter);
app.use(helmet());
app.use(cors()); // CORS
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());
app.use(requestLogger); // Логгер
/* ----- ----- */

/* ----- @group роутинг */
app.use('/', authRouter); // Роутинг авторазиции
app.use('/users', authProtected, userRouter); // Роутинг пользователей
app.use('/movies', authProtected, movieRouter); // Роутинг карточек
app.use('*', () => { // Роутинг 404
  throw new NotFoundError('Запрашиваемый ресурс не найден.');
});
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
