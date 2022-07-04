const { StatusCodes } = require('http-status-codes');
const { Op } = require('sequelize');
const { Friend } = require('../model/postgres');
const { ApiError } = require('../utils/ApiError');

const areFriends = async (req, res, next) => {
    const { receiverId } = req.body;
    const { id } = req.user;

    const friend = await Friend.findOne({
        where: {
            [Op.or]: [
                {
                    senderId: id,
                    receiverId,
                },
                {
                    senderId: receiverId,
                    receiverId: id,
                },
            ],
        },
    });

    if (!friend) {
        next(new ApiError(StatusCodes.UNAUTHORIZED, 'You are not friends with this user'));
    }

    next();
};

module.exports = {
    areFriends,
};
