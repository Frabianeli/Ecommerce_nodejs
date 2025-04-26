const router = require('express').Router()
const authServices = require('./auth.http')

const { validateRegister, validateLogin } = require('../validations/auth')

router.post('/login', validateLogin, authServices.login)

router.post('/register', validateRegister, authServices.register)

exports.router = router