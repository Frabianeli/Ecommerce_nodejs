const router = require('express').Router()

const productServerices = require('./product.http')
const categoriesServices = require('../categories/category.http')
const ProductImg = require('../models/productsImage.model')

const {upload} = require('../utils/multer')

router.route('/')
    .get(productServerices.getAll)
    .post(upload.array('files', 5), productServerices.create )

router.route('/:id')
    .get(productServerices.getById)
    .delete(productServerices.remove)
    .put(productServerices.edit)

router.get('/img/ver', async(req, res) => {
    const data = await ProductImg.findAll()
    res.status(200).json({items: data.length, images: data})
})


router.post('/upload', upload.array("foto", 5), productServerices.profileImg)



exports.router = router