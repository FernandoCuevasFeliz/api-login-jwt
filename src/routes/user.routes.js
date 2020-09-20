const { Router } = require('express');
const userCtrl = require('../controllers/user.controllers');
const userValidator = require('../validators/user.validator');

const router = Router();

router.post('/create', userValidator.signup, userCtrl.createUser);

router.post('/login', userValidator.signin, userCtrl.loginUser);

module.exports = router;
