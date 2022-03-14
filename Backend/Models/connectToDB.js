const mongoose = require('mongoose')
const logger = require('../Utils/logger')
const config = require('../Utils/config')
logger.info(`----------------------------`)
logger.info(`Loading connecting to Database:`)
const main = async () => {
    logger.info(`URL: ${config.Mongo_Uri}`)
    await mongoose.connect(config.Mongo_Uri)
        .then(() => {
            logger.info('Connecting to Database successfully done')
            logger.info(`----------------------------`)
        })
        .catch((error) => {
            logger.error('Error connection to Database', error.message)
            logger.info(`----------------------------`)
        })
}
main()