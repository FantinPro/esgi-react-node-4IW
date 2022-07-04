const express = require('express');
const messageController = require('../controllers/message.controller');
const { authorized } = require('../middlewares/auth');
const { areFriends } = require('../middlewares/friend');

const router = express.Router();

router.post('/', authorized(), areFriends, messageController.sendMessage);
router.get('/:senderId/:receiverId', authorized(), messageController.getMessagesFromUsers);

module.exports = router;
