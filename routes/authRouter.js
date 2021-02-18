const authRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { login, signUpUser } = require('../controllers/users');

authRouter.post('/signin', celebrate({ // Авторизация пользователя
  body: Joi.object().keys({
    name: Joi
      .string()
      .required(),
    email: Joi
      .string()
      .required()
      .email({ tlds: { allow: false } }),
    password: Joi
      .string()
      .required(),
  }).unknown(true),
}), login);
authRouter.post('/signup', celebrate({ // Регистрация пользователя
  body: Joi.object().keys({
    name: Joi
      .string()
      .required(),
    email: Joi
      .string()
      .required()
      .email({ tlds: { allow: false } }),
    password: Joi
      .string()
      .required(),
  }).unknown(true),
}), signUpUser);

module.exports = authRouter;
