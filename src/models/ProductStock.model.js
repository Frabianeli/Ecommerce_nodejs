const { DataTypes } = require('sequelize')
const { db } = require('../utils/database')
const ProductSize = require('./productSize.model')
const Products = require('./products.model')

const Stock  = db.define('product_stock' , {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    productId: {
        type: DataTypes.UUID,
        field: 'product_id',
        allowNull: false,
    },
    sizeId: {
        type: DataTypes.UUID,
        allowNull: true,
        field: 'size_id',
    }
})

module.exports = Stock