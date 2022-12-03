const router = require('express').Router()

const categoryServices = require('./category.http')

router.route('/')
    .get(categoryServices.getAll)
    .post(categoryServices.created)

router.route('/:id')
    .get(categoryServices.getById)

exports.router = router