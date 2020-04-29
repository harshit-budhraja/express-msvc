const express = require("express");
const { utilities } = global;
const http = require('http');
const versionMiddleware = require('./versionMiddleware');

const bootstrapApi = () => {
    const { main_config, logger } = utilities;
    const expressPort = main_config.express.port;
    const app = express();
    app.get('/', async (req, res) => {
        res.status(200).send("Ok");
    });
    app.use('/api', versionMiddleware);
    app.use('/api/v1.0', require('../api/v1.0'));
    let server = http.createServer(app).listen(expressPort, () => {
        logger.info(`Initialised Api on port: ${expressPort}`);
    });
    server.setTimeout(main_config.express.timeout);
    return server;
}

module.exports = bootstrapApi;