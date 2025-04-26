const paymentControllers = require('./payment.controllers')

const getAllUser = (req, res) => {
    const userId = req.user.id
    paymentControllers.getPayByUser(userId)
        .then(response => {
            res.status(200).json({
                status: 'success',
                item: response.length,
                payments_date: response
            })
        })
        .catch(err => {
            res.status(404).json({message: err})
        })
}

const createPayByCart = (req, res) => {
    const body = Array.isArray(req.body)  ? [...req.body] : [req.body]
    const userId = req.user.id
    const dateId = req.dateId
    const cartId = req.cartId
    paymentControllers.addPayByCart(userId, body, dateId, cartId)
        .then(response => {
            res.status(201).json({
                status: 'succes',
                message: 'Se guardo correctamente tus pagos',
            })
        })
        .catch(err => {
            res.status(400).json(err)
        })
}

const createByProduct = (req, res) =>{
    const body = req.body
    const dateId = req.dateId
    const userId = req.user.id
    paymentControllers.createPaymentByProduct(userId, body, dateId)
        .then(response => {
            console.log({response})
            res.status(201).json({
                message: 'se realizo la compra exitosamente',
                code: 201,
                status: 'succes'
            })
        })
        .catch(err => res.status(404).json({ message: err }))
}

module.exports = {
    getAllUser,
    createPayByCart,
    createByProduct
}