const {DataTypes} = require('sequelize')

const {db} = require('../utils/database')

const Users = db.define('users', {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    email: {
        allowNull: false,
        type: DataTypes.STRING(35),
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    dni: {
        type: DataTypes.STRING,
    },
    roleId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'role_id'
    },
    verified: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    statusId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'status_id'
    }
})

module.exports = Users