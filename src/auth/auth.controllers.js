const Roles = require('../models/roles.model')
const Users = require('../models/users.model')
const Status = require('../models/status.model')
const uuid = require('uuid')

const { comparePassword, hashPassword } = require('../utils/crypt')
const { createCart } = require('../cart/cart.controllers')
const jwt = require('jsonwebtoken')


const getUserByEmail = async(email) => {
    const data = await Users.findOne({
        where: {
            email
        },
        include: {
            model: Roles,
            attributes: ['name']
        }
    })
    return data ? data : false
}

const loginUser = async(email, password) => {
    try {
        const user = await getUserByEmail(email)
        const verifyPassword = comparePassword(password, user.password)
        if(!verifyPassword){
            throw new Error('Invalid credentials')
        }
        const token = jwt.sign(
            {
              id: user.id,
              email: user.email,
              rol: user.roleId,
            },
            'key-example'
          );
        const isAdmin = user.role.name === 'admin'
        
        return {
            token,
            ...(isAdmin && {user : user})
        }
    } catch (error) {
        throw error.message || 'Error al encontrar el usuario'
    }
}

const registerUser = async (data) => {
    try {
        const { name, email, password } = data
        const rol = await Roles.findOne({
            where:{
                name: 'host'
            }
        })
        const status = await Status.findOne({ where: { name: 'active' }})
        const newUser = await Users.create({
            id: uuid.v4(),
            name,
            email,
            password: hashPassword(password),
            roleId: rol.id,
            statusId: status.id,
        })
        if(!newUser){
            throw new Error('Error al crear el usuario')
        }
        await createCart(newUser.id)
        return newUser
    } catch (error) {
        throw error.message || 'Error al registrar el usuario'
    }
}

module.exports = {
    loginUser,
    registerUser,
    getUserByEmail
}