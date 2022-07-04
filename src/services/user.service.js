const { compare } = require('bcrypt');
const User = require('../model/postgres/User.postgres');

const createUser = async (userBody) => User.create(userBody);

const loginUserWithEmailAndPassword = async (email, password) => {
    const user = await User.findOne({ where: { email } });
    if (this.googleId) {
        return false;
    }
    const isPasswordMatch = await compare(password, user?.password);
    if (!user || !isPasswordMatch) {
        throw new Error('Incorrect identifiants');
    }
    return user;
};

module.exports = {
    createUser,
    loginUserWithEmailAndPassword,
};
