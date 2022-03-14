const routing = require('express').Router()
const companyController = require('../Controllers/company')
routing.route('/')
    .get(companyController.getCompanyData)
routing.route('/:id')
    .put(companyController.editCompany)
module.exports = routing