const router = require('express').Router()
const path = require('path')
const productImgServices = require('./productsImg.http')
const { upload } = require('../utils/multer')

router.route('/')
    .get(productImgServices.getAll)
    
router.post('/:id', upload, productImgServices.create)

router.route('/:img')
    .get((req, res) => {
        //--max-http-header-size = '16 KiB'
        const img = req.params.img
        console.log('PARAMS-IMG', img)
        res.status(200).sendFile(path.resolve('uploads/') + '/' + img)
    })
    .delete(productImgServices.remove)

exports.router = router