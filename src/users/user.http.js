const userControllers = require('./user.controllers')

const getAll = (req, res) => {
    const baseUrl = `${req.protocol}://${req.get('host')}${req.originalUrl.split('?',1)}?`
    userControllers.getAllUser(baseUrl, req.query)
        .then(response => {
            res.status(200).json(response   )
        })
        .catch(err => {
            res.status(400).json({message: err.message})
        })
}

const getById = (req, res) => {
    const id = req.params.id
    userControllers.getUserById(id)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(400).json(err)
        })
}

module.exports = {
    getAll,
    getById
}