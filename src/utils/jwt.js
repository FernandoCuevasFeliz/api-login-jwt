const jwt = require('jsonwebtoken');

const jwtMethods = {};
const secretKey = process.env.JWT_KEY || 'secretkey';

jwtMethods.generateToken = (userData, expiresIn = '24h') => {
  const payload = {
    user: {
      id: userData._id,
    },
  };

  const token = jwt.sign(payload, secretKey, {
    expiresIn,
  });

  return token;
};

jwtMethods.verifyToken = (token) => {
  const payload = jwt.verify(token, secretKey);
  return payload;
};

module.exports = jwtMethods;
