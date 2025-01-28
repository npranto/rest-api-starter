const express = require('express');
const cors = require('cors');
const rateLimiter = require('./middlewares/rateLimiter.middleware');

const app = express();

// MIDDLEWARES
/**
 * Middleware to enable CORS (Cross-Origin Resource Sharing).
 * Allows the API to accept requests from different origins.
 */
app.use(cors());

/**
 * Middleware to parse incoming JSON requests and make the parsed data available in `req.body`.
 */
app.use(express.json());

// ROUTES
/**
 * GET /
 * Root route for API healthcheck status.
 *
 * @route GET /
 * @group Root - Operations related to the root path
 * @returns {object} 200 - A success message indicating that the API is active
 */
app.get('/', (_, res) =>
  res.status(200).json({
    message: 'Welcome to Rest API Starter!',
    env: process.env.NODE_ENV,
    version: require('../package.json')?.version,
  })
);

/**
 * All routes related to `Data` for CRUD operations
 *
 * @route /api/v1/data
 */
app.use('/api/v1/data', rateLimiter(), require('./routes/data.routes'));

module.exports = app;
