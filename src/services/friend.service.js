const { Op } = require('sequelize');
const { Friend, User } = require('../model/postgres');
const { friendsStatus } = require('../utils/Helpers');

const getFriendsList = async (userId) => {
    const friends = await Friend.findAll({
        where: {
            [Op.or]: [
                {
                    senderId: userId,
                },
                {
                    receiverId: userId,
                },
            ],
            [Op.or]: [
                {
                    status: friendsStatus.ACTIVE,
                },
                {
                    status: friendsStatus.BLOCKED,
                },
            ],
        },
        include: [
            {
                model: User,
                as: 'sender',
                attributes: ['id', 'email'],
            },
            {
                model: User,
                as: 'receiver',
                attributes: ['id', 'email'],
            },
        ],
        raw: true,
        nest: true,
    });
    return friends.reduce((acc, friend) => {
        if (friend.sender.id !== +userId) {
            acc.push({ ...friend.sender, status: friend.status });
        }
        if (friend.receiver.id !== +userId) {
            acc.push({ ...friend.receiver, status: friend.status });
        }
        return acc;
    }, []);
};

const sendFriendInvitation = ({ senderId, receiverId }) => Friend.create({
    senderId,
    receiverId,
    status: friendsStatus.PENDING,
});

const acceptFriendInvitation = (friendId) => Friend.update(
    {
        status: friendsStatus.ACTIVE,
    },
    {
        where: {
            id: friendId,
        },
        returning: true,
    },
    // because update return nb of rows updated and the updated rows
).then((res) => res[1][0]);

const blockFriend = (friendId) => Friend.update(
    {
        status: friendsStatus.BLOCKED,
    },
    {
        where: {
            id: friendId,
        },
        returning: true,
    },
).then((res) => res[1][0]);

const deleteFriend = (friendId) => Friend.destroy({
    where: {
        id: friendId,
    },
});

module.exports = {
    getFriendsList,
    sendFriendInvitation,
    acceptFriendInvitation,
    blockFriend,
    deleteFriend,
};
