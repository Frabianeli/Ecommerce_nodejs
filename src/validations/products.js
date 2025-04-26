const {
  param,
  validationResult,
  body,
  checkSchema,
  query
} = require('express-validator');
const { db } = require('../utils/database');
const { QueryTypes } = require('sequelize');
const Brand = require('../models/brand.model');
const Categories = require('../models/categories.model');
const SubCategories = require('../models/subCategories');
const Gender = require('../models/gender.model');
const Products = require('../models/products.model');
const Stock = require('../models/ProductStock.model');

const validateCreate = [
  param('id')
    .notEmpty()
    .withMessage('No tiene que ser un strings')
    .isNumeric()
    .withMessage('Tiene que ser numero'),
  body('.stock')
    .notEmpty()
    .withMessage('Porfavor envie id')
    .isInt({min: 1})
    .withMessage('Envie un numero mayor a 1')
  ,
  (req, res, next) => {
    const result = validationResult(req);
    console.log({ result });
    if (!result.isEmpty()) {
      return res.json(result);
    }
    next();
  },
];

const validateStock = [
  param('id')
    .isUUID()
    .withMessage('El parametro debe ser un uuid')
    .bail()
    .custom(async(id, {req}) => {
      try {
        const product = await Products.findByPk(id)
        if(!product){
          throw new Error(`El producto con el "id" : ${id} no existe`)
        } 
        // Si el producto no admite tallas, verifica si el producto ya tiene un stock
        const hasSizes = product.hasSizes
        if (hasSizes === false) {
          const existingStock = await Stock.findOne({
            where: { productId: id },
          });
          if (existingStock) {
            throw new Error('El producto ya tiene un stock registrado y no acepta múltiples stocks');
          }
        }
        req.hasSizes = hasSizes
        return true
      } catch (error) {
          throw new Error(error.message || 'Error al encontrar el producto')
      }
    })
    .bail({level: 'request'}),
  body()
    .toArray()
    .not().isArray({ max: 0 })
    .withMessage('Mande un array')
    .bail()
    .custom((value, { req }) => {
      if (req.hasSizes === false && value.length > 1) {
        throw new Error('Solo se permite un elemento con stock para productos sin tallas');
      }
      return true;
    })
    .bail({level: 'request'}),
  body('*.stock')
    .not().isArray()
    .withMessage('El campo stock no debe ser un array')
    .bail()
    .isInt({gt: 0})
    .withMessage(
      'Porfavor ingrese un numero entero mayor a 0 que no contenga simbolos'
    ),
  // Si envian el campo "size" y el producto no acepta tallas lanzamos error
  body('*.size')
    .if((value, { req }) => req.hasSizes === false)
    .optional()
    .custom(() => {
      throw new Error('Este producto no acepta tallas');
    }),
  // Si el producto acepta tallas el campo "size" debe ser validado obligatoriamente
  body('*.size')
    .if((value, { req }) => req.hasSizes === true)
    //existe el campo?
    .exists()
    .withMessage('El campo "size" debe estar presente')
    .bail()
    .isString()
    .withMessage('El campo debe ser un string')
    .bail()
    .trim()
    .toUpperCase()
    .matches(/^[A-Z]+$|^[0-9]+$/)
    .withMessage('El campo debe contener un valor alfabético o solo numérico, pero no ambos')
    .bail()
    .custom(async (size, { req, pathValues, path, location }) => {
      // Si el producto ya tiene el "size" lanzamos error
      try {
        const productId = req.params.id;
        const productHasSize = await db.query(
          'SELECT stock.id from product_stocks AS stock INNER JOIN product_sizes AS size ON stock.size_id = size.id WHERE size.name = ? AND stock.product_id = ?',
          {
            type: QueryTypes.SELECT,
            logging: console.log,
            replacements: [size, productId],
          }
        );
        if (productHasSize.length) {
          throw new Error(`El producto ya tiene la talla ${size} registrada`);
        }
        //Verificar si los campos "sizes" estan duplicados
        const sizeDuplicate = req.body.some((e,i) => (e.size === size && i !== parseInt(pathValues[0])))
        if(sizeDuplicate){
          throw new Error('No se aceptan tallas duplicadas')
        }
        return true;
      } catch (error) {
        throw new Error(error.message || 'Error al verificar talla');
      }
    })
];

