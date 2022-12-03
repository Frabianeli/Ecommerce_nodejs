const router = require('express').Router()

const paymentServices = require('./payment.http')

router.route('/')
    .get(paymentServices.getAllUser)
    .post(paymentServices.createPay)


exports.router = router