const { query, validationResult, param, body } = require('express-validator');

//const { offset, limit, sort, status, search } = query
const validateResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Error al pasar las validaciones',
      errors: errors.array(),
    });
  }
  next();
};

const validateGet = [
  query('page')
    .optional()
    .isInt({ gt: 0 })
    .withMessage('El valor debe ser un número entero mayor a 0'),
  query('limit')    
    .optional()
    .isInt({ gt: 0 })
    .withMessage('El valor debe ser un número entero mayor a 0'),
  query('sort')
    .optional()
    .toLowerCase()
    .isIn([
      'count_products:asc',
      'count_products:desc',
      'name:asc',
      'name:desc',
      'createdat:asc',
      'createdat:desc',
    ])
    .withMessage(
      'El campo solo admite los siguientes valores: "count_products:desc", "count_products:asc", "name:asc", "name:desc", "createdat:desc","createdat:asc" '
    ),
  query('status')
    .optional()
    .toLowerCase()
    .isIn(['active', 'inactive'])
    .withMessage('El valor debe ser "active" o "inactive" '),
  query('search')
    .optional()
    .toLowerCase()
    .matches(/^[0-9a-záéíóúñ\s]+$/)
    .withMessage('Solo se permiten valores como letras, números, espacios y caracteres acentuados'),
  validateResult,
];
//SOLO UN USO EN LA RUTA BYNAME
const validateName = [
  param('name')
    .isString()
    .withMessage('Debe ser un string')
    .bail()
    .toLowerCase()
    .matches(/^[0-9a-záéíóúñ\s]+$/)
    .withMessage('Solo se permiten valores como letras, números, espacios y caracteres acentuados'),
  validateResult
];

const validateId = [
  param('id')
    .isUUID()
    .withMessage('El valor debe ser un UUID')
  ,
  validateResult
];

const validateBody = [
  body('name')
    .exists()
    .withMessage('El campo debe estar presente')
    .bail()
    .isString()
    .withMessage('El campo debe ser un string')
    .bail()
    .trim()
    .toLowerCase()
    .matches(/^[0-9a-záéíóúñ\s]+$/)
    .withMessage('El solo permite letras, números, espacios y caracteres acentuados'),
  validateResult,
];

module.exports = {
  validateGet,
  validateBody,
  validateName,
  validateId
};
