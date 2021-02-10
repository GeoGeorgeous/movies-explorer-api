/* ----- @group импорты */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRouter = require('./routes/userRouter');
const movieRouter = require('./routes/movieRouter');
const NotFoundError = require('./utils/errors/NotFoundError');
const celebrateErrorHandler = require('./middlewares/celebrateErrorHandler'); // Кастомный error handler для JOI / celebrate
const errorHandler = require('./middlewares/errorHandler');

// Для дебага (если нужно проверить работу валидатора запросов и получить подробную ошибку):
//   1. Расскоментить строку ниже, чтобы включить встроенную проверку ошибок JOI / Celebrate
//   const { errors } = require('celebrate');
//   2. Закомментить celebrateErrorHandler;
//   3. Расскоментить app.use(errors());
/* ----- ----- */

/* ----- @group порт и express */
const { PORT = 3000 } = process.env;
const app = express();
/* ----- ----- */

/* ----- @group мидлверы */
app.use(cors()); // CORS
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());
// app.use(requestLogger); // Логгер
/* ----- ----- */

/* ----- @group роутинг */
// app.use('/', authRouter);
app.use('/users', userRouter); // Роутинг пользователей
app.use('/movies', movieRouter); // Роутинг карточек
app.use('*', () => { // Роутинг 404
  throw new NotFoundError('Запрашиваемый ресурс не найден.');
});
/* ----- ----- */

/* ----- @group обработка ошибок */
// app.use(errors()); <- Включить для проверки ошибок JOI / Celebrate
app.use(celebrateErrorHandler);
app.use(errorHandler);
/* ----- ----- */

/* ----- @group run app */
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
/* ----- ----- */
