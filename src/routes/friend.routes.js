const express = require('express');
const friendController = require('../controllers/friend.controller');
const { authorized } = require('../middlewares/auth');

const router = express.Router();

router.post('/', authorized(), friendController.sendFriendInvitation);
router.put('/:friendId', authorized(), friendController.acceptFriendInvitation);
router.get('/users/:userId', authorized(), friendController.getFriendsList);

module.exports = router;
