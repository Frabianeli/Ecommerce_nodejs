// Dependencias
const express = require('express')
const cors = require('cors')

// Archivos de rutas
const userRouter = require('./users/user.router').router
const productRouter = require('./products/product.router').router
const productImgRouter = require('./productImg/productsImg.router').router
const categoryRouter = require('./categories/category.router').router
const cartRouter = require('./cart/cart.router').router
const authRouter = require('./auth/auth.router').router
const paymentRouter = require('./payments/payment.router').router
const brandRouter = require('./Brand/brand.router').router

const initModels = require('./models/initModels')
const defaultData = require('./utils/defaultData')
const {db} = require('./utils/database')
const ProductSize = require('./models/productSize.model')
const Roles = require('./models/roles.model')
const { where, Op, Sequelize } = require('sequelize')
const ProductStock = require('./models/ProductStock.model')
const Products = require('./models/products.model')
const Brand = require('./models/brand.model')
const Categories = require('./models/categories.model')
const ProductsImage = require('./models/productsImage.model')
const SubCategories = require('./models/subCategories')
const Gender = require('./models/gender.model')

const corsOptions = {
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}
const app = express()
app.use(cors({
    origin: '*',
    allowedHeaders:'*',
    //exposedHeaders: ['Content-Range']
}))

require('dotenv').config()

const port = process.env.PORT

initModels()
db.authenticate()
    .then((res) => console.log('Database Authenticated'))
    .catch(err => console.log(err)) 

if(process.env.NODE_ENV === 'production'){
    db.sync()
        .then(() => {
        console.log('Database synced in production')
        defaultData()
        })
        .catch(err => console.log(err))
} else{
    db.sync({force:true})
    .then(() => {
        console.log('Database synced')
        defaultData()
    })
    .catch(err => console.log(err))
}

app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use('/api/v1/products/categories', categoryRouter)
app.use('/api/v1/products/brand', brandRouter)
app.use('/api/v1/products', productRouter)
app.use('/api/v1/upload', productImgRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/cart', cartRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/payments', paymentRouter)

app.get('/api/v1/gender', async(req, res) => {
    const data = await Gender.findAll()
    res.status(200).json(data)
})
app.get('/api/v1/size', async(req, res) => {
    const getAllSize = await ProductSize.findAll({ 
        attributes: ['id', 'name'],
        include: {
            model: ProductStock,
            attributes: ['id','stock'],
        },
        logging: console.log
    })

    res.status(200).json(getAllSize)
})
app.get('/api/v1/role', async(req, res) => {
    const getAllRole = await Roles.findAll({})
    res.status(200).json(getAllRole)
})



app.listen(port, () => {
    console.log(`Server started at port ${port}`)
    console.log('http://localhost:3000/api/v1/products')
})