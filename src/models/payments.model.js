
/*
const {DataTypes} = require('sequelize')

const {db} = require('../utils/database')

const Payments = db.define('payments',{
    id: {
        allowNull: false,
        type: DataTypes.UUID,
        primaryKey: true,
    },
    quantity: {
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    totalPrice: {
        allowNull: false,
        type: DataTypes.FLOAT,
        field: 'total_price',
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
    }
})

module.exports = Payments
*/