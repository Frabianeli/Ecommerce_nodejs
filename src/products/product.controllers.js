const uuid = require('uuid')
const Products = require('../models/products.model')
const ProductsImage = require('../models/productsImage.model')
const Categories = require('../models/categories.model')
const ProductStock = require("../models/ProductStock.model")
const ProductSize = require("../models/productSize.model")
const Brand = require('../models/brand.model')
const { Sequelize, Op, UUID, QueryTypes } = require('sequelize')
const SubCategories = require('../models/subCategories')
const { addUnique } = require('../categories/category.controllers')
const { db } = require('../utils/database')
const Gender = require('../models/gender.model')
const Status = require('../models/status.model')

const fs = require('fs')

const order = (data) => {
     if(data.length){
        data.forEach(e => {
            e.products_imgs.sort((a, b)=>{
                const numberA = a.url.substring(a.url.length-5, a.url.length-4)
                const numberB = b.url.substring(b.url.length-5, b.url.length-4)
                return numberA - numberB;
            })
        })
    }
    else {
        data.products_imgs.sort((a, b)=>{
            const numberA = a.url.substring(a.url.length-5, a.url.length-4)
            const numberB = b.url.substring(b.url.length-5, b.url.length-4)
            return numberA - numberB;
        })
    }
}

const getAllProduct = async (model, pagination, filtered, query) => {
    try {
        console.log('CONTROLLER')
        const data  = await Products.findAll(model)
    /* const {category, subcategory, brand, size, price}  = query
        
        const where = {}
        if(brand){
            where['brand.name'] = brand.split(',')
        }
        if(subcategory){
            where['sub_category.name'] = subcategory.split(',')
        }
        if(brand){
            where['brand.name'] =  brand.split(',')
        }
        if(category){
            where['category.name'] =  brand.split(',')
        }
        const wherePrice = []
        if(price){
            price.split(',',2).map((e,i)=> wherePrice.push(!i ? `>= ${e}`: `<= ${e}`))
        }
        console.log({where,wherePrice})
        const querySelect = (col) => (`
            SELECT DISTINCT ${col} AS name FROM products
            LEFT JOIN brands AS brand ON products.brand_id = brand.id
            LEFT JOIN sub_categories AS sub_category ON products.sub_category_id = sub_category.id
            LEFT JOIN product_stocks AS stock ON products.id = stock.product_id
            ${col === 'size.name' ? 'INNER JOIN' :  'LEFT JOIN'} product_sizes AS size ON stock.size_id = size.id
            ${Object.keys(where).length ? ' WHERE ' + Object.keys(where).map(e => `${e} IN (${where[e].map(x => `'${x}'`)})`).join(' AND ') : ''}
            ORDER BY ${col} ASC
            `)
    const results = (await db.query(querySelect('brand.name'),{type: QueryTypes.SELECT})).map(e => e.name)
    const allSubCategories = (await db.query(querySelect('sub_category.name'),{type: QueryTypes.SELECT,})).map(e => e.name)
    const allSizes = (await db.query(querySelect('size.name'),{type: QueryTypes.SELECT,})).map(e => e.name)

    const wherePric =''
    const minMaxPrice = await db.query(`
        SELECT MIN(price) AS min, MAX(price) AS max FROM products LEFT JOIN brands AS brand
        ON products.brand_id = brand.id LEFT JOIN sub_categories AS sub_category
        ON products.sub_category_id = sub_category.id
        ${Object.keys(where).length || wherePrice.length ? ' WHERE ': ''}
        ${wherePrice.length ? wherePrice.map(e => `products.price ${e}`).join(' AND ') : ''}
        ${Object.keys(where).length && wherePrice.length ? ' AND ' : ''}
        ${Object.keys(where).length ? Object.keys(where).map(e => `${e} IN (${where[e].map(x => `'${x}'`)})`).join(' AND ') : ''}
        `, {type: QueryTypes.SELECT, logging: console.log})
    const newPrice = { min: minMaxPrice[0].min, max: minMaxPrice[0].max}
    return { products: results, price: newPrice, sub_categries: allSubCategories, allSizes: allSizes.length ? allSizes : null }
*/     
        console.log('FIND-ALL', data.length)
        if(!data){
            throw new Error(`No se encontraron productos con tu filtro`)
        }
        const products = data.map(e => e.toJSON())
        order(products) // Ordenar las images
        //newData.all_sizes = ProductSize
        /*
        if(size && (category || subcategory || brand)){
            console.log('ABJAO...SIZES')
            const arrSizes = size.split(',')
            const filter = result.products.filter(e => {
            return e.product_stocks.some(x => arrSizes.some(z => x.product_size && z == x.product_size.name))
        })
            result.products = filter
        }*/

        return {
            products,
            filtered,
            pagination,
            query
        }
    } catch (error) {
        throw error.message || 'Error al encontrar el producto'
    }
}
const getProductById = async (id) => {
    try {
        const data = await Products.findOne({
            where: {
                id
            },  
            include: [
                {
                    model: Categories,
                    as: 'category',
                    attributes: ['name']
                },
                {
                    model: SubCategories,
                    attributes: ['name']
                },
                {
                    model: Brand,
                    attributes: ['name']
                },
                {
                    model: ProductsImage,
                    attributes: ['url'],
                },
                {
                    model: ProductStock,
                    attributes: ['id', 'stock'],
                    include : [{
                        model: ProductSize,
                        attributes: ['id', 'name'],
                    }]   
                },
                {
                    model: Gender,
                    attributes: ['name']
                },
                {
                    model: Status,
                    attributes: ['name']
                }
            ],
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'categoryId', 'brandId', 'subCategoryId']
            },
            logging: console.log
        })
        console.log('Controller get by id', data)
        if(!data){
            throw new Error(`No existe el producto con el "id" : ${id}`)
        }
        const products = data.toJSON()
        order(products)
        return products
    } catch (error) {
        throw error.message || 'Error al encontrar el producto'
    }
}
const getProductByTitle = async(title) => {
    try {
        const product = await Products.findOne({
            where: {
                title
            },
            order: [[ProductStock, ProductSize, 'name', 'DESC']],
            include: [
                {
                    model: Categories,
                    attributes: ['name']
                },
                {
                    model: SubCategories,
                    attributes: ['name']
                },
                {
                    model: Brand,
                    attributes: ['name']
                },
                {
                    model: ProductsImage,
                    attributes: ['url']
                },
                {
                    model: ProductStock,
                    attributes: ['id', 'stock'],
                    include : [{
                        model: ProductSize,
                        attributes: ['id', 'name']
                    }]   
                }
            ],
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'categoryId', 'brandId', 'subCategoryId']
            },
            logging: console.log
        })
        console.log(product)
        if(!product){
            throw new Error(`No existe el producto con el "title" : ${title}`)
        }
        order(product.toJSON())
        return product

    } catch (err) {
        console.log('mess',err)
        throw err.message || 'Error al encontrar el producto'
    }
}
const getProductByStockId = async(stockId) => {
    try {
        console.log("CONTROLLER")
        const data = await ProductStock.findOne({
            where: { id : stockId},
            attributes: ['id','stock'],
            include: [
                {
                    model: ProductSize,
                    attributes: ['name']
                },
                {
                    model: Products,
                    attributes: ['id', 'title', 'description', 'price'],
                    include: [
                        {
                            model: Brand,
                            attributes: ['name']
                        },
                        {
                            model: Categories,
                            attributes: ['name']
                        },
                        {
                            model: SubCategories,
                            attributes: ['name']
                        },
                        {
                            model: ProductsImage,
                            attributes: ['id', 'url']
                        },
                    ]
                }
            ]
        })
        console.log(data)
        if(!data){
            throw new Error(`No existe el stock con el "id" : ${stockId}`)
        }
        return data
    } catch (error) {
        throw error.message || 'Error al encontrar el stock'
    }
}
//
const editProductByStockId = async(id, data) => {
    const { stock } = data
    try {
        const data = await ProductStock.update({stock: stock},{
            where: {
                id
            },
            validate: true
        })
        if(data[0] !== 1){
            throw new Error('Algo salio mal')
        }
        console.log('RETURN DATA')
        return data
    } catch (error) {
        console.log({error})
        throw error
    }
}

