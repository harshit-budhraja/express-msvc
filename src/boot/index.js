const { utilities } = global;
require('dotenv').config();
const { env } = process;
const bootstrapConfig = require('./config');
const bootstrapLogger = require('./logger');
const bootstrapApi = require('./api');

const bootstrap = () => {
    const functionTag = "boot";
    try {
        utilities.env = env;
        utilities.main_config = bootstrapConfig();
        utilities.logger = bootstrapLogger();
        utilities.logger.info(`${functionTag}> Environment: ${env.NODE_ENV}`);
        utilities.logger.info(`${functionTag}> Initialised config (${env.NODE_ENV}.json)`);
        utilities.logger.info(`${functionTag}> Initialised logger (${utilities.main_config.logging.level})`);
        utilities.server = bootstrapApi();
    } catch (error) {
        console.log(JSON.stringify(error, Object.getOwnPropertyNames(error)));
    }
}

module.exports = bootstrap;