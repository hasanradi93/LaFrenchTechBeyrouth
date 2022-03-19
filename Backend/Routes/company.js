const routing = require('express').Router()
const companyController = require('../Controllers/company')
routing.route('/')
    .get(companyController.getCompanyData)
routing.route('/:id')
    .patch(companyController.editCompany)
module.exports = routing