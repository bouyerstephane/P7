const express = require('express');
const router = express.Router();

const forumCtrl = require('../controllers/forum');

router.get('/displayAll', forumCtrl.displayAll);
router.get('/displayOne', forumCtrl.displayOne);
router.post('/submit', forumCtrl.submit);
router.post('/submitComm', forumCtrl.submitComm);
router.put('/modify', forumCtrl.modify);
router.delete('/destroy', forumCtrl.destroy);

module.exports = router;
