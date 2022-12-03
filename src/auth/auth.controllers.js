const Users = require('../models/users.model')

const {comparePassword} = require('../utils/crypt')

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
        const verifyPassword = comparePassword(password, user.password)
        if(verifyPassword){
            return userByEmail
        }
    }
    return false
}

const registerUser = async (data) => {
    const userByEmail = await getUserByEmail(email)
    if (!userByEmail) {
        const newUser = await Users.create({
            name: data.name,
            email: data.email,
            password: data.password,
            roleId: '',
            status: 'active',
            verified: 'false'
        })
        return newUser
    }
    return false
}

module.exports = {
    loginUser,
    registerUser
}