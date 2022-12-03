const categoryControllers = require('./category.controllers')

const getAll = (req, res) => {
    categoryControllers.getAllCategory()
        .then((response) => {
            res.status(200).json({items : response.length, categorys: response})
        })
        .catch((err) => {
            res.status(400).json(err)
        })
}

const getById = (req, res) => {
    const id = req.params.id
    console.log(id)
    categoryControllers.getCategoryById(id)
        .then((response) => {
            res.status(200).json(response)
        })
        .catch((err) => {
            res.status(400).json({message: `Category con el id: ${id} no existe`})
        })
}

const created = (req, res) => {
    const body = req.body
    if (!Object(body).length) {
        res.status(400).json({message: 'Missing Data'})
    } else if (!body.name) {
        res.status(400).json({
            message: 'All fields must be completed',
            fields:{
                name : 'string'
                }
        })
    } else {
        categoryControllers.createdCategory(body)
            .then((response) => {
                res.status(201).json({
                    message: `Category created succesfully with id: ${response.id}`,
                    category: response
                })
            })
            .catch((err) => {
                res.status(400).json(err)
            })
    }
}

module.exports = {
    getAll,
    getById,
    created,
} 