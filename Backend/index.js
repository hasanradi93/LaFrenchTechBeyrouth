const app = require('./app')
const http = require('http')
const config = require('./Utils/config')
const logger = require('./Utils/logger')
//const server = http.createServer(app)
app.listen(config.Port, () => {
    logger.info(`Server is running on the POST: ${config.Port}`)
})