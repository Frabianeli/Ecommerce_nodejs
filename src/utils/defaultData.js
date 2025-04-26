const Categories = require("../models/categories.model")
const Products = require("../models/products.model")
const Roles = require('../models/roles.model')
const Users = require('../models/users.model')
const ProductsImage = require('../models/productsImage.model')
const Cart = require("../models/cart.model")
const Payments = require("../models/payments.model")
const CartProduct = require("../models/cartProduct")
const paymentsDate = require("../models/paymentsDate.model")
const Brand = require('../models/brand.model')
const ProductSize = require('../models/productSize.model')
const Stock = require('../models/ProductStock.model')
const SubCategories = require("../models/subCategories")
const Gender = require("../models/gender.model")
const Status = require("../models/status.model")


const uuid = require("uuid")

const generateData = async() => {
    await Roles.bulkCreate([
      {name: "guest", id: "fef3a08d-2cec-4728-9745-7cbd2b37e557"},
      {name: "host", id: "97006fe0-4a35-47f4-bfbf-fc962e5fe500"},
      {name: "admin", id: "5ee551ed-7bf4-44b0-aeb5-daaa824b9473"}
    ], {validate: true})

    await Status.bulkCreate([
      {name: "active", id: "77d71ed7-0113-4c01-aac2-ed093b355157"},
      {name: "inactive", id: "1f2e3c66-958f-4880-92ed-f83d4d1829d5"},
      {name: "in progress", id: "2c8a37b6-e3af-4c84-982f-9cc38a2a4015"},
      {name: "completed", id: "adb23880-31b1-4e2e-be04-c10a9f53a06b"},
      {name: "verified", id: "b9a08331-022a-4edf-b466-0d6a67d16c66"},
      {name: "not verified", id: "63680823-54f8-41c9-aedc-dac3e9a2c808"},
      //{name: "admin", id: "2afadd8c-8288-4fd9-950c-b5799a70c24b"}
    ], {validate: true})
    
    await Categories.create({
        id: 'f675494e-2ca4-4de8-9e0b-09d5fe47b02e',
        name: 'hogar',
        statusId: "77d71ed7-0113-4c01-aac2-ed093b355157",
    })

    await Categories.create({
        id: 'a7883dfd-14fd-4426-bbb3-311328837cfb',
        name: 'tecnologia',
        statusId: "77d71ed7-0113-4c01-aac2-ed093b355157",
    })

    await Categories.create({
      id: '46180818-8631-4686-98e5-21028f905c43',
      name: 'moda',
      statusId: "77d71ed7-0113-4c01-aac2-ed093b355157",
    })

    await Categories.create({
      id: '2fbd5b1f-a1ab-4f98-a483-a1df06f83c38',
      name: 'refrigeradora',
      statusId: "1f2e3c66-958f-4880-92ed-f83d4d1829d5",
    })

    //SUBCATEGORIES
    await SubCategories.create({
      id: 'de29182c-146f-41c1-9e6e-c12daf667c58',
      name: 'televisores',
      categoryId: 'a7883dfd-14fd-4426-bbb3-311328837cfb',
      statusId: "77d71ed7-0113-4c01-aac2-ed093b355157",
  })

  await SubCategories.create({
      id: 'a5e4e7f1-3160-49e0-b161-ed1b846b041e',
      name: 'smarphone',
      categoryId: 'a7883dfd-14fd-4426-bbb3-311328837cfb',
      statusId: "77d71ed7-0113-4c01-aac2-ed093b355157",
  })

  await SubCategories.create({
    id: '00be3b0b-eceb-48eb-9005-9acfed39b63b',
    name: 'zapatillas',
    categoryId: '46180818-8631-4686-98e5-21028f905c43',
    statusId: "77d71ed7-0113-4c01-aac2-ed093b355157",
  })

  await SubCategories.create({
    id: '10409298-c31e-422f-b3eb-88fd9bc54dcf',
    name: 'refrigeradora',
    categoryId: 'f675494e-2ca4-4de8-9e0b-09d5fe47b02e',
    statusId: "77d71ed7-0113-4c01-aac2-ed093b355157",
  })


  await Brand.create({
    id: 'e1b85bf6-8ce7-4b6c-92d1-3c45a1c6b45b',
    name: 'mabe',
    statusId: "77d71ed7-0113-4c01-aac2-ed093b355157",
  })
  await Brand.create({
    id: '1cea1391-3167-4b91-94bd-871075e48b54',
    name: 'indurama',
    statusId: "77d71ed7-0113-4c01-aac2-ed093b355157",
  })
    await Brand.create({
      id: 'da8941bc-2c5f-4fca-8dea-6da6f76549f0',
      name: 'nike',
      statusId: "77d71ed7-0113-4c01-aac2-ed093b355157",
    })

    await Brand.create({
      id: 'b0fc6ae0-d188-44aa-a4da-f7df09da3bd0',
      name: 'samsung',
      statusId: "77d71ed7-0113-4c01-aac2-ed093b355157",
    })
    

    await Brand.create({
      id: '9d5a65b6-2c87-46d1-81e2-765af520567e',
      name: 'adidas',
      statusId: "77d71ed7-0113-4c01-aac2-ed093b355157",
    })

    await Brand.create({
      id: 'e56d9211-ed3c-4867-ab48-f4d0f3c97b18',
      name: 'puma',
      statusId: "77d71ed7-0113-4c01-aac2-ed093b355157",
    })

    await Brand.create({
      id: '9a8414c1-a5f1-4146-9d93-3a328595b86d',
      name: 'apple',
      statusId: "77d71ed7-0113-4c01-aac2-ed093b355157",
    })
//inactive
    await Brand.create({
      id: '668e9ec2-ca5d-4c97-8009-c1e3d60dd66a',
      name: 'rome',
      statusId: "1f2e3c66-958f-4880-92ed-f83d4d1829d5",
    })

    //Gender
    await Gender.create({
      id: '9426486f-014a-4f3d-a479-e15cd974dcd4',
      name: 'man'
    })
    await Gender.create({
      id: '818041be-c907-4dd2-b543-81e715013125',
      name: 'woman'
    })
    //Size
    await ProductSize.create({
      id: '756494cd-61bd-47d2-bd12-4df8c587f3fd',
      name: 'S'
    })
    await ProductSize.create({
      id: 'e06ea924-7e05-4680-afd3-603567e0d37b',
      name: 'Z'
    })
    await ProductSize.create({
      id: 'eac4de9d-da24-442e-b5f9-6ed3fcfb6f3d',
      name: 'A'
    })
    await ProductSize.create({
      id: 'f2a37937-7e04-4627-9e6c-f3d053071ceb',
      name: 's'
    })
  await ProductSize.create({
    id: '9d145fb2-6e8d-4a05-b8ed-b64415f3bb03',
    name: '37'
  })
  await ProductSize.create({
    id: '2ea6c788-ec0c-43f1-ad2c-d5eb9e0e5837',
    name: '38'
  })
  await ProductSize.create({
    id: '3e80439c-8415-420a-94d1-974009bcd958',
    name: '39'
  })
  await ProductSize.create({
    id: '669f123c-0d09-4be7-9254-60182500b434',
    name: '40'
  })
  await ProductSize.create({
    id: '8339fdc6-4ff1-47ad-820a-6c5b02bbd268',
    name: '41'
  })
  await ProductSize.create({
    id: 'c2d4f898-372f-4a9e-b6dd-6d9dcc29708c',
    name: '42'
  })
  await ProductSize.create({
    id: 'ba576826-f1cd-4077-a382-592186b8a3a2',
    name: '43'
  })


    const Img =  Products.hasMany(ProductsImage)
    const ProductStock = Products.hasMany(Stock)
    //EXAMPLE
    await Products.create({
      id: 'ee41bbb3-b7a9-48a0-97ef-88daae772201',
      title: 'Prueba delete img',
      description: 'PRUBEA IMG',
      price: 4999.00,
      categoryId: 'a7883dfd-14fd-4426-bbb3-311328837cfb',
      subCategoryId: 'a5e4e7f1-3160-49e0-b161-ed1b846b041e',
      brandId : '9a8414c1-a5f1-4146-9d93-3a328595b86d',
      products_imgs: [
        {
          id: '0165d622-f127-496f-8f43-c0bd3ab85b16',
          productId: 'ee41bbb3-b7a9-48a0-97ef-88daae772201',
          url: `http://localhost:3000/api/v1/upload/1714100567820.jpg`
        },
        {
          id: 'e0796407-cd6a-4119-842c-dec0c94c2e49',
          productId: 'ee41bbb3-b7a9-48a0-97ef-88daae772201',
          url: `http://localhost:3000/api/v1/upload/1714100567824.jpg`
        },
        {
          id: '75d4eaeb-fe8d-481a-aa2e-6ef9926b6f3f',
          productId: 'ee41bbb3-b7a9-48a0-97ef-88daae772201',
          url: `http://localhost:3000/api/v1/upload/1714100567836.jpg`
        },
        {
          id: 'e1f88a0e-609a-4da3-85de-a793b410f927',
          productId: 'ee41bbb3-b7a9-48a0-97ef-88daae772201',
          url: `http://localhost:3000/api/v1/upload/1714100567838.jpg`
        },
      ]
    },{
      include: [Img]
    })
//EZAMPLE INACTIVE
await Products.create({
  id: '85b1518c-80cd-40f5-bcf9-a71c5006d381',
  title: 'INACTIVE',
  description: 'iPhone 14 Plus 6.7" Chip A15 Bionic. Resolución cámara frontal 12 MP. Resolución cámara posterior 12 MP.',
  price: 4999.00,
  categoryId: 'a7883dfd-14fd-4426-bbb3-311328837cfb',
  subCategoryId: 'a5e4e7f1-3160-49e0-b161-ed1b846b041e',
  brandId : '9a8414c1-a5f1-4146-9d93-3a328595b86d',
  statusId: '1f2e3c66-958f-4880-92ed-f83d4d1829d5',
  products_imgs: [
    {
      id: '680e8ccc-4169-4775-97de-91b8e4620dfb',
      productId: '85b1518c-80cd-40f5-bcf9-a71c5006d381',
      url: `http://localhost:3000/api/v1/upload/1690418097699-iPhone-14-Plus-6.7-256GB-Rojo-1.jpg`
    }],
  product_stocks : [
    {
      id: '0165d622-f127-496f-8f43-c0bd3ab85b16',
      productId: '85b1518c-80cd-40f5-bcf9-a71c5006d381',
      stock: '20' 
    } 
  ]
},{
  include: [Img, ProductStock]
}
)
    
    // iPhone 14 Plus 256GB Rojo 9a8414c1-a5f1-4146-9d93-3a328595b86d
    await Products.create({
      id: '390c4948-9cad-44df-a19d-365dd92a371f',
      title: 'iPhone 14 Plus 256GB Rojo',
      description: 'iPhone 14 Plus 6.7" Chip A15 Bionic. Resolución cámara frontal 12 MP. Resolución cámara posterior 12 MP.',
      price: 4999.00,
      categoryId: 'a7883dfd-14fd-4426-bbb3-311328837cfb',
      subCategoryId: 'a5e4e7f1-3160-49e0-b161-ed1b846b041e',
      brandId : '9a8414c1-a5f1-4146-9d93-3a328595b86d',
      statusId: '77d71ed7-0113-4c01-aac2-ed093b355157',
      products_imgs: [
        {
          id: 'ba60a19a-a806-4d4d-900d-2b2817fcdf2b',
          productId: '390c4948-9cad-44df-a19d-365dd92a371f',
          url: `http://localhost:3000/api/v1/upload/1690418097699-iPhone-14-Plus-6.7-256GB-Rojo-1.jpg`
        },{
          id: 'e8ca563c-6641-4c6e-995d-582e385b50d8',
          productId: '390c4948-9cad-44df-a19d-365dd92a371f',
          url: `http://localhost:3000/api/v1/upload/1690418206814-iPhone-14-Plus-6.7-256GB-Rojo-2.jpg`
        },{
          id: '4736ca01-e838-4f6e-a71b-022f5657d5df',
          productId: '390c4948-9cad-44df-a19d-365dd92a371f',
          url: `http://localhost:3000/api/v1/upload/1690418226421-iPhone-14-Plus-6.7-256GB-Rojo-3.jpg`
        }],
      product_stocks : [
        {
          id: 'e0796407-cd6a-4119-842c-dec0c94c2e49',
          productId: '390c4948-9cad-44df-a19d-365dd92a371f',
          stock: '20' 
        }
      ]
    },{
      include: [Img, ProductStock]
    }
  )

  // iPhone 14 Plus 128GB Medianoche
  await Products.create({
    id: '8000652d-6727-4a8a-a3ee-155b41d1da1a',
    title: 'iPhone 14 Plus 128GB Medianoche',
    description: 'iPhone 14 Plus 6.7" Chip A15 Bionic. Resolución cámara frontal 12 MP. Resolución cámara posterior 12 MP.',
    price: 4899.00,
    categoryId: 'a7883dfd-14fd-4426-bbb3-311328837cfb',
    subCategoryId: 'a5e4e7f1-3160-49e0-b161-ed1b846b041e',
    brandId : '9a8414c1-a5f1-4146-9d93-3a328595b86d',
    statusId: '77d71ed7-0113-4c01-aac2-ed093b355157',
    products_imgs: [
      {
        id: 'bff3cce3-764f-4a53-9ef8-925802a733aa',
        productId: '8000652d-6727-4a8a-a3ee-155b41d1da1a',
        url: `http://localhost:3000/api/v1/upload/1690420104146-iPhone-14-Plus-6.7-128GB-Medianoche-1.jpg`
      },{
        id: '8ec67644-5cf2-471b-95b5-40cb99df8638',
        productId: '8000652d-6727-4a8a-a3ee-155b41d1da1a',
        url: `http://localhost:3000/api/v1/upload/1690420183567-iPhone-14-Plus-6.7-128GB-Medianoche-2.jpg`
      },{
        id: '9f035408-046d-421d-a753-17d830363ee9',
        productId: '8000652d-6727-4a8a-a3ee-155b41d1da1a',
        url: `http://localhost:3000/api/v1/upload/1690420485188-iPhone-14-Plus-6.7-128GB-Medianoche-3.jpg`
      }],
    product_stocks : [
      {
        id: 'e1f88a0e-609a-4da3-85de-a793b410f927',
        productId: '8000652d-6727-4a8a-a3ee-155b41d1da1a',
        stock: '20' 
      }
    ]
  },{
    include: [Img, ProductStock]
  }
)

  //  iPhone 13 6.1" 256GB Verde
  await Products.create({
    id: '1175c3d8-2f21-42dc-bd49-c8655b2ffc63',
    title: 'iPhone 13 256GB Verde',
    description: 'iPhone 13  6.1" Procesador Chip A15 Bionic, Pantalla Super Retina XDR, Memoria de 256 GB, Grabación de vídeo en 4K y en modo cine, Incluye cable de USB-C a conector Lightning.',
    price: 4299.00,
    categoryId: 'a7883dfd-14fd-4426-bbb3-311328837cfb',
    subCategoryId: 'a5e4e7f1-3160-49e0-b161-ed1b846b041e',
    brandId : '9a8414c1-a5f1-4146-9d93-3a328595b86d',
    statusId: '77d71ed7-0113-4c01-aac2-ed093b355157',
    products_imgs: [
      {
        id: 'e8a82a89-d459-4968-a3cd-123d1dd6379d',
        productId: '1175c3d8-2f21-42dc-bd49-c8655b2ffc63',
        url: `http://localhost:3000/api/v1/upload/1690423303808-iPhone-13-6.1-256GB-Verde-1.jpg`
      },{
        id: '28e75089-16ae-40f4-865f-04c1199b5592',
        productId: '1175c3d8-2f21-42dc-bd49-c8655b2ffc63',
        url: `http://localhost:3000/api/v1/upload/1690423314809-iPhone-13-6.1-256GB-Verde-2.jpg`
      },{
        id: '55926ae2-1f1d-42f5-83db-9d8fe9c6808a',
        productId: '1175c3d8-2f21-42dc-bd49-c8655b2ffc63',
        url: `http://localhost:3000/api/v1/upload/1690423321704-iPhone-13-6.1-256GB-Verde-3.jpg`
      }],
    product_stocks : [
      {
        id: '75d4eaeb-fe8d-481a-aa2e-6ef9926b6f3f',
        productId: '1175c3d8-2f21-42dc-bd49-c8655b2ffc63',
        stock: '20' 
      }
    ]
  },{
    include: [Img, ProductStock]
  }
)

//  Samsung Galaxy A54 6.4" 256GB 8GB RAM Light Violet
await Products.create({
  id: 'b1b4c8e2-a11f-4017-983f-ca5138180db8',
  title: 'Samsung Galaxy A54 5G 256GB 8GB RAM Light Violet',
  description: 'Samsung Galaxy A54 6.4" Procesador SEC | S5E8835(Exynos1380), resolución de pantalla 2340x1080, resolución cámara frontal 32 MP, resolución de cámarra posterior 50MP + 12MP + 5MP, 256GB 8GB RAM Light Violet',
  price: 1999.00,
  categoryId: 'a7883dfd-14fd-4426-bbb3-311328837cfb',
  subCategoryId: 'a5e4e7f1-3160-49e0-b161-ed1b846b041e',
  brandId : 'b0fc6ae0-d188-44aa-a4da-f7df09da3bd0',
  statusId: '77d71ed7-0113-4c01-aac2-ed093b355157',
  products_imgs: [
    {
      id: 'f58fd791-a784-4220-b31b-52fbb886220f',
      productId: 'b1b4c8e2-a11f-4017-983f-ca5138180db8',
      url: `http://localhost:3000/api/v1/upload/1690427211443-Samsung-Galaxy-A54-5G-256GB-8GB-RAM-Light-Violet-1.jpg`
    },{
      id: '829a80aa-4708-4976-ab3d-b688ade0926e',
      productId: 'b1b4c8e2-a11f-4017-983f-ca5138180db8',
      url: `http://localhost:3000/api/v1/upload/1690427219194-Samsung-Galaxy-A54-5G-256GB-8GB-RAM-Light-Violet-2.jpg`
    },{
      id: '09dc4b6f-565e-4435-8ab8-2c1ddf7a279b',
      productId: 'b1b4c8e2-a11f-4017-983f-ca5138180db8',
      url: `http://localhost:3000/api/v1/upload/1690427226485-Samsung-Galaxy-A54-5G-256GB-8GB-RAM-Light-Violet-3.jpg`
    }],
  product_stocks : [
    {
      id: '322392cd-47f1-49d0-8843-4029416a6c4e',
      productId: 'b1b4c8e2-a11f-4017-983f-ca5138180db8',
      stock: '20' 
    }
  ]
},{
  include: [Img, ProductStock]
}
)

//  Samsung Galaxy 6.6" A34 5G 256GB 8GB RAM Light Violet
  await Products.create({
    id: '6147b34d-74de-46a9-b11a-2affc3ab3805',
    title: 'Samsung Galaxy A34 5G 256GB 8GB RAM Light Violet',
    description: 'Samsung Galaxy A34 6.6" Procesador MediaTek | MT6877V/TTZA, resolución de pantalla 2340x1080, resolución cámara frontal 13 MP, resolución de cámarra posterior 48MP + 8MP + 5MP, 256GB 8GB RAM Light Violet',
    price: 1699.00,
    categoryId: 'a7883dfd-14fd-4426-bbb3-311328837cfb',
    subCategoryId: 'a5e4e7f1-3160-49e0-b161-ed1b846b041e',
    brandId : 'b0fc6ae0-d188-44aa-a4da-f7df09da3bd0',
    statusId: '77d71ed7-0113-4c01-aac2-ed093b355157',
    products_imgs: [
      {
        id: '4f886bcf-307a-4ac6-b385-7592b03f7971',
        productId: '6147b34d-74de-46a9-b11a-2affc3ab3805',
        url: `http://localhost:3000/api/v1/upload/1690427718368-Samsung-Galaxy-A34-6.6-256GB-Light-Violet-1.jpg`
      },{
        id: '84157b7e-c77e-4d00-9ef9-258a9a4e28f8',
        productId: '6147b34d-74de-46a9-b11a-2affc3ab3805',
        url: `http://localhost:3000/api/v1/upload/1690427727542-Samsung-Galaxy-A34-6.6-256GB-Light-Violet-2.jpg`
      },{
        id: '62fbf52e-d609-4c1c-be80-04f82d41e523',
        productId: '6147b34d-74de-46a9-b11a-2affc3ab3805',
        url: `http://localhost:3000/api/v1/upload/1690427742716-Samsung-Galaxy-A34-6.6-256GB-Light-Violet-3.jpg`
      }],
    product_stocks : [
      {
        id: 'a2e1aa14-5d0c-4e19-9ecf-9210c589eb2b',
        productId: '6147b34d-74de-46a9-b11a-2affc3ab3805',
        stock: '20' 
      }
    ]
  },{
    include: [Img, ProductStock]
  }
)

//  Samsung Galaxy 6.4" A54 5G 256GB 8GB RAM Light Green
  await Products.create({
    id: '1b0f521c-a2df-4c54-a343-cf777f9cb029',
    title: 'Samsung Galaxy A54 5G 256GB 8GB RAM Light Green',
    description: 'Samsung Galaxy A54 6.4" Procesador SEC | S5E8835(Exynos1380), resolución de pantalla 2340x1080, resolución cámara frontal 32 MP, resolución de cámara posterior 50MP + 12MP + 5MP, 256GB 8GB RAM Light Green.',
    price: 1999.00,
    categoryId: 'a7883dfd-14fd-4426-bbb3-311328837cfb',
    subCategoryId: 'a5e4e7f1-3160-49e0-b161-ed1b846b041e',
    brandId : 'b0fc6ae0-d188-44aa-a4da-f7df09da3bd0',
    statusId: '77d71ed7-0113-4c01-aac2-ed093b355157',
    products_imgs: [
      {
        id: '3d8889bc-40e2-427f-aaf2-f23accee3591',
        productId: '1b0f521c-a2df-4c54-a343-cf777f9cb029',
        url: `http://localhost:3000/api/v1/upload/1690428737051-Samsung-Galaxy-A54-5G-6.4-256GB-Light-Green-1.jpg`
      },{
        id: '5a8494f0-9fac-4b87-a99d-319b12e58d98',
        productId: '1b0f521c-a2df-4c54-a343-cf777f9cb029',
        url: `http://localhost:3000/api/v1/upload/1690428744754-Samsung-Galaxy-A54-5G-6.4-256GB-Light-Green-2.jpg`
      },{
        id: '65c06a89-580c-4002-8b4f-71e53b8844a4',
        productId: '1b0f521c-a2df-4c54-a343-cf777f9cb029',
        url: `http://localhost:3000/api/v1/upload/1690428752735-Samsung-Galaxy-A54-5G-6.4-256GB-Light-Green-3.jpg`
      }],
    product_stocks : [
      {
        id: '082b4282-7009-44ae-a553-45a378f24c76',
        productId: '1b0f521c-a2df-4c54-a343-cf777f9cb029',
        stock: '20' 
      }
    ]
  },{
    include: [Img, ProductStock]
  }
)

    //TELEVISOR SAMSUNG 85 LED CRYSTAL UHD
    await Products.create({
      id: '31920c97-4367-45a6-99eb-eb528acf503a',
      title: 'Televisor Samsung 85" Led Crystal UHD 4K Smart Tv',
      description: 'Tv Led 85" Smart Crystal UHD 4K 2022 de pantalla plana con procesador de Crystal Processor 4K y sistema operativo Tizen.',
      price: 8499.00,
      categoryId: 'a7883dfd-14fd-4426-bbb3-311328837cfb',
      subCategoryId: 'de29182c-146f-41c1-9e6e-c12daf667c58',
      brandId : 'b0fc6ae0-d188-44aa-a4da-f7df09da3bd0',
      statusId: '77d71ed7-0113-4c01-aac2-ed093b355157',
      products_imgs: [
        {
          id: '93b7f849-d58d-4fcd-be9f-75929af371de',
          productId: '31920c97-4367-45a6-99eb-eb528acf503a',
          url: `http://localhost:3000/api/v1/upload/1689912467225-Televisor-Samsung-85-Led-Crystal-UHD-4K-Smart-Tv-1-1.jpg`
        },{
          id: '94e47efe-af05-4352-805e-f531606a5a80',
          productId: '31920c97-4367-45a6-99eb-eb528acf503a',
          url: `http://localhost:3000/api/v1/upload/1689912467223-Televisor-Samsung-85-Led-Crystal-UHD-4K-Smart-Tv-1-2.jpg`
        },{
          id: '1d73b14c-9c5c-4466-932d-b6b0a54760d4',
          productId: '31920c97-4367-45a6-99eb-eb528acf503a',
          url: `http://localhost:3000/api/v1/upload/1689912467166-Televisor-Samsung-85-Led-Crystal-UHD-4K-Smart-Tv-1-3.jpg`
        }],
      product_stocks : [
        {
          id: '28f9afdf-0c3d-4d36-b0ce-531335ec1c09',
          productId: '31920c97-4367-45a6-99eb-eb528acf503a',
          stock: '20' 
        }
      ]
    },{
      include: [Img, ProductStock]
    }
  )

     //TELEVISOR Samsung Smart TV 65" Crystal UHD 4K
     await Products.create({
      id: '7781086e-17e5-4c4f-9209-902320a65dda',
      title: 'Televisor Samsung Smart TV 65" Crystal UHD 4K',
      description: 'Tv Led 65" Crystal UHD 4K 2023 de pantalla plana y sistema operativo Tizen.',
      price: 1749.00,
      categoryId: 'a7883dfd-14fd-4426-bbb3-311328837cfb',
      subCategoryId: 'de29182c-146f-41c1-9e6e-c12daf667c58',
      brandId : 'b0fc6ae0-d188-44aa-a4da-f7df09da3bd0',
      statusId: '77d71ed7-0113-4c01-aac2-ed093b355157',
      products_imgs: [
        {
          id: 'c002aad0-8628-4f89-8eac-eb1ac054f775',
          productId: '7781086e-17e5-4c4f-9209-902320a65dda',
          url: `http://localhost:3000/api/v1/upload/1689962741504-Televisor-Samsung-Smart-TV-65-Crystal-UHD-4K-1-1.jpg`
        },{
          id: 'bfc7f9a5-b357-42eb-9cde-33479b9f69ae',
          productId: '7781086e-17e5-4c4f-9209-902320a65dda',
          url: `http://localhost:3000/api/v1/upload/1689962749203-Televisor-Samsung-Smart-TV-65-Crystal-UHD-4K-1-2.jpg`
        },{
          id: 'a64be17f-9b2a-4cf8-8ce0-2326ea826b99',
          productId: '7781086e-17e5-4c4f-9209-902320a65dda',
          url: `http://localhost:3000/api/v1/upload/1689962757318-Televisor-Samsung-Smart-TV-65-Crystal-UHD-4K-1-3.jpg`
        }],
      product_stocks : [
        {
          id: '50023a86-d004-4195-b50a-3e96f4986a59',
          productId: '7781086e-17e5-4c4f-9209-902320a65dda',
          stock: '10' 
        },
      ]
    },{
      include: [Img, ProductStock]
    }
  )

   //TELEVISOR SAMSUNG 55 QLED 4K
   await Products.create({
    id: 'e3fb1faf-72ee-486d-b36f-9206c8c0b000',
    title: 'Televisor Samsung 55" QLED 4K Smart Tv',
    description: 'Tv Led 55" QLED 4K UHD 2022 de pantalla plana y sistema operativo Tizen.',
    price: 1699.00,
    categoryId: 'a7883dfd-14fd-4426-bbb3-311328837cfb',
    subCategoryId: 'de29182c-146f-41c1-9e6e-c12daf667c58',
    brandId : 'b0fc6ae0-d188-44aa-a4da-f7df09da3bd0',
    statusId: '77d71ed7-0113-4c01-aac2-ed093b355157',
    products_imgs: [
      {
        id: '36ed7397-d06e-4422-a982-30586c38eebf',
        productId: 'e3fb1faf-72ee-486d-b36f-9206c8c0b000',
        url: `http://localhost:3000/api/v1/upload/1689962713504-Televisor-Samsung-Smart-TV-55-QLED-4K-1-1.jpg`
      },{
        id: 'd32a5807-1cdb-42f7-ad0f-802ccf343a28',
        productId: 'e3fb1faf-72ee-486d-b36f-9206c8c0b000',
        url: `http://localhost:3000/api/v1/upload/1689962722090-Televisor-Samsung-Smart-TV-55-QLED-4K-1-2.jpg`
      },{
        id: '52957ac5-89bf-41d5-873d-ed646e2cd91f',
        productId: 'e3fb1faf-72ee-486d-b36f-9206c8c0b000',
        url: `http://localhost:3000/api/v1/upload/1689962731191-Televisor-Samsung-Smart-TV-55-QLED-4K-1-3.jpg`
      }],
    product_stocks : [
      {
        id: '4624be01-d3b9-43fb-a8f8-fa606e3af80a',
        productId: 'e3fb1faf-72ee-486d-b36f-9206c8c0b000',
        stock: '10' 
      }
    ]
  },{
    include: [Img, ProductStock]
  }
)
   //Televisor Samsung Smart TV 75" QLED 4K
   await Products.create({
    id: 'ecafb15b-850d-4dcc-832d-46c01661afaf',
    title: 'Televisor Samsung 75" QLED 4K Smart Tv',
    description: 'Tv Led 75" QLED 4K UHD 2022 de pantalla plana y sistema operativo Tizen.',
    price: 4199.00,
    categoryId: 'a7883dfd-14fd-4426-bbb3-311328837cfb',
    subCategoryId: 'de29182c-146f-41c1-9e6e-c12daf667c58',
    brandId : 'b0fc6ae0-d188-44aa-a4da-f7df09da3bd0',
    statusId: '77d71ed7-0113-4c01-aac2-ed093b355157',
    products_imgs: [
      {
        id: '58b3f41b-9810-4081-82f6-6533de5c64cf',
        productId: 'ecafb15b-850d-4dcc-832d-46c01661afaf',
        url: `http://localhost:3000/api/v1/upload/1690144728024-Televisor-Samsung-Smart-TV-75-QLED-4K-1.jpg`
      },{
        id: '8b2a144a-941e-4603-a812-273eb7cf3e47',
        productId: 'ecafb15b-850d-4dcc-832d-46c01661afaf',
        url: `http://localhost:3000/api/v1/upload/1690144740987-Televisor-Samsung-Smart-TV-75-QLED-4K-2.jpg`
      },{
        id: '926b550e-db16-47f3-be98-9c8db534b702',
        productId: 'ecafb15b-850d-4dcc-832d-46c01661afaf',
        url: `http://localhost:3000/api/v1/upload/1690144751838-Televisor-Samsung-Smart-TV-75-QLED-4K-3.jpg`
      }],
    product_stocks : [
      {
        id: '52604068-6315-4dbb-9488-ae75b5d017a3',
        productId: 'ecafb15b-850d-4dcc-832d-46c01661afaf',
        stock: '10' 
      }
    ]
  },{
    include: [Img, ProductStock]
  }
)
  // Televisor Samsung Smart TV 65" Neo QLED 8K Mini LED
  await Products.create({
    id: '603dafa1-f2c7-4728-a39d-fa5add9e7e1f',
    title: 'Televisor Samsung Smart TV 65" Neo QLED 8K Mini LED',
    description: 'TV Samsung Smart TV 65" Neo QLED 8K Mini LED con sistema operaivo Tizen y resolución 8K Ultra HD.',
    price: 11999.00,
    categoryId: 'a7883dfd-14fd-4426-bbb3-311328837cfb',
    subCategoryId: 'de29182c-146f-41c1-9e6e-c12daf667c58',
    brandId : 'b0fc6ae0-d188-44aa-a4da-f7df09da3bd0',
    statusId: '77d71ed7-0113-4c01-aac2-ed093b355157',
    products_imgs: [
      {
        id: '49ade957-a3d0-4f31-b4c9-9b0d0f694953',
        productId: '603dafa1-f2c7-4728-a39d-fa5add9e7e1f',
        url: `http://localhost:3000/api/v1/upload/1690150336777-Televisor-Samsung-Smart-TV-65-Neo-QLED-8K-Mini-LED-1.jpg`
      },{
        id: 'e2133355-3ab2-4665-a0e5-d91595853932',
        productId: '603dafa1-f2c7-4728-a39d-fa5add9e7e1f',
        url: `http://localhost:3000/api/v1/upload/1690150347269-Televisor-Samsung-Smart-TV-65-Neo-QLED-8K-Mini-LED-2.jpg`
      },{
        id: 'ab88619a-917e-4826-b0e9-c0764a103302',
        productId: '603dafa1-f2c7-4728-a39d-fa5add9e7e1f',
        url: `http://localhost:3000/api/v1/upload/1690150354323-Televisor-Samsung-Smart-TV-65-Neo-QLED-8K-Mini-LED-3.jpg`
      }],
    product_stocks : [
      {
        id: 'a7c2b502-a145-4372-b219-383981df54ea',
        productId: '603dafa1-f2c7-4728-a39d-fa5add9e7e1f',
        stock: '10' 
      }
    ]
  },{
    include: [Img, ProductStock]
  }
  )


    // Refrigeradora Indurama RI-788D
    await Products.create({
      id: '1bce57ce-8dd6-49df-aaf7-8ebcc84fe547',
      title: 'Refrigerador Indurama RI-788D',
      description: 'Refrigerador Indurama modelo RI-788D con capacidad total útil de 507 Lt , alto de 175.3cm y ancho 90.8cm',
      price: 2099,
      categoryId: 'f675494e-2ca4-4de8-9e0b-09d5fe47b02e',
      subCategoryId: '10409298-c31e-422f-b3eb-88fd9bc54dcf',
      brandId : '1cea1391-3167-4b91-94bd-871075e48b54',
      statusId: '77d71ed7-0113-4c01-aac2-ed093b355157',
      products_imgs: [
        {
          id: '6feb3d5d-7f2c-4cc9-be66-4fa3ac3031f6',
          productId: '1bce57ce-8dd6-49df-aaf7-8ebcc84fe547',
          url: `http://localhost:3000/api/v1/upload/1690151104220-Refrigerador-Indurama-RI-788D-1.jpg`
        },{
          id: '83b6f318-a8a0-450a-a204-7a41bdc78d7c',
          productId: '1bce57ce-8dd6-49df-aaf7-8ebcc84fe547',
          url: `http://localhost:3000/api/v1/upload/1690151110820-Refrigerador-Indurama-RI-788D-2.jpg`
        },{
          id: '238e2fa1-fd8f-450b-97bf-ae567199fac8',
          productId: '1bce57ce-8dd6-49df-aaf7-8ebcc84fe547',
          url: `http://localhost:3000/api/v1/upload/1690151119171-Refrigerador-Indurama-RI-788D-3.jpg`
        }],
      product_stocks : [
        {
          id: '314198ad-cdfc-4ae8-8572-3d8a51f6ae76',
          productId: '1bce57ce-8dd6-49df-aaf7-8ebcc84fe547',
          stock: '10' 
        }
      ]
    },{
      include: [Img, ProductStock]
    }
    )

    // Refrigeradora Samsung 602L RS60T5200S9 SIDE BY SIDE PLATA
    await Products.create({
      id: '86f5c62d-76bb-4f26-9311-f87e11b44c9d',
      title: 'Refrigerador Samsung RS60T5200S9 Side By Side Plata 602L',
      description: 'Refrigerador Samsung modelo RS60T5200S9 Side By Side con capacidad total útil de 602 Lt , alto de 178cm y ancho 91.2cm',
      price: 4299,
      categoryId: 'f675494e-2ca4-4de8-9e0b-09d5fe47b02e',
      subCategoryId: '10409298-c31e-422f-b3eb-88fd9bc54dcf',
      brandId : 'b0fc6ae0-d188-44aa-a4da-f7df09da3bd0',
      statusId: '77d71ed7-0113-4c01-aac2-ed093b355157',
      products_imgs: [
        {
          id: 'f34eaa2a-b7d8-4c41-93a4-9b5e4be0d21a',
          productId: '86f5c62d-76bb-4f26-9311-f87e11b44c9d',
          url: `http://localhost:3000/api/v1/upload/1690152343990-Refrigeradora-Samsung-602L-RS60T5200S9-Side-By-Side-Plata-1.jpg`
        },{
          id: '22d24567-76fd-4769-a926-680631d4aef2',
          productId: '86f5c62d-76bb-4f26-9311-f87e11b44c9d',
          url: `http://localhost:3000/api/v1/upload/1690152353067-Refrigeradora-Samsung-602L-RS60T5200S9-Side-By-Side-Plata-2.jpg`
        },{
          id: '84acef04-c3a7-4782-86cc-a72c47f5c90e',
          productId: '86f5c62d-76bb-4f26-9311-f87e11b44c9d',
          url: `http://localhost:3000/api/v1/upload/1690152360427-Refrigeradora-Samsung-602L-RS60T5200S9-Side-By-Side-Plata-3.jpg`
        }],
      product_stocks : [
        {
          id: '487a5653-9691-43ea-b78f-398cec05ab0b',
          productId: '86f5c62d-76bb-4f26-9311-f87e11b44c9d',
          stock: '10' 
        }
      ]
    },{
      include: [Img, ProductStock]
    }
    )

    // Refrigeradora Mabe  No frost de 420 L Black Steel Mabe
    await Products.create({
      id: '378a4536-ee36-4de6-884d-1b7cdde9deab',
      title: 'Refrigeradora No frost de 420 L Black Steel Mabe',
      description: 'Refrigeradora No frost de 420 L Black Steel Mabe con capacidad total útil de 470 Lt , alto de 184cm y ancho 67.9cm',
      price: 1999,
      categoryId: 'f675494e-2ca4-4de8-9e0b-09d5fe47b02e',
      subCategoryId: '10409298-c31e-422f-b3eb-88fd9bc54dcf',
      brandId : 'e1b85bf6-8ce7-4b6c-92d1-3c45a1c6b45b',
      statusId: '77d71ed7-0113-4c01-aac2-ed093b355157',
      products_imgs: [
        {
          id: 'e0f58006-e210-4e09-8fc9-4a3bf008bdc7',
          productId: '378a4536-ee36-4de6-884d-1b7cdde9deab',
          url: `http://localhost:3000/api/v1/upload/1690228036099-Refrigeradora-No-frost-de-420-L-Black-Steel-Mabe-1.jpg`
        },{
          id: 'ee8ef2d3-7945-499a-bf89-fd06bbe5c0a7',
          productId: '378a4536-ee36-4de6-884d-1b7cdde9deab',
          url: `http://localhost:3000/api/v1/upload/1690228044858-Refrigeradora-No-frost-de-420-L-Black-Steel-Mabe-2.jpg`
        },{
          id: 'd6ff46fa-2abb-4cd1-83f6-2c6032c55e65',
          productId: '378a4536-ee36-4de6-884d-1b7cdde9deab',
          url: `http://localhost:3000/api/v1/upload/1690228052478-Refrigeradora-No-frost-de-420-L-Black-Steel-Mabe-3.jpg`
        }],
      product_stocks : [
        {
          id: 'e3998657-4241-4135-a8de-17e2ecccecfb',
          productId: '378a4536-ee36-4de6-884d-1b7cdde9deab',
          stock: '10' 
        }
      ]
    },{
      include: [Img, ProductStock]
    }
    )

     // Refrigeradora Mabe  No frost de 300 L Platinum Mabe
     await Products.create({
      id: '4908cfa3-d222-4f7e-806e-7681159b9dfe',
      title: 'Refrigeradora No frost de 300 L Platinum Mabe',
      description: 'Refrigeradora Mabe No frost de 420 L Black Steel Mabe con capacidad total útil de 292 Lt , alto de 177.5cm y ancho 55.6cm',
      price: 1649,
      categoryId: 'f675494e-2ca4-4de8-9e0b-09d5fe47b02e',
      subCategoryId: '10409298-c31e-422f-b3eb-88fd9bc54dcf',
      brandId : 'e1b85bf6-8ce7-4b6c-92d1-3c45a1c6b45b',
      statusId: '77d71ed7-0113-4c01-aac2-ed093b355157',
      products_imgs: [
        {
          id: 'f42de63d-b5d5-4805-a59b-1c112147a832',
          productId: '4908cfa3-d222-4f7e-806e-7681159b9dfe',
          url: `http://localhost:3000/api/v1/upload/1690230402611-Refrigeradora-No-frost-de-300-L-Platinum-Mabe-1.jpg`
        },{
          id: '90e13f95-5719-4a65-bded-66a7e067f661',
          productId: '4908cfa3-d222-4f7e-806e-7681159b9dfe',
          url: `http://localhost:3000/api/v1/upload/1690230412257-Refrigeradora-No-frost-de-300-L-Platinum-Mabe-2.jpg`
        },{
          id: '0186f730-d6bb-4fe9-97b1-8e8f918a7c3b',
          productId: '4908cfa3-d222-4f7e-806e-7681159b9dfe',
          url: `http://localhost:3000/api/v1/upload/1690230418551-Refrigeradora-No-frost-de-300-L-Platinum-Mabe-3.jpg`
        }],
      product_stocks : [
        {
          id: '2abb42d8-e408-454c-9c7b-426bdc10822f',
          productId: '4908cfa3-d222-4f7e-806e-7681159b9dfe',
          stock: '10' 
        }
      ]
    },{
      include: [Img, ProductStock]
    }
    )

     // Refrigeradora Samsung RS64T5B00B1/PE Side by Side
     await Products.create({
      id: '15ea9169-7769-4d2b-964c-06f004eee0ce',
      title: 'Refrigeradora Samsung 638L RS64T5B00B1-PE Side by Side Digital Inverter',
      description: 'Refrigerador Samsung modelo RS64T5B00B1/PE, tecnologia Digital Inveter, capacidad total útil de 638 Lt , alto de 178cm y ancho 91.2cm',
      price: 2999,
      categoryId: 'f675494e-2ca4-4de8-9e0b-09d5fe47b02e',
      subCategoryId: '10409298-c31e-422f-b3eb-88fd9bc54dcf',
      brandId : 'b0fc6ae0-d188-44aa-a4da-f7df09da3bd0',
      statusId: '77d71ed7-0113-4c01-aac2-ed093b355157',
      products_imgs: [
        {
          id: '80b42d6b-9b26-4151-b1d7-03678fab0548',
          productId: '15ea9169-7769-4d2b-964c-06f004eee0ce',
          url: `http://localhost:3000/api/v1/upload/1690235653898-Refrigeradora-Samsung-RS64T5B00B1PE-1.jpg`
        },{
          id: 'f7d6843d-8a98-4dd6-b505-28513be88153',
          productId: '15ea9169-7769-4d2b-964c-06f004eee0ce',
          url: `http://localhost:3000/api/v1/upload/1690235666673-Refrigeradora-Samsung-RS64T5B00B1PE-2.jpg`
        },{
          id: '98a01e5d-d0ea-40fa-b808-0a65f0b31581',
          productId: '15ea9169-7769-4d2b-964c-06f004eee0ce',
          url: `http://localhost:3000/api/v1/upload/1690235674716-Refrigeradora-Samsung-RS64T5B00B1PE-3.jpg`
        }],
      product_stocks : [
        {
          id: '05e85431-9179-469a-b187-9263d1e45872',
          productId: '15ea9169-7769-4d2b-964c-06f004eee0ce',
          stock: '10' 
        }
      ]
    },{
      include: [Img, ProductStock]
    }
    )


  // nike air force black white
    await Products.create({
      id: 'd983efc9-e0fc-4226-8561-25f9d3945e00',
      title: 'Air Force 1 07 LV8 Utility Negras',
      description: 'Nike Air Force 1 07 LV8 Utility Black 100% Original ',
      price: 350.00,
      stock: 100,
      categoryId: '46180818-8631-4686-98e5-21028f905c43',
      subCategoryId: '00be3b0b-eceb-48eb-9005-9acfed39b63b',
      brandId : 'da8941bc-2c5f-4fca-8dea-6da6f76549f0',
      statusId: '77d71ed7-0113-4c01-aac2-ed093b355157',
      hasSizes: true,
      genderId:'9426486f-014a-4f3d-a479-e15cd974dcd4',
      products_imgs: [
        {
          id: '49a229d1-3d0d-4722-8718-f92cc1049295',
          productId: 'd983efc9-e0fc-4226-8561-25f9d3945e00',
          url: 'http://localhost:3000/api/v1/upload/1671666340684-nike-air-force-3-1.jpg'
        },{
          id: '25702915-5fa8-4d2f-8438-d8a0a089d5c6',
          productId: 'd983efc9-e0fc-4226-8561-25f9d3945e00',
          url: 'http://localhost:3000/api/v1/upload/1671666341128-nike-air-force-3-2.jpg'
        },{
          id: '6e47ae99-cea0-4310-ab7b-1870e0bad8be',
          productId: 'd983efc9-e0fc-4226-8561-25f9d3945e00',
          url: 'http://localhost:3000/api/v1/upload/1671666341283-nike-air-force-3-3.jpg'
        }],
      product_stocks : [
        {
          id: '211a2cfe-0959-40cf-89ea-5bcb097dd13f',
          sizeId: '2ea6c788-ec0c-43f1-ad2c-d5eb9e0e5837',
          productId: 'd983efc9-e0fc-4226-8561-25f9d3945e00',
          stock: '10' 
        },
        {
          id: 'c9d8ba47-c5bb-4ff8-bed4-0cce0a9ebed4',
          sizeId: '3e80439c-8415-420a-94d1-974009bcd958',
          productId: 'd983efc9-e0fc-4226-8561-25f9d3945e00',
          stock: '20'
        },
        {
          id: 'c78134b6-8bee-401d-9a53-e0041e7545eb',
          sizeId: '669f123c-0d09-4be7-9254-60182500b434',
          productId: 'd983efc9-e0fc-4226-8561-25f9d3945e00',
          stock: '30'
        }
      ]
    },{
      include: [Img, ProductStock]
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
    subCategoryId: '00be3b0b-eceb-48eb-9005-9acfed39b63b',
    brandId : 'da8941bc-2c5f-4fca-8dea-6da6f76549f0',
    statusId: '77d71ed7-0113-4c01-aac2-ed093b355157',
    hasSizes: true,
    genderId:'9426486f-014a-4f3d-a479-e15cd974dcd4',
    products_imgs: [
      {
        id: '35001d0d-ee75-4641-9153-8a6d076ed9a2',
        productId: 'f2a7f68a-807a-46d9-9573-c8760ef76baf',
        url: 'http://localhost:3000/api/v1/upload/1671669207514-nike-air-force-white-black-1-1.jpg'
      },{
        id: '7e76a616-e9b6-47a1-9730-f31cdb1ce052',
        productId: 'f2a7f68a-807a-46d9-9573-c8760ef76baf',
        url: 'http://localhost:3000/api/v1/upload/1671669474920-nike-air-force-white-black-1-2.jpg'
      },{
        id: 'cac4d642-eb3e-4820-bc9d-667520485315',
        productId: 'f2a7f68a-807a-46d9-9573-c8760ef76baf',
        url: 'http://localhost:3000/api/v1/upload/1671669806230-nike-air-force-white-black-1-3.jpg'
      }],
      product_stocks : [
        {
          id: '6181c8c7-3df1-4503-b8ed-4bdc3dbe0a06',
          sizeId: '2ea6c788-ec0c-43f1-ad2c-d5eb9e0e5837',
          productId: 'f2a7f68a-807a-46d9-9573-c8760ef76baf',
          stock: '50' 
        },
        {
          id: '51db87a3-d3e1-4f03-b2d5-5eb1b5732817',
          sizeId: '3e80439c-8415-420a-94d1-974009bcd958',
          productId: 'f2a7f68a-807a-46d9-9573-c8760ef76baf',
          stock: '50'
        },
        {
          id: '45e28aec-0f1b-4f2f-bc4f-5defd5c2b01c',
          sizeId: '669f123c-0d09-4be7-9254-60182500b434',
          productId: 'f2a7f68a-807a-46d9-9573-c8760ef76baf',
          stock: '50'
        },
        {
          id: '6e08feb4-bb72-4675-9667-b03383dd3539',
          sizeId: '8339fdc6-4ff1-47ad-820a-6c5b02bbd268',
          productId: 'f2a7f68a-807a-46d9-9573-c8760ef76baf',
          stock: '50'
        },
        {
          id: 'b1446e05-1f28-4f04-814a-61b117c6f623',
          sizeId: 'c2d4f898-372f-4a9e-b6dd-6d9dcc29708c',
          productId: 'f2a7f68a-807a-46d9-9573-c8760ef76baf',
          stock: '50'
        }
      ]
  },{
    include: [Img, ProductStock]
  }
  )
  //Nike Air Force  (white-black)
  await Products.create({
    id: '58eae8b0-8f2f-4bf8-b1c4-fd6232ed3632',
    title: 'Nike Air Force 1 Low Utility Black White',
    description: 'Nike Air Force 1 07 LV8 Utility Black 100% Original ',
    price: 350.00,
    stock: 100,
    categoryId: '46180818-8631-4686-98e5-21028f905c43',
    subCategoryId: '00be3b0b-eceb-48eb-9005-9acfed39b63b',
    brandId : 'da8941bc-2c5f-4fca-8dea-6da6f76549f0',
    statusId: '77d71ed7-0113-4c01-aac2-ed093b355157',
    hasSizes: true,
    genderId:'9426486f-014a-4f3d-a479-e15cd974dcd4',
    products_imgs: [
      {
        id: '1d23c73e-5107-43c6-b816-c8cb0e96719d',
        productId: '58eae8b0-8f2f-4bf8-b1c4-fd6232ed3632',
        url: 'http://localhost:3000/api/v1/upload/1671670987730-nike-air-force-5-1.jpg'
      },{
        id: 'c23be36d-d23b-44db-bf0a-9dd69b94c9cd',
        productId: '58eae8b0-8f2f-4bf8-b1c4-fd6232ed3632',
        url: 'http://localhost:3000/api/v1/upload/1671670987731-nike-air-force-5-2.jpg'
      },{
        id: '163f7c03-bc21-4702-85a4-56b24d7432e8',
        productId: '58eae8b0-8f2f-4bf8-b1c4-fd6232ed3632',
        url: 'http://localhost:3000/api/v1/upload/1671670987885-nike-air-force-5-3.jpg'
      }],
      product_stocks : [
        {
          id: '9df4778b-3a47-4b4c-8c50-b7945d933de3',
          sizeId: '2ea6c788-ec0c-43f1-ad2c-d5eb9e0e5837',
          productId: '58eae8b0-8f2f-4bf8-b1c4-fd6232ed3632',
          stock: '50' 
        },
        {
          id: '95a1025a-2bc5-4bc2-989f-9e271e025abc',
          sizeId: '3e80439c-8415-420a-94d1-974009bcd958',
          productId: '58eae8b0-8f2f-4bf8-b1c4-fd6232ed3632',
          stock: '50'
        },
        {
          id: 'd2b2b567-1d49-4489-a06b-594606bf6fa2',
          sizeId: '669f123c-0d09-4be7-9254-60182500b434',
          productId: '58eae8b0-8f2f-4bf8-b1c4-fd6232ed3632',
          stock: '50'
        },
        {
          id: 'b43ef617-97df-4842-804a-ee74dc9a19d8',
          sizeId: '8339fdc6-4ff1-47ad-820a-6c5b02bbd268',
          productId: '58eae8b0-8f2f-4bf8-b1c4-fd6232ed3632',
          stock: '50'
        },
        {
          id: '4b8c2ca3-e198-4ab3-9606-dc78c989eafe',
          sizeId: 'c2d4f898-372f-4a9e-b6dd-6d9dcc29708c',
          productId: '58eae8b0-8f2f-4bf8-b1c4-fd6232ed3632',
          stock: '50'
        }
      ]
  },{
    include: [Img, ProductStock]
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
    subCategoryId: '00be3b0b-eceb-48eb-9005-9acfed39b63b',
    brandId : 'da8941bc-2c5f-4fca-8dea-6da6f76549f0',
    statusId: '77d71ed7-0113-4c01-aac2-ed093b355157',
    hasSizes: true,
    genderId:'9426486f-014a-4f3d-a479-e15cd974dcd4',
    products_imgs: [
      {
        id: 'e2272669-1972-4018-8cbb-6558302260f7',
        productId: 'c086ecf5-4dc3-4b20-aeee-63b8bfb756ba',
        url: 'http://localhost:3000/api/v1/upload/1671673436289-nike-air-force-white-1-1.jpg'
      },{
        id: '396240e4-52da-46a7-a0a1-b8404cf884e6',
        productId: 'c086ecf5-4dc3-4b20-aeee-63b8bfb756ba',
        url: 'http://localhost:3000/api/v1/upload/1671673436194-nike-air-force-white-1-2.jpg'
      },{
        id: 'a35c0033-71ae-4ecc-8e50-08ee550ee3c1',
        productId: 'c086ecf5-4dc3-4b20-aeee-63b8bfb756ba',
        url: 'http://localhost:3000/api/v1/upload/1671673436288-nike-air-force-white-1-3.jpg'
      }],
    product_stocks : [
      {
        id: '013a47b3-4cca-45dc-a8cc-1cdee6f90f43',
        sizeId: '2ea6c788-ec0c-43f1-ad2c-d5eb9e0e5837',
        productId: 'c086ecf5-4dc3-4b20-aeee-63b8bfb756ba',
        stock: '50' 
      },
      {
        id: '18cc5a6b-34ef-4b88-baf3-7be5b6851f04',
        sizeId: '3e80439c-8415-420a-94d1-974009bcd958',
        productId: 'c086ecf5-4dc3-4b20-aeee-63b8bfb756ba',
        stock: '50'
      },
      {
        id: '253f63cb-5113-4999-8606-9cf29d75295d',
        sizeId: '669f123c-0d09-4be7-9254-60182500b434',
        productId: 'c086ecf5-4dc3-4b20-aeee-63b8bfb756ba',
        stock: '50'
      },
      {
        id: 'fde5df34-ad66-4a01-b386-a92be30ef0df',
        sizeId: '8339fdc6-4ff1-47ad-820a-6c5b02bbd268',
        productId: 'c086ecf5-4dc3-4b20-aeee-63b8bfb756ba',
        stock: '50'
      },
      {
        id: '7d6ae327-ae04-471e-b249-3dd542dd6643',
        sizeId: 'c2d4f898-372f-4a9e-b6dd-6d9dcc29708c',
        productId: 'c086ecf5-4dc3-4b20-aeee-63b8bfb756ba',
        stock: '50'
      },
      {
        id: 'd91f047c-7a5e-4efd-9803-a44d93c97293',
        sizeId: 'ba576826-f1cd-4077-a382-592186b8a3a2',
        productId: 'c086ecf5-4dc3-4b20-aeee-63b8bfb756ba',
        stock: '50'
      }
    ]
  },{
    include: [Img, ProductStock]
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
      subCategoryId: '00be3b0b-eceb-48eb-9005-9acfed39b63b',
      brandId : 'da8941bc-2c5f-4fca-8dea-6da6f76549f0',
      statusId: '77d71ed7-0113-4c01-aac2-ed093b355157',
      hasSizes: true,
      genderId:'9426486f-014a-4f3d-a479-e15cd974dcd4',
      products_imgs: [
        {
          id: '639c81ad-79ca-45bc-8c35-43d6f648f1f7',
          productId: 'b74f8a25-aaa8-409b-a3c8-a3684e59c313',
          url: 'http://localhost:3000/api/v1/upload/1670556978708-nike-mercurial-victory-VI-CR7-1-2.jpg'
        },
        {
          id: '311d8a30-cf80-4b0b-a820-0ec02066de8d',
          productId: 'b74f8a25-aaa8-409b-a3c8-a3684e59c313',
          url: 'http://localhost:3000/api/v1/upload/1670556976910-nike-mercurial-victory-VI-CR7-1-3.jpg'
        },{
          id: '7a9876a7-2892-44ff-8bc2-3e8db7c7a44e',
          productId: 'b74f8a25-aaa8-409b-a3c8-a3684e59c313',
          url: 'http://localhost:3000/api/v1/upload/1670556978116-nike-mercurial-victory-VI-CR7-1-1.jpg'
        }
      ],
      product_stocks : [
        {
          id: 'ecb72b38-2f5e-4532-b8ce-a8e85843fc4d',
          sizeId: '2ea6c788-ec0c-43f1-ad2c-d5eb9e0e5837',
          productId: 'b74f8a25-aaa8-409b-a3c8-a3684e59c313',
          stock: '50' 
        },
        {
          id: '9cd2a742-49a1-4b37-b8dd-395cfa96f750',
          sizeId: '3e80439c-8415-420a-94d1-974009bcd958',
          productId: 'b74f8a25-aaa8-409b-a3c8-a3684e59c313',
          stock: '50'
        },
        {
          id: '88f3e77d-348c-4753-8343-923bd3930394',
          sizeId: '669f123c-0d09-4be7-9254-60182500b434',
          productId: 'b74f8a25-aaa8-409b-a3c8-a3684e59c313',
          stock: '50'
        },
        {
          id: '5f9586b0-82b3-4a8e-88a0-9bd8d9609029',
          sizeId: '8339fdc6-4ff1-47ad-820a-6c5b02bbd268',
          productId: 'b74f8a25-aaa8-409b-a3c8-a3684e59c313',
          stock: '50'
        },
        {
          id: '3e97a7d4-9249-4257-9ef1-df7bcc9f89ff',
          sizeId: 'c2d4f898-372f-4a9e-b6dd-6d9dcc29708c',
          productId: 'b74f8a25-aaa8-409b-a3c8-a3684e59c313',
          stock: '50'
        },
        {
          id: '7c9efb1e-aa2a-4f09-86e4-61d845764bb5',
          sizeId: 'ba576826-f1cd-4077-a382-592186b8a3a2',
          productId: 'b74f8a25-aaa8-409b-a3c8-a3684e59c313',
          stock: '50'
        }
      ]
    },{
      include: [Img, ProductStock]
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
    subCategoryId: '00be3b0b-eceb-48eb-9005-9acfed39b63b',
    brandId : 'da8941bc-2c5f-4fca-8dea-6da6f76549f0',
    statusId: '77d71ed7-0113-4c01-aac2-ed093b355157',
    hasSizes: true,
    genderId:'9426486f-014a-4f3d-a479-e15cd974dcd4',
    products_imgs: [
      {
        id: 'a586831b-292c-440c-a4b7-f9eeeeeb0e1b',
        productId: 'bf4dbbd7-479f-4e10-b143-6d304153f544',
        url: 'http://localhost:3000/api/v1/upload/1671597163314-nike-hypervenom-phantom-3-1-1.jpg'
      },
      {
        id: '392d0d20-2d0f-4e4e-ace6-540819a098cb',
        productId: 'bf4dbbd7-479f-4e10-b143-6d304153f544',
        url: 'http://localhost:3000/api/v1/upload/1671597163378-nike-hypervenom-phantom-3-1-2.jpg'
      },{
        id: '29760fd6-0b07-4ded-b226-33bd679c7c5d',
        productId: 'bf4dbbd7-479f-4e10-b143-6d304153f544',
        url: 'http://localhost:3000/api/v1/upload/1671597163378-nike-hypervenom-phantom-3-1-3.jpg'
      }
    ],
    product_stocks : [
      {
        id: '2fb02bfe-d0a9-4fbd-8dd0-b0f913038b96',
        sizeId: '9d145fb2-6e8d-4a05-b8ed-b64415f3bb03',
        productId: 'b74f8a25-aaa8-409b-a3c8-a3684e59c313',
        stock: '50' 
      },
      {
        id: 'd6606aa7-7cc9-4eb0-83b1-c1af0236a4ff',
        sizeId: '2ea6c788-ec0c-43f1-ad2c-d5eb9e0e5837',
        productId: 'b74f8a25-aaa8-409b-a3c8-a3684e59c313',
        stock: '50' 
      },
      {
        id: 'b6cb5930-1435-4d1e-905c-1f2af109e368',
        sizeId: '3e80439c-8415-420a-94d1-974009bcd958',
        productId: 'b74f8a25-aaa8-409b-a3c8-a3684e59c313',
        stock: '50'
      },
      {
        id: '28289515-7c05-439f-b398-16849219a80c',
        sizeId: '669f123c-0d09-4be7-9254-60182500b434',
        productId: 'b74f8a25-aaa8-409b-a3c8-a3684e59c313',
        stock: '50'
      },
      {
        id: 'a0d955a9-65f3-453e-a6e8-aa1427b88d83',
        sizeId: '8339fdc6-4ff1-47ad-820a-6c5b02bbd268',
        productId: 'b74f8a25-aaa8-409b-a3c8-a3684e59c313',
        stock: '50'
      },
      {
        id: '9ac783c4-2e49-4865-9c59-c3b8e08587a5',
        sizeId: 'c2d4f898-372f-4a9e-b6dd-6d9dcc29708c',
        productId: 'b74f8a25-aaa8-409b-a3c8-a3684e59c313',
        stock: '50'
      },
      {
        id: '3225bb11-7c99-4639-8e4b-c4448169667c',
        sizeId: 'ba576826-f1cd-4077-a382-592186b8a3a2',
        productId: 'b74f8a25-aaa8-409b-a3c8-a3684e59c313',
        stock: '50'
      }
    ]
  },{
    include: [Img, ProductStock]
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
  subCategoryId: '00be3b0b-eceb-48eb-9005-9acfed39b63b',
  brandId : 'da8941bc-2c5f-4fca-8dea-6da6f76549f0',
  statusId: '77d71ed7-0113-4c01-aac2-ed093b355157',
  hasSizes: true,
  genderId:'9426486f-014a-4f3d-a479-e15cd974dcd4',
  products_imgs: [
    {
      id: '5124f536-24aa-4b52-be12-cfa7bbed6eb5',
      productId: '134d4f15-6708-4dc2-b117-5658003fe5b8',
      url: 'http://localhost:3000/api/v1/upload/1671597872007-nike-hypervenom-phantom-III-white-1-1.jpg'
    },
    {
      id: 'cd7dca1f-b8f0-4c72-898d-08be87ddcb7e',
      productId: '134d4f15-6708-4dc2-b117-5658003fe5b8',
      url: 'http://localhost:3000/api/v1/upload/1671597872006-nike-hypervenom-phantom-III-white-1-2.jpg'
    },{
      id: 'dc4a15b8-58ba-432b-9b71-b277d862328a',
      productId: '134d4f15-6708-4dc2-b117-5658003fe5b8',
      url: 'http://localhost:3000/api/v1/upload/1671597872007-nike-hypervenom-phantom-III-white-1-3.jpg'
    }
  ],
  product_stocks : [
    {
      id: '6e7fa53e-288a-48c9-8bec-401ad5ebbd1e',
      sizeId: '9d145fb2-6e8d-4a05-b8ed-b64415f3bb03',
      productId: '134d4f15-6708-4dc2-b117-5658003fe5b8',
      stock: '50' 
    },
    {
      id: 'f6a91aec-d2ed-4b1f-83d4-5a8ffbd1169e',
      sizeId: '2ea6c788-ec0c-43f1-ad2c-d5eb9e0e5837',
      productId: '134d4f15-6708-4dc2-b117-5658003fe5b8',
      stock: '50' 
    },
    {
      id: '9fc8c35b-2e3b-4b4d-af8d-dfe8fef66ee4',
      sizeId: '3e80439c-8415-420a-94d1-974009bcd958',
      productId: '134d4f15-6708-4dc2-b117-5658003fe5b8',
      stock: '50'
    },
    {
      id: '08819fb1-eb87-46b6-b187-31102ec12dc8',
      sizeId: '669f123c-0d09-4be7-9254-60182500b434',
      productId: '134d4f15-6708-4dc2-b117-5658003fe5b8',
      stock: '50'
    },
    {
      id: '2dc105f9-bd32-4c65-955c-fe3e1ff1dfeb',
      sizeId: '8339fdc6-4ff1-47ad-820a-6c5b02bbd268',
      productId: '134d4f15-6708-4dc2-b117-5658003fe5b8',
      stock: '50'
    },
    {
      id: '4ad760ac-2d0f-4324-a26e-9832b82bf43b',
      sizeId: 'c2d4f898-372f-4a9e-b6dd-6d9dcc29708c',
      productId: '134d4f15-6708-4dc2-b117-5658003fe5b8',
      stock: '50'
    },
    {
      id: '3d11b0f5-f7cf-4bfd-b210-011443fc633f',
      sizeId: 'ba576826-f1cd-4077-a382-592186b8a3a2',
      productId: '134d4f15-6708-4dc2-b117-5658003fe5b8',
      stock: '50'
    }
  ]
},{
  include: [Img, ProductStock]
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
    subCategoryId: '00be3b0b-eceb-48eb-9005-9acfed39b63b',
    brandId : 'da8941bc-2c5f-4fca-8dea-6da6f76549f0',
    statusId: '77d71ed7-0113-4c01-aac2-ed093b355157',
    hasSizes: true,
    genderId:'9426486f-014a-4f3d-a479-e15cd974dcd4',
    products_imgs: [
      {
        id: '0940387a-fe12-41c7-b8ab-dd8212cd709b',
        productId: '0efc4714-0872-4ede-bbdc-47e593e5de37',
        url: 'http://localhost:3000/api/v1/upload/1671600497381-nike-hypervenom-phantom-3-df-fg-azul-blanco-1-1.jpg'
      },
      {
        id: '1c0fde7b-a74f-4352-92dc-0c075204a20a',
        productId: '0efc4714-0872-4ede-bbdc-47e593e5de37',
        url: 'http://localhost:3000/api/v1/upload/1671600497446-nike-hypervenom-phantom-3-df-fg-azul-blanco-1-2.jpg'
      },{
        id: 'dd9ebeb0-4ce8-49e7-96b1-7bc40a3248f0',
        productId: '0efc4714-0872-4ede-bbdc-47e593e5de37',
        url: 'http://localhost:3000/api/v1/upload/1671600497447-nike-hypervenom-phantom-3-df-fg-azul-blanco-1-3.jpg'
      }
    ],
    product_stocks : [
      {
        id: '5ba87a68-67f0-4db8-96dc-c9bd6d79e284',
        sizeId: '2ea6c788-ec0c-43f1-ad2c-d5eb9e0e5837',
        productId: '0efc4714-0872-4ede-bbdc-47e593e5de37',
        stock: '50' 
      },
      {
        id: '2c632c13-5372-417e-a589-dffa59062037',
        sizeId: '3e80439c-8415-420a-94d1-974009bcd958',
        productId: '0efc4714-0872-4ede-bbdc-47e593e5de37',
        stock: '50'
      },
      {
        id: '186ec217-7ebb-4edd-8bdf-7be02ea18323',
        sizeId: '669f123c-0d09-4be7-9254-60182500b434',
        productId: '0efc4714-0872-4ede-bbdc-47e593e5de37',
        stock: '50'
      },
      {
        id: '39db7022-e0a4-4f92-93c2-5be51e6e8f47',
        sizeId: '8339fdc6-4ff1-47ad-820a-6c5b02bbd268',
        productId: '0efc4714-0872-4ede-bbdc-47e593e5de37',
        stock: '50'
      },
      {
        id: 'a4cc70e1-7363-4e16-a035-6e5bff0b37e9',
        sizeId: 'c2d4f898-372f-4a9e-b6dd-6d9dcc29708c',
        productId: '0efc4714-0872-4ede-bbdc-47e593e5de37',
        stock: '50'
      }
    ]
  },{
    include: [Img, ProductStock]
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
  subCategoryId: '00be3b0b-eceb-48eb-9005-9acfed39b63b',
  brandId : '9d5a65b6-2c87-46d1-81e2-765af520567e',
  statusId: '77d71ed7-0113-4c01-aac2-ed093b355157',
  hasSizes: true,
  genderId:'9426486f-014a-4f3d-a479-e15cd974dcd4',
  products_imgs: [
    {
      id: 'e432c92b-6a1f-4dbe-9104-02d5e87460f5',
      productId: 'abafe1d7-235c-4353-851d-c277c261c26a',
      url: 'http://localhost:3000/api/v1/upload/1671605543672-adidas-super-star-white-1-1.jpg'
    },
    {
      id: '82ac9b8e-8ffd-4451-84db-f61eaff060ff',
      productId: 'abafe1d7-235c-4353-851d-c277c261c26a',
      url: 'http://localhost:3000/api/v1/upload/1671605543791-adidas-super-star-white-1-2.jpg'
    },{
      id: '6ead591c-4182-47aa-a8b3-085d1bc98eae',
      productId: 'abafe1d7-235c-4353-851d-c277c261c26a',
      url: 'http://localhost:3000/api/v1/upload/1671605543792-adidas-super-star-white-1-3.jpg'
    }
  ],
  product_stocks : [
    {
      id: '5390bb97-8990-4544-8d91-aed81f428357',
      sizeId: '2ea6c788-ec0c-43f1-ad2c-d5eb9e0e5837',
      productId: 'abafe1d7-235c-4353-851d-c277c261c26a',
      stock: '50' 
    },
    {
      id: 'cf53bd0b-671e-41ed-b5b5-84f3f3eea1ed',
      sizeId: '3e80439c-8415-420a-94d1-974009bcd958',
      productId: 'abafe1d7-235c-4353-851d-c277c261c26a',
      stock: '50'
    },
    {
      id: 'aa709121-7654-48cc-8c2d-1941c832b176',
      sizeId: '669f123c-0d09-4be7-9254-60182500b434',
      productId: 'abafe1d7-235c-4353-851d-c277c261c26a',
      stock: '50'
    },
    {
      id: '3913da6b-0ca2-4543-b7ab-52f80adeb9fe',
      sizeId: '8339fdc6-4ff1-47ad-820a-6c5b02bbd268',
      productId: 'abafe1d7-235c-4353-851d-c277c261c26a',
      stock: '50'
    },
    {
      id: '1488639a-2813-4fac-8615-449d525d920f',
      sizeId: 'c2d4f898-372f-4a9e-b6dd-6d9dcc29708c',
      productId: 'abafe1d7-235c-4353-851d-c277c261c26a',
      stock: '50'
    },
    {
      id: '92d9a1b1-f182-4ab7-b93e-3749ab3c18c0',
      sizeId: 'ba576826-f1cd-4077-a382-592186b8a3a2',
      productId: 'abafe1d7-235c-4353-851d-c277c261c26a',
      stock: '50'
    }
  ]
},{
  include: [Img, ProductStock]
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
  subCategoryId: '00be3b0b-eceb-48eb-9005-9acfed39b63b',
  brandId : '9d5a65b6-2c87-46d1-81e2-765af520567e',
  statusId: '77d71ed7-0113-4c01-aac2-ed093b355157',
  hasSizes: true,
  genderId:'9426486f-014a-4f3d-a479-e15cd974dcd4',
  products_imgs: [
    {
      id: '14abd21d-41d4-48dc-a6b1-62847afe2894',
      productId: '1af86b94-1ec9-49c7-993b-b4f0565dea3b',
      url: 'http://localhost:3000/api/v1/upload/1671660301712-adidas-super-star-1-1.jpg'
    },
    {
      id: '209d5e2a-ca65-4bc1-9154-6dc04f6f4b29',
      productId: '1af86b94-1ec9-49c7-993b-b4f0565dea3b',
      url: 'http://localhost:3000/api/v1/upload/1671660304227-adidas-super-star-1-2.jpg'
    },{
      id: 'cb0b7f52-3d77-41ac-83d4-097366c3992c',
      productId: '1af86b94-1ec9-49c7-993b-b4f0565dea3b',
      url: 'http://localhost:3000/api/v1/upload/1671660305091-adidas-super-star-1-3.jpg'
    },{
      id: '1da0d3e7-ecd2-4949-99b7-ebd25769c28e',
      productId: '1af86b94-1ec9-49c7-993b-b4f0565dea3b',
      url: 'http://localhost:3000/api/v1/upload/1671660314453-adidas-super-star-1-4.jpg'
    }
  ],
  product_stocks : [
    {
      id: '7c210520-9992-446c-9888-602ecbbf5c87',
      sizeId: '2ea6c788-ec0c-43f1-ad2c-d5eb9e0e5837',
      productId: '1af86b94-1ec9-49c7-993b-b4f0565dea3b',
      stock: '50' 
    },
    {
      id: 'dd061a69-d0e8-4b5e-828c-e246b407aaa2',
      sizeId: '3e80439c-8415-420a-94d1-974009bcd958',
      productId: '1af86b94-1ec9-49c7-993b-b4f0565dea3b',
      stock: '50'
    },
    {
      id: '50db306e-6d56-4c43-abe6-0118060ddc87',
      sizeId: '669f123c-0d09-4be7-9254-60182500b434',
      productId: '1af86b94-1ec9-49c7-993b-b4f0565dea3b',
      stock: '50'
    },
    {
      id: '2c5e36ad-c255-43cc-b597-2b7a11827784',
      sizeId: '8339fdc6-4ff1-47ad-820a-6c5b02bbd268',
      productId: '1af86b94-1ec9-49c7-993b-b4f0565dea3b',
      stock: '50'
    },
    {
      id: '75fbe0ab-da81-4342-bbb9-6dd301dc8e4a',
      sizeId: 'c2d4f898-372f-4a9e-b6dd-6d9dcc29708c',
      productId: '1af86b94-1ec9-49c7-993b-b4f0565dea3b',
      stock: '50'
    },
    {
      id: '253ef1b1-a7b3-4f0b-acf3-d4764edc3b87',
      sizeId: 'ba576826-f1cd-4077-a382-592186b8a3a2',
      productId: '1af86b94-1ec9-49c7-993b-b4f0565dea3b',
      stock: '50'
    }
  ]
},{
  include: [Img, ProductStock]
}
)

  //STOCK
/*
  await Stock.create({
    id: '05d827d8-8654-44c8-b146-02020eebae33',
    productId: '',
    sizeId: '',
    stock: ''
  })
  await Stock.create({
    id: '05d827d8-8654-44c8-b146-02020eebae33',
    productId: '',
    sizeId: '',
    stock: ''
  })
  await Stock.create({
    id: '05d827d8-8654-44c8-b146-02020eebae33',
    productId: '',
    sizeId: '',
    stock: ''
  })
  await Stock.create({
    id: '05d827d8-8654-44c8-b146-02020eebae33',
    productId: '',
    sizeId: '',
    stock: ''
  })
  await Stock.create({
    id: '05d827d8-8654-44c8-b146-02020eebae33',
    productId: '',
    sizeId: '',
    stock: ''
  })
  await Stock.create({
    id: '05d827d8-8654-44c8-b146-02020eebae33',
    productId: '',
    sizeId: '',
    stock: ''
  })
*/

  //Users


  //EXAMPLEINACTIVE
  await Users.create({
    id: "0d0f1c23-2e44-472f-b4ce-0e24db970305",
    name: "Eduardo",
    email: "eduado.academlo@academlo.com",
    password: "$2b$10$TNGcRFonQH98rVqFaBVfpOEEv2Xcu5ej14tWqKim3z3L6Tr.ZIaqC",
    phone: "1234567890",
    birthdayDate: "2016-01-01",
    dni: "900222",
    address: "Surco",
    roleId: "fef3a08d-2cec-4728-9745-7cbd2b37e557",
    statusId: "1f2e3c66-958f-4880-92ed-f83d4d1829d5",
    verified: false,
  })

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
      statusId: "77d71ed7-0113-4c01-aac2-ed093b355157",
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
      statusId: "77d71ed7-0113-4c01-aac2-ed093b355157",
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
      statusId: "77d71ed7-0113-4c01-aac2-ed093b355157",
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
      productStockId: '013a47b3-4cca-45dc-a8cc-1cdee6f90f43',
      cartId: 'ddc1027d-abc2-4fec-8312-7f4d72111c3a',
      quantity: 3,
      totalPrice: 1050
    },
    {
      id: '11d84b26-8a39-4f92-854f-c25b7c141985',
      productId: 'c086ecf5-4dc3-4b20-aeee-63b8bfb756ba',
      cartId: 'ddc1027d-abc2-4fec-8312-7f4d72111c3a',
      productStockId: '253f63cb-5113-4999-8606-9cf29d75295d',
      quantity: 2,
      totalPrice: 700
    },
    {
      id: 'e027209d-2076-4332-befc-d15cd024daad',
      productId: 'b74f8a25-aaa8-409b-a3c8-a3684e59c313',
      productStockId: 'ecb72b38-2f5e-4532-b8ce-a8e85843fc4d',
      cartId: 'ddc1027d-abc2-4fec-8312-7f4d72111c3a',
      quantity: 2,
      totalPrice: 720
    },
    {
      id: '6a462cb1-da97-4bf7-825f-3d970ec964ff',
      productId: 'c086ecf5-4dc3-4b20-aeee-63b8bfb756ba',
      productStockId: '7d6ae327-ae04-471e-b249-3dd542dd6643',
      cartId: '589fdd81-eb11-422e-aee3-c3a403693af4',
      quantity: 2,
      totalPrice: 600
    }
  ])

  
    await paymentsDate.create({
      id: '4a8bc981-c987-47d8-8bc5-bcf1fe52d63e',
      date: '25/01/2023',
    })
    await paymentsDate.create({
      id: '7a100e1d-9274-4b2c-9f74-1c1695f95dc0',
      date: '26/01/2023',
    })

    await Payments.create({
      id: 'ddc1027d-abc2-4fec-8312-7f4d72111c3a',
      productId: 'c086ecf5-4dc3-4b20-aeee-63b8bfb756ba',
      userId: '1098b922-3841-4416-a471-fb2ca0f7efa4',
      quantity: 3,
      totalPrice: 900,
      paymentDateId: '4a8bc981-c987-47d8-8bc5-bcf1fe52d63e' 
    }) 
    await Payments.create({
      id: '49a35249-79b8-4a90-b539-d54cf860fbb4',
      productId: 'c086ecf5-4dc3-4b20-aeee-63b8bfb756ba',
      userId: 'aa0fb5b3-4ee5-4949-baa1-c33340efa2e5',
      quantity: 1,
      totalPrice: 300,
      paymentDateId: '4a8bc981-c987-47d8-8bc5-bcf1fe52d63e' 
    }) 


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