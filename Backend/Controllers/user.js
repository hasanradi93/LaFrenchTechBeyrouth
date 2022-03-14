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
const editUserData = async (request, response) => {
    const body = request.body
    const _id = request.params
    const validate = userValidationOtherData(body)
    if (validate.error)
        return response.status(401).json({ error: validate.error.message })
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
const editUserEmail = async (request, response) => {
    const body = request.body
    const _id = request.params
    const validate = userValidationEmail(body)
    if (validate.error)
        return response.status(401).json({ error: validate.error.message })
    const user = await User.findById(ObjectId(_id))
    if (user && user.email === body.email)
        return response.status(401).json({ error: 'Email is the same' })
    const checkExistingEmail = await User.find({ email: body.email })
    if (checkExistingEmail.length)
        return response.status(401).json({ error: 'Email already exist' })
    const editedUser = { email: body.email }
    Object.assign(user, editedUser)
    if (request.cookies.User_LoggedIn === undefined)
        return response.status(401).json({ error: `Unauthorized: You don't have credentials` })
    const updatedUser = await User.findByIdAndUpdate(ObjectId(_id), user, { new: true })
    if (request.user.id === user.id)
        logout.userLogout(request, response)
    else
        response.status(201).json({ data: updatedUser })
}
const editUserUsername = async (request, response) => {
    const body = request.body
    const _id = request.params
    const validate = userValidationUsername(body)
    if (validate.error)
        return response.status(401).json({ error: validate.error.message })
    const user = await User.findById(ObjectId(_id))
    logger.info("user", user)
    if (user && user.username === body.username)
        return response.status(401).json({ error: 'Username is the same' })
    const checkExistingUsername = await User.find({ username: body.username })
    if (checkExistingUsername.length)
        return response.status(401).json({ error: 'Username already exist' })
    const editedUser = { username: body.username }
    Object.assign(user, editedUser)
    logger.info("request.cookies.User_LoggedIn", request.cookies.User_LoggedIn)
    if (request.cookies.User_LoggedIn === undefined)
        return response.status(401).json({ error: `Unauthorized: You don't have credentials` })
    const updatedUser = await User.findByIdAndUpdate(ObjectId(_id), user, { new: true })
    logger.info("request.user", request.user)
    if (request.user.id === user.id)
        logout.userLogout(request, response)
    else
        response.status(201).json({ data: updatedUser })
}
const editUserPassword = async (request, response) => {
    const body = request.body
    const _id = request.params
    const validate = userValidationPassword(body)
    const user = await User.findById(ObjectId(_id))
    if (validate.error)
        return response.status(401).json({ error: validate.error.message })
    const checkPassword = await bcrypt.compare(body.password, user.password)
    if (checkPassword)
        return response.status(401).json({ error: "Password is the same" })
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)
    const editedUser = { password: passwordHash }
    Object.assign(user, editedUser)
    if (request.cookies.User_LoggedIn === undefined)
        return response.status(401).json({ error: `Unauthorized: You don't have credentials` })
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