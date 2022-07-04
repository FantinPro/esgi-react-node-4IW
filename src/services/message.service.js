const { Op } = require('sequelize');
const { Message, User } = require('../model/postgres');

const createMessage = (message) => Message.create(message);

const getMessagesFromUsers = (senderId, receiverId) => Message.findAll({
    where: {
        [Op.or]: [
            {
                senderId,
                receiverId,
            },
            {
                senderId: receiverId,
                receiverId: senderId,
            },
        ],
    },
    include: [
        {
            model: User,
            as: 'sender',
            attributes: ['email'],
        },
        {
            model: User,
            as: 'receiver',
            attributes: ['email'],
        },
    ],
    order: [['createdAt', 'ASC']],
});

module.exports = {
    createMessage,
    getMessagesFromUsers,
};
