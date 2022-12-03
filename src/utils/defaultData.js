const Categories = require("../models/categories.model")
const Products = require("../models/products.model")
const Roles = require('../models/roles.model')
const Users = require('../models/users.model')
const ProductsImage = require('../models/productsImage.model')
const Cart = require("../models/cart.model")
const Payments = require("../models/payments.model")

const generateData = async() => {
    await Roles.bulkCreate([{name: "guest", id: "fef3a08d-2cec-4728-9745-7cbd2b37e557"}, {name: "host", id: "97006fe0-4a35-47f4-bfbf-fc962e5fe500"}, {name: "admin", id: "5ee551ed-7bf4-44b0-aeb5-daaa824b9473"}], {validate: true})
    
    await Categories.create({
        id: 'f675494e-2ca4-4de8-9e0b-09d5fe47b02e',
        name: 'Televisores'
    })

    await Categories.create({
        id: 'a7883dfd-14fd-4426-bbb3-311328837cfb',
        name: 'Smarphone'
    })

    const Img =  Products.hasMany(ProductsImage)
    await Products.create({
        id: '4ebe7d56-586d-4401-b6fd-f133270bda15',
        title: 'Phone',
        description: 'color azul',
        price: 300,
        stock: 9,
        categoryId: 'a7883dfd-14fd-4426-bbb3-311328837cfb',
        products_imgs: [
          {
            id: 'ddc1027d-abc2-4fec-8312-7f4d72111c3a',
            productId: '4ebe7d56-586d-4401-b6fd-f133270bda15',
            url: 'http://localhost:3000/api/v1/upload/1669682400955-Rick.jpg'
          },{
            id: '48230c35-fff7-4ec7-a593-49ed6a8f80b8',
            productId: '4ebe7d56-586d-4401-b6fd-f133270bda15',
            url: 'http://localhost:3000/api/v1/upload/1669683746615-Rick y Morty Hombres de Negro.jpg'
          }
        ]
      },{
        include: [Img]
      }
    )
    




    await Users.create({
      id: "74cd6011-7e76-4d6d-b25b-1d6e4182ec2f",
      name: "Sahid",
      lastName: "Kick",
      gender: "male",
      email: "sahid.kick@academlo.com",
      password: "$2b$10$TNGcRFonQH98rVqFaBVfpOEEv2Xcu5ej14tWqKim3z3L6Tr.ZIaqC",
      phone: "1234567890",
      birthdayDate: "2016-01-01",
      dni: "sadsad",
      address: "cowwdw",
      roleId: "5ee551ed-7bf4-44b0-aeb5-daaa824b9473",
      profileImage: "dsadwqd",
      status: "active",
      verified: false,
      country: 'Mexico'
    })
  
    await Users.create({
      id: "1098b922-3841-4416-a471-fb2ca0f7efa4",
      name: "Juan",
      gender: "male",
      email: "juan@academlo.com",
      password: "$2b$10$TNGcRFonQH98rVqFaBVfpOEEv2Xcu5ej14tWqKim3z3L6Tr.ZIaqC", //root
      phone: "98765432",
      birthdayDate: "2016-01-01",
      dni: "s91234",
      address: "abcdef",
      roleId: "fef3a08d-2cec-4728-9745-7cbd2b37e557",
      profileImage: "URL",
      status: "active",
      verified: false,
    })

    await Cart.create({
      id: '589fdd81-eb11-422e-aee3-c3a403693af4',
      productId: '4ebe7d56-586d-4401-b6fd-f133270bda15',
      userId: '1098b922-3841-4416-a471-fb2ca0f7efa4',
      quantity: 2,
      totalPrice: 600
    })

    await Cart.create({
      id: 'ddc1027d-abc2-4fec-8312-7f4d72111c3a',
      productId: '4ebe7d56-586d-4401-b6fd-f133270bda15',
      userId: '74cd6011-7e76-4d6d-b25b-1d6e4182ec2f',
      quantity: 3,
      totalPrice: 900
    })

    /*await Payments.create({
      id: 'ddc1027d-abc2-4fec-8312-7f4d72111c3a',
      productId: '4ebe7d56-586d-4401-b6fd-f133270bda15',
      userId: '1098b922-3841-4416-a471-fb2ca0f7efa4',
      quantity: 3,
      totalPrice: 900
    })*/


   /* await ProductsImage.bulkCreate([
      {
        id: 'ddc1027d-abc2-4fec-8312-7f4d72111c3a',
        productId: '4ebe7d56-586d-4401-b6fd-f133270bda15',
        url: 'http://localhost:3000/api/v1/upload/1669682400955-Rick.jpg'
      },{
        id: '48230c35-fff7-4ec7-a593-49ed6a8f80b8',
        productId: '4ebe7d56-586d-4401-b6fd-f133270bda15',
        url: 'http://localhost:3000/api/v1/upload/1669683746615-Rick y Morty Hombres de Negro'
      },
      {
        id: 'c786edb2-b47f-4213-8b8c-c9a0abb8cabe',
        url: 'http://localhost:3000/api/v1/upload/'
      }
    ])*/
  }
  
  
  module.exports = generateData