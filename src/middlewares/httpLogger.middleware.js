const morgan = require('morgan');
const logger = require('./logger.middleware');

const stream = {
  write: (message) => logger.http(message),
};

const skip = () => {
  const env = process.env.NODE_ENV || 'development';
  return env !== 'development';
};

/**
 * Middleware to log HTTP requests using Morgan package
 * Logs request details:
 * - remote address
 * - HTTP method
 * - URL
 * - status
 * - content length
 * - response time
 *
 * @function httpLogger
 * @returns {Function} Morgan middleware function.
 */
const httpLogger = () =>
  morgan(
    ':remote-addr :method :url :status :res[content-length] - :response-time ms',
    { stream, skip }
  );

module.exports = httpLogger;
