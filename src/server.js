// This file starts the server
require('dotenv').config();
const mongoose = require('./config/db');
const app = require('./app');

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
