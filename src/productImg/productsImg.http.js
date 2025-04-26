const productsImageControllers = require('./productImg.controllers')

const getAll= (req, res) => {
    productsImageControllers.getAllImg()
        .then(response => {
            res.status(200).json({
                items: response.length,
                images: response
            })
        })
        .catch((err) => {
            res.status(400).json(err)
        })
}

const create = (req, res) => {
    const files = req.files
    console.log({files})
    if(!files?.length){
        res.status(400).json({message:'Missing File'})
    } else {
        const { id } = req.params
        const pathIndex = req.originalUrl.lastIndexOf('/')
        const path = req.originalUrl.substring(0, pathIndex + 1)
        const baseUrl = `${req.protocol}://${req.get('host')}${path}` 
        productsImageControllers.createImg(baseUrl, files, id)
            .then(response => res.status(201).json({
                message: `Create ${response.length} succesfield`,
                items: response.map(e => e.url)
            }))
            .catch(err => res.status(400).json(err))
    }
}

const remove = (req, res) => {
    const { img } = req.params
    if(!img){
        res.status('Missing params')
    } else{
        productsImageControllers.removeImg(img)
            .then(response => res.status(204).json(response))
            .catch(err => res.status(400).json({message: `No existe la imagen : ${img}`}))
    }
}

module.exports = {
    getAll,
    create,
    remove
}