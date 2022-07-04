const { StatusCodes } = require('http-status-codes');
const { Op } = require('sequelize');
const { Model, DataTypes } = require('sequelize');
const connection = require('../../core/db/postgres/db.postgres');
const { ApiError } = require('../../utils/ApiError');
const { friendsStatus } = require('../../utils/Helpers');

class Friend extends Model {}

Friend.init(
    {
        status: {
            type: DataTypes.STRING,
            validate: {
                isIn: {
                    args: [Object.values(friendsStatus)],
                    msg: `Status must be one of: ${Object.values(friendsStatus)}`,
                },
            },
            allowNull: false,
        },
    },
    {
        sequelize: connection,
        modelName: 'friend',
    },
);

Friend.addHook('beforeCreate', (friend, options) => Friend.findOne({
    where: {
        [Op.or]: [
            {
                senderId: friend.senderId,
                receiverId: friend.receiverId,
            },
            {
                senderId: friend.receiverId,
                receiverId: friend.senderId,
            },
        ],
    },
}).then((result) => {
    if (result) {
        throw new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, 'friend already exists');
    }
}));

module.exports = Friend;
