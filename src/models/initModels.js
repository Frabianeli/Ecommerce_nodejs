const Products = require('./products.model')
const ProductsImage = require('./productsImage.model')
const Categories = require('./categories.model')
const Roles = require('./roles.model')
const Users = require('./users.model')
const Cart = require('./cart.model')
const Payments = require('./payments.model')
const CartProduct = require('./cartProduct')
const ProductSize = require('./productSize.model')
const PaymentsDate = require('./paymentsDate.model')
const ProductStock = require('./ProductStock.model')
const Brand = require('./brand.model')

const SubCategories = require('./subCategories')
const Gender = require('./gender.model')
const Status = require('./status.model')

const initModels = () => {
    
    Products.belongsTo(Status)
    Brand.belongsTo(Status)
    Categories.belongsTo(Status)
    SubCategories.belongsTo(Status)
    Users.belongsTo(Status)

    Roles.hasMany(Users)
    Users.belongsTo(Roles)

    Gender.hasMany(Products,{
        foreignKey: 'genderId',
        sourceKey: 'id'
    })
    Products.belongsTo(Gender, {
        foreignKey: 'genderId',
        targetKey: 'id'
    })

    Brand.hasMany(Products)
    Products.belongsTo(Brand)
    
    Categories.hasMany(Products)
    Products.belongsTo(Categories)

    SubCategories.hasMany(Products)
    Products.belongsTo(SubCategories)

    Categories.hasMany(SubCategories)
    SubCategories.belongsTo(Categories)

    Products.hasMany(ProductsImage,{
        foreignKey: 'productId'
    })
    ProductsImage.belongsTo(Products)


    Users.hasOne(Cart)
    Cart.belongsTo(Users)

    ProductStock.hasMany(CartProduct)
    CartProduct.belongsTo(ProductStock)
    
    Products.hasMany(CartProduct)
    CartProduct.belongsTo(Products)

    Cart.hasMany(CartProduct)
    CartProduct.belongsTo(Cart)
    
    PaymentsDate.hasMany(Payments)
    Payments.belongsTo(PaymentsDate)

    Products.hasMany(Payments)
    Payments.belongsTo(Products)

    Users.hasMany(Payments)
    Payments.belongsTo(Users)


    Products.hasMany(ProductStock,{
        foreignKey: 'product_id', // Define el nombre de la clave foránea,
        sourceKey: 'id'
      })
      
    ProductStock.belongsTo(Products)
    
    ProductSize.hasMany(ProductStock,{
        foreignKey: 'size_id', // Define el nombre de la clave foránea
        sourceKey: 'id'
    })
    ProductStock.belongsTo(ProductSize,{
        foreignKey: 'size_id', // Utiliza la clave foránea sizeId en ProductStock
        targetKey: 'id' // Utiliza la clave primaria id en ProductSize
    })
    
}

module.exports = initModels