const { body, param, validationResult } = require('express-validator');
const CartProduct = require('../models/cartProduct');
const Cart = require('../models/cart.model');
const { Op, QueryTypes, Error } = require('sequelize');
const { db } = require('../utils/database');
const Products = require('../models/products.model');
const ProductStock = require('../models/ProductStock.model');
//SOLO AJUSTAR VALIDATE RESULT
const validateResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Error en la validación de datos',
      errors: errors.array().reduce((acc,cv) => {
        const path = cv.path
        acc[path] = cv.msg
        return acc
      },{}),
    });
  }
  next();
};

const validateCreate = [
  param('id')
    .isUUID()
    .withMessage('El valor debe ser un UUID')
    .bail({level: 'request'})
    .custom(async( id, { req } ) => {
      const product = await ProductStock.findOne({
        where: { id },
        attributes: ['productId'],
        include:[
          {
            model: Products,
            attributes: ['price']
          }
        ]
      })
      if(!product){
        throw new Error(`No existe el registro con el id : ${id}`)
      }
      req.product = {
        id: product.productId,
        price: product.product.price
      }
      return true
    }),
  body('quantity')
    .exists()
    .withMessage('El campo debe estar presente')
    .bail()
    .isInt({ gt: 0 })
    .withMessage('El valor debe ser un número entero mayor a 0'),
  validateResult,
];

const validateId = [
  param('id')
    .isUUID()
    .withMessage('El valor debe ser un UUID')
    .custom(async (id, { req }) => {
      const userId = req.user.id;
      const cartProduct = await CartProduct.findOne({
        where: { id },
        attributes: ['id', 'totalPrice', 'cartId'],
        include: {
          model: Cart,
          attributes: [],
          where: { userId },
        },
      });
      if (!cartProduct) {
        throw new Error(`No existe el registro con el id: ${id}`);
      }
      req.productCart = {
        totalPrice: cartProduct.totalPrice,
        cartId: cartProduct.cartId,
      };
      return true;
    }),
  validateResult,
];

const validateEdit = [
  param('id')
    .isUUID()
    .withMessage('El valor debe ser un UUID')
    .bail({level: 'request'})
    .custom(async (id, { req }) => {
      const userId = req.user.id;
      const cartProduct = await CartProduct.findOne({
        where: { id },
        attributes: ['cartId', 'quantity', 'totalPrice'],
        include: [
          {
            model: Cart,
            attributes: ['cartTotalPrice'],
            where: { userId },
          },
          {
            model: Products,
            attributes: ['price'],
          },
        ]
      });
      if(!cartProduct){
        throw new Error(`No existe el producto del carrito con el id : ${id}`)
      }
      req.cart = {
        cartId: cartProduct.cartId,
        productPrice: cartProduct.product.price,
        totalPrice: cartProduct.totalPrice,
        cartTotalPrice: cartProduct.cart.cartTotalPrice
      }
      return true
    }),
  body('quantity')
    .exists()
    .withMessage('El campo es obligatorio')
    .bail()
    .not()
    .isArray()
    .withMessage('No se aceptan arreglos')
    .bail()
    .matches(/^[1-9][0-9]*$/)
    .withMessage('El valor debe ser un entero mayor a 0')
    .bail()
    .custom((quantity, { req }) => {
      if(quantity == req.cart.quantity){
        throw new Error('La cantidad debe ser diferente a la actual');
      }
      return true
    }),
  validateResult,
];

module.exports = {
  validateCreate,
  validateId,
  validateEdit,
};
