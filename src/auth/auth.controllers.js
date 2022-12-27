const Roles = require('../models/roles.model')
const Users = require('../models/users.model')
const uuid = require('uuid')

const { comparePassword, hashPassword } = require('../utils/crypt')
const { createCart } = require('../cart/cart.controllers')


const getUserByEmail = async(email) => {
    const data = await Users.findOne({
        where: {
            email
        }
    })
    return data ? data : false
}

const loginUser = async(email, password) => {
    const userByEmail = await getUserByEmail(email)
    if(userByEmail){
        const verifyPassword = comparePassword(password, userByEmail.password)
        if(verifyPassword){
            return userByEmail
        }
    }
    return false
}

const registerUser = async (data) => {
    const rol = await Roles.findOne({
        where:{
            name: 'host'
        }
    })
    const userByEmail = await getUserByEmail(data.email)
    if (!userByEmail) {
        const newUser = await Users.create({
            id: uuid.v4(),
            name: data.name,
            email: data.email,
            password: hashPassword(data.password),
            roleId: rol.id,
            status: 'active',
            verified: 'false'
        })
        if(newUser){
            await createCart(newUser.id)
            return newUser
        }
    }
    return false
}

module.exports = {
    loginUser,
    registerUser
}