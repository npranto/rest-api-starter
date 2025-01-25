// The main Express app lives here...

const express = require('express');
const cors = require('cors');

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use('/api/v1/data', require('./routes/dataRoutes'));

module.exports = app;
