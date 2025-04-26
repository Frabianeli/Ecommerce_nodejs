const Cart = require('../models/cart.model')
const CartProduct = require('../models/cartProduct')
const Products = require('../models/products.model')
const productControllers = require('./product.controllers')

const sharp = require('sharp')
const path = require('path')


const getAll = async(req, res) => {
    const model = req.model
    const filtered = req.filtered
    const pagination = req.pagination
    productControllers.getAllProduct(model, pagination, filtered, req.query)
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => res.status(404).json({
        status: 'Failed',
        message: err
    }))
}

const getById = (req, res) => {
    const id = req.params.id
    productControllers.getProductById(id)
        .then((response) => {
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(404).json({message: err})
        })
}

const getByTitle = async(req, res) => {
    const { title } = req.query
    productControllers.getProductByTitle(title)
        .then((response) => {
            res.status(200).json(response)
        })
        .catch((err) => {
            res.status(404).json({message: err})
        })
}

const getByStockId = async(req, res) => {
    const { id } = req.params
    productControllers.getProductByStockId(id)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(404).json({message: err})
        })
}
// OPTIMIZAR
const createStock = (req, res) => {
    const body = req.newBody
    const productId = req.params.id
    productControllers.createProductStock(body, productId)
        .then(response => {
            res.status(201).json()
        })
        .catch(err => res.status(500).json({message: 'Error al crear stock'}))
}
//
const editByStockId = (req, res) => {
    const { id } = req.params
    const body = req.body
    console.log(id,body)
    if(!id.length){
        res.status(400).json({message: 'Porfavor ingrese un id'})
    }
    productControllers.editProductByStockId(id, body)
        .then(response => {
            console.log('THEN')
            res.status(200).json(response)
        })
        .catch(err => {
            console.log('CATCH')
            console.log(err)
            res.status(400).json({message: 'Invalid ID'})
        })
}

const removeStock = (req, res) => {
    const { id } = req.params
    productControllers.removeStockById(id)
        .then(response => {
            return res.status(201).json(response)
        })
        .catch(err => {
            return res.status(404).json({message: err})
        })
}

const create = (req, res) => {
    const body = req.body
    productControllers.createProduct(body)
        .then((response) => {
            res.status(201).json({
                message: `Product created succesfully with id : ${response.id}`,
                name: response.title,
                product: response
            })
        })
        .catch((err) => {
            res.status(500).json({
                message: err
            })
        })
}

const remove = (req, res) => {
    const id = req.params.id
    productControllers.removeProduct(id)
        .then((response) => {
            res.status(204).json()
        })
        .catch((err) => {
            res.status(404).json({ message: err })
        })
} 
//
const edit = (req, res) => {
    const id = req.params.id
    const body = req.body
    productControllers.editPoduct(body, id)
        .then((response) => {
            res.status(200).json({
                message: `Product edited successfully with id: ${response.id}`
            })
        })
        .catch((err) => {
            res.status(400).json({message: err})
        })
}


module.exports = {
    getAll,
    getById,
    getByTitle,
    getByStockId,
    create, 
    createStock,
    edit,
    editByStockId,
    remove,
    removeStock,
}