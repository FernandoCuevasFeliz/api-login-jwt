const { Router } = require('express');
const authenticate = require('../middlewares/auth.middleware');
const userRoutes = require('./user.routes');

const router = Router();

router.get('/profile', authenticate, (req, res) => {
  res.send('User logged');
});

router.use('/user', userRoutes);

module.exports = router;
