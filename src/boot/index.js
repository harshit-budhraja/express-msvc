const { utilities } = global;
require('dotenv').config();
const { env } = process;
const bootstrapConfig = require('./config');
const bootstrapLogger = require('./logger');
const bootstrapApi = require('./api');
const bootstrapSequelize = require('./sequelize');
const bootstrapKafka = require('./kafka');

const bootstrap = async () => {
    const functionTag = "boot";
    try {
        utilities.env = env;
        utilities.main_config = bootstrapConfig();
        utilities.logger = bootstrapLogger();
        utilities.logger.info(`${functionTag}> Environment: ${env.NODE_ENV}`);
        utilities.logger.info(`${functionTag}> Initialised config (${env.NODE_ENV}.json)`);
        utilities.logger.info(`${functionTag}> Initialised logger (${utilities.main_config.logging.level})`);
        const nextBootstraps = [
            bootstrapSequelize(),
            bootstrapKafka()
        ];
        const [sequelize, kafka] = await Promise.all(nextBootstraps);
        if (sequelize) utilities.sequelize = sequelize;
        if (kafka) utilities.kafka = kafka;
        if (sequelize && kafka) {
            utilities.server = bootstrapApi();
        }
    } catch (error) {
        console.log(JSON.stringify(error, Object.getOwnPropertyNames(error)));
    }
}

module.exports = bootstrap;