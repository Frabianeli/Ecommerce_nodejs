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
        allowNull: false,
        type: DataTypes.UUID,
        field: 'role_id'
    },
    status: {
        allowNull: false,
        type: DataTypes.STRING ,
        defaultValue: 'active' // active, non-active, deleted, suspended
    },
    verified: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
})

module.exports = Users