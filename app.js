const express = require('express');
const userRouter = require('./routes/userRouter');
const movieRouter = require('./routes/movieRouter');

// const bodyParser = require('body-parser');
// const { errors } = require('celebrate'); <- Включить для проверки ошибок JOI / Celebrate
// const cors = require('cors');

const { PORT = 3000 } = process.env;
const app = express();

// // Милдверы:
// app.use(cors()); // CORS
// app.use(bodyParser.urlencoded({ // Парсер
//   extended: true,
// }));
// app.use(bodyParser.json()); // Парсер
// app.use(requestLogger); // Логгер

// Роутинг:
// app.use('/', authRouter);
app.use('/users', userRouter); // Роутинг пользователей
app.use('/movies', movieRouter); // Роутинг карточек
app.use('*', () => { // Роутинг 404
  // throw new NotFoundError('Запрашиваемый ресурс не найден.');
});

// Run App:
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
