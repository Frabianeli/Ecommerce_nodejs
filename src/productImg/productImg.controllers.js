const Products = require('../models/products.model')
const ProductImg = require('../models/productsImage.model')

const getAllImg = async () => {
    const data = await ProductImg.findAll({
        include:{
            model: Products,
            as: 'product'
        }
    })
    return data
}

const getProductImgById = (id) => {

}

const getAllImgByProduct = async (productId) => {
    const data = await ProductImg.findAll({
        where: {
            productId
        }
    })
    return data
} 

const removeProductImg = async (id) => {
    const data = await ProductImg.destroy({
        where: {
            id
        }
    })
    return data
}

module.exports = {
    getAllImg,
    getAllImgByProduct,
    removeProductImg
}