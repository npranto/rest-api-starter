require('dotenv').config();
require('./config/db');
const app = require('./app');

const PORT = process.env.PORT || 8080;

/**
 * Starts the Express server. If the server fails to start, logs an error message, otherwise logs success message
 *
 * @function
 * @name app.listen
 * @param {number} PORT - The port number to listen to on server
 * @returns {void}
 */
app.listen(PORT, (err) => {
  if (err) {
    console.error(`Server Connection [PORT: ${PORT}]: FAILED 🚨`, err);
  } else {
    console.log(`Server Connection [PORT: ${PORT}]: SUCCESS 🚀 `);
  }
});
