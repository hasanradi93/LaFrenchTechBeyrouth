require('../Models/connectToDB')
const Comapny = require('../Models/company')
const { ObjectId } = require('mongodb')
const { companyValidation, userValidationEmail } = require('../Utils/validate')
const getCompanyData = async (request, response) => {
    const company = await Comapny.find({})
    response.status(201).json({ data: company })
}
const companyMail = async () => {
    const company = await Comapny.find({})
    return company[0].email
}
const editCompany = async (request, response, next) => {
    if (request.user === undefined || request.user.userType !== 1)
        return next({ name: "UnAuthorizedError", message: `You don't have credentials` })
    const body = request.body
    const _id = request.params
    const validatePhone = companyValidation({ phone: body.phone })
    if (validatePhone.error)
        return next({ name: "ValidationError", message: validatePhone.error.message })
    const validateEmail = userValidationEmail({ email: body.email })
    if (validateEmail.error)
        return next({ name: "ValidationError", message: validateEmail.error.message })
    const editCompany = {
        email: body.email,
        phone: body.phone
    }
    const company = await Comapny.findById(ObjectId(_id))
    Object.assign(company, editCompany)
    const updatedCompany = await Comapny.findByIdAndUpdate(ObjectId(_id), editCompany, { new: true })
    response.status(201).json({ data: updatedCompany })
}
module.exports = { getCompanyData, companyMail, editCompany }