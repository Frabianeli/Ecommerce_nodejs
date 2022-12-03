const router = require('express').Router()

const userServices = require('./user.http')


router.route('/')
    .get(userServices.getAll)

router.route('/:id')
    .get(userServices.getById)

exports.router = router