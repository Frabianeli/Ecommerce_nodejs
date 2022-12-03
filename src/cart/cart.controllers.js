const uuid = require('uuid')

const Cart = require('../models/cart.model')
const Categories = require('../models/categories.model')
const Products = require('../models/products.model')
const ProductsImage = require('../models/productsImage.model')
const Users = require('../models/users.model')

const getAllCart = async () => {
    const data = await Cart.findAll()
    return data
}

const editCartById = async (data, userId) => {
    //let cartId = '589fdd81-eb11-422e-aee3-c3a403693af4'
    const editCart = await Cart.update(
        {
            quantity: data.quantity,
            totalPrice: data.totalPrice
        },
        {
            where: {
                id: data.id,
                userId
            }
        }
    )
    return editCart
}

const getCartUserById = async (userId) => {
    const data = await Users.findOne({
        where: {
            id: userId
        },
        include: [{
            model: Products,
            attributes: ['id', 'title', 'description', 'price', 'stock'],
            include: [{
                model: ProductsImage,
                attributes: ['id', 'productId', 'url']
            }, {
                model: Categories,
                attributes: ['name']
            }],
            through: {
                attributes: ['id', 'quantity', 'totalPrice']
            }
        }],
        attributes: ['name', 'id', 'email']
    })
    return data
}


const addProductToCart = async (data) => {
    const newProduct = await Cart.create({
        id: uuid.v4(),
        productId: data.productId,
        userId: data.userId,
        quantity: data.quantity,
        totalPrice: data.totalPrice
    })
    return newProduct
}

const removeProductFromCart = async (id, userId) => {
    const remove = await Cart.destroy({
        where: {
            id,
            userId
        }
    })
    return remove
}

module.exports = {
    getAllCart,
    getCartUserById,
    editCartById,
    addProductToCart,
    removeProductFromCart
}