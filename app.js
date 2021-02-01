
const express = require('express');
const compression = require('compression');
const IndexRoutes = require('./routes/index');

const app = express();
app.use(compression());

app.use(IndexRoutes);

module.exports = app;