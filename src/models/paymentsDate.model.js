const { DataTypes } = require('sequelize')
const { db } = require('../utils/database')

const paymentsDate = db.define('payment_date',{
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true
    },
    date : {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
})

module.exports = paymentsDate