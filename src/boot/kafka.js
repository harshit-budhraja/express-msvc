const { Kafka } = require('kafkajs');

const bootstrapKafka = async (utilities) => {
    const functionTag = "bootKafka";
    const { main_config, logger } = utilities;
    let kafka = null;
    try {
        kafka = new Kafka(main_config.kafka.global);
        /**
         * @todo
         * Check for proper initialisation of Kafka:
         * 1. Introduce an env - RUN_MODE = {api, consumer}
         * 2. api - Initialise Kafka producer
         *    consumer - Initialise Kafka consumer
         * 3. Establish a conventional topic-controller mapping
         *    for consumer mode execution of the service.
         * 4. Add global configs - required(kafka), required(mysql)
         *    in dev.json.
         */
        logger.debug(JSON.stringify(kafka));
        logger.info(`${functionTag}> Initialized kafka successfully`);
    } catch (error) {
        logger.error(`${functionTag}> Unable to initialize kafka: ${JSON.stringify(error, Object.getOwnPropertyNames(error))}`);
    }
    utilities.kafka = kafka;
    return kafka;
};

module.exports = bootstrapKafka;