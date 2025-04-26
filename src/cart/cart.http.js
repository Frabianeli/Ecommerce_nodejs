const cartControllers = require('./cart.controllers');

const getAll = (req, res) => {
  cartControllers.getAllCart()
    .then((response) => {
      res.status(200).json({
        items: response.length,
        cart: response,
      });
    })
    .catch((err) => {
      res.status(400).json({message: err});
    });
};

const getAllByUser = (req, res) => {
  const userId = req.user.id;
  cartControllers.getCartUser(userId)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const editCart = (req, res) => {
  const { quantity } = req.body;
  const id = req.params.id
  const cart = req.cart
  cartControllers.editCartById(quantity, cart, id)
    .then((response) => {
      res.status(200).json({
        message: `Product edited successfully with id: ${response}`,
      });
    })
    .catch((err) => {
      res.status(400).json({message: err});
    });
};

const createProductCart = (req, res) => {
  const userId = req.user.id;
  const quantity = req.body.quantity;
  const product = req.product
  const id = req.params.id
  cartControllers.addProductToCart(id, userId, quantity, product)
    .then((response) => {
      res.status(201).json({ message: 'Se agrego correctamente al carrito' });
    })
    .catch((err) => {
      res.status(400).json({message: err});
    });
};

const remove = (req, res) => {
  const data = req.productCart;
  const id = req.params.id;
  cartControllers.removeProductFromCart(id, data)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(400).json({ message: err });
    });
};

module.exports = {
  getAll,
  getAllByUser,
  editCart,
  createProductCart,
  remove,
};
