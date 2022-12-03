const uuid = require('uuid')

const Categories = require('../models/categories.model')
const Products = require('../models/products.model')
const ProductsImage = require('../models/productsImage.model')

const getAllCategory = async() => {
    const data = await Categories.findAll({
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    })
    return data
}

const getCategoryById = async(id) => {
    const data = await Categories.findOne({
        where: {
            id
        },
        include: {
            model: Products,
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'categoryId']
            },
            include: {
                model: ProductsImage,
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'productId', 'id']
                }
            }
        },
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    })
    return data
}

const createdCategory = async(data) => {
    const newCategory = Categories.create({
        id: uuid.v4(),
        name: data.name
    })
    return newCategory
}

module.exports = {
    getAllCategory,
    getCategoryById,
    createdCategory
}