const bcrypt = require('bcryptjs');

const bcryptMethods = {};

bcryptMethods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

bcryptMethods.comparePassword = async (password, savedPassword) => {
  return await bcrypt.compare(password, savedPassword);
};

module.exports = bcryptMethods;
