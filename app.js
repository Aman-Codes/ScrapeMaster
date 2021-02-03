
const express = require('express');
const compression = require('compression');
const codechefRoutes = require('./routes/codechef');
const hackerrankRoutes = require('./routes/hackerrank');
const leetcodeRoutes = require('./routes/leetcode');

const app = express();
app.use(compression());

app.use(codechefRoutes);
app.use(hackerrankRoutes);
app.use(leetcodeRoutes);

module.exports = app;