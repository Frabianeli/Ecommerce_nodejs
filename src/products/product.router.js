const router = require('express').Router();
const passport = require('passport');

const productServerices = require('./product.http');

require('../middleware/auth.middleware')(passport);

const { roleAdminMiddleware } = require('../middleware/role.middleware');
const {
  productQuery,
  productFiltered,
} = require('../middleware/productQuery.middleware');
const {
  checkSize,
  errorHandlerStock,
  error,
} = require('../middleware/checkSize.middleware');
const { validateCreate, validateStock, validateProductCreate, validateProduct, validateTitle, validateId, validateEditProduct } = require('../validations/products');
const { db } = require('../utils/database');
const { QueryTypes } = require('sequelize');

const validate = (validations) => {
  return async (req, res, next) => {
    for (const validation of validations) {
      const result = await validation.run(req);
      if (!result.isEmpty()) {
        const errors = result.array().reduce((acc, cv) => {
          const index = cv.path.match(/[0-9]/g)?.join('');
          const name = cv.path.match(/[a-z]/g)?.join('');
          if (index && name) {
            if (!acc[index]) {
              acc[index] = {};
            }
            acc[index] = { [name]: cv.msg };
          } else {
            acc.body = cv.msg;
          }
          return acc;
        }, {});
        return res.status(400).json({ errors });
      }
    }
    next();
  };
};

router.route('/')
  .get(validateProduct, productQuery, productFiltered, productServerices.getAll)
  .post(
    passport.authenticate('jwt', { session: false }),
    roleAdminMiddleware, validateProductCreate,
    productServerices.create
  );

router.get('/admin', validateProduct, productQuery, productFiltered, productServerices.getAll);

router.get('/title', validateTitle, productServerices.getByTitle);

router
  .route('/stock/:id')
  .post(validateStock, error, checkSize, productServerices.createStock);

router
  .route('/stock/:id')
  .get(validateId, productServerices.getByStockId)
  .put(productServerices.editByStockId)
  .delete(validateId, productServerices.removeStock);

router
  .route('/:id')
  .get(validateId, productServerices.getById)
  .delete(validateId, productServerices.remove)
  .put(validateEditProduct, productServerices.edit);

exports.router = router;
