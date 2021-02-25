const { utilities } = global;
const { logger } = utilities;
const TableModel = require('../../../models/table');
const logPrefix = "(api/v1.0/dao/table):";

const getAll = async () => {
    try {
        const records = await TableModel.findAll();
        return records;
    } catch (error) {
        const formattedError = `${logPrefix} Error in getAll. ${JSON.stringify(error, Object.getOwnPropertyNames(error))}`;
        logger.error(formattedError);
    }
};

module.exports = {
    getAll
};