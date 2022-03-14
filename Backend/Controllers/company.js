require('../Models/connectToDB')
const Comapny = require('../Models/company')
const { ObjectId } = require('mongodb')
const { companyValidation, userValidationEmail } = require('../Utils/validate')
const getCompanyData = async (request, response) => {
    console.log("sdddsfd")
    const company = await Comapny.find({})
    response.status(201).json({ data: company })
}
const companyMail = async () => {
    const company = await Comapny.find({})
    return company[0].email
}
const editCompany = async (request, response) => {
    if (request.cookies.User_LoggedIn === undefined || request.user === undefined || request.user.userType !== 1)
        return response.status(403).json({ error: `Unauthorized: You don't have credentials` })
    const body = request.body
    const _id = request.params
    const validatePhone = companyValidation({ phone: body.phone })
    if (validatePhone.error)
        return response.status(401).json({ error: validatePhone.error.message })
    const validateEmail = userValidationEmail({ email: body.email })
    if (validateEmail.error)
        return response.status(401).json({ error: validateEmail.error.message })
    const editCompany = {
        email: body.email,
        phone: body.phone
    }
    const updatedCompany = await Comapny.findByIdAndUpdate(ObjectId(_id), editCompany, { new: true })
    response.status(201).json({ data: updatedCompany })
}
module.exports = { getCompanyData, companyMail, editCompany }