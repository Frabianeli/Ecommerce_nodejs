const { DataTypes } = require('sequelize')
const { db } = require('../utils/database')

const ProductsImage = db.define('products_img', {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
    },
    productId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'product_id'
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    }
})
module.exports = ProductsImage