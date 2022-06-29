const config = require( '../config/config.js')
const { logger } = require( '../config/logger')

const errorHandler = (err, req, res, next) => {
    let { statusCode, message } = err;
  
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
    errorHandler
}