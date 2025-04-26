const router = require('express').Router();
const CartProduct = require('../models/cartProduct');
const Products = require('../models/products.model');
const ProductStock = require('../models/ProductStock.model');
const cartServices = require('./cart.http');
const passport = require('passport');
const {
  validateCreate,
  validateId,
  validateEdit,
} = require('../validations/cart');

require('../middleware/auth.middleware')(passport);

router.get('/', cartServices.getAll);

router.get(
  '/me',
  passport.authenticate('jwt', { session: false }),
  cartServices.getAllByUser
);

router
  .route('/me/:id')
  .patch(
    passport.authenticate('jwt', { session: false }),
    validateEdit,
    cartServices.editCart
  )
  .delete(
    passport.authenticate('jwt', { session: false }),
    validateId,
    cartServices.remove
  )
  .post(
    passport.authenticate('jwt', { session: false }),
    validateCreate,
    cartServices.createProductCart
  );

router.get('/:cartid', async (req, res) => {
  const cartId = req.params.cartid;
  const data = await CartProduct.findAll({
    where: {
      cartId,
    },
    include: [{ model: Products }, { model: ProductStock }],
    attributes: ['quantity', 'totalPrice', 'id'],
  });
  return res.status(200).json(data);
});

exports.router = router;
