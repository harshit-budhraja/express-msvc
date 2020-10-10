const express = require("express");
const { utilities } = global;
const http = require('http');
const versionMiddleware = require('./versionMiddleware');

const bootstrapApi = () => {
    const functionTag = "bootApi";
    const { main_config, logger } = utilities;
    const expressPort = main_config.express.port;
    const app = express();
    app.get('/', async (req, res) => {
        res.status(200).send("Ok");
    });
    app.use(main_config.root_path, versionMiddleware);
    /**
     * root_path should be something like '/api'.
     */
    app.use(`${main_config.root_path == '/' ? "" : main_config.root_path}/v1.0`, require('../api/v1.0'));
    let server = http.createServer(app).listen(expressPort, () => {
        logger.info(`${functionTag}> Initialised Api on port: ${expressPort}`);
    });
    server.setTimeout(main_config.express.timeout);
    return server;
}

module.exports = bootstrapApi;