const { utilities } = global;
const { Sequelize } = require('sequelize');

const bootstrapSequelize = async () => {
    const functionTag = "bootSequelize";
    const { main_config, logger } = utilities;
    const { dialect, host, database, username, password } = main_config.sequelize.config;
    const sequelize = new Sequelize(database, username, password, {
        host,
        dialect,
        logging: msg => logger.debug(msg),
        define: {
            freezeTableName: true,
            timestamps: true,
            version: false
        },
        timezone: '+05:30',
        dialectOptions: {
            dateStrings: true,
            typeCast: true,
            timezone: `+05:30`
        },
    });
    try {
        await sequelize.authenticate();
        logger.info(`${functionTag}> Established connection to database successfully`);
    } catch (error) {
        logger.error(`${functionTag}> Unable to establish connection to database: ${JSON.stringify(error, Object.getOwnPropertyNames(error))}`);
    }
    return sequelize;
}

module.exports = bootstrapSequelize;