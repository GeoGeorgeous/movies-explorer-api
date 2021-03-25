const mongoose = require('mongoose');
const urlRegExp = require('../utils/urlRegExp'); // Регулярное выражение для проверки URL

const movieSchema = new mongoose.Schema({
  country: { // страна создания фильма
    type: String,
    required: true,
  },
  director: { // режиссёр фильма
    type: String,
    required: true,
  },
  duration: { // длительность фильма
    type: Number,
    required: true,
  },
  year: { // год выпуска фильма
    type: String,
    required: true,
  },
  description: { // описание фильма
    type: String,
    required: true,
  },
  image: { // ссылка на постер к фильму [URL]
    type: Object,
    required: true,
  },
  trailer: { // ссылка на трейлер фильма [URL]
    type: String,
    validate: {
      validator(url) {
        return urlRegExp.test(url);
      },
      message: 'URL адрес для трейлера фильма указан некорректно.',
    },
  },
  thumbnail: { // миниатюрное изображение постера к фильму [URL]
    type: String,
    required: true,
    validate: {
      validator(url) {
        return urlRegExp.test(url);
      },
      message: 'URL адрес для thumbnail-изображения постера указан некорректно.',
    },
  },
  owner: { // _id пользователя, который сохранил статью
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  id: { // id фильма, который содержится в ответе сервиса MoviesExplorer
    type: Number,
    required: true,
    unique: true,
  },
  nameRU: { // название фильма на русском языке
    type: String,
    required: true,
  },
  nameEN: { // название фильма на английском языке
    type: String,
    required: true,
  },

});

module.exports = mongoose.model('movie', movieSchema);
