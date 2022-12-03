const cartControllers = require('./cart.controllers')

const getAll = (req, res) => {
    cartControllers.getAllCart()
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(400).json(err)
        })
}

const getUserById = (req, res) => {
    const userId = req.params.id
    cartControllers.getCartUserById(userId)
        .then(response => {
                res.status(200).json(response)
        })
        .catch(err => {
            res.status(400).json({message: `No existe Cart-User con el id: ${userId}`})
        })
}

const editCart = (req, res) => {
    const body = req.body
    const userId = req.user.id
    if(Object.keys(body).length) {
        res.status(400).json({message: 'Missing Data'})
    } else if (
        !body.id ||
        !body.quantity ||
        !body.totalPrice
    ) {
        res.status(400).json({
            message: 'All fields must be completed',
            fields:{
                id : 'string',   
                quantity:  'string',
                totalPrice: 111
                }
            })
    } else  {
        cartControllers.editCartById(body, userId)
            .then(response => {
                res.status(200).json({
                    message: `Product edited successfully with id: ${response.id}`
                })
            })
            .catch(err => {
                res.status(400).json(err)
            })
    }
}

const createProductCart = (req, res) => {
   // const userId = req.user.id
    const body = req.body
    cartControllers.addProductToCart(body)
        .then(response => {
            res.status(201).json(response)
        })
        .catch(err => {
            res.status(400).json(err)
        })
}

const remove = (req, res) => {
    const id = req.params.id
    const userId = req.user
    cartControllers.removeProductFromCart(id, userId)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(400).json(err)
        })
}

module.exports = {
    getAll,
    getUserById,
    editCart,
    createProductCart,
    remove
}