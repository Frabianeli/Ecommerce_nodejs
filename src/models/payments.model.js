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
        validate: {
            min: {
                args: 1,
                msg: "quantity debe ser mayor a 0"
            }             
        }
    },
    totalPrice: {
        allowNull: false,
        type: DataTypes.FLOAT,
        field: 'total_price',
        validate: {
            min: {
                args: 1,
                msg: "totalPrice debe ser mayor a 0"
            }             
        }
    },
    productId: {
        allowNull: false,
        type: DataTypes.UUID,
    },
    userId: {
        allowNull: false,
        type: DataTypes.UUID,
    },
    paymentDateId: {
        allowNull: false,
        type: DataTypes.UUID,
    }
})

module.exports = Payments