const removeStockById = async(id) => {
    try {
        const remove = await ProductStock.destroy({
            where:{
                id
            }
        })
        if(remove !== 1){
            throw new Error(`No existe el stock con el id : ${id}`)
        }
        return remove
    } catch (error) {
        throw error.message || 'Error al eliminar el producto'   
    }

}
// OPTIMIZAR 
const createProductStock = async(data, productId) => {
    try {
        const result = []
        //const dataMap = data.map(e => ({...e, productId, sizeId: e.size || null}))
        console.log('contrrollers-body', data)
        for (const element of data) {
            const { id, stock} = element
            const create = await ProductStock.create({
                id,
                stock,
                productId,
                sizeId: element.size || null
            })
            result.push(create)
        }
        console.log(result)
        return result
    } catch (error) {
        console.log('MESSAGE', error.message)
        throw error
    }
}

const createProduct = async (body) => {
    const { title, description, price, genderId, brandId, categoryId, subCategoryId, hasSizes } = body
    try {
        const newProduct = await Products.create({
            id: uuid.v4(),
            title,
            description,
            price,
            brandId,
            categoryId,
            subCategoryId,
            genderId: genderId || null,
            hasSizes: hasSizes || false
        })
        if(!newProduct){
            throw new Error('Error al crear el producto')
        }
        return newProduct
    } catch (error) {
        throw error.message || 'Error al crear el producto'
    }
}
/*
const createProduct = async (body, stock, host, images) => {

    const { title, description, price, brand, category, subCategory } = body

    const productId = uuid.v4()

    const newProduct = await Products.create({
        id: productId,
        title: title,
        description: description,
        price: price,
        brandId: brand,
        categoryId: category,
        subCategoryId: subCategory
    })
    const arrayImg = []
        images.forEach((img) => {
            arrayImg.push({
                id: uuid.v4(),
                productId: productId,
                url: host+ img.filename
            })
        })
    const createImg = await ProductsImage.bulkCreate(arrayImg)

    const arrayStock = []
    stock.forEach(stock => {
        arrayStock.push({
            id: uuid.v4(),
            productId,
            stock: stock.stock,
            sizeId: stock.size || null
        })
    })
    const createStock = await ProductStock.bulkCreate(arrayStock)

    return {...newProduct.dataValues,
                images: createImg.map(img => img.url)
            }

}
*/

const removeProduct = async (id) => {
    try {
        const data = await Products.destroy({
            where : {
                id
            }
        })
        if(data !== 1) {
            throw new Error(`No existe el product con el id : ${id}`)
        }
        return data
    } catch (error) {
        throw error.message || 'Error al eliminar el producto'
    }
}
//
const editPoduct = async (data, productId) => {
    console.log(data)
    const {id, categoryId, subCategoryId, ...newData} = data
    console.log(newData)
    try {
        const edit = await Products.update(
            {...newData}, 
            {where: {
                id: productId
            }}
        )
        return edit
    } catch (error) {
        throw error.message || 'Error al editar el producto'
    }
}


module.exports = {
    getAllProduct,
    getProductById,
    getProductByTitle,
    getProductByStockId,
    createProduct,
    createProductStock,
    editPoduct,
    editProductByStockId,
    removeProduct,
    removeStockById,
    order
}