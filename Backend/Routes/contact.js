const routing = require('express').Router()
const contactController = require('../Controllers/contact')
routing.route('/')
    .post(contactController.contact)
module.exports = routing