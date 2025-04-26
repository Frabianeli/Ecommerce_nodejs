const Brand = require('../models/brand.model');
const Categories = require('../models/categories.model');
const ProductSize = require('../models/productSize.model');
const ProductsImage = require('../models/productsImage.model');
const SubCategories = require('../models/subCategories');
const ProductStock = require('../models/ProductStock.model');
const { Op, Sequelize, QueryTypes, where } = require('sequelize');
const Products = require('../models/products.model');
const { db } = require('../utils/database');
const Gender = require('../models/gender.model');
const Status = require('../models/status.model');

const productQuery = async (req, res, next) => {
  console.log('ARRIBA QUERY');
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = page * limit - limit || 0;

  const model = {
    offset,
    limit,
    attributes: {
      exclude: [
        'updatedAt',
        'categoryId',
        'brandId',
        'subCategoryId',
        'genderId',
        'statusId',
      ],
    },
    order: [
      ['createdAt', 'ASC'],
      [ProductStock, ProductSize, 'name', 'ASC'],
    ],
    include: [
      {
        model: ProductsImage,
        attributes: ['url'],
      },
      {
        model: Gender,
        attributes: ['name'],
      },
      {
        model: ProductStock,
        attributes: ['id', 'stock'],
        include: {
          model: ProductSize,
          attributes: ['id', 'name'],
        },
      },
      {
        model: SubCategories,
        attributes: ['name'],
        required: true,
      },
      {
        model: Brand,
        attributes: ['name'],
        required: true,
      },
      {
        model: Categories,
        as: 'category',
        attributes: ['name'],
        required: true,
      },
      {
        model: Status,
        attributes: ['name'],
        required: true,
      },
    ],
  };

  const {
    category,
    subcategory,
    brand,
    gender,
    search,
    price,
    size,
    sort,
    status,
  } = req.query;

  const pathAdmin = req.originalUrl.split('?', 1).toString().includes('/admin');
  const isAdmin = req.user?.role === 'admin'
  if (pathAdmin) {
    console.log('----SOY--ADMIN----');
    if (status) {
      model.include[6].where = { name: status };
    }
  } else {
    model.include[6].where = { name: 'active' };
  }
  if (category) {
    model.include[5].where = {
      name: String(category.toLowerCase()).split(','),
    };
    //where['category'] = category.split(',');
  }
  if (subcategory) {
    model.include[3].where = {
      name: String(subcategory.toLowerCase()).split(','),
    };
  }
  if (brand) {
    model.include[4].where = { name: String(brand.toLowerCase()).split(',') };
  }
  if (gender) {
    model.include[1].where = { name: String(gender.toLowerCase()).split(',') };
  }
  if (search) {
    const whereSearch = {
      [Op.or]: [
        {
          title: {
            [Op.iLike]: `%${search}%`,
          },
        },
        {
          '$brand.name$': {
            [Op.iLike]: `%${search}%`,
          },
        },
        {
          '$category.name$': {
            [Op.iLike]: `%${search}%`,
          },
        },
        {
          '$sub_category.name$': {
            [Op.iLike]: `%${search}%`,
          },
        },
      ],
    };
    model.where = { ...whereSearch };
  }
  if (price) {
    const arrPrice = price.split(',');
    const minMaxPrice = {
      [Op.gte]: Number(arrPrice[0]), // Precio mayor a
      [Op.lte]: Number(arrPrice[1]), // Precio menor a
    };
    model.where = { price: minMaxPrice };
  }
  if (sort) {
    const [col, dir] = sort.split(':', 2);
    const newCol = col.toLowerCase() === 'createdat' ? 'createdAt' : col.toLowerCase();
    model.order = [
      [newCol, dir.toUpperCase()],
      [ProductStock, ProductSize, 'name', 'ASC'],
    ];
  }
  if (size) {
    model.include[2].include.where = { name: size.split(',') };
  }
  req.model = model;
  console.log('ACABE---QUERY');
  next();
};

