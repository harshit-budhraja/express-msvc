const { Sequelize } = require('sequelize');

const bootstrapSequelize = async (utilities) => {
    const functionTag = "bootSequelize";
    const { main_config, logger } = utilities;
    const { dialect, host } = main_config.sequelize.config;
    /**
     * #env
     * DB_NAME
     * DB_USERNAME
     * DB_PASSWORD
     */
    const { DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env;
    const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
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
        utilities.sequelize = sequelize;
        return sequelize;
    } catch (error) {
        logger.error(`${functionTag}> Unable to establish connection to database: ${JSON.stringify(error, Object.getOwnPropertyNames(error))}`);
        return null;
    }
}

module.exports = bootstrapSequelize;