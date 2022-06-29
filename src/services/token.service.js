const jwt = require('jsonwebtoken');
const config = require('../config/config');

const getAccessTokens = async (user) => {
    const token = jwt.sign({ id: user.id }, config.jwtSecret, { expiresIn: '1h' });
    return token;
};

module.exports = {
    getAccessTokens,
};
