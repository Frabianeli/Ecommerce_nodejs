const { param, body, validationResult } = require("express-validator");

const validateResult = (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            message: 'Error en la validación de datos',
            errors: errors.array()
        })
    }
    next()
}

const validateCreate = [
    body('productStockId')
        .isUUID()
        .withMessage('El valor debe ser un UUID'),
    body('quantity')
        .exists()
        .withMessage('El campo debe estar presente')
        .bail()
        .not().isArray()
        .withMessage('El valor no debe ser un array')
        .bail()
        .isInt({ gt: 0 })
        .withMessage('El valor debe ser un número entero mayor a 0'),
    validateResult
]

module.exports = {
    validateCreate,
}