const express = require('express');
const router = express.Router();

const forumCtrl = require('../controllers/forum');
const token = require('../middleware/token');


router.get('/displayAll', token, forumCtrl.displayAll);
router.get('/displayOne', token, forumCtrl.displayOne);
router.post('/submit', token, forumCtrl.submit);
router.post('/submitComm', token, forumCtrl.submitComm);
router.put('/modify', token, forumCtrl.modify);
router.delete('/destroy', token, forumCtrl.destroy);

module.exports = router;
