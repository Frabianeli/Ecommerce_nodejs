const uuid = require('uuid')
const Products = require('../models/products.model')
const ProductsImage = require('../models/productsImage.model')
const Categories = require('../models/categories.model')
const { Sequelize } = require('sequelize')
const sequelize = ('sequelize')


const getAllProducts = async() => {
    const data  = await Products.findAll({
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'categoryId']
        },
        include: [
            {
                model: Categories,
                as: 'category',
                attributes: ['name']
            },
            {
                model: ProductsImage,
                attributes: ['url']
            }
        ],
    })
    
    return data
}

const getProductById = async (id) => {
    const data = await Products.findOne({
        where: {
            id
        },
        include: [
            {
                model: Categories,
                as: 'category',
                attributes: ['name']
            },
            {
                model: ProductsImage,
                attributes: ['url']
            }
        ],
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'categoryId']
        }
    })
    return data
}


const createProduct = async (data, host, images) => {

   const productId = uuid.v4()

   const newProduct = await Products.create({
        id: productId,
        title: data.title,
        description: data.description,
        price: data.price,
        stock: data.stock,
        categoryId: data.categoryId,
    })
    console.log('pase prodcut controllers')
    const arrayImg = []
    images.forEach((img) => {
        arrayImg.push({
            id: uuid.v4(),
            productId: productId,
            url: host+ img.filename
        })
    })
    const createImg = await ProductsImage.bulkCreate(arrayImg)
    console.log({imageControllers: createImg})

    return {...newProduct.dataValues,
                images: createImg.map(img => img.url)
            }

}

const removeProduct = async (id) => {
    const data = await Products.destroy({
        where : {
            id
        }
    })
    return data
}

const editPoduct = async (data, productId) => {
    const {id, categoryId, ...newData} = data
    const edit = await Products.update(
        {...newData}, 
        {where: {
            id: productId
        }}
    )
    return edit
}

const postProfileImg = async ( images, host) => {

    const arrayImage = []
    images.map((img) => {
        arrayImage.push({
            id: uuid.v4(),
            productId: 'a94faa65-9402-4638-95a5-e0d348cf6ea3',
            url: host+ img.filename
        })
    })

    const data = await ProductsImage.bulkCreate(arrayImage)
    return data
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    removeProduct,
    editPoduct,
    postProfileImg
}