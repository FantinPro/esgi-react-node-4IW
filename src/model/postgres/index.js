exports.connection = require('../../core/db/postgres/db.postgres');
exports.User = require('./User.postgres');
exports.Message = require('./Message.postgres');

exports.Message.belongsTo(exports.User, {
    as: 'sender',
    foreignKey: 'senderId',
});

exports.Message.belongsTo(exports.User, {
    as: 'receiver',
    foreignKey: 'receiverId',
});
