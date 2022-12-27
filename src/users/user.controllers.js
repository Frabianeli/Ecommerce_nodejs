const Products = require('../models/products.model')
const Users = require('../models/users.model')
const Roles = require('../models/roles.model')
const ProductsImage = require('../models/productsImage.model')
const Categories = require('../models/categories.model')
const Cart = require('../models/cart.model')
const CartProduct = require('../models/cartProduct')

const getAllUser = async () => {
    const data = await Users.findAll({
        include: [{
            model: Roles,
            attributes: {
                exclude: ['id', 'createdAt', 'updatedAt']
            }
        },
        {
            model: Cart,
            attributes: ['id', 'cartTotalPrice'],
            include: {
                model: CartProduct,
                attributes: ['id', 'quantity', 'totalPrice'],
                include: {
                    model: Products,
                    attributes: {
                        exclude: ['categoryId', 'createdAt', 'updatedAt']
                    },
                    include: [{
                        model: Categories,
                        attributes: ['name']
                    },
                    {
                        model: ProductsImage,
                        attributes: ['url']
                    }
                    ]
                }
            }
        }
        ],
        attributes: {
            exclude: ['role_id', 'createdAt', 'updatedAt', 'password', 'role']
        }
    })
    return data
}

const getUserById = async (id) => {
    const data = await Users.findOne({
        where: {
            id,
        },
        include: [{
            model: Roles,
            attributes: {
                exclude: ['id', 'createdAt', 'updatedAt']
            }
        },
        {
            model: Cart,
            attributes: ['id', 'cartTotalPrice'],
            include: {
                model: CartProduct,
                attributes: ['id', 'quantity', 'totalPrice'],
                include: {
                    model: Products,
                    attributes: {
                        exclude: ['categoryId', 'createdAt', 'updatedAt']
                    },
                    include: [{
                        model: Categories,
                        attributes: ['name']
                    },
                    {
                        model: ProductsImage,
                        attributes: ['url']
                    }
                    ]
                }
            }
        }
        ],
        attributes: {
            exclude: ['role_id', 'createdAt', 'updatedAt', 'password', 'role']
        }
    })
    return data
}


module.exports = {
    getAllUser,
    getUserById
}