const authRouter = require('express').Router();
const { login, signUpUser } = require('../controllers/users');

authRouter.post('/signin', login);
authRouter.post('/signup', signUpUser);

module.exports = authRouter;
