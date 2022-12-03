const router = require('express').Router()

const cartServices = require('./cart.http')

router.route('/')
    .get(cartServices.getAll)
    .patch(cartServices.editCart)
    .post(cartServices.createProductCart)

router.route('/:id')
    .get(cartServices.getUserById)
    .delete(cartServices.remove)

exports.router = router