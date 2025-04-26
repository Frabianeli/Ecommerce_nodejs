const { DataTypes } = require("sequelize")
const { db } = require("../utils/database")


const ProductSize = db.define('product_size',{
    id : {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true
    },
})

module.exports = ProductSize