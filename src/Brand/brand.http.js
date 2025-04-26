const brandControllers = require('./brand.controllers')

const getAll = (req, res) =>{
    const baseUrl = `${req.protocol}://${req.get('host')}${req.originalUrl.split('?',1).join('')}?`;
    const isAdmin = req.user?.role === 'admin'
    brandControllers.getAllBrand(baseUrl, req.query, isAdmin)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            res.status(400).json({message: error})
        })
}

const getByName = (req, res) => {
    const name = req.params.name
    brandControllers.getBrandByName(name)
        .then(response =>{
            res.status(200).json(response)
        })
        .catch(error => {
            res.status(400).json({message: error})
        })
}

const edit = (req, res) => {
    const body = req.body
    brandControllers.editBrand(body)
        .then((response) => {
            res.status(201).json({
                message: `Brand edit succesfully with id: ${response}`,
            })
        })
        .catch((err) => {
            res.status(400).json({message: err})
        })
}

const create = (req, res) => {
    const body = req.body
    brandControllers.createBrand(body)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            res.status(400).json({message: error})
        })
}

module.exports = {
    getAll,
    getByName,
    edit,
    create
}