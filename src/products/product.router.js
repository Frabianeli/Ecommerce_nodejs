const router = require('express').Router()
const passport = require('passport')

const productServerices = require('./product.http')
const categoriesServices = require('../categories/category.http')
const ProductImg = require('../models/productsImage.model')

require('../middleware/auth.middleware')(passport)

const {upload} = require('../utils/multer')
const { roleAdminMiddleware }= require('../middleware/role.middleware')

router.route('/')
    .get(productServerices.getAll)
    .post(passport.authenticate('jwt', {session: false}), roleAdminMiddleware,  upload.array('files', 5), productServerices.create )

router.route('/:id')
    .get(productServerices.getById)
    .delete(productServerices.remove)
    .put(productServerices.edit)

router.get('/img/ver', async(req, res) => {
    const data = await ProductImg.findAll()
    res.status(200).json({items: data.length, images: data})
})


exports.router = router