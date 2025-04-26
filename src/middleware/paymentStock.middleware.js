const Categories = require("../models/categories.model")
const ProductStock = require("../models/ProductStock.model")
const ProductsImage = require("../models/productsImage.model")
const Products = require("../models/products.model")
const Cart = require("../models/cart.model")
const CartProduct = require("../models/cartProduct")

const uuid = require('uuid')

const checkStock = async (req, res, next) => {
// {} =  [{}] ||  [] = [...[]]
    const body = Array.isArray(req.body)  ? [...req.body] : [req.body]
    const invalidProduct = []
    const payment = []
    for(const e of body){
        const product = await ProductStock.findOne({
            where: { id: e.productStockId },
            attributes: ['id', 'stock'],
            include: [
                { 
                    model: Products,
                    attributes: ['id', 'price'],
                },
            ]
        })
        console.log('console LOG product', product, 'quantity', e.quantity)
        if(!(product.stock - e.quantity >= 0)){
            invalidProduct.push(e.productStockId)
        }
    }
    if(invalidProduct.length) {
        return res.status(400).json({
            status: "error",
            message: "No hay suficiente stock para los productos siguientes",
            products: [...invalidProduct]
          })
    }
    next()
}

const checkStockByCart = async (req, res, next) => {
    const userId = req.user.id
    try {
        const transaction = await sequelize.transaction();
        const cart = await Cart.findOne({
            where: { userId },
            attributes: ['cartTotalPrice'],
            include: {
                model: CartProduct,
                attributes: ['id', 'quantity', 'totalPrice'],
                include:[ 
                    {
                        model: Products,
                        attributes: ['price', 'id'],
                    },
                    {
                        model: ProductStock,
                        attributes: ['id', 'stock','size'],
                    }
                ]
            },
            transaction
        })
        const invalidProduct = []
        const payment = []
        for (const element of cart.cart_products) {
            const productStock = element.product_stock.stock
            const cartQuantity = element.quantity
            console.log({stock})
            if(!(cartQuantity - productStock >= 0)){
                invalidProduct.push(element.id)
            } else {
                element.product_stock.stock =- cartQuantity
                await cart.save({transaction})
                payment.push({
                    productId: element.product.id,
                    quantity: element.quantity,
                    totalPrice: element.totalPrice,
                    productStockId: element.product_stock.id
                })
            }
        }
        console.log(invalidProduct?.toJson())
        if(invalidProduct.length) {
            await transaction.rollback();
            return res.status(400).json({
                message: 'No hay stock suficiente en los productos siguientes:',
                products: invalidProduct
            })
        }
        req.payment = payment
        req.cartId = cart.id
        req.transaction = transaction
        next()
    } catch (error) {
        return res.status(400).json({
            message: 'Error al verficar stock',
            err: error.message
        })
    }
}

module.exports = {
    checkStock,
    checkStockByCart
}