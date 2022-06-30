const config = require('../config/config');
const { logger } = require('../config/logger');

const errorHandler = (err, req, res, next) => {
    const { statusCode, message } = err;

    const response = {
        code: statusCode || 500,
        message,
        stack: err.stack,
    };

    if (config.env === 'development') {
        logger.error(err);
    }

    res.status(response.code).json(response);
};

module.exports = {
    errorHandler,
};
