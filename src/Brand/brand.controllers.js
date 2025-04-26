const { db } = require('../utils/database')
const Brand = require('../models/brand.model')
const Products = require('../models/products.model')
const uuid = require('uuid')
const { QueryTypes, Op, where } = require('sequelize')
const Status = require('../models/status.model')

const pagination = (totalCount, offset, limit, baseUrl) => {
    const totalPages = Math.ceil(totalCount / limit)
    const currentPage = Math.floor(offset / limit +1)

    const nextPage = (offset + limit) < totalCount ? `${baseUrl}?offset=${offset + limit}&limit=${limit}` : null
    const prevPage = offset > 0 ?  `${baseUrl}?offset=${Math.max(offset - limit,0)}&limit=${limit}` : null

    return {
        total_count: totalCount,
        total_pages: totalPages,
        current_page: currentPage,
        next_page: nextPage,
        prev_page: prevPage,
    }
}

const getAllBrand = async(baseUrl, query, isAdmin) => {

    const { offset, limit, sort, status, search } = query 
    const off = parseInt(offset) || 0
    const lim = parseInt(limit) || 10

    try {
        const model = {
            offset: off,
            limit: lim,
            order: [['createdAt', 'ASC']],
            attributes: [
                'id',
                'name',
                [db.literal('(SELECT COUNT(products.id) FROM products WHERE products.brand_id = brand.id)'), 'count_products']
            ],
            include: {
                model: Status,
                attributes: ['name'],
            }
        }

        const modelCount = {
            include: {
                model: Status,
            }
        }
        
        if(sort){
            const [ col, dir ] = sort.split(':', 2)
            const newCol = col.toLowerCase() === 'createdat' ? 'createdAt' : col.toLowerCase()
            model.order =  [[newCol, dir.toUpperCase()]]
        }
        if(search){
            model.where = { name: { [Op.iLike]: `%${search}%` } }
            modelCount.where = { name: { [Op.iLike]: `%${search}%` } }
        }
        const pathAdmin = baseUrl.includes('/admin')
        if (pathAdmin) {
            if(status){
                model.include.where = { name: status }
                modelCount.include.where = { name: status }
            }
        } else{
            model.include.where = { name: 'active' }
            modelCount.include.where = { name: 'active' }
        }
        const brand = await Brand.findAll(model)
        const totalCount = await Brand.count(modelCount)
        if(!totalCount || !brand.length){
            throw new Error('No se encontraron marcas')
        }
        const objQuery = {
            ...(sort && {sort}),
            ...(search && {search}),
            ...(pathAdmin && status && {status}),
        }
        const newQuery = Object.keys(objQuery).length ?
        new URLSearchParams(objQuery).toString().replaceAll('%3A',':') + '&'
        :
        '';
        const totalPages = Math.ceil(totalCount / lim)
        const nextPage = (off + lim < totalCount) ? `${baseUrl}${newQuery}offset=${off + lim}&limit=${lim}` : null;
        const prevPage = (off > 0) ? `${baseUrl}${newQuery}offset=${Math.max(off - lim, 0)}&limit=${lim}` : null;
        const currentPage = Math.floor((off / lim) + 1)  
        
        return {
            all_items: totalCount,
            items: brand.length,
            brands: brand,
            pagination: {
                total_count: totalCount,
                total_pages: totalPages,
                current_page: currentPage,
                next_page: nextPage,
                prev_page: prevPage,
            }
        }
    } catch (error) {
        throw error.message || 'Error al encontrar el producto'
    }   
}

const getBrandByName = async(name) => {
    try {
        const data = await Brand.findOne({
            where: {
                name
            },
            attributes: {
                include: [[db.literal('(SELECT COUNT(*) FROM products WHERE products.brand_id = brand.id)'),'count_products']]
            },
        })
        if(!data){
            throw new Error('La marca no existe')
        }
        return data
    } catch (error) {
        console.log('CATCHC', error)
        throw error.message || 'Error al encontrar la marca'
    }
}

const editBrand = async(body) => {
    const { name, id } = body
    try {
        const [ edit ] = await Brand.update(
            { name: name},
            { where: { id: id } },
        )
        console.log(edit)
        if(edit === 0){
            throw new Error(`No existe la marca con el id: ${id}`)
        }
        return id
    } catch (error) {
        console.log(error)
        throw error.message || 'Error al editar la marca'
    }
}

const createBrand = async(data) => {
    try {
        const status = await Status.findOne({ where: { name: 'active' } })
        const createBrand = await Brand.create({
            id: uuid.v4(),
            name: data.name,
            statusId: status.id
        })
        return createBrand
    } catch (error) {
        throw error.message || 'Error al crear la marca'
    }
}

module.exports = {
    getAllBrand,
    getBrandByName,
    editBrand,
    createBrand
}