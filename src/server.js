const dotenv = require('dotenv');
// sets up environment variables (default: 'development' | `.env.development`)
const env = process.env.NODE_ENV || 'development';
dotenv.config({ path: `.env.${env}` });
console.log(`Environment: ${env}`);

const database = require('./config/db.config');
const app = require('./app');

(async () => {
  /**
   * Establishes a connection to the database
   *
   * @async
   * @function
   */
  await database.connect();

  /**
   * Starts the Express application server.
   *
   * @async
   * @function
   */
  await app.start();
})();
