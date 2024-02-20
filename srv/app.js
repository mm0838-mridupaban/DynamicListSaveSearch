const express = require('express');
const tablesListRouter = require('./routes/tablesListRoutes');

const app = express();

// Mount the routes
app.use('/api/tablesList', tablesListRouter);

// Other middleware and configurations...

module.exports = app;