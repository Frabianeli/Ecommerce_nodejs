const router = require('express').Router()
const path = require('path')
const productImgServices = require('./productsImg.http')

router.route('/')
    .get(productImgServices.getAll)

router.route('/:img')
    .get((req, res) => {
        const img = req.params.img
        res.status(200).sendFile(path.resolve('uploads/') + '/' + img)
    })


exports.router = router