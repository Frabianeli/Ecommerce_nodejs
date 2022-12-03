const uuid = require('uuid')

const Payments = require('../models/payments.model')
const Products = require('../models/products.model')

const getPayByUser = async () => {
    let userId = '1098b922-3841-4416-a471-fb2ca0f7efa4'
    const data = await Payments.findAll({
        where: {
            userId
        }
    })
    return data
}

const addPay = async (data) => {
    const newPay = await Payments.bulkCreate([
        {
            id: uuid.v4(),
            userId: data.userId,
            productId: data.productId,
            quantity: data.quantity,
            totalPrice: data.totalPrice
        }
    ], { validate: true })

    const addProduct = await Products.increment(
        { stock: -data.quantity }, { where: { id: data.productId } }
    )
    return addProduct
}


module.exports = {
    getPayByUser,
    addPay
}