const uuid = require('uuid');
const Cart = require('../models/cart.model');
const CartProduct = require('../models/cartProduct');
const Categories = require('../models/categories.model');
const Products = require('../models/products.model');
const ProductsImage = require('../models/productsImage.model');
const ProductStock = require('../models/ProductStock.model');
const ProductSize = require('../models/productSize.model');
const { db } = require('../utils/database');

const getAllCart = async () => {
  try {
    const data = await Cart.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });
    if (!data) {
      throw new Error('No existen registros en la bd');
    }
    return data;
  } catch (error) {
    throw error.message || 'Error al obtener registros';
  }
};


const getCartUser = async (userId) => {
  const data = await Cart.findOne({
    where: { userId },
    include: {
      model: CartProduct,
      attributes: ['id', 'quantity', 'totalPrice', 'createdAt'],
      include: [
        {
          model: Products,
          include: [
            {
              model: Categories,
              attributes: ['name'],
            },
            {
              model: ProductsImage,
              attributes: ['url', 'createdAt'],
            },
          ],
          attributes: {
            exclude: ['updatedAt', 'categoryId', 'brandId'],
          },
        },
        {
          model: ProductStock,
          attributes: ['id', 'stock'],
          include: {
            model: ProductSize,
            attributes: ['id', 'name'],
          },
        },
      ],
    },
    attributes: ['id', 'cartTotalPrice'],
    order: [[CartProduct, 'createdAt', 'DESC']],
  });
  //ORDER-IMAGE
  const orderImage = data.dataValues.cart_products.map((e) => {
    e.dataValues.product.dataValues.products_imgs.sort((a, b) => {
      const numberA = a.url.substring(a.url.length - 5, a.url.length - 4);
      const numberB = b.url.substring(b.url.length - 5, b.url.length - 4);
      return numberA - numberB;
    });
  });
  return data;
};

const createCart = async (userId) => {
  const newProduct = await Cart.create({
    id: uuid.v4(),
    userId,
    cartTotalPrice: 0,
  });
  return newProduct;
};

const addProductToCart = async (id, userId, quantity, product) => {
  try {
    const productStockId = id
    let cart = (await Cart.findOne({
      where: { userId },
      attributes: [
        'id',
        'cartTotalPrice',
        [ db.literal('(SELECT COUNT(cart_p.id) FROM cart_products AS cart_p WHERE cart_p.cart_id = cart.id)'),'count_cart' ]
      ],
    })).toJSON();
    const maxCartItems = 10
    if( cart?.count_cart >= maxCartItems){
      throw new Error(`Has alcanzado el límite de ${maxCartItems} productos en el carrito.`)
    }
    if (!cart) {
      cart = await createCart(userId);
    }
    // Verificamos si el producto ya está en el carrito del usuario
    const getProductStock = await CartProduct.findOne({
      where: { productStockId, cartId: cart.id },
      attributes: ['id','quantity', 'totalPrice'],
    });
    if (getProductStock) {
      // Creamos los parametros y actualizamos el carrito
      const cartParam = {
        cartId: cart.id,
        productPrice: product.price,
        totalPrice: getProductStock.totalPrice,
        cartTotalPrice: cart.cartTotalPrice,
      };
      const newQuantity = getProductStock.quantity + quantity;
      const edit = await editCartById(newQuantity, cartParam, getProductStock.id);
      return edit;
    } else {
    const totalPrice = product.price * quantity;
      const addCartProduct = await CartProduct.create({
        id: uuid.v4(),
        cartId: cart.id,
        productId: product.id,
        productStockId,
        quantity,
        totalPrice,
      });
      const newCartTotalPrice = cart.cartTotalPrice + totalPrice;
      await Cart.update(
        { cartTotalPrice: newCartTotalPrice },
        { where: { userId } }
      );
  
      return addCartProduct;
    }
  } catch (error) {
    throw error.message || 'Error al añadir productos al carrito'
  }
};

const editCartById = async (quantity, cart, id) => {
  console.log('edit-INITIAL')
  try {
    const { cartId, productPrice, totalPrice, cartTotalPrice } = cart;
    
    const newTotalPrice = quantity * productPrice;
    console.log({id, quantity, newTotalPrice, cartId})
    console.log('edit')
    const editProductCart = await CartProduct.update(
      { quantity, totalPrice: newTotalPrice },
      { where: { id, cartId } }
    );
    console.log(editProductCart)
    if (!editProductCart[0]) {
      throw new Error('No se edito ningun registro');
    }
    console.log('edit-2')
    const priceDifference = newTotalPrice - totalPrice;

    const newCartTotalPrice =
      priceDifference > 0
        ? cartTotalPrice + priceDifference
        : cartTotalPrice - Math.abs(priceDifference);

    await Cart.update(
      { cartTotalPrice: newCartTotalPrice },
      { where: { id: cartId } }
    );
    return id;
  } catch (error) {
    console.log('error',error)
    throw error.message || 'Error al editar el carrito';
  }
};

const removeProductFromCart = async (id, data) => {
  const { totalPrice, cartId } = data;
  try {
    const remove = await CartProduct.destroy({ where: { id, cartId } });
    if (!remove) {
      throw new Error('No se encontro el registro');
    }
    await Cart.decrement(
      { cartTotalPrice: totalPrice },
      { where: { id: cartId } }
    );
    return remove;
  } catch (error) {
    throw error.message || 'Error al eliminar el producto del carrito';
  }
};

module.exports = {
  getAllCart,
  getCartUser,
  editCartById,
  addProductToCart,
  removeProductFromCart,
  createCart,
};
