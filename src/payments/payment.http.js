const paymentControllers = require('./payment.controllers')

const getAllUser = (req, res) => {
    paymentControllers.getPayByUser()
        .then(response => {
            res.status(200).json({
                item: response.length,
                payments: response
            })
        })
}

const createPay = (req, res) => {
    const body = req.body
    console.log(body)
    paymentControllers.addPay(body)
        .then(response => {
            res.status(201).json(response)
        })
        .catch(err => {
            res.status(400).json(err)
        })
}

module.exports = {
    getAllUser,
    createPay
}