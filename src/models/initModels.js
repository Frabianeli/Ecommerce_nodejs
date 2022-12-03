const Products = require('./products.model')
const ProductsImage = require('./productsImage.model')
const Categories = require('./categories.model')
const Roles = require('./roles.model')
const Users = require('./users.model')
const Cart = require('./cart.model')
const Payments = require('./payments.model')

const initModels = () => {
    
    Roles.hasMany(Users,{
        foreignKey: 'role_id'
    })
    Users.belongsTo(Roles)
    
    Categories.hasMany(Products)
    Products.belongsTo(Categories)

    Products.hasMany(ProductsImage,{
        foreignKey: 'productId'
    })
    ProductsImage.belongsTo(Products)


    
    Users.belongsToMany(Products,{
        through: Cart,
        foreignKey: 'userId',
        otherKey: 'productId'
    })
    Products.belongsToMany(Users, {
        through: Cart,
        foreignKey: 'productId',
        otherKey: 'userId'
    })

    Cart.belongsTo(Users)
    Cart.belongsTo(Products)
    
    Products.hasMany(Cart)
    Users.hasMany(Cart)

}

module.exports = initModels