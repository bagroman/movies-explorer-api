const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  updateUser, getProfile,
} = require('../controllers/users');

router.get('/me', getProfile);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().pattern(/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i).required(),
  }),
}), updateUser);

module.exports = router;
