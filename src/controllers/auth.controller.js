const userService = require('../services/user.service');
const tokenService = require('../services/token.service');

const register = async (req, res, next) => {
    try {
        const user = await userService.createUser(req.body);
        res.json(user);
    } catch (err) {
        next(err);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await userService.loginUserWithEmailAndPassword(email, password);
        const token = await tokenService.getAccessTokens(user);
        res.send({ user, token });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    register,
    login,
};
