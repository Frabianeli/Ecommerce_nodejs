const Products = require("../models/products.model")

const verifyData = async (req, res, next) => {
    console.log('body', req.body)
    const data = await Products.count()
    console.log(data)
    console.log('body-2', req.body)
    const body = JSON.parse(req.body.product)
    console.log({body})
    const stock = JSON.parse(req.body.stock)
    console.log({stock})
    if(!Object.keys(body).length){
        res.status(400).json({message: 'Missin Data'})
    } else if (
        !body.title ||
        !body.description ||
        !body.price ||
        !body.brand ||
        !body.category ||
        !body.subCategory ||
        !stock.stock
    ) {
        return res.status(400).json({
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
            })
    } else {
        next()
    }
}

module.exports = verifyData