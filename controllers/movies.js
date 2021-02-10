const Movie = require('../models/movie');
const BadRequestError = require('../utils/errors/BadRequestError');
const NotFoundError = require('../utils/errors/NotFoundError');
const ForbiddenError = require('../utils/errors/ForbiddenError');

const returnMovies = (req, res, next) => { // возвращает все сохранённые пользователем фильмы
  const owner = req.user._id; // ID пользователя, отправляющий запрос
  Movie.find({ owner })
    .orFail(() => {
      throw new NotFoundError('Сохранённые фильмы не найдены.');
    })
    .then((movies) => {
      res.status(200).send(movies);
    })
    .catch(next);
};

const createMovie = (req, res, next) => { // создаёт фильм с переданными в теле данными
  const {
    country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail,
  } = req.body; // переданные данные
  const owner = req.user._id; // ID пользователя, отправляющий запрос
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    owner,
  })
    .then((newMovie) => res
      .status(200)
      .send(newMovie))
    .catch(() => {
      throw new BadRequestError('Не получилось добавить фильм, проверьте переданные данные.');
    })
    .catch(next);
};

const deleteMovie = (req, res, next) => { // удаляет сохранённый фильм по _id
  const requestedMovieId = req.params.id; // ID фильма, который нужно удалить
  const userId = req.user._id; // ID пользователя, отправляющий запрос
  Movie.findById(requestedMovieId)
    .then((requestedMovie) => {
      // Если пользователь, отправляющий запрос владелец фильма,
      // то фильм можно удалить:
      if (requestedMovie.owner.toString() === userId) {
        Movie.findByIdAndRemove(requestedMovieId) // Удаляем фильм
          .orFail()
          .then(() => res.send({ message: `Фильм «${requestedMovie.nameRU}» успешно удалён из коллекции сохранённых.` }))
          .catch(next);
      } else {
        throw new ForbiddenError('Вы не можете удалять чужие фильмы.');
      }
    })
    .catch(() => { throw new NotFoundError('Не получилось найти нужный фильм, проверьте _id фильма.'); })
    .catch(next);
};

module.exports = {
  returnMovies, createMovie, deleteMovie,
};
