const { utilities } = global;
const { sequelize } = utilities;
const { DataTypes } = require('sequelize');
const TABLE_SYNC_NAME = "table";

const table = sequelize.define(TABLE_SYNC_NAME, {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    sample: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
}, {});

module.exports = table;