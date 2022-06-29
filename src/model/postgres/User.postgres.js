// create user model using sequelize with email, password and googleId
const { Model, DataTypes } = require('sequelize');
const connection = require('../../core/db/postgres/db.postgres');

class User extends Model {}

User.init(
    {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8, 100],
            },
        },
        googleId: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'ROLE_USER',
        },
    },
    {
        sequelize: connection,
        modelName: 'user',
    },
);

module.exports = User;
