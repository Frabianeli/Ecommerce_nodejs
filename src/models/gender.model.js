const { DataTypes } = require("sequelize");
const { db } = require("../utils/database");

const Gender = db.define('gender',{
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(10),
        allowNull: false,
    }
})

module.exports = Gender