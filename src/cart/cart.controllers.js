const uuid = require('uuid')
const Cart = require('../models/cart.model')
const CartProduct = require('../models/cartProduct')
const Categories = require('../models/categories.model')
const Products = require('../models/products.model')
const ProductsImage = require('../models/productsImage.model')
const Roles = require('../models/roles.model')
const Users = require('../models/users.model')

const getAllCart = async () => {
    const data = await Cart.findAll({
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    })


    return data
}


const editCartById = async (userId, data) => {
    //let cartId = '589fdd81-eb11-422e-aee3-c3a403693af4'
    const {quantity, totalPrice, id} = data
    const editProduct = await CartProduct.update(
        {
            quantity,
            totalPrice,
        },
        {
            where: { id }
        })
        const cart = await Cart.findOne({where:{userId}})
        const cartTotalPrice = await CartProduct.sum('totalPrice', {where:{cartId: cart.id}})
        const editCart = await Cart.update({cartTotalPrice}, {where: {userId}})
        return editProduct
}

const getCartUser= async (userId) => {
    console.log(userId)
    const data = await Cart.findOne({
        where: {
            userId,
        },
        include: {
            model: CartProduct,
            attributes: ['id', 'quantity', 'totalPrice'],
            include: {
                model: Products,
                include: [{
                    model : Categories,
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
            }
        },
        attributes: ['id', 'cartTotalPrice']
    })


    return data
}
const createCart = async (userId) => {
    const newProduct = await Cart.create({
        id: uuid.v4(),
        userId,
        cartTotalPrice: 0
    })
    return newProduct
}
const addProductToCart = async (userId, data) => {

    const verifiedCart = await Cart.findOne({where: {userId}})

    const cartId = uuid.v4()

    if(!verifiedCart){
        const product = Cart.hasMany(CartProduct)
        const newProduct = await Cart.create({
            id: cartId,
            userId,
            cartTotalPrice: data.totalPrice,
            cart_products: {
                id: uuid.v4(),
                cartId: cartId,
                productId: data.productId,
                quantity: data.quantity,
                totalPrice: data.totalPrice 
            }
        },{include: [product]})
    
        return newProduct
    }
    const newProduct = await CartProduct.create({
        id: uuid.v4(),
        cartId: verifiedCart.id,
        productId: data.productId,
        quantity: data.quantity,
        totalPrice: data.totalPrice 
    })
    
    console.log('tengo cart')
    const cartTotalPrice = await CartProduct.sum('totalPrice', {where:{cartId: verifiedCart.id}})
    // const cartTotalPrice = Number(verifiedCart.cartTotalPrice) + Number(data.totalPrice)
    await Cart.update({cartTotalPrice},{where: {userId}})

    return newProduct
    
}

const removeProductFromCart = async (id) => {
    const cart = await CartProduct.findOne({where:{id}})
    const remove = await CartProduct.destroy({
        where: {
            id
        }
    })
    if(remove){
        await Cart.decrement(
            { cartTotalPrice: +cart.totalPrice}, { where: { id: cart.cartId} }
        )
    }
    return remove

}

module.exports = {
    getAllCart,
    getCartUser,
    editCartById,
    addProductToCart,
    removeProductFromCart,
    createCart
}