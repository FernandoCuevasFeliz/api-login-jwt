const { validationResult } = require('express-validator');

const User = require('../models/User');
const bcrypt = require('../utils/bcrypt');
const jwtMethods = require('../utils/jwt');
const userCtrl = {};

userCtrl.createUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      statusCode: 400,
      errors: errors.array(),
    });
  }

  const { username, email, password } = req.body;

  const userExist = await User.findOne({ $or: [{ email }, { username }] });

  if (userExist) {
    return res.status(400).json({
      statusCode: 400,
      msg: 'User already exist',
    });
  }

  const newUser = new User({
    username,
    email,
    password: await bcrypt.encryptPassword(password),
  });

  newUser.save();
  const token = jwtMethods.generateToken(newUser);

  const userData = {
    username: newUser.username,
    email: newUser.email,
  };

  return res.status(200).json({
    statusCode: 200,
    data: userData,
    token,
  });
};

userCtrl.loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      statusCode: 400,
      errors: errors.array(),
    });
  }

  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      statusCode: 404,
      msg: 'User not found',
    });
  }

  const isPassword = await bcrypt.comparePassword(password, user.password);

  if (!isPassword) {
    return res.status(400).json({
      statusCode: 400,
      msg: 'Invalid credentials',
    });
  }
  const token = jwtMethods.generateToken(user);

  const userData = {
    username: user.username,
    email: user.email,
  };

  return res.status(200).json({
    statusCode: 200,
    data: userData,
    token,
  });
};

module.exports = userCtrl;
