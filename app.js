const express = require('express');
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
app.use('/', (req, res) => {
  console.log(res);
});

// Run App:
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
