const Products = require('../models/products.model')
const Users = require('../models/users.model')
const Roles = require('../models/roles.model')
const ProductsImage = require('../models/productsImage.model')
const Categories = require('../models/categories.model')
const Cart = require('../models/cart.model')

const getAllUser = async () => {
    const data = await Users.findAll({
        include: [{
            model: Roles,
            attributes: {
                exclude: ['id', 'createdAt', 'updatedAt']
            }
        },
        {
            model: Products,
            include: [{
                model: ProductsImage,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            }, {
                model: Categories,
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'id']
                }
            }],
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'categoryId']
            },
            through: {
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            }
        }
        ],
        attributes: {
            exclude: ['role_id', 'createdAt', 'updatedAt']
        }
    })
    return data
}

const getUserById = async (id) => {
    const data = await Users.findOne({
        where: {
            id
        }
    })
    return data
}


module.exports = {
    getAllUser,
    getUserById
}