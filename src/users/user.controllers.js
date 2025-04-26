const Products = require('../models/products.model')
const Users = require('../models/users.model')
const Roles = require('../models/roles.model')
const ProductsImage = require('../models/productsImage.model')
const Categories = require('../models/categories.model')
const Cart = require('../models/cart.model')
const CartProduct = require('../models/cartProduct')
const Status = require('../models/status.model')
const { Op } = require('sequelize')
const { db } = require('../utils/database')

const getAllUser = async (baseUrl, query) => {
    const { offset, limit, search, sort, status } = query
    const off = parseInt(offset) || 0
    const lim = parseInt(limit) || 10
    console.log(off,lim)
    try {
        const model = {
            offset: off,
            limit: lim,
            logging: console.log,
            order: [ ['createdAt', 'ASC'] ],
            attributes: ['id', 'name', 'email', 'dni', 'verified', 'createdAt'],
            include: [
                {
                    model: Status,
                    attributes: ['name'],
                    where: {name: 'active'},
                },
                {
                    model: Roles,
                    required: true,
                    attributes: {
                        exclude: ['id', 'createdAt', 'updatedAt']
                    }
                },
              /*{
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
                        },
                    }
                }*/
            ],
        }
        const modelCount = {
            include: {
                model: Status,
                where: { name: 'active' }
            }
        }

        if(sort){
            const sortBy = sort.split(':',2)
            const col = sortBy[0].toLowerCase() == 'createdat' ? 'createdAt' : sortBy[0]
            model.order = [ [ db.col(col), sortBy[1].toUpperCase() ] ] 
        }
        if(search){
            model.where = { name: { [Op.iLike] : `%${search}%` } }
            modelCount.where = { name: { [Op.iLike] : `%${search}%` } }
        }

        const pathAdmin = baseUrl.includes('/admin')
        if(pathAdmin){
            model.include[0].where = status ? { name: status } : {}
            modelCount.include.where = status ? { name: status } : {}
        }

        const data = await Users.findAll(model)
        const totalCount = await Users.count(modelCount)
        if(!data.length && !totalCount){
            throw new Error('No se encontraron resultados')
        }
        const objQuery = {
            ...(search && { search }),
            ...(sort && { sort }),
            ...(status && { status }),
        }
        const newQuery = Object.keys(objQuery).length ?
            new URLSearchParams(objQuery).toString().replaceAll('%3A','') + '&' : ''
 
        const nextPage =   (off + lim) < totalCount ? `${baseUrl}${newQuery}offset=${off + lim}&limit=${lim}` : null
        const prevPage =   off > 0 ? `${baseUrl}${newQuery}offset=${Math.max(off - lim, 0)}&limit=${lim}` : null
        const totalPages = Math.ceil(totalCount / limit)
        const totalCurrent = Math.floor(offset / limit) + 1
        return {
            items: data.length,
            users: data,
            pagination: {
                total_count: totalCount,
                total_pages: totalPages,
                current_page: totalCurrent,
                next_page: nextPage,
                prev_page: prevPage,
            }
        }
        
    } catch (error) {
        console.log(error)
        throw error
    }
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