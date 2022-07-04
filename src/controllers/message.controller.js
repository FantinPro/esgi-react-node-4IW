const messageService = require('../services/message.service');

const sendMessage = async (req, res, next) => {
    try {
        const { text, receiverId } = req.body;
        const message = await messageService.createMessage({
            text,
            senderId: req.user.id,
            receiverId,
        });
        res.json(message);
    } catch (e) {
        next(e);
    }
};

const getMessagesFromUsers = async (req, res, next) => {
    try {
        const { senderId, receiverId } = req.params;
        const messages = await messageService.getMessagesFromUsers(senderId, receiverId);
        res.json(messages);
    } catch (e) {
        next(e);
    }
};

module.exports = {
    sendMessage,
    getMessagesFromUsers,
};
