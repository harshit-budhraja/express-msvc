const config = require('config');

const bootstrapConfig = (utilities) => {
    utilities.main_config = config;
    return config;
}

module.exports = bootstrapConfig;