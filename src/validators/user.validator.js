const { check } = require('express-validator');

const userValidator = {};

userValidator.signup = [
  check('username', 'Your username is required').notEmpty(),
  check('email', 'Your email is required').isEmail(),
  check('password', 'Your password is required')
    .notEmpty()
    .isLength({ min: 6 }),
];

userValidator.signin = [
  check('email', 'Your email is required').isEmail(),
  check('password', 'Your password is required')
    .notEmpty()
    .isLength({ min: 6 }),
];

module.exports = userValidator;