const productFiltered = async (req, res, next) => {
  const { category, subcategory, brand, gender, price, size, status, search } = req.query;
  const page =  parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 10;
  const offset = page * limit - limit || 0;
  try {
    /*
        //reibimos el modelo con posibles where en category y sub_category para realizar el filtered
        const modelFiltered = req.modelFiltered
        // Traemos los productos con su brand, category, sub_category, size para crear el filtered
        const data  = await Products.findAll(modelFiltered)
        console.log('filtered', data.length)
        const uniqueSize = {}
        const numbers = []
        const letters = []
        const products =  data.map(e => e.toJSON())
        //Si req.query.brand existe filtramos los productos de ese brand para obtener sus sizes
        const brandFilter = brand ? products.filter(e => brand.split(',').includes(e.brand.name)) : null
        //Agrupamos sizes por numbers y letters, no repetimos valores
        for(const e in brandFilter || products){
                products[e].product_stocks.map(a => {
                const size = a.product_size ? a.product_size.name : null
                if(!uniqueSize[size] && size){
                    if(size.search(/[0-9]/) !== -1){
                        numbers.push(size)
                    } else {
                        letters.push(size)
                    }
                    uniqueSize[size] = true
                }
                })
        }
        //filtros para el frontend
        //Contiene filter para que el frontend pueda usarlo facilmente
        const filtered = {
            categories: [...new Set(brandFilter ? brandFilter.map(e => e.category.name): products.map(e => e.category.name))],
            sub_categories: [...new Set(brandFilter ? brandFilter.map(e => e.sub_category.name): products.map(e => e.sub_category.name))],
            brands: [...new Set(brandFilter ? brandFilter.map(e => e.brand.name): products.map(e => e.brand.name))],
            price : {
                min: products[0].price,
                max: products[products.length -1].price
            }
        }
        //Ordenamos el sizes y lo mandamos al filtered
        if(Object.keys(uniqueSize).length){
            numbers.sort((a,b) => a - b)
            letters.sort((a,b)=> a < b ? -1 : a > b ? 1 : 0)
            const filterUnique = [...numbers, ...letters]
            filtered.sizes = filterUnique
        }else{
            filtered.sizes = null
        }
        
        let totalCount = brand ? brandFilter.length : products.length
        if(size){
            const filter = products.filter(e => e.product_stocks.some(x => size.includes(x.product_size.name)))
            console.log(filter.length, 'size')
            filtered.price = {
                min: filter[0].price,
                max: filter[filter.length -1].price
            }
            filtered.brands =  [...new Set(filter.map(e => e.brand.name))]
            totalCount = filter.filter(e => brand.split(',').includes(e.brand.name)).length
        }
        console.log({totalCount})
        req.filtered = filtered*/
    const where = {};
    console.log('AARRIBA---FILTERED');
    if (category) {
      where['category'] = category.split(',');
    }
    const pathAdmin = req.originalUrl.split('?', 1).toString().includes('/admin');
    const isAdmin = req.user?.role === 'admin'
    if (pathAdmin) {
      if (status) {
        where['status'] = [status];
      }
    } else {
      where['status'] = ['active'];
    }
    if (subcategory) {
      where['sub_category'] = subcategory.split(',');
    }
    if (brand) {
      where['brand'] = brand.split(',');
    }
    if (size) {
      where['size'] = size.split(',');
    }
    if (gender) {
      where['gender'] = gender.split(',');
    }
    // Where de search y price
    const whereSearchAndPrice = [];
    const paramsSearchAndPrice = {};
    if (search) {
      const whereSearch = `(p.title ILIKE :search )`;
      whereSearchAndPrice.push(whereSearch);
      paramsSearchAndPrice.search = `%${search}%`;
    }
    if (price) {
      const priceSplit = price.split(',', 2);
      const wherePrice = `p.price >= :minPrice AND p.price <= :maxPrice`;
      whereSearchAndPrice.push(wherePrice);
      paramsSearchAndPrice.minPrice = priceSplit[0];
      paramsSearchAndPrice.maxPrice = priceSplit[1];
    }
    // Where de la consulta, filtramos los where que sean distinto al parametro
    // De esta manera evitamos que se incluya el where del parametro y asi tener un filtrado generico
    const sqlWhere = (col) => {
      const keysWhere = Object.keys(where).filter((e) => e !== col);
      const arrWhere = keysWhere.length
        ? keysWhere.map((e) => `${e}.name IN (:${e})`)
        : [];
      const arrWhereTotal = [...arrWhere, ...whereSearchAndPrice];
      if (arrWhereTotal.length) {
        const result = arrWhereTotal.join(' AND ');
        return ` WHERE ${result}`;
      }
      return '';
    };
    // La consulta sql
    const sql = (col) => {
      return `
              SELECT DISTINCT ${col}.name AS name FROM products AS p
              LEFT JOIN categories AS category ON p.category_id = category.id
              LEFT JOIN genders AS gender ON p.gender_id = gender.id
              LEFT JOIN brands AS brand ON p.brand_id = brand.id
              LEFT JOIN sub_categories AS sub_category ON p.sub_category_id = sub_category.id
              INNER JOIN statuses AS status ON p.status_id = status.id
              LEFT JOIN product_stocks AS stock ON p.id = stock.product_id
              ${
                col === 'size' ? 'INNER JOIN' : 'LEFT JOIN'
              } product_sizes AS size ON stock.size_id = size.id
              ${sqlWhere(col)} ORDER BY ${col}.name
            `;
    };

    // Filtramos los parametros de la consulta para evitar tener errores con sequelize
    const queryParams = (name) => {
      const params = { ...where, ...paramsSearchAndPrice };
      const newParams = Object.fromEntries(
        Object.entries(params).filter(([key]) => key !== name)
      );
      return newParams;
    };

    const categories = await db.query(sql('category'), {
      type: QueryTypes.SELECT,
      replacements: queryParams('category'),
    });
    
    if (!categories.length) {
      return res.status(200).json({
        status: 'success',
        products: [],
        message: 'No existen productos con ese filtro',
      });
    }
    const sub_categories = await db.query(sql('sub_category'), {
      type: QueryTypes.SELECT,
      replacements: queryParams('sub_category'),
    });
    const genders = (
      await db.query(sql('gender'), {
        type: QueryTypes.SELECT,
        replacements: queryParams('gender'),
      })
    ).filter((e) => e.name !== null);
    //const whereBrand = {...(sub_categories.length && {'sub_category.name': sub_categories}), ...(size && {'size.name': size.split(',')})}
    //console.log({whereBrand})
    const brands = await db.query(sql('brand'), {
      type: QueryTypes.SELECT,
      replacements: queryParams('brand'),
    });
    //const whereSizes = Object.keys(where).length === 1 && size ? {} : {...(sub_categories.length && {'sub_category.name': sub_categories}), ...(brand && {'brand.name' : brand.split(',')}) }
    //console.log({whereSizes})
    const sizes = await db.query(sql('size'), {
      type: QueryTypes.SELECT,
      replacements: queryParams('size'),
    });
    //Obtenemos el precio minimo, precio maximo, y cuantos productos tenemos con ese filtro
    const [counterAndPrice] = await db.query(
      `SELECT MIN(price) AS min, MAX(price) AS max, COUNT( DISTINCT(p.id)) AS count FROM products AS p LEFT JOIN categories AS category ON
      p.category_id = category.id LEFT JOIN sub_categories AS sub_category ON p.sub_category_id = sub_category.id
      LEFT JOIN brands AS brand ON p.brand_id = brand.id LEFT JOIN genders AS gender ON p.gender_id = gender.id
      INNER JOIN statuses AS status ON p.status_id = status.id
      LEFT JOIN product_stocks AS stock ON p.id = stock.product_id LEFT JOIN product_sizes AS size ON stock.size_id = size.id
      ${sqlWhere()} `,
      { type: QueryTypes.SELECT, replacements: queryParams() }
    );
    const priceRange = { min: counterAndPrice.min, max: counterAndPrice.max };
    req.filtered = {
      categories: categories.map((e) => e.name),
      sub_categories: sub_categories.map((e) => e.name),
      brands: brands.map((e) => e.name),
      genders: genders.map((e) => e.name),
      sizes: sizes.map((e) => e.name),
      price: priceRange,
    };
    //pagination
    const totalCount = counterAndPrice.count;
    const baseUrl = `${req.protocol}://${req.get('host')}${req.originalUrl
      .split('?', 1)
      .join('')}?`;
    const objQuery = {
      ...(limit && { limit }),
      ...(category && { category }),
      ...(subcategory && { subcategory }),
      ...(brand && { brand }),
      ...(size && { size }),
      ...(price && { price }),
      ...(search && { search }),
      ...(gender && { gender }),
    };

    const newQuery = Object.keys(objQuery).length
      ? new URLSearchParams(objQuery).toString().replaceAll('%2C', ',') + '&'
      : '';

    const nextPage =
      //offset + limit < totalCount
      page * limit < totalCount
        ? `${baseUrl}${newQuery}page=${page + 1}`
        : null;

    const prevPage =
      //offset > 0
      page > 1
        ? `${baseUrl}${newQuery}page=${page - 1}`
        : null;
    const totalPages = Math.ceil(totalCount / limit);
    const pages = Array.from({ length: totalPages }, (e, i) => {
      return {
        [i + 1]: `${baseUrl}${newQuery}page=${i + 1}`,
      };
    });
    const to = Math.min(page * limit, totalCount) 
    const pagination = {
      total_count: totalCount,
      total_pages: totalPages,
      current_page: page,
      next_page: nextPage,
      prev_page: prevPage,
      from: offset + 1,
      to: to,
      pages,
    };
    req.pagination = pagination;
    console.log('ACABE---FILTERED');
    next();
  } catch (error) {
    console.log('ERROR EN EL FILTERD-CATCH', error);
    return res.status(400).json({
      status: 'Failed',
      message: 'No existen productos con ese filtro',
    });
  }
};

module.exports = {
  productQuery,
  productFiltered,
};
