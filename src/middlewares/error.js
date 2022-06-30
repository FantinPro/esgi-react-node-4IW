const { ValidationError } = require('sequelize');
const config = require('../config/config');
const { logger } = require('../config/logger');

const formatError = (validationError) => validationError.errors.reduce((acc, error) => {
    acc[error.path] = error.message;
    return acc;
}, {});

const errorHandler = (err, req, res, next) => {
    if (err instanceof ValidationError) {
        return res.status(422).json(formatError(err));
    }

    const { statusCode, message } = err;

    const response = {
        code: statusCode || 500,
        message,
        stack: err.stack,
    };

    if (config.env === 'local') {
        logger.error(err);
    }

    res.status(response.code).json(response);
};

module.exports = {
    errorHandler,
};
