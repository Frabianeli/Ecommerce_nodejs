const {DataTypes} = require('sequelize')
const { db } = require('../utils/database')

const Cart = db.define('cart', {
    id: {
        allowNull: false,
        type: DataTypes.UUID,
        primaryKey: true,
    },
    userId: {
        allowNull: false,
        type: DataTypes.UUID,
        unique: false
    },
    cartTotalPrice: {
        allowNull: false,
        type: DataTypes.FLOAT,
        defaultValue: 0,
        field: 'total_price'
    }
})

module.exports = Cart