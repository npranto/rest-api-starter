require('dotenv').config();
require('./config/db');
const app = require('./app');

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server Connection [PORT: ${PORT}]: SUCCESS 🚀 `);
});
