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

const initModels = require('./models/initModels')
const defaultData = require('./utils/defaultData')
const {db} = require('./utils/database')


const app = express()
app.use(cors())

require('dotenv').config()

const port = process.env.PORT

initModels()
db.authenticate()
    .then((res) => console.log('Database Authenticated'))
    .catch(err => console.log(err)) 

if(process.env.NODE_ENV === 'production'){
    db.sync()
        .then(() => {
        console.log('Database synced')
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

app.use('/api/v1/products/categories', categoryRouter)
app.use('/api/v1/products', productRouter)
app.use('/api/v1/upload', productImgRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/cart', cartRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/payments', paymentRouter)


app.listen(port, () => {
    console.log(`Server started at port ${port}`)
})