const express = require('express');
const router = express.Router();
const token = require('../middleware/token');

const userCtrl = require('../controllers/user');

router.get('/getUser', token, userCtrl.getUser);
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.put('/modifyUser', userCtrl.modifyUser);
router.delete('/destroy', token, userCtrl.destroy);

module.exports = router;
