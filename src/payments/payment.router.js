const router = require('express').Router();
const passport = require('passport');
const mercadopago = require('mercadopago');

const paymentServices = require('./payment.http');
const paymentsDate = require('../models/paymentsDate.model');
const dateMiddleware = require('../middleware/paymentDate.middleware');
const { checkStock, checkStockByCart } = require('../middleware/paymentStock.middleware');
const { validateCreate } = require('../validations/payment');
const { default: axios } = require('axios');
require('../middleware/auth.middleware')(passport);

router
  .route('/me')
  .get(
    passport.authenticate('jwt', { session: false }),
    paymentServices.getAllUser
  )
  //.post(passport.authenticate('jwt', {session: false}), paymentServices.createPay)
  .post(
    passport.authenticate('jwt', { session: false }),
    dateMiddleware,
    paymentServices.createPayByCart
  );

router.post(
  '/product',
  passport.authenticate('jwt', { session: false }),
  validateCreate,
  dateMiddleware,
  paymentServices.createByProduct
);

router.get('/all', async (req, res) => {
  const result = await paymentsDate.findAll();
  res.json(result);
});

router.post('/notification', async(req, res) => {
  const { query, body } = req
  console.log('POST-')
  console.log({query});
  console.log({body})
  console.log('PAYMENT',body.type)
  console.log('ORDER',query.topic)
  if (body.type === "payment") {
    // Si es un pago, obtén los detalles del pago
    console.log('ENTRE PAYMENT', body.data.id)
    const payment = await mercadopago.payment.findById(body.data.id);
    console.log('payment', payment.response.status, payment.response.status_detail)
} 
  res.send({ msg: 'nitify' });
});
// vendedor TESTZA9MAYN3 BH4oclamXB
// comprador TETE9078059 d9NVa7l1qG
router.get('/create', (req, res) => {
  config = {
    access_token:
      'TEST-6456072979424584-123022-813fc72b16af32431eac1917315d364c-1276474981',
  };

  mercadopago.configurations.setAccessToken(config.access_token);

  let preference = {
    items: [
      {
        id: 1,
        title: 'Mi producto',
        unit_price: 100,
        quantity: 1,
      },
    ],
    notification_url: 'https://1d8b4f7k-3000.brs.devtunnels.ms/api/v1/payments/notification',
    back_urls: {
      failure: 'https://weather-app-rene.netlify.app',
      pending: 'https://poke-api-rene.netlify.app',
      success: 'https://rome-clothing.netlify.app'
    },
   
  };
  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      res.status(200).send(response);
    })
    .catch(function (error) {
      console.log(error);
    });
});

exports.router = router;