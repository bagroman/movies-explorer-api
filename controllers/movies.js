const Movie = require('../models/movie');
const ValidationError = require('../errors/validationError');
const NotFoundError = require('../errors/notFoundError');
const ForbiddenError = require('../errors/forbiddenError');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movie) => res.send(movie))
    .catch((err) => next(err));
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const owner = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('При создании указаны неправильные параметры'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovieById = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Фильм не найден');
      }
      if (String(req.user._id) !== String(movie.owner)) {
        throw new ForbiddenError('Недостаточно прав');
      }
      return movie.remove()
        .then(() => res.send({ message: 'Фильм был успешно удален' }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Некорректный id'));
      } else {
        next(err);
      }
    });
};
