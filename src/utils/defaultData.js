const Categories = require("../models/categories.model")
const Products = require("../models/products.model")
const Roles = require('../models/roles.model')
const Users = require('../models/users.model')
const ProductsImage = require('../models/productsImage.model')
const Cart = require("../models/cart.model")
const Payments = require("../models/payments.model")
const CartProduct = require("../models/cartProduct")

const generateData = async() => {
    await Roles.bulkCreate([
      {name: "guest", id: "fef3a08d-2cec-4728-9745-7cbd2b37e557"},
      {name: "host", id: "97006fe0-4a35-47f4-bfbf-fc962e5fe500"},
      {name: "admin", id: "5ee551ed-7bf4-44b0-aeb5-daaa824b9473"}
    ], {validate: true})
    
    await Categories.create({
        id: 'f675494e-2ca4-4de8-9e0b-09d5fe47b02e',
        name: 'Televisores'
    })

    await Categories.create({
        id: 'a7883dfd-14fd-4426-bbb3-311328837cfb',
        name: 'Smarphone'
    })

    await Categories.create({
      id: '46180818-8631-4686-98e5-21028f905c43',
      name: 'tenis'
    })

    const Img =  Products.hasMany(ProductsImage)
  //Nike air force 1 white
  /*
    await Products.create({
        id: '4ebe7d56-586d-4401-b6fd-f133270bda15',
        title: 'Nike air force 1 white',
        description: 'nike color blanco, tallas 42,42,40',
        price: 350.00,
        stock: 100,
        categoryId: '46180818-8631-4686-98e5-21028f905c43',
        products_imgs: [
          {
            id: 'ddc1027d-abc2-4fec-8312-7f4d72111c3a',
            productId: '4ebe7d56-586d-4401-b6fd-f133270bda15',
            url: 'https://ecommerce-rom.onrender.com/api/v1/upload/1670556414762-nike-air-force.png'
          },{
            id: '48230c35-fff7-4ec7-a593-49ed6a8f80b8',
            productId: '4ebe7d56-586d-4401-b6fd-f133270bda15',
            url: 'https://ecommerce-rom.onrender.com/api/v1/upload/1670556414543-nike-air-force.jpg'
          },{
            id: '631c4c4d-602f-4d43-a24a-2ccdca648581',
            productId: '4ebe7d56-586d-4401-b6fd-f133270bda15',
            url: 'https://ecommerce-rom.onrender.com/api/v1/upload/1670556414979-nike-air-force.webp'
          }]
      },{
        include: [Img]
      }
    )*/
  // nike air force black white
    await Products.create({
      id: 'd983efc9-e0fc-4226-8561-25f9d3945e00',
      title: 'Air Force 1 07 LV8 Utility Negras',
      description: 'Nike Air Force 1 07 LV8 Utility Black 100% Original ',
      price: 350.00,
      stock: 100,
      categoryId: '46180818-8631-4686-98e5-21028f905c43',
      products_imgs: [
        {
          id: '49a229d1-3d0d-4722-8718-f92cc1049295',
          productId: 'd983efc9-e0fc-4226-8561-25f9d3945e00',
          url: 'https://ecommerce-rom.onrender.com/api/v1/upload/1671666340684-nike-air-force-3-1.jpg'
        },{
          id: '25702915-5fa8-4d2f-8438-d8a0a089d5c6',
          productId: 'd983efc9-e0fc-4226-8561-25f9d3945e00',
          url: 'https://ecommerce-rom.onrender.com/api/v1/upload/1671666341128-nike-air-force-3-2.jpg'
        },{
          id: '6e47ae99-cea0-4310-ab7b-1870e0bad8be',
          productId: 'd983efc9-e0fc-4226-8561-25f9d3945e00',
          url: 'https://ecommerce-rom.onrender.com/api/v1/upload/1671666341283-nike-air-force-3-3.jpg'
        }]
    },{
      include: [Img]
    }
  )
  // nike air force black white
  await Products.create({
    id: 'f2a7f68a-807a-46d9-9573-c8760ef76baf',
    title: 'Nike Air Force 1 low white-black',
    description: 'Nike Air Force 1 07 LV8 Utility Black 100% Original ',
    price: 350.00,
    stock: 100,
    categoryId: '46180818-8631-4686-98e5-21028f905c43',
    products_imgs: [
      {
        id: '35001d0d-ee75-4641-9153-8a6d076ed9a2',
        productId: 'f2a7f68a-807a-46d9-9573-c8760ef76baf',
        url: 'https://ecommerce-rom.onrender.com/api/v1/upload/1671669207514-nike-air-force-white-black-1-1.jpg'
      },{
        id: '7e76a616-e9b6-47a1-9730-f31cdb1ce052',
        productId: 'f2a7f68a-807a-46d9-9573-c8760ef76baf',
        url: 'https://ecommerce-rom.onrender.com/api/v1/upload/1671669474920-nike-air-force-white-black-1-2.jpg'
      },{
        id: 'cac4d642-eb3e-4820-bc9d-667520485315',
        productId: 'f2a7f68a-807a-46d9-9573-c8760ef76baf',
        url: 'https://ecommerce-rom.onrender.com/api/v1/upload/1671669806230-nike-air-force-white-black-1-3.jpg'
      }]
  },{
    include: [Img]
  }
  )
  //Nike Air Force  (white-black)
  await Products.create({
    id: '58eae8b0-8f2f-4bf8-b1c4-fd6232ed3632',
    title: 'Nike Air Force 1 low white-black',
    description: 'Nike Air Force 1 07 LV8 Utility Black 100% Original ',
    price: 350.00,
    stock: 100,
    categoryId: '46180818-8631-4686-98e5-21028f905c43',
    products_imgs: [
      {
        id: '1d23c73e-5107-43c6-b816-c8cb0e96719d',
        productId: '58eae8b0-8f2f-4bf8-b1c4-fd6232ed3632',
        url: 'https://ecommerce-rom.onrender.com/api/v1/upload/1671670987730-nike-air-force-5-1.jpg'
      },{
        id: 'c23be36d-d23b-44db-bf0a-9dd69b94c9cd',
        productId: '58eae8b0-8f2f-4bf8-b1c4-fd6232ed3632',
        url: 'https://ecommerce-rom.onrender.com/api/v1/upload/1671670987731-nike-air-force-5-2.jpg'
      },{
        id: '163f7c03-bc21-4702-85a4-56b24d7432e8',
        productId: '58eae8b0-8f2f-4bf8-b1c4-fd6232ed3632',
        url: 'https://ecommerce-rom.onrender.com/api/v1/upload/1671670987885-nike-air-force-5-3.jpg'
      }]
  },{
    include: [Img]
  }
  )
  //nike ar force white
  await Products.create({
    id: 'c086ecf5-4dc3-4b20-aeee-63b8bfb756ba',
    title: 'Nike Air Force 1 low white',
    description: 'Nike Air Force 1 07 LV8 Utility Black 100% Original ',
    price: 350.00,
    stock: 100,
    categoryId: '46180818-8631-4686-98e5-21028f905c43',
    products_imgs: [
      {
        id: 'e2272669-1972-4018-8cbb-6558302260f7',
        productId: 'c086ecf5-4dc3-4b20-aeee-63b8bfb756ba',
        url: 'https://ecommerce-rom.onrender.com/api/v1/upload/1671673436289-nike-air-force-white-1-1.jpg'
      },{
        id: '396240e4-52da-46a7-a0a1-b8404cf884e6',
        productId: 'c086ecf5-4dc3-4b20-aeee-63b8bfb756ba',
        url: 'https://ecommerce-rom.onrender.com/api/v1/upload/1671673436194-nike-air-force-white-1-2.jpg'
      },{
        id: 'a35c0033-71ae-4ecc-8e50-08ee550ee3c1',
        productId: 'c086ecf5-4dc3-4b20-aeee-63b8bfb756ba',
        url: 'https://ecommerce-rom.onrender.com/api/v1/upload/1671673436288-nike-air-force-white-1-3.jpg'
      }]
  },{
    include: [Img]
  }
  )
  //Mercurial victory VI CR7
    await Products.create({
      id: 'b74f8a25-aaa8-409b-a3c8-a3684e59c313',
      title: 'Nike mercurial victory VI CR7',
      description: 'chimpunes Nike mercurial victory VI CR7, tallas 42,41,40',
      price: 360.00,
      stock: 100,
      categoryId: '46180818-8631-4686-98e5-21028f905c43',
      products_imgs: [
        {
          id: '639c81ad-79ca-45bc-8c35-43d6f648f1f7',
          productId: 'b74f8a25-aaa8-409b-a3c8-a3684e59c313',
          url: 'https://ecommerce-rom.onrender.com/api/v1/upload/1670556978708-nike-mercurial-victory-VI-CR7-1-2.jpg'
        },
        {
          id: '311d8a30-cf80-4b0b-a820-0ec02066de8d',
          productId: 'b74f8a25-aaa8-409b-a3c8-a3684e59c313',
          url: 'https://ecommerce-rom.onrender.com/api/v1/upload/1670556976910-nike-mercurial-victory-VI-CR7-1-3.jpg'
        },{
          id: '7a9876a7-2892-44ff-8bc2-3e8db7c7a44e',
          productId: 'b74f8a25-aaa8-409b-a3c8-a3684e59c313',
          url: 'https://ecommerce-rom.onrender.com/api/v1/upload/1670556978116-nike-mercurial-victory-VI-CR7-1-1.jpg'
        }
      ]
    },{
      include: [Img]
    }
  )
    //Hypervenom Phantom 3 (DF Fg)
  await Products.create({
    id: 'bf4dbbd7-479f-4e10-b143-6d304153f544',
    title: 'Nike Hypervenom Phantom 3 DF Fg',
    description: 'Nike Hypervenom Phatal 3 DF para hombre, han sido concebidas para añadir velocidad al arremate y permitir cambios rápidos de dirección en campos de césped corto.',
    price: 500.00,
    stock: 100,
    categoryId: '46180818-8631-4686-98e5-21028f905c43',
    products_imgs: [
      {
        id: 'a586831b-292c-440c-a4b7-f9eeeeeb0e1b',
        productId: 'bf4dbbd7-479f-4e10-b143-6d304153f544',
        url: 'https://ecommerce-rom.onrender.com/api/v1/upload/1671597163314-nike-hypervenom-phantom-3-1-1.jpg'
      },
      {
        id: '392d0d20-2d0f-4e4e-ace6-540819a098cb',
        productId: 'bf4dbbd7-479f-4e10-b143-6d304153f544',
        url: 'https://ecommerce-rom.onrender.com/api/v1/upload/1671597163378-nike-hypervenom-phantom-3-1-2.jpg'
      },{
        id: '29760fd6-0b07-4ded-b226-33bd679c7c5d',
        productId: 'bf4dbbd7-479f-4e10-b143-6d304153f544',
        url: 'https://ecommerce-rom.onrender.com/api/v1/upload/1671597163378-nike-hypervenom-phantom-3-1-3.jpg'
      }
    ]
  },{
    include: [Img]
  }
)
  //Hypervenom Phantom III white
await Products.create({
  id: '134d4f15-6708-4dc2-b117-5658003fe5b8',
  title: 'Hypervenom Phantom 3 white',
  description: 'La nike hypervenom iii textura HyperReactive ofrece una amortiguación óptima en los controles y mayor potencia en los chutes.',
  price: 500.00,
  stock: 100,
  categoryId: '46180818-8631-4686-98e5-21028f905c43',
  products_imgs: [
    {
      id: '5124f536-24aa-4b52-be12-cfa7bbed6eb5',
      productId: '134d4f15-6708-4dc2-b117-5658003fe5b8',
      url: 'https://ecommerce-rom.onrender.com/api/v1/upload/1671597872007-nike-hypervenom-phantom-III-white-1-1.jpg'
    },
    {
      id: 'cd7dca1f-b8f0-4c72-898d-08be87ddcb7e',
      productId: '134d4f15-6708-4dc2-b117-5658003fe5b8',
      url: 'https://ecommerce-rom.onrender.com/api/v1/upload/1671597872006-nike-hypervenom-phantom-III-white-1-2.jpg'
    },{
      id: 'dc4a15b8-58ba-432b-9b71-b277d862328a',
      productId: '134d4f15-6708-4dc2-b117-5658003fe5b8',
      url: 'https://ecommerce-rom.onrender.com/api/v1/upload/1671597872007-nike-hypervenom-phantom-III-white-1-3.jpg'
    }
  ]
},{
  include: [Img]
}
)
  //Hypervenom Phantom 3 df fg azul blanco
  await Products.create({
    id: '0efc4714-0872-4ede-bbdc-47e593e5de37',
    title: 'Nike Hypervenom Phantom 3 df fg azul blanco',
    description: 'Nike Hypervenom Phantom, para jugadores que les gusta la velocidad y el ataque.Parte superior de piel sintética con textura para un mejor tacto. ',
    price: 500.00,
    stock: 100,
    categoryId: '46180818-8631-4686-98e5-21028f905c43',
    products_imgs: [
      {
        id: '0940387a-fe12-41c7-b8ab-dd8212cd709b',
        productId: '0efc4714-0872-4ede-bbdc-47e593e5de37',
        url: 'https://ecommerce-rom.onrender.com/api/v1/upload/1671600497381-nike-hypervenom-phantom-3-df-fg-azul-blanco-1-1.jpg'
      },
      {
        id: '1c0fde7b-a74f-4352-92dc-0c075204a20a',
        productId: '0efc4714-0872-4ede-bbdc-47e593e5de37',
        url: 'https://ecommerce-rom.onrender.com/api/v1/upload/1671600497446-nike-hypervenom-phantom-3-df-fg-azul-blanco-1-2.jpg'
      },{
        id: 'dd9ebeb0-4ce8-49e7-96b1-7bc40a3248f0',
        productId: '0efc4714-0872-4ede-bbdc-47e593e5de37',
        url: 'https://ecommerce-rom.onrender.com/api/v1/upload/1671600497447-nike-hypervenom-phantom-3-df-fg-azul-blanco-1-3.jpg'
      }
    ]
  },{
    include: [Img]
  }
  )
 //Super Star white
await Products.create({
  id: 'abafe1d7-235c-4353-851d-c277c261c26a',
  title: 'Adidas Super Star White',
  description: 'Adidas de estilo casual, ideal para aquellos que les gusta el estilo urbano',
  price: 300.00,
  stock: 100,
  categoryId: '46180818-8631-4686-98e5-21028f905c43',
  products_imgs: [
    {
      id: 'e432c92b-6a1f-4dbe-9104-02d5e87460f5',
      productId: 'abafe1d7-235c-4353-851d-c277c261c26a',
      url: 'https://ecommerce-rom.onrender.com/api/v1/upload/1671605543672-adidas-super-star-white-1-1.jpg'
    },
    {
      id: '82ac9b8e-8ffd-4451-84db-f61eaff060ff',
      productId: 'abafe1d7-235c-4353-851d-c277c261c26a',
      url: 'https://ecommerce-rom.onrender.com/api/v1/upload/1671605543791-adidas-super-star-white-1-2.jpg'
    },{
      id: '6ead591c-4182-47aa-a8b3-085d1bc98eae',
      productId: 'abafe1d7-235c-4353-851d-c277c261c26a',
      url: 'https://ecommerce-rom.onrender.com/api/v1/upload/1671605543792-adidas-super-star-white-1-3.jpg'
    }
  ]
},{
  include: [Img]
}
)
  //Super Star white black
await Products.create({
  id: '1af86b94-1ec9-49c7-993b-b4f0565dea3b',
  title: 'Adidas Super Star',
  description: 'La zapatilla adidas Superstar es un icono del estilo urbano desde hace varias décadas. Esta versión conserva la puntera de goma, las 3 bandas dentadas y el logotipo de adidas Superstar del modelo original.',
  price: 250.00,
  stock: 100,
  categoryId: '46180818-8631-4686-98e5-21028f905c43',
  products_imgs: [
    {
      id: '14abd21d-41d4-48dc-a6b1-62847afe2894',
      productId: '1af86b94-1ec9-49c7-993b-b4f0565dea3b',
      url: 'https://ecommerce-rom.onrender.com/api/v1/upload/1671660301712-adidas-super-star-1-1.jpg'
    },
    {
      id: '209d5e2a-ca65-4bc1-9154-6dc04f6f4b29',
      productId: '1af86b94-1ec9-49c7-993b-b4f0565dea3b',
      url: 'https://ecommerce-rom.onrender.com/api/v1/upload/1671660304227-adidas-super-star-1-2.jpg'
    },{
      id: 'cb0b7f52-3d77-41ac-83d4-097366c3992c',
      productId: '1af86b94-1ec9-49c7-993b-b4f0565dea3b',
      url: 'https://ecommerce-rom.onrender.com/api/v1/upload/1671660305091-adidas-super-star-1-3.jpg'
    },{
      id: '1da0d3e7-ecd2-4949-99b7-ebd25769c28e',
      productId: '1af86b94-1ec9-49c7-993b-b4f0565dea3b',
      url: 'https://ecommerce-rom.onrender.com/api/v1/upload/1671660314453-adidas-super-star-1-4.jpg'
    }
  ]
},{
  include: [Img]
}
)


    await Users.create({
      id: "74cd6011-7e76-4d6d-b25b-1d6e4182ec2f",
      name: "Sahid",
      email: "sahid.kick@academlo.com",
      password: "$2b$10$TNGcRFonQH98rVqFaBVfpOEEv2Xcu5ej14tWqKim3z3L6Tr.ZIaqC",
      phone: "1234567890",
      birthdayDate: "2016-01-01",
      dni: "sadsad",
      address: "cowwdw",
      roleId: "5ee551ed-7bf4-44b0-aeb5-daaa824b9473",
      status: "active",
      verified: false,
    })
  
    await Users.create({
      id: "aa0fb5b3-4ee5-4949-baa1-c33340efa2e5",
      name: "standly",
      email: "standly@gmail.com",
      password: "$2b$10$TNGcRFonQH98rVqFaBVfpOEEv2Xcu5ej14tWqKim3z3L6Tr.ZIaqC",
      phone: "1234567890",
      birthdayDate: "2016-01-01",
      dni: "sadsad",
      address: "cowwdw",
      roleId: "fef3a08d-2cec-4728-9745-7cbd2b37e557",
      status: "active",
      verified: false,
    })

    await Users.create({
      id: "1098b922-3841-4416-a471-fb2ca0f7efa4",
      name: "Juan",
      email: "juan@academlo.com",
      password: "$2b$10$TNGcRFonQH98rVqFaBVfpOEEv2Xcu5ej14tWqKim3z3L6Tr.ZIaqC", //root
      phone: "98765432",
      birthdayDate: "2016-01-01",
      dni: "s91234",
      address: "abcdef",
      roleId: "fef3a08d-2cec-4728-9745-7cbd2b37e557",
      status: "active",
      verified: false,
    })

    await Cart.create({
      id: '589fdd81-eb11-422e-aee3-c3a403693af4',
      userId: '1098b922-3841-4416-a471-fb2ca0f7efa4',
      cartTotalPrice: 600
    })

    await Cart.create({
      id: 'ddc1027d-abc2-4fec-8312-7f4d72111c3a',
      userId: '74cd6011-7e76-4d6d-b25b-1d6e4182ec2f',
      cartTotalPrice: 2470
    })

    await CartProduct.bulkCreate([{
      id: 'd16a89b2-d4dc-4f6c-baf9-d09c8eeff3ef',
      productId: 'c086ecf5-4dc3-4b20-aeee-63b8bfb756ba',
      cartId: 'ddc1027d-abc2-4fec-8312-7f4d72111c3a',
      quantity: 3,
      totalPrice: 1050
    },
    {
      id: '11d84b26-8a39-4f92-854f-c25b7c141985',
      productId: 'c086ecf5-4dc3-4b20-aeee-63b8bfb756ba',
      cartId: 'ddc1027d-abc2-4fec-8312-7f4d72111c3a',
      quantity: 2,
      totalPrice: 700
    },
    {
      id: 'e027209d-2076-4332-befc-d15cd024daad',
      productId: 'b74f8a25-aaa8-409b-a3c8-a3684e59c313',
      cartId: 'ddc1027d-abc2-4fec-8312-7f4d72111c3a',
      quantity: 2,
      totalPrice: 720
    },
    {
      id: '6a462cb1-da97-4bf7-825f-3d970ec964ff',
      productId: 'c086ecf5-4dc3-4b20-aeee-63b8bfb756ba',
      cartId: '589fdd81-eb11-422e-aee3-c3a403693af4',
      quantity: 2,
      totalPrice: 600
    }
  ])

    /*await Payments.create({
      id: 'ddc1027d-abc2-4fec-8312-7f4d72111c3a',
      productId: 'c086ecf5-4dc3-4b20-aeee-63b8bfb756ba',
      userId: '1098b922-3841-4416-a471-fb2ca0f7efa4',
      quantity: 3,
      totalPrice: 900
    })*/


   /* await ProductsImage.bulkCreate([
      {
        id: 'ddc1027d-abc2-4fec-8312-7f4d72111c3a',
        productId: '4ebe7d56-586d-4401-b6fd-f133270bda15',
        url: 'https://ecommerce-rom.onrender.com/api/v1/upload/1669682400955-Rick.jpg'
      },{
        id: '48230c35-fff7-4ec7-a593-49ed6a8f80b8',
        productId: '4ebe7d56-586d-4401-b6fd-f133270bda15',
        url: 'https://ecommerce-rom.onrender.com/api/v1/upload/1669683746615-Rick y Morty Hombres de Negro'
      },
      {
        id: 'c786edb2-b47f-4213-8b8c-c9a0abb8cabe',
        url: 'https://ecommerce-rom.onrender.com/api/v1/upload/'
      }
    ])*/
  }
  
  
  module.exports = generateData