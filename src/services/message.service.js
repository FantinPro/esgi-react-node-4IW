const { Op } = require('sequelize');
const { Message } = require('../model/postgres');

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
    order: [['createdAt', 'ASC']],
});

module.exports = {
    createMessage,
    getMessagesFromUsers,
};
