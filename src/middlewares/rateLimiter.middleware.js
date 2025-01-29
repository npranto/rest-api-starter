const rateLimit = require('express-rate-limit');
const logger = require('./logger.middleware');

/**
 * Rate limiter middleware to limit number of requests a user can make to API.
 * Note: This middleware uses the `express-rate-limit` package to enforce request limits based on IP address.
 *
 * @function rateLimiter
 * @returns {Function} The rate limiter middleware function.
 *
 * @description
 * The rate limiter is configured to allow up to 100 requests per minute (per user/IP address).
 * If the limit is exceeded, a 429 status code is returned with a friendly message informing the user to try again later.
 *
 * Configuration:
 * - windowMs: 1 minute (60,000 milliseconds)
 * - max: 100 requests per minute
 * - handler: Custom response when the limit is exceeded
 * - standardHeaders: True, includes rate limit info in response headers
 * - legacyHeaders: False, disables legacy rate limit headers
 *
 * This rate limiter is applied to API routes to prevent abuse and protect the server from high traffic.
 *
 * @example
 * // Use the rateLimiter in an Express app
 * app.use('/api/v1', rateLimiter(), require('./routes/api.routes'));
 */
const rateLimiter = ({
  maxRequestsAllowed = 100,
  rateLimitInMilliseconds = 1 * 60 * 1000,
} = {}) =>
  rateLimit({
    windowMs: rateLimitInMilliseconds, // 1 minute
    max: maxRequestsAllowed, // limits each IP to 100 requests per window (or, every 1 min)
    handler: (_, res) =>
      res.status(429).json({
        message:
          'Wooh! Too many requests! 🐌 Slow down and try again in a minute 🙂',
      }),
    standardHeaders: true, // returns rate limit info in `RateLimit-*` headers
    legacyHeaders: false, // disables the `X-RateLimit-*` headers
    validate: { xForwardedForHeader: false },
  });

module.exports = rateLimiter;
