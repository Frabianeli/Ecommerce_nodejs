const { db } = require("../utils/database");
const { DataTypes } = require('sequelize')

const Status = db.define('status',{
    id:{
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(24),
        allowNull: false
    }
})

module.exports = Status