const express = require('express');

const apiRouter = require('./apiroutes');

const app = express();

app.use('/apiroutes', apiRouter);

module.exports = app;