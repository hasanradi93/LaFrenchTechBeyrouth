const routing = require('express').Router()
const mailsController = require('../Controllers/mails')
routing.route('/')
    .get(mailsController.getMailsData)
module.exports = routing