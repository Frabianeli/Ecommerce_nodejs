const router = require('express').Router()
const cartServices = require('./cart.http')
const passport = require('passport')

require('../middleware/auth.middleware')(passport)

router.route('/')
    .get(cartServices.getAll)

router.route('/me')
    .get(passport.authenticate('jwt', {session: false}), cartServices.getAllByUser)
    .post(passport.authenticate('jwt', {session: false}), cartServices.createProductCart)
    .patch(passport.authenticate('jwt', {session: false}), cartServices.editCart)
    
router.delete('/me/:id', passport.authenticate('jwt', {session: false}), cartServices.remove)

exports.router = router