const express = require('express');
const router = express.Router();
const token = require('../middleware/token');

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.delete('/destroy', userCtrl.destroy);

module.exports = router;
