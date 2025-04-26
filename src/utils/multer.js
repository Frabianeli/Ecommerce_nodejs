const { error } = require('console')
const multer = require('multer')
const path = require('path')
const Products = require('../models/products.model')
/*
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log('MULTER',req.body)
        cb(null, path.resolve('uploads/'))
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() +  '.' + 'jpg')
    }
})
*/
const handleErrors = (body) => {
    const product = JSON.parse(body.product || '{}')
    const stock = JSON.parse(body.stock || '{}')
        if(!Object.keys(product).length){
            const objErr = {
                message: 'Missing Data'
            }
            return new Error(JSON.stringify(objErr))
        } else if (
            !product.title ||
            !product.description ||
            !product.price ||
            !product.brand ||
            !product.category ||
            !product.subCategory ||
            !stock.stock
        ) {
            const objErr = {
                message: 'All fields must be completed',
                fields:{
                    product: {
                        title : 'string',   
                        description:  'string',
                        price: 1,
                        brandId: 'uuid',
                        categoryId: 'uuid',
                        subCategoryId: 'uuid',
                    },
                    stock: {
                        stock: 'string',
                        size: 'string no required'
                    }
                }
                }
            return new Error(JSON.stringify(objErr))
        } else {
            return null
        }
}

const upload = async(req, res, next) => {

    const { id } = req.params

    try {
        console.log(id)
        const product = await Products.findOne({where: {id}})
    } catch (error) {
        console.log(error.message)
        return res.status(400).json({message: `Invalid ID : ${id}`})
    }

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            // nuestro error personalizado enviamos datos en jsontringify de lo contrario null
            //const newError = handleErrors(req.body)
            console.log('destinantion')
            cb(null, path.resolve('uploads/'))
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() +  '.' + 'jpg')
        }
    })
    const upload = multer({ storage: storage }).array('files',5)
    upload(req, res, (err) => {
        try {
            console.log('files',req.files)
            console.log('UPLOAD', err)
            if(err){
                let newError = {}
                //Si es el error creado por nosotros retornamos el error recibido, de lo contrario 'Error al cargar la imagen'
                try {
                   newError = JSON.parse(err.message) 
                } catch (error) {
                   throw new Error('Error al cargar la imagen')
                }
                return res.status(400).json(newError)
            }
            next()
        } catch (error) {
            console.log('CATCH', error)
            return res.status(400).send({message: error.message});
        }
    });
}

//const upload = multer({storage})
    
exports.upload = upload