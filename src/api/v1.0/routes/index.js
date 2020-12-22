var express = require('express');
var routes = express.Router();

const sampleRouter = require('./sample')();
routes.use('/sample', sampleRouter);

module.exports = routes;