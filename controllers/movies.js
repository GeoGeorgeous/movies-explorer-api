const Movie = require('../models/movie');
const BadRequestError = require('../utils/errors/BadRequestError');
const NotFoundError = require('../utils/errors/NotFoundError');
const ForbiddenError = require('../utils/errors/ForbiddenError');

const returnMovies = (req, res, next) => { // возвращает все сохранённые пользователем фильмы
  Movie.find({})
    .then((movies) => {
      res.status(200).send(movies);
    })
    .catch(next);
};

const createMovie = (req, res, next) => { // создаёт фильм с переданными в теле данными
  const {
    country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail,
  } = req.body; // переданные данные
  const owner = req.user._id; // выхватываем владельца карточки
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
      throw new BadRequestError('Не получилось создать карточку, проверьте переданные данные.');
    })
    .catch(next);
};

const deleteMovie = (req, res, next) => { // удаляет сохранённый фильм по _id
  const requestedId = req.params.id;
  Movie.findById(requestedId)
    .then((requestedMovie) => {
      // Если владелец, то фильм можно удалить
      // requestedMovie.owner — object, req.user._id — String
      // eslint-disable-next-line eqeqeq
      if (requestedMovie.owner == req.user._id) {
        Movie.findByIdAndRemove(requestedId) // Удаляем карточку
          .orFail()
          .then(() => res.send({ message: `Карточка ${requestedId} успешно удалена.` }))
          .catch(next);
      } else {
        throw new ForbiddenError('Вы не можете удалять чужие карточки.');
      }
    })
    .catch(() => { throw new NotFoundError('Не получилось найти нужную карточку, проверьте идентификатор.'); })
    .catch(next);
};

module.exports = {
  returnMovies, createMovie, deleteMovie,
};
