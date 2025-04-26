const brandServices = require('./brand.http')
const router = require('express').Router()
const { validateBody, validateGet, validateName } = require('../validations/brand')

router.route('/')
    .get(validateGet, brandServices.getAll)
    .post(validateBody, brandServices.create)
    .put(validateBody, brandServices.edit)

router.get('/admin', validateGet, brandServices.getAll)

router.get('/:name', validateName, brandServices.getByName)


exports.router = router