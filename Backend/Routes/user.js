const routing = require('express').Router()
const userController = require('../Controllers/user')
const loginController = require('../Controllers/login')
routing.route('/')
    .get(userController.getUsers)
routing.route('/login')
    .post(loginController.userLogin)
routing.route('/checkLoggedIn')
    .post(loginController.checkIfStillLogin)
routing.route('/logout')
    .post(loginController.userLogout)
routing.route('/register')
    .post(userController.setUser)
routing.route('/:id')
    .patch(userController.editUserData)
    .delete(userController.deleteUser)
routing.route('/email/:id')
    .patch(userController.editUserEmail)
routing.route('/username/:id')
    .patch(userController.editUserUsername)
routing.route('/password/:id')
    .patch(userController.editUserPassword)
module.exports = routing