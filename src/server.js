const dotenv = require('dotenv');
const db = require('./config/db.config');
const app = require('./app');

const env = process.env.NODE_ENV || 'development';
dotenv.config({ path: `.env.${env}` });
console.log(`Environment: ${env}`);

const PORT = process.env?.PORT || 8080;

/**
 * Establishes a connection to the database.
 * Logs success or failure messages based on the connection status.
 * If the connection fails, the process exits with a non-zero code.
 */
db.connect({ database: process.env?.DATABASE });

/**
 * Starts the Express server. If the server fails to start, logs an error message, otherwise logs success message.
 *
 * @function
 * @name app.listen
 * @param {number} PORT - The port number to listen on for server requests.
 * @returns {void}
 */
app.listen(PORT, (err) => {
  if (err) {
    console.error(`Server Connection [PORT: ${PORT}]: FAILED 🚨`, err);
  } else {
    console.log(`Server Connection [PORT: ${PORT}]: SUCCESS 🚀 `);
  }
});
