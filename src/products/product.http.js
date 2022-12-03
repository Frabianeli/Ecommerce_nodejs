const productControllers = require('./product.controllers')

const getAll = (req, res)=> {
    productControllers.getAllProducts()
        .then((response) => {
            res.status(200).json({items: response.length, products: response})
        })
        .catch((err) => res.status(400).json(err))
}

const getById = (req, res) => {
    const id = req.params.id
    productControllers.getProductById(id)
        .then((response) => {
            res.status(201).json(response)
        })
        .catch(err => {
            res.status(404).json({message: `El usuario con el id ${id} no existe`})
        })
}

const create = (req, res) => {
    const body = JSON.parse(req.body.product)
    console.log({http: body})

    if(!Object.keys(body).length){
        res.status(400).json({message: 'Missin Data'})
    } else if (
        !body.title ||
        !body.description ||
        !body.price ||
        !body.stock ||
        !body.categoryId 
    ) {
        return res.status(400).json({
            message: 'All fields must be completed',
            fields:{
                name : 'string',   
                description:  'string',
                price: 1,
                stock: 1,
                categoryId: 'uuid'
                }
            })
    } else {

        const host = req.hostname + ':3000'+ '/api/v1/upload/'
        const images = req.files
        console.log({files:images})
        productControllers.createProduct(body, host, images)
            .then((response) => {
                console.log(response)
                res.status(201).json({
                    message: `Product created succesfully with id : ${response.id}`,
                    product: response,
                    name: response.title
                })
            })
            .catch((err) => {
                res.status(400).json(err)
            })
    }
}

const remove = (req, res) => {
    const id = req.params.id
    productControllers.removeProduct(id)
        .then((response) => {
            if(response){
                res.status(204).json()
            } else {
                res.status(400).json({message: 'Invalid ID'})
            }
        })
        .catch((err) => {
            res.status(400).json(err)
        })
} 

const edit = (req, res) => {
    const id = req.params.id
    const body = req.body.id
    if(!Object.keys(body).length){
        res.status(400).json({message: 'Missing Data'})
    } else if(
        !body.name ||
        !body.description ||
        !body.price ||
        !body.stock ||
        !body.categoryId 
    ) {
        return res.status(400).json({
            message: 'All fields must be completed',
            fields:{
                name : 'string',   
                description:  'string',
                price: 1,
                stock: 1,
                categoryId: 'uuid'
                }
            })
    } else {
        productControllers.editPoduct(body, id)
            .then((response) => {
                res.status(200).json({
                    message: `Product edited successfully with id: ${response.id}`
                })
            })
            .catch((err) => {
                res.status(400).json({message: err})
            })
    }
}

const profileImg = (req, res) => {
   // const productId = req.params.id
    const images = req.files
    const host = req.hostname + ':3000'+ '/api/v1/upload/'
    productControllers.postProfileImg( images, host)
        .then((response) => {
            if(response) {
                if(res) {
                    res.status(201).json(response)
                } else {
                    res.status(400).json({message: 'Invalid ID'})
                }
            } else {
                res.status(400).json({message: 'Invalid ID'})
            }
        })
        .catch((err)=> {
            res.status(400).json(err)
        })
}

module.exports = {
    getAll,
    getById,
    create,
    edit,
    remove,
    profileImg
}