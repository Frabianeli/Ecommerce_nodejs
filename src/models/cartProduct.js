const {DataTypes} = require('sequelize')
const {db} = require('../utils/database')

const CartProduct = db.define('cart_products', {
    id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
    },
    cartId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'cart_id'
    },
    productId : {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'product_id'
    },
    productStockId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'product_stock_id'
    },
    quantity: {
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    totalPrice: {
        allowNull: false,
        type: DataTypes.FLOAT
    }
})

module.exports = CartProduct