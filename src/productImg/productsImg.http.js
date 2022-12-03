const productsImageControllers = require('./productImg.controllers')

const getAll= (req, res) => {
    productsImageControllers.getAllImg()
        .then(response => {
            res.status(200).json(response)
        })
        .catch((err) => {
            res.status(400).json(err)
        })
}


module.exports = {
    getAll
}