const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/notFoundError');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), login);
router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .alphanum()
      .min(2)
      .max(30)
      .required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), createUser);

router.use(auth);
router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

router.use((req, res, next) => {
  next(new NotFoundError('Указан неправильный путь'));
});

module.exports = router;
