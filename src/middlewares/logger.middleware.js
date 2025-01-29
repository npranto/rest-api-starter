const winston = require('winston');

// all log levels
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// define colors for diff log level
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

/**
 * Returns the current log level based on the environment.
 * Defaults to 'debug' for development and 'warn' for production.
 *
 * @function getCurrentLoglevel
 * @returns {string} The log level for the current environment.
 */
const getCurrentLoglevel = () => {
  const logLevel = process.env.LOG_LEVEL;
  const env = process.env.NODE_ENV || 'development';
  return logLevel || env === 'development' ? 'debug' : 'warn';
};

// sets custom colors for diff log levels
winston.addColors(colors);

// sets custom logging format
const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`
  )
);

// define which transports the logger must use to print out messages.
const transports = [
  new winston.transports.Console(),
  new winston.transports.File({
    filename: 'logs/error.log',
    level: 'error',
  }),
  new winston.transports.File({ filename: 'logs/all.log' }),
];

/**
 * Winston logger instance used for logging messages. Setting up log levels, formats, and transports
 *
 * @constant logger
 * @type {winston.Logger}
 */
const logger = winston.createLogger({
  level: getCurrentLoglevel(),
  levels,
  format,
  transports,
});

module.exports = logger;
