const { StatusCodes } = require('http-status-codes');
const passport = require('passport');
const { ApiError } = require('../utils/ApiError');
const { roles } = require('../utils/Helpers');

const verifyCallback = (req, resolve, reject, role) => async (err, user, info) => {
    if (err || info || !user) {
        return reject(new ApiError(StatusCodes.UNAUTHORIZED, 'unauthorized'));
    }

    // do stuff about user role
    // if (user.role !== '...') { ... }

    req.user = user;
    resolve();
};

function authorized(role = roles.ROLE_USER) {
    return async (req, res, next) => new Promise((resolve, reject) => {
        passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject, role))(req, res, next);
    })
        .then(() => next())
        .catch((err) => {
            next(err);
        });
}

module.exports = {
    authorized,
};