const validateEditStock = [
  
]

const validateProductCreate = [
  body('title')
    .notEmpty()
    .withMessage('El campo title debe estar presente')
    .bail()
    .isString()
    .withMessage('Debe ser un string')
    .bail()
    .trim()
    .isLength({ min: 4, max: 90 })
    .withMessage('Debe contener minimo 4 caracteres y maximo 100'),
  body('description')
    .notEmpty()
    .withMessage('El campo description debe estar presente')
    .bail()
    .isString()
    .withMessage('Debe ser un string')
    .bail()
    .isLength({ min: 4, max: 200 })
    .withMessage('Debe contener minimo 4 caracteres y maximo 200'),
  body('price')
    .notEmpty()
    .withMessage('El campo price debe estar presente')
    .bail()
    .not()
    .isArray()
    .withMessage('No se aceptan arreglos')
    .bail()
    .isFloat({ min: 0 })
    .withMessage('Debe ser un número válido'),
  body('genderId')
    .optional()
    .notEmpty()
    .withMessage('El campo genderId debe estar presente')
    .bail()
    .isString()
    .withMessage('El genderId debe ser una cadena de texto')
    .bail()
    .isUUID('4')
    .withMessage('Debe ser un UUID')
    .bail()
    .custom(async (value) => {
      console.log({ value });
      const gender = await Gender.findOne({ where: { id: value } });
      if (!gender) {
        throw new Error('El gender no existe');
      }
      return true;
    }),
  body('brandId')
    .notEmpty()
    .withMessage('El campo BranId debe estar presente')
    .bail()
    .isString()
    .withMessage('El branId debe ser una cadena de texto')
    .bail()
    .isUUID()
    .withMessage('Debe ser un UUID')
    .bail()
    .custom(async (value) => {
      const brand = await Brand.findOne({ where: { id: value } });
      if (!brand) {
        throw new Error('El brand no existe');
      }
      return true;
    }),
  body('categoryId')
    .notEmpty()
    .withMessage('El campo categoryId debe estar presente')
    .bail()
    .isString()
    .withMessage('El categoryId debe ser una cadena de texto')
    .bail()
    .isUUID()
    .withMessage('Debe ser un UUID')
    .bail()
    .custom(async (value) => {
      const category = await Categories.findOne({ where: { id: value } });
      if (!category) {
        throw new Error('El category no existe');
      }
      return true;
    }),
  body('subCategoryId')
    .notEmpty()
    .withMessage('El campo subCategoryId debe estar presente')
    .bail()
    .isString()
    .withMessage('El subCategoryId debe ser una cadena de texto')
    .bail()
    .isUUID()
    .withMessage('Debe ser un UUID')
    .bail()
    .custom(async (value) => {
      const subCategory = await SubCategories.findOne({ where: { id: value } });
      if (!subCategory) {
        throw new Error('El subCategory no existe');
      }
      return true;
    }),
  (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      let status = 400
      const notExist = result.array().find(err => err.msg.includes('no existe'));
      if(notExist){
        status = 404 
      }
      return res.status(status).json({
        message: 'Error al pasar las validaciones',
        errors: result.array(),
      });
    }
    next();
  },
];

