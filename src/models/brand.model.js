const { db } = require('../utils/database')
const { DataTypes } = require('sequelize')

const Brand = db.define('brand', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false
    },
    name : {
        type: DataTypes.STRING,
        allowNull: false,
    }
})

module.exports = Brand