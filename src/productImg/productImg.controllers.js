const Products = require('../models/products.model')
const ProductImg = require('../models/productsImage.model')

const getAllImg = async () => {
    const data = await ProductImg.findAll({
        attributes:['id', 'url']
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
    removeProductImg
}