const { Model, DataTypes } = require('sequelize');
const connection = require('../../core/db/postgres/db.postgres');

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
