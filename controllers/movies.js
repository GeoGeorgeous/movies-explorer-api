const Movie = require('../models/movie');
const BadRequestError = require('../utils/errors/BadRequestError');
const NotFoundError = require('../utils/errors/NotFoundError');
const ForbiddenError = require('../utils/errors/ForbiddenError');
const { ERR_MSG, RESPONSE_MSG } = require('../utils/constants');

const returnMovies = (req, res, next) => { // возвращает все сохранённые пользователем фильмы
  const owner = req.user._id; // ID пользователя, отправляющий запрос
  Movie.find({ owner })
    .orFail(() => {
      throw new NotFoundError(ERR_MSG.MOVIES.NO_MOVIES_FOUND);
    })
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

const createMovie = (req, res, next) => { // создаёт фильм с переданными в теле данными
  const {
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
    movieId,
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
    movieId,
    owner,
  })
    .then((newMovie) => res
      .send(newMovie))
    .catch(() => {
      throw new BadRequestError(ERR_MSG.MOVIES.BAD_REQUEST_ADD_MOVIE);
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
        requestedMovie.remove() // Удаляем фильм
          .then(() => res.send({ message: RESPONSE_MSG.MOVIES.DELETE_SUCCESS(requestedMovie) }))
          .catch(next);
      } else {
        throw new ForbiddenError(ERR_MSG.MOVIES.DELETE_FORBIDDEN);
      }
    })
    .catch(() => { throw new NotFoundError(ERR_MSG.MOVIES.NO_MOVIE_BY_ID); })
    .catch(next);
};

module.exports = {
  returnMovies, createMovie, deleteMovie,
};
