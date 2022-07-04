exports.connection = require('../../core/db/postgres/db.postgres');
exports.User = require('./User.postgres');
exports.Message = require('./Message.postgres');
exports.Friend = require('./Friend.postgres');

exports.Message.belongsTo(exports.User, {
    as: 'sender',
    foreignKey: 'senderId',
});

exports.Message.belongsTo(exports.User, {
    as: 'receiver',
    foreignKey: 'receiverId',
});

exports.Friend.belongsTo(exports.User, {
    as: 'sender',
    foreignKey: 'senderId',
});

exports.Friend.belongsTo(exports.User, {
    as: 'receiver',
    foreignKey: 'receiverId',
});

exports.User.hasMany(exports.Message, {
    as: 'invitations',
    foreignKey: 'receiverId',
});

/**
 * want to keep a track of this relations
 * allow you to do
 * const result = await User.findByPk(16, {
 *      include: [
 *          {
 *              model: Message,
 *              as: 'messages',
 *          },
 *      ],
 *  });
 * but ça nous sert a rien
 * */

// exports.User.hasMany(exports.Message, {
//     as: 'messages',
//     foreignKey: 'senderId',
// });

// exports.User.hasMany(exports.Message, {
//     as: 'receivedMessages',
//     foreignKey: 'receiverId',
// });
