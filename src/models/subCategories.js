const { DataTypes } = require('sequelize')
const { db } = require('../utils/database')

const SubCategories = db.define('sub_category',{
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING
    },
    categoryId: {
        allowNull: false,
        type: DataTypes.UUID,
        field: 'category_id'
    }
})

module.exports = SubCategories