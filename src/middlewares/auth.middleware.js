const jwtMethods = require('../utils/jwt');

const authenticate = (req, res, next) => {
  try {
    let token = req.headers['authorization'];
    if (!token) {
      return res.status(400).json({
        statusCode: 400,
        msg: 'Token is required',
      });
    }
    token = token.split(' ')[1];

    const payload = jwtMethods.verifyToken(token);

    req.user = payload.user;
    next();
  } catch (error) {
    return res.status(400).json({
      statusCode: 400,
      msg: 'Token invalid',
    });
  }
};

module.exports = authenticate;
