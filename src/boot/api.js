const express = require("express");
const { utilities } = global;
const http = require('http');

const versionMiddleware = async (req, res, next) => {
    const { main_config, logger } = utilities;
    const availableApiVersions = main_config.api.versions;
    const reqApiVersion = req.url.split('/')[1];
    logger.http(`Receiving request to api version: ${reqApiVersion}`);
    if (availableApiVersions[reqApiVersion] && !availableApiVersions[reqApiVersion].deprecated) {
        logger.http(`Request can be served.`);
        next();
    } else {
        logger.http(`Request cannot be served.`);
    }
}

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