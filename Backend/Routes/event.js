const routing = require('express').Router()
const eventController = require('../Controllers/event')
routing.route('/getLatestForVisitors')
    .get(eventController.getLatestEventsVisitor)
routing.route('/getForVisitors')
    .get(eventController.getEventsAvailableVisitor)
routing.route('/getForAdmin')
    .get(eventController.getEventsAvailableAdmin)
routing.route('/getBySearch')
    .get(eventController.getEventsSearch)
routing.route('/newOne')
    .post(eventController.uploadPhotosEvent, eventController.setEvent)
routing.route('/:id')
    .put(eventController.uploadPhotosEvent, eventController.editEvent)
    .delete(eventController.deleteEvent)
routing.route('/deletePhoto/:id')
    .post(eventController.deletePhotoEvent)
module.exports = routing