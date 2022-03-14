const routing = require('express').Router()
const subscriberController = require('../Controllers/subscriber')
routing.route('/')
    .get(subscriberController.getSubscribers)
routing.route('/add/:id')
    .post(subscriberController.subscribeToEvent)
routing.route('/remove/:id')
    .post(subscriberController.unscribeToEvent)
module.exports = routing