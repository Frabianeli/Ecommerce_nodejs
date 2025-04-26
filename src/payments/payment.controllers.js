const uuid = require('uuid')

const Payments = require('../models/payments.model')
const Products = require('../models/products.model')
const ProductStock = require('../models/ProductStock.model')
const paymentsDate = require('../models/paymentsDate.model')
const Categories = require('../models/categories.model')
const CartProduct = require("../models/cartProduct")
const Cart = require("../models/cart.model")
const { getCartUser } = require('../cart/cart.controllers')
const { db } = require('../utils/database')
const { Op } = require('sequelize')
const { SELECT } = require('sequelize/lib/query-types')

// STANDLY aa0fb5b3-4ee5-4949-baa1-c33340efa2e5
// JUAN    1098b922-3841-4416-a471-fb2ca0f7efa4
// SAHID   74cd6011-7e76-4d6d-b25b-1d6e4182ec2f
const getPayByUser = async (userId) => {
    try {
        const data = await paymentsDate.findAll({
            attributes: ['id', 'date', 'createdAt'],
            include: {
                model: Payments,
                attributes: ['id', 'quantity', 'totalPrice', 'createdAt'],
                where: {
                    userId
                },
                required: true,
                include: {
                    model: Products,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'categoryId', 'brandId']
                    },
                    include: {
                        model: Categories,
                        attributes: ['id', 'name']
                    }
                },
            },
            order: [['date', 'DESC'],[Payments, 'createdAt', 'DESC' ]]
        })
        if(!data.length){
            throw new Error('No se encontraron registros de pagos para este usuario')
        }
        return data
    } catch (error) {
        throw error.message || 'Error al traer los pagos'
    }
}

const addPayByCart = async (userId, data, dateId, cartId) => {
    const transaction = await db.transaction()
    // Productos con el stock insuficiente
    const invalidProduct = []
    try {
        const cart = await Cart.findOne({
            attributes: ['id'],
            where: { userId },
            include: {
                model: CartProduct,
            },
            order: [ [ CartProduct, 'createdAt', 'DESC'] ],
            transaction
        })
        const cartProduct = cart?.cart_products
        if(!cart || !cartProduct.length){
            throw new Error('El carrito esta vació');
        }
        for(const product of cartProduct){
            const { quantity, stock, totalPrice, productId, productStockId } = product
            const [ [ data, count ] ] = await ProductStock.decrement(
                { stock: quantity }, 
                {
                    where: {
                        id: productStockId ,
                        stock: { [Op.gte]: quantity }
                    },
                    transaction
                }
            )
            if(!count){
                invalidProduct.push(productStockId)
            } else {
                const newPay = await Payments.create({
                    id: uuid.v4(),
                    quantity,
                    totalPrice,
                    userId,
                    productId,
                    paymentDateId: dateId,
                },{ transaction })
            }
        }
        if(invalidProduct.length){
            throw new Error('Insuficiente stock para los siguientes inventarios:')
        }
        await CartProduct.destroy( { where: { cartId: cart.id } } )
        await transaction.commit()
        return true
    } catch (error) {
        await transaction.rollback()
        throw {
            message: error.message || 'Error al registrar el pago',
            ...(invalidProduct.length && {productStock: invalidProduct})
        }
    }
}

const createPaymentByProduct = async(userId, product, dateId) => {
    const transaction = await db.transaction()
    try {
        const { quantity, productStockId } = product
        const productStock = await ProductStock.findOne({
            where: {
                id: productStockId,
            },
            attributes: ['id', 'stock'],
            include: {
                model: Products,
                attributes: ['id', 'price']
            },
            transaction
        })
        if(!productStock){
            throw new Error(`El stock con el ID: ${productStockId}, no existe`)
        }
        const [ [ data, count ] ] = await ProductStock.decrement(
            { stock: quantity },
            { 
                where: { 
                    id: productStockId ,
                    stock : { [Op.gte]: quantity }
                },
                transaction,
            }
        )
        if(!count){
            throw new Error(`El stock con el ID: ${productStockId}, no tiene suficiente productos`)
        }
        await Payments.create({
            id: uuid.v4(),
            userId: userId,
            productId: productStock.product.id,
            quantity,
            totalPrice: quantity * productStock.product.price,
            paymentDateId: dateId,
        },{ transaction })
        await transaction.commit()
        return true

    } catch (error) {
        await transaction.rollback()
        throw error.message || 'Error al registrar la compra'
    }
}

module.exports = {
    getPayByUser,
    addPayByCart,
    createPaymentByProduct
}