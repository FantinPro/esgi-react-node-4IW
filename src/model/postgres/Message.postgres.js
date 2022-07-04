const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const connection = require('../../core/db/postgres/db.postgres');
const { roles } = require('../../utils/Helpers');

class Message extends Model {}

Message.init(
    {
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize: connection,
        modelName: 'message',
    },
);

module.exports = Message;
