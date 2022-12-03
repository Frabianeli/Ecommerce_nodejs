const {DataTypes} = require('sequelize')
const { db } = require('../utils/database')

const Cart = db.define('cart', {
    id: {
        allowNull: false,
        type: DataTypes.UUID,
        primaryKey: true,
    },
    productId: {
        allowNull: false,
        type: DataTypes.UUID,
        unique: false
    },
    userId: {
        allowNull: false,
        type: DataTypes.UUID,
        unique: false
    },
    quantity: {
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    totalPrice: {
        allowNull: false,
        type: DataTypes.FLOAT,
        field: 'total_price'
    }
})

module.exports = Cart