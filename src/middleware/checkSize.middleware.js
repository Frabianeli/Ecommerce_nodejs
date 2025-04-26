const ProductSize = require("../models/productSize.model")
const ProductStock = require("../models/ProductStock.model")
const uuid = require('uuid')
const { Op, QueryTypes } = require('sequelize')
const Products = require("../models/products.model")
const { db } = require("../utils/database")
const { validationResult } = require("express-validator")

const errorHandlerStock = async(req, res, next) => {
    const body = Array.isArray(req.body)  ? [...req.body] : [req.body]
    const productId = req.params.id
    console.log('ERRO-HABLDER')
    let errMessage = ''
    try {
        // Obtenemos el primer stock del producto, si no tiene el campo size presente evitamos crear mas
        // Evitamos que un producto pueda tener multiples stock si no esta presenta el campo size
        // Example: Zapatillas puede tener muchos stocks y tallas, Televisor solo puede tener un stock 
        // De igual manera hacemos con los datos del cliente y manejamos distintos errores
        const product = await ProductStock.findOne({where: {productId}, attributes: ['id', 'sizeId']})
        if(product?.sizeId === null){
            return res.status(400).json({
                message: 'El producto ya tiene stock disponible recomendamos actualizar el número'
            })
        }else if(
            !Object.keys(body).length ||
            (body.length === 1 && !(Object.getOwnPropertyDescriptor(body[0],'stock')?.value?.length))
        ){
            errMessage = 'Porfavor complete los campos: Has omitido el campo stock'
            throw new Error('Error en el body')
        }else {
            for (const element of body) {
                if(!(
                    Object.getOwnPropertyDescriptor(element,'stock')?.value?.length &&
                    Object.getOwnPropertyDescriptor(element,'size')?.value?.length
                )){
                    errMessage = 'Porfavor complete los campos: Si envia mas de un dato debes asegurarte enviar el campo size de manera obligatorio'
                    throw new Error('Error en el body')
                }
            }
        }
        next()
    } catch (error) {
        console.log({errMessage})
        console.log({error})
        if(error.message === 'Error en el body'){
            return res.status(400).json({
                message: errMessage,
                fields: {
                    stock: 'requerido',
                    size: 'opcional'
                },
                err: error.message
            })
        } else {
            return res.status(400).json({ message: 'Invalid Id'})
        }
    }
}

const error = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        if(errors.array()[0].path === ''){
            return res.status(400).json({
                message: 'Porfavor envie un array de objetos con los siguientes campos:',
                rules: 'El campo size es opcional si solo se envia un dato, caso contrario es requerido',
                fields: {
                    stock: 'requerido: number',
                    size: 'opcional: string',
                },
                msg: errors.array()[0].msg,
                msgs: errors.array() 
            });
        } else if(errors.array()[0].path === 'id'){
            return res.status(400).json({
                message: errors.array()[0].msg,
            });
        }
        const errStock = errors.array().reduce((acc, cv) => {
            const index = cv.path.match(/[0-9]/g)?.join('');
            const name = cv.path.match(/[a-z]/g)?.join('');
            if(index && name){
                if(!acc[index]){
                    acc[index] = {}
                } 
                acc[index][name] = cv.msg
            }else if(cv.path.length){
                acc[cv.path] =  cv.msg
            }else {
                acc.body = cv.msg
            }
            return acc;
        }, {});
        return res.status(400).json({
            message: 'Error en la validación de los campos',
            fields: errStock,
            msg:errors.array()
        });
    }
    // message: 'El producto ya tiene stock disponible. Recomendamos actualizar el número.'
    //message: 'El producto ya tiene stock creados con tallas porfavor solo se aceptan datos que tengan campos size'
    next()
};

const checkSize = async( req, res, next ) => {
    // Modificamos si recibimos un {} lo convertimos en []
    const body = Array.isArray(req.body)  ? [...req.body] : [req.body]
    // El resultado con los id de cada talla
    const arrSize = []
    console.log('check-size')
    try {
        if(!req.hasSizes){
            arrSize.push({...element, id: uuid.v4()})
        }else {
            for (const element of body) {
                const { stock, size } = element
                // Obtenemos el id de cada talla y 
                const  existingSize = await ProductSize.findOne({ where: { name: size }})
                if(existingSize ) {
                    arrSize.push({ stock, size: existingSize.id, id: uuid.v4()})
                } else {
                    const newSize = await ProductSize.create({id: uuid.v4(), name: size})
                    arrSize.push({stock, size: newSize.id, id: uuid.v4()})
                }
            }
        }
        req.newBody = arrSize
        next()
    } catch (error) {
        return res.status(400).json({message: error.message || 'Error al crear stock'})
    }
}

module.exports = {
    checkSize,
    errorHandlerStock,
    error
}