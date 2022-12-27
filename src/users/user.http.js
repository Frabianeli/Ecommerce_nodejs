const userControllers = require('./user.controllers')

const getAll = (req, res) => {
    userControllers.getAllUser()
        .then(response => {
            res.status(200).json({
                items: response.length,
                users: response
            })
        })
        .catch(err => {
            res.status(400).json(err)
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