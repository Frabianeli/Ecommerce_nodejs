const { DataTypes } = require('sequelize')
const { db } = require('../utils/database')

const Products = db.define('products', {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    hasSizes: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false // Indica si el producto tiene tallas o no
    },
    categoryId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'category_id'
    },
    subCategoryId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'sub_category_id'
    },
    brandId : {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'brand_id'
    },
    genderId : {
        type: DataTypes.UUID,
        field: 'gender_id',
        defaultValue: null
    },
    statusId : {
        type: DataTypes.UUID,
        field: 'status_id',
        defaultValue: '77d71ed7-0113-4c01-aac2-ed093b355157',
    }
})

module.exports = Products