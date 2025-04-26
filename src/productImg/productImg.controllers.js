const uuid = require('uuid')
const Products = require('../models/products.model')
const ProductImg = require('../models/productsImage.model')

const fs = require('fs')

const getAllImg = async () => {
    const data = await ProductImg.findAll({
        attributes:['id', 'url']
    })
    console.log('ENTRE CONTROLLER- IMG')
    return data
}

const removeImg = async (img) => {
    console.log(`http://localhost:3000/api/v1/upload/${img}`)
    console.log(img)
    try {
        fs.unlinkSync('uploads/' + img)
        const data = await ProductImg.destroy({
            where: {
                url: `http://localhost:3000/api/v1/upload/${img}`
            }
        })
        return data
    } catch (error) {
        console.log(error)
        throw error
    }
}

const createImg = (host, files, id) => {
    try {
        console.log('controller')
        const arrImg = []
        files.forEach(e => {
            arrImg.push({
                id: uuid.v4(),
                url: `${host}${e.filename}`,
                productId: id
            })
        })
        const img = ProductImg.bulkCreate(arrImg)
        return img
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllImg,
    createImg,
    removeImg
}