const { response } = require('express')
const categoryControllers = require('./category.controllers')

const getAll = (req, res) => {
    const query = req.query
    const url = `${req.originalUrl.split('?',1).join('')}?`
    const baseUrl = `${req.protocol}://${req.get('host')}${url}`
    categoryControllers.getAllCategory(baseUrl, query)
        .then((response) => {
            
            res.header('cont', 'items 100-200-400')
            res.header('Content-Range', `items 1-10/100`);
            res.status(200).json(response)
        })
        .catch((err) => {
            res.status(400).json({ message: err})
        })
}
const getByName = (req, res) => {
    const name  = req.params.name
    categoryControllers.getCategoryByName(name)
        .then((response) => {
            res.status(200).json(response)
        })
        .catch((err) => {
            res.status(400).json({message: err})
        })
}
const getById = (req, res) => {
    const name = req.params.name
    console.log('params', name)
    categoryControllers.getCategoryById(name)
        .then((response) => {
            res.status(200).json(response)
        })
        .catch((err) => {
            res.status(400).json({message: err})
        })
}

const edit = (req, res) => {
    const name = req.body.name
    const id = req.params.id
    categoryControllers.editCategory(id, name)
        .then((response) => {
            res.status(201).json({
                message: `Category edit succesfully with id: ${response.id}`,
            })
        })
        .catch((err) => {
            res.status(400).json({ message: err})
        })
}

const editStatus = (req, res) => {
    const body = req.body
    const id = req.params.id
    const { status } = body
    categoryControllers.editCategoryStatus(id, status)
        .then((response) => {
            res.status(200).json(response)
        })
        .catch((err) => {
            res.status(400).json({message: err})
        })
}

const remove = (req, res) => {
    const id = req.params.id
    categoryControllers.removeCategory(id)
        .then((response) => {
            res.status(204).json()
        })
        .catch((error) => {
            res.status(400).json({ message: err })
        })
}

const created = (req, res) => {
    const name = req.body.name
    categoryControllers.createdCategory(name)
        .then((response) => {
            res.status(201).json({
                message: `Category created succesfully with id: ${response.id}`,
                category: response
            })
        })
        .catch((err) => {
            res.status(400).json({ message: err })
        })
}

const getAllSubCategory = (req, res) => {
    categoryControllers.getAllSubCategory()
        .then((response) => {
            res.status(200).json({items : response.length, subCategories: response})
        })
        .catch((err) => {
            res.status(400).json(err)
        })
}

const getByNameSubCategory = (req, res) => {
    const name = req.params.name
    categoryControllers.getSubCategoryByName(name)
        .then((response) => {
            res.status(200).json(response)
        })
        .catch((err) => {
            res.status(400).json({message: 'Invalid Name'})
        })
}


module.exports = {
    getAll,
    getByName,
    edit,
    editStatus,
    getById,
    remove,
    created,
    getAllSubCategory,
    getByNameSubCategory
} 