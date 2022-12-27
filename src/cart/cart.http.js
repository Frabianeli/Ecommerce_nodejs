const cartControllers = require('./cart.controllers')

const getAll = (req, res) => {
    cartControllers.getAllCart()
        .then(response => {
            res.status(200).json({
                items: response.length,
                cart: response
            })
        })
        .catch(err => {
            res.status(400).json(err)
        })
}

const getAllByUser= (req, res) => {
    const userId = req.user.id
    console.log(userId)
    cartControllers.getCartUser(userId)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(400).json(err)
        })
}

const editCart = (req, res) => {
    const body = req.body
    const userId = req.user.id
    if(!Object.keys(body).length) {
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
        cartControllers.editCartById(userId,body)
        .then(response => {
                res.status(200).json({
                    message: `Product edited successfully with id: ${body.id}`,
                })
            })
            .catch(err => {
                res.status(400).json(err)
            })
    }
}

const createProductCart = (req, res) => {
    const userId = req.user.id
    const body = req.body
    cartControllers.addProductToCart(userId, body)
        .then(response => {
            console.log(response)
            res.status(201).json(response)
        })
        .catch(err => {
            res.status(400).json(err)
        })
}

const remove = (req, res) => {
    const body = req.body
    const id = req.params.id
    console.log(req.body)
    cartControllers.removeProductFromCart(id)
        .then(response => {
            if(res){
                res.status(200).json(response)
            } else {
                res.status(400).json({message: 'Invalid id'})
            }
        })
        .catch(err => {
            res.status(400).json({message: "erhttp", err})
        })
}

module.exports = {
    getAll,
    getAllByUser,
    editCart,
    createProductCart,
    remove
}