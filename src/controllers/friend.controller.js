const friendService = require('../services/friend.service');

/**
 * e.g return [
 *       {
 *           "id": 15,
 *           "email": "fantin@malou.io",
 *           "status": "ACTIVE"
 *       },
 *       ...
 *   ]
 */
const getFriendsList = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const friendsList = await friendService.getFriendsList(userId);
        res.json(friendsList || []);
    } catch (err) {
        next(err);
    }
};

const sendFriendInvitation = async (req, res, next) => {
    try {
        const { receiverId } = req.body;

        const pendingFriend = await friendService.sendFriendInvitation({
            senderId: req.user.id,
            receiverId,
        });
        res.json(pendingFriend);
    } catch (e) {
        next(e);
    }
};

const acceptFriendInvitation = async (req, res, next) => {
    try {
        const { friendId } = req.params;
        const friend = await friendService.acceptFriendInvitation(friendId);
        res.json(friend);
    } catch (e) {
        next(e);
    }
};

module.exports = {
    getFriendsList,
    sendFriendInvitation,
    acceptFriendInvitation,
};
