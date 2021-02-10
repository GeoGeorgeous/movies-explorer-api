const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  returnUser, updateUser,
} = require('../controllers/users');

userRouter.get('/me', returnUser); // Возвращает информацию о текущем пользователе
userRouter.patch('/me', celebrate({ // Обновляет профиль
  body: Joi.object().keys({
    name: Joi
      .string()
      .required()
      .min(2)
      .max(30),
    email: Joi
      .string()
      .required(),
  }).unknown(true),
}), updateUser);
