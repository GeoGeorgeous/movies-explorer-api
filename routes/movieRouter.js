const movieRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { returnMovies, createMovie, deleteMovie } = require('../controllers/movies');
const urlRegExp = require('../utils/urlRegExp'); // Регулярное выражение для проверки URL

movieRouter.get('/', returnMovies); // возвращает все сохранённые пользователем фильмы

movieRouter.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi // страна создания фильма. Обязательное поле-строка.
      .string()
      .required(),
    director: Joi // режиссёр фильма. Обязательное поле-строка.
      .string()
      .required(),
    duration: Joi // длительность фильма. Обязательное поле-число.
      .number()
      .required(),
    year: Joi // год выпуска фильма. Обязательное поле-строка.
      .string()
      .required(),
    description: Joi // описание фильма. Обязательное поле-строка.
      .string()
      .required(),
    image: Joi // ссылка на постер к фильму. Обязательное поле-строка. [URL]
      .object()
      .required(),
    trailer: Joi // ссылка на трейлер фильма. Обязательное поле-строка. [URL]
      .string()
      .pattern(urlRegExp),
    thumbnail: Joi // миниатюрное изображение постера к фильму. Обязательное поле-строка. [URL]
      .string()
      .pattern(urlRegExp)
      .required(),
    nameRU: Joi // название фильма на русском языке. Обязательное поле-строка.
      .string()
      .required(),
    nameEN: Joi // название фильма на английском языке. Обязательное поле-строка.
      .string()
      .required(),
  }).unknown(true),
}), createMovie);

movieRouter.delete('/:id', celebrate({ // удаляет сохранённый фильм по _id
  params: Joi.object().keys({
    id: Joi
      .string()
      .alphanum()
      .hex()
      .length(24),
  }),
}), deleteMovie);

module.exports = movieRouter;
