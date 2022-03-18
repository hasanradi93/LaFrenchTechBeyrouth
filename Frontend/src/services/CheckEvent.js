const joi = require('@hapi/joi')
const joiDate = require('@joi/date')
const jDate = joi.extend(joiDate)
export const eventValidation = (data) => {
    const schema = joi.object({
        title: joi.string().trim().min(5).max(60).required().messages({
            'string.base': `Title should be a type of 'text'`,
            'string.empty': `Title cannot be an empty field`,
            'string.min': `Title should have a minimum length of 10`,
            'string.max': `Title should have a maximum length of 60`,
            'any.required': `Title is a required field`
        }),
        description: joi.string().trim().min(100).required().messages({
            'string.base': `Description should be a type of 'text'`,
            'string.empty': `Description cannot be an empty field`,
            'string.min': `Description should have a minimum length of 100`,
            'any.required': `Description is a required field`
        }),
        active: joi.boolean().required().messages({
            'boolean.base': `Active should be yes or no`,
            'boolean.empty': `Active cannot be an empty field`,
            'any.required': `Active is a required field`
        }),//.greater('now')
        availableFromDate: jDate.date().format('YYYY-MM-DD').raw().required().messages({
            'date.base': `From Date should be a valid date`,
            'date.format': `From Date must be in YYYY-MM-DD format`,
            'date.empty': `From Date cannot be an empty field`,
            'date.greater': `From Date must be greater than today`,
            'any.required': `From Date is a required field`
        }),
        availableToDate: jDate.date().format('YYYY-MM-DD').greater(jDate.ref('availableFromDate')).greater('now').raw().required().messages({
            'date.base': `To Date should be a valid date`,
            'date.format': `To Date must be in YYYY-MM-DD format`,
            'date.greater': `To Date must be greater than From Date and the current date`,
            'date.empty': `To Date cannot be an empty field`,
            'any.required': `To Date is a required field`
        }),
        startDate: jDate.date().iso().raw().greater(jDate.ref('availableFromDate')).greater('now').required().messages({
            'date.base': `Start Date should be a valid date`,
            'date.format': `Start Date must be in YYYY-MM-DD HH:MM format`,
            'date.greater': `Start Date must be greater than From Date and the current date`,
            'date.empty': `Start Date cannot be an empty field`,
            'any.required': `Start Date is a required field`
        }),
        endDate: jDate.date().iso().raw().min(jDate.ref('startDate')).greater(jDate.ref('availableFromDate')).greater('now').required().messages({
            'date.base': `End Date should be a valid date`,
            'date.format': `End Date must be in YYYY-MM-DD HH:MM format`,
            'date.greater': `End Date must be greater than From Date and the current date`,
            'date.min': `End Date must be greater or equal than Start Date`,
            'date.empty': `End Date cannot be an empty field`,
            'any.required': `End Date is a required field`
        }),
        address: joi.string().trim().min(20).required().messages({
            'string.base': `Address should be a type of 'text'`,
            'string.empty': `Address cannot be an empty field`,
            'string.min': `Address should have a minimum length of 20`,
            'any.required': `Address is a required field`
        }),
        location: eventLocation().required().messages({
            'object.base': `Location is a type of map location X and Y`,
            'any.required': `Location is a required field`
        }),
    })
    return schema.validate(data)
}
const eventLocation = () => joi.object({
    X: joi.number().required().messages({
        'number.base': `Location.X should be a type of 'number'`,
        'any.required': `Location.X is a required field`
    }),
    Y: joi.number().required().messages({
        'number.base': `Location.Y should be a type of 'number'`,
        'any.required': `Location.Y is a required field`
    })
})