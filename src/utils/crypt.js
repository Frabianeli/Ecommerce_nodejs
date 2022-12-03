const bcrypt = require('bcrypt')

const hashPassword = (plainPassword) => {
    return bcrypt.hashSync(plainPassword)
}

const comparePassword = (plainPassword, hashedPassword) => {
    return bcrypt.compareSync(plainPassword, hashedPassword)
}

module.exports = {
    hashPassword,
    comparePassword
}