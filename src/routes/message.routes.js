const express = require('express');
const messageController = require('../controllers/message.controller');
const { authorized } = require('../middlewares/auth');

const router = express.Router();

router.post('/', messageController.sendMessage);
router.get('/:senderId/:receiverId', messageController.getMessagesFromUsers);

module.exports = router;
