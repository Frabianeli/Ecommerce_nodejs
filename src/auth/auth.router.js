const router = require('express').Router()

const authServices = require('./auth.http')

router.post('/login', authServices.login)

router.post('/register', authServices.register)

exports.router = router