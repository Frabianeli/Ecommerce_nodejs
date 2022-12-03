const { DataTypes } = require('sequelize')
const { db } = require('../utils/database')

const Categories = db.define('categories', {
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING
    }
})

module.exports = Categories