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
    const availableApiVersions = Object.keys(main_config.api.versions);
    try {
        availableApiVersions.forEach(versionTag => {
            app.use(`${main_config.root_path == '/' ? "" : main_config.root_path}/${versionTag}`, require(`../api/${versionTag}/routes`));
        });
    } catch (error) {
        logger.error(JSON.stringify(error, Object.getOwnPropertyNames(error)));
    }
    let server = http.createServer(app).listen(expressPort, () => {
        logger.info(`${functionTag}> Initialised Api on port: ${expressPort}`);
    });
    server.setTimeout(main_config.express.timeout);
    return server;
}

module.exports = bootstrapApi;