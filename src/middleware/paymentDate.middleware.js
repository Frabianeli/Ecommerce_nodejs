const uuid = require('uuid')
const paymentsDate = require("../models/paymentsDate.model")


const dateMiddleware = async (req, res, next) => {
    try {
        const date = new Date()
        const month = date.getMonth() + 1 < 10 ? `0${date.getMonth()+1}` : date.getMonth()+1
        const dateFull = `${date.getDate()}/${month}/${date.getFullYear()}`
        const paymentDate = await paymentsDate.findOne({
            where: { date: dateFull }
        })
        if(!paymentDate){
            const id = uuid.v4()
            const newDate = await paymentsDate.create({
                id,
                date: dateFull
            });
            req.dateId= id
            next()
        } else{
            req.dateId= paymentDate.id
            next()
        }
    } catch (error) {
        res.status(400).json({ message: error.message || 'Error al procesar el pago'})
    }
}

module.exports = dateMiddleware