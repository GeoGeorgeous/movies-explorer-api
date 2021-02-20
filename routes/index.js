const mainRouter = require('express').Router();
const authProtected = require('../middlewares/authProtected');
const userRouter = require('./userRouter');
const movieRouter = require('./movieRouter');
const authRouter = require('./authRouter');
const NotFoundError = require('../utils/errors/NotFoundError');
const { ERR_MSG } = require('../utils/constants');

mainRouter.use('/', authRouter); // Роутинг авторазиции
mainRouter.use('/users', authProtected, userRouter); // Роутинг пользователей
mainRouter.use('/movies', authProtected, movieRouter); // Роутинг карточек
mainRouter.use('*', authProtected, () => { // Роутинг 404
  throw new NotFoundError(ERR_MSG.NO_ENDPOINT);
});

module.exports = mainRouter;
