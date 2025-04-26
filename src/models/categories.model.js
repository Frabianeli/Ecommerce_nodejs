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
        type: DataTypes.STRING,
    },
    statusId: {
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: "77d71ed7-0113-4c01-aac2-ed093b355157"
    }
})

module.exports = Categories