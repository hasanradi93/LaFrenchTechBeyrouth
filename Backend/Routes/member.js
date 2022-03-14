const routing = require('express').Router()
const memberController = require('../Controllers/member')
routing.route('/')
    .get(memberController.getMembers)
    .post(memberController.uploadPhotoMember, memberController.setMember)
routing.route('/:id')
    .put(memberController.uploadPhotoMember, memberController.editMember)
    .delete(memberController.deleteMember)
module.exports = routing