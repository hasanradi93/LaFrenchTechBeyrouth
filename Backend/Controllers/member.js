require('../Models/connectToDB')
const Member = require('../Models/member')
const { memberValidation, photoValidation } = require('../Utils/validate')
const { uploadPhoto, deletePhoto } = require('../Utils/uploadFile')
const { ObjectId } = require('mongodb')
const getMembers = async (request, response) => {
    const members = await Member.find({}).sort({ $natural: -1 })
    response.json(members)
}
const uploadPhotoMember = uploadPhoto.single("photo")
const setMember = async (request, response) => {
    if (request.user === undefined || request.user.userType !== 1)
        return response.status(403).json({ error: `Unauthorized: You don't have credentials` })
    const body = request.body
    body.social = JSON.parse(body.social)
    const validate = memberValidation({ fName: body.fName, lName: body.lName, position: body.position, social: body.social })
    if (validate.error)
        return response.status(401).json({ error: validate.error.message })
    if (request.file === undefined)
        return response.status(401).json({ error: 'Photo for member is required' })
    if (request.file.fieldname !== "photo")
        return response.status(401).json({ error: 'Only .png, .jpg and .jpeg format allowed!' })
    const validatePhoto = photoValidation({ photo: request.file })
    if (validatePhoto.error)
        return response.status(401).json({ error: validatePhoto.error.message })
    const url = request.protocol + "://" + request.get('Host')
    const newMember = new Member({
        fName: body.fName,
        lName: body.lName,
        position: body.position,
        photo: url + "/Files/Events/" + request.file.filename,
        social: body.social
    })
    const savedMember = await newMember.save()
    response.status(201).json({ data: savedMember })
}
const editMember = async (request, response) => {
    if (request.user === undefined || request.user.userType !== 1)
        return response.status(403).json({ error: `Unauthorized: You don't have credentials` })
    const body = request.body
    const _id = request.params
    body.social = JSON.parse(body.social)
    const validate = memberValidation({ fName: body.fName, lName: body.lName, position: body.position, social: body.social })
    if (validate.error)
        return response.status(401).json({ error: validate.error.message })
    const editedMember = {
        fName: body.fName,
        lName: body.lName,
        position: body.position,
        photo: body.photo,
        social: body.social
    }
    if (request.file) {
        if (request.file.fieldname !== "photo")
            return response.status(401).json({ error: 'Only .png, .jpg and .jpeg format allowed!' })
        const validatePhoto = photoValidation({ photo: request.file })
        if (validatePhoto.error)
            return response.status(401).json({ error: validatePhoto.error.message })
        const url = request.protocol + "://" + request.get('Host')
        editedMember["photo"] = url + "/Files/Events/" + request.file.filename
    }
    const updatedMember = await Member.findByIdAndUpdate(ObjectId(_id), editedMember, { new: true })
    response.status(201).json({ data: updatedMember })
}
const deleteMember = async (request, response, next) => {
    if (request.user === undefined || request.user.userType !== 1)
        return response.status(403).json({ error: `Unauthorized: You don't have credentials` })
    const _id = request.params
    const getMember = await Member.findById(ObjectId(_id))
    deletePhoto('/Files/Events', getMember.photo.split('Events')[1])
    console.log("getMember", getMember)
    await Member.findByIdAndDelete(ObjectId(_id))
    response.status(204).end()
}
module.exports = { getMembers, uploadPhotoMember, setMember, editMember, deleteMember }