const validateProduct = [
  //{category, subcategory, brand, gender, search, price, size, sort, status}
  query('status')
    .optional()
    .escape()
    .notEmpty().withMessage('No se aceptan valores vacios')
    .bail()
    .isIn(['active','inactive'])
    .withMessage('El valor debe ser "active" o "inactive"' ),
  query('search')
    .optional()
    .notEmpty().withMessage('No se aceptan valores vacios'),
  // SORT AGREGAR VALIDACION PARA EVITAR VALORES NO ACEPTADOS
  //AGREGAR MAYUSCULA EN LA BD
  query('sort')
    .optional()
    .escape()
    .notEmpty().withMessage('No se aceptan valores vacios')
    .bail()
    .matches(/^[a-zA-Z]+:[a-zA-Z]+$/)
    .withMessage('El valor debe contener dos cadenas alfabéticas separadas por dos puntos, ej: createdat:asc'),
  query('category')
    .optional()
    .escape()
    .notEmpty().withMessage('No se aceptan valores vacios')
    .bail()
    .matches(/^[a-zA-Z0-9]+(,[a-zA-Z0-9]+)*$/)
    .withMessage('El valor debe contener un valor alfanumérico sin guion bajo o mas de un valor separado por una coma'),
  query('subcategory')
    .optional()
    .escape()
    .notEmpty().withMessage('No se aceptan valores vacios')
    .bail()
    .matches(/^[a-zA-Z0-9]+(,[a-zA-Z0-9]+)*$/)
    .withMessage('El valor debe contener un valor alfanumérico sin guion bajo o mas de un valor separado por una coma'),
  query('brand')
    .optional()
    .escape()
    .notEmpty().withMessage('No se aceptan valores vacios')
    .bail()
    .matches(/^[a-zA-Z0-9]+(,[a-zA-Z0-9]+)*$/) 
    .withMessage('El valor debe contener un valor alfanumérico sin guion bajo o mas de un valor separado por una coma'),
  query('gender')
    .optional()
    .escape()
    .notEmpty().withMessage('No se aceptan valores vacios')
    .bail()
    .matches(/^[a-zA-Z0-9]+(,[a-zA-Z0-9]+)*$/) 
    .withMessage('El valor debe contener un valor alfanumérico sin guion bajo o mas de un valor separado por una coma'),
  query('size')
    .optional()
    .escape()
    .notEmpty().withMessage('No se aceptan valores vacios')
    .bail()
    .matches(/^[a-zA-Z0-9]+(,[a-zA-Z0-9]+)*$/)
    .withMessage('El valor debe contener un valor alfanumérico sin guion bajo o mas de un valor separado por una coma'),
  query('price')
    .optional()
    .escape()
    .notEmpty().withMessage('No se aceptan valores vacios')
    .bail()
    .matches(/^\d+(.\d+)?,\d+(.\d+)?$/)
    .withMessage('Debe contener dos numeros separados por una coma ej: 100,3000')
    .custom(value => {
      console.log({value})
      return true
    })
  ,
  (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({
        message: 'Error al pasar las validaciones',
        errors: result.array(),
      });
    }
    next();
  },
]

const validateTitle = [
  query('title')
    .notEmpty()
    .withMessage('Porfavor envie un title')
  ,
  (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({
        message: 'Error al pasar las validaciones',
        errors: result.array(),
      });
    }
    next();
  },
]

const validateId = [
  param('id')
    .notEmpty()
    .withMessage('Porfavor envie un id')
    .bail()
    .isUUID()
    .withMessage('El valor deber ser un UUID')
  ,
  (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({
        message: 'Error al pasar las validaciones',
        errors: result.array(),
      });
    }
    next();
  },
]

const validateEditProduct = [
  param('id')
    .notEmpty()
    .withMessage('El campo es obligatorio')
    .isUUID()
    .withMessage('El parametro debe ser un UUID'),
  body('title')
    .notEmpty()
    .withMessage('El campo title debe estar presente')
    .bail()
    .isString()
    .withMessage('Debe ser un string')
    .bail()
    .trim()
    .isLength({ min: 4, max: 90 })
    .withMessage('Debe contener minimo 4 caracteres y maximo 100'),
  body('description')
    .notEmpty()
    .withMessage('El campo description debe estar presente')
    .bail()
    .isString()
    .withMessage('Debe ser un string')
    .bail()
    .isLength({ min: 4, max: 200 })
    .withMessage('Debe contener minimo 4 caracteres y maximo 200'),
  body('price')
    .notEmpty()
    .withMessage('El campo price debe estar presente')
    .bail()
    .not()
    .isArray()
    .withMessage('No se aceptan arreglos')
    .bail()
    .isFloat({ min: 0 })
    .withMessage('Debe ser un número válido')
  ,
  (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({
        message: 'Error al pasar las validaciones',
        errors: result.array(),
      });
    }
    next();
  },
]

const v = checkSchema({
  title: {
    notEmpty: {
      errorMessage: 'El campo title debe estar presente',
      bail: true,
    },
    isString: { errorMessage: 'Debe ser un string', bail: true },
    trim: {},
    isLength: {
      errorMessage: 'Debe ser minimo 4 y maximo 80',
      bail: true,
      options: { min: 4, max: 80 },
    },
  },
  description: {},
});

module.exports = {
  validateCreate,
  validateStock,
  validateProductCreate,
  validateProduct,
  validateTitle,
  validateId,
  validateEditProduct,
};
