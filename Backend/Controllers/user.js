const logger = require('../Utils/logger')
require('../Models/connectToDB')
const User = require('../Models/user')
const { ObjectId } = require('mongodb')
const { userValidationData, userValidationOtherData, userValidationEmail, userValidationUsername, userValidationPassword } = require('../Utils/validate')
const logout = require('./login')
const bcrypt = require('bcrypt')
const getUsers = async (request, response) => {
    const users = await User.find({})
    response.status(201).json({ data: users })
}
const setUser = async (request, response) => {
    const body = request.body
    const validate = userValidationData(body)
    if (validate.error)
        return response.status(401).json({ error: validate.error.message })
    const checkExistingEmail = await User.find({ email: body.email })
    if (checkExistingEmail.length)
        return response.status(401).json({ error: 'Email already exist' })
    const checkExistingUsername = await User.find({ username: body.username })
    if (checkExistingUsername.length)
        return response.status(401).json({ error: 'Username already exist' })
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)
    const newUser = new User({
        fName: body.fName,
        lName: body.lName,
        username: body.username,
        email: body.email,
        password: passwordHash,
        userType: body.userType
    })
    const savedUser = await newUser.save()
    response.status(201).json({ data: savedUser })
}
const editUserData = async (request, response, next) => {
    if (request.user === undefined)
        return next({ name: "UnAuthorizedError", message: `You don't have credentials` })
    const body = request.body
    const _id = request.params
    const validate = userValidationOtherData(body)
    if (validate.error)
        return next({ name: "ValidationError", message: validate.error.message })
    const editedUser = {
        fName: body.fName,
        lName: body.lName,
        userType: body.userType
    }
    const user = await User.findById(ObjectId(_id))
    Object.assign(user, editedUser)
    const updatedUser = await User.findByIdAndUpdate(ObjectId(_id), user, { new: true })
    response.status(201).json({ data: updatedUser })
}
const editUserEmail = async (request, response, next) => {
    if (request.user === undefined)
        return next({ name: "UnAuthorizedError", message: `You don't have credentials` })
    const body = request.body
    const _id = request.params
    const validate = userValidationEmail({ email: body.email })
    if (validate.error)
        return next({ name: "ValidationError", message: validate.error.message })
    const user = await User.findById(ObjectId(_id))
    const passwordCorrect = user === null ? false : await bcrypt.compare(body.password, user.password)
    if (!(user && passwordCorrect))
        return next({ name: "UnAuthorizedError", message: 'Invalid password' })
    if (user && user.email === body.email)
        return next({ name: "ValidationError", message: 'Email is the same' })
    const checkExistingEmail = await User.find({ email: body.email })
    if (checkExistingEmail.length)
        return next({ name: "ValidationError", message: 'Email already exist' })
    const editedUser = { email: body.email }
    Object.assign(user, editedUser)
    const updatedUser = await User.findByIdAndUpdate(ObjectId(_id), user, { new: true })
    if (request.user.id === user.id)
        logout.userLogout(request, response)
    else
        response.status(201).json({ data: updatedUser })
}
const editUserUsername = async (request, response, next) => {
    if (request.user === undefined)
        return next({ name: "UnAuthorizedError", message: `You don't have credentials` })
    const body = request.body
    const _id = request.params
    const validate = userValidationUsername({ username: body.username })
    if (validate.error)
        return next({ name: "ValidationError", message: validate.error.message })
    const user = await User.findById(ObjectId(_id))
    const passwordCorrect = user === null ? false : await bcrypt.compare(body.password, user.password)
    if (!(user && passwordCorrect))
        return next({ name: "UnAuthorizedError", message: 'Invalid password' })
    if (user && user.username === body.username)
        return next({ name: "Corrupted", message: 'Username is the same' })
    const checkExistingUsername = await User.find({ username: body.username })
    if (checkExistingUsername.length)
        return next({ name: "Corrupted", message: 'Username already exist' })
    const editedUser = { username: body.username }
    Object.assign(user, editedUser)
    const updatedUser = await User.findByIdAndUpdate(ObjectId(_id), user, { new: true })
    if (request.user.id === user.id)
        logout.userLogout(request, response)
    else
        response.status(201).json({ data: updatedUser })
}
const editUserPassword = async (request, response, next) => {
    if (request.user === undefined)
        return next({ name: "UnAuthorizedError", message: `You don't have credentials` })
    const body = request.body
    const _id = request.params
    const validate = userValidationPassword({ password: body.newPassword })
    const user = await User.findById(ObjectId(_id))
    if (validate.error)
        return next({ name: "ValidationError", message: validate.error.message })
    const checkPasswordOld = await bcrypt.compare(body.oldPassword, user.password)
    if (!checkPasswordOld)
        return next({ name: "ValidationError", message: "Incorrect old password" })
    const checkPasswordNew = await bcrypt.compare(body.newPassword, user.password)
    if (checkPasswordNew)
        return next({ name: "ValidationError", message: "New password cannot be same old password" })
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.newPassword, saltRounds)
    const editedUser = { password: passwordHash }
    Object.assign(user, editedUser)
    const updatedUser = await User.findByIdAndUpdate(ObjectId(_id), user, { new: true })
    if (request.user.id === user.id)
        logout.userLogout(request, response)
    else
        response.status(201).json({ data: updatedUser })
}
const deleteUser = async (request, response) => {
    const _id = request.params
    const user = await User.findByIdAndDelete(ObjectId(_id))
    if (request.cookies.User_LoggedIn === undefined)
        return response.status(401).json({ error: `Unauthorized: You don't have credentials` })
    if (request.user.id === user.id)
        logout.userLogout(request, response)
    else
        response.status(204).end()
}
module.exports = { getUsers, setUser, editUserData, editUserEmail, editUserUsername, editUserPassword, deleteUser }