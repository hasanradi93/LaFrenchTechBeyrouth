const { userValidationEmail, contactValidation } = require('../Utils/validate')
const { sendAMailContact } = require('../Utils/sendEmail')
const contact = async (request, response) => {
    const body = request.body
    if (body.fName === undefined || body.lName === undefined || body.companyName === undefined || body.subject === undefined || body.email === undefined || body.message === undefined)
        return response.status(401).json({ error: 'Please fill all data' })
    const validateEmail = userValidationEmail({ email: body.email })
    if (validateEmail.error)
        return response.status(401).json({ error: validateEmail.error.message })
    const validateData = contactValidation({ fName: body.fName, lName: body.lName, companyName: body.companyName, subject: body.subject, message: body.message })
    if (validateData.error)
        return response.status(401).json({ error: validateData.error.message })
    sendAMailContact(body)
    response.status(201).json({ data: 'Message sent successfully' })
}
module.exports = { contact }