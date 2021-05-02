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
        bootstrapConfig(utilities);
        bootstrapLogger(utilities);
        /**
         * #env
         * NODE_ENV
         */
        utilities.logger.info(`${functionTag}> Environment: ${env.NODE_ENV}`);
        utilities.logger.info(`${functionTag}> Initialised config (${env.NODE_ENV}.json)`);
        utilities.logger.info(`${functionTag}> Initialised logger (${utilities.main_config.logging.level})`);
        const nextBootstraps = [];
        const bootKafka = utilities.main_config.boot.kafka;
        const bootMysql = utilities.main_config.boot.mysql;
        if (bootMysql) nextBootstraps.push(bootstrapSequelize(utilities));
        if (bootKafka) nextBootstraps.push(bootstrapKafka(utilities));
        await Promise.all(nextBootstraps);
        utilities.server = bootstrapApi();
    } catch (error) {
        console.log(JSON.stringify(error, Object.getOwnPropertyNames(error)));
    }
}

module.exports = bootstrap;