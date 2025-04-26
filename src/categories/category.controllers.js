const uuid = require('uuid');

const Categories = require('../models/categories.model');
const Products = require('../models/products.model');
const ProductsImage = require('../models/productsImage.model');
const Stock = require('../models/ProductStock.model');
const Brand = require('../models/brand.model');
const ProductSize = require('../models/productSize.model');
const SubCategories = require('../models/subCategories');
const { db } = require('../utils/database');
const { Op, where } = require('sequelize');
const Status = require('../models/status.model');

const getAllCategory = async (baseUrl, query) => {
  const { limit, sort, status, search } = query;
  const page = parseInt(query.page) || 1;
  const lim = parseInt(limit) || 2;
  const off = page * lim - lim || 0;
  console.log(page, lim, off)
  try {
    const model = {
      offset: off,
      limit: lim,
      order: [['createdAt', 'ASC']],
      attributes: {
        exclude: ['updatedAt', 'statusId'],
        include: [
          [
            db.literal(
              '(SELECT COUNT(products.id) FROM products WHERE products.category_id = categories.id)'
            ),
            'count_products',
          ],
        ],
      },
      include: [
        {
          model: SubCategories,
          attributes: ['id', 'name'],
        },
        {
          model: Status,
          attributes: ['name'],
          where: { name: 'active' },
        },
      ],
    };
    const modelCount = {
      include: {
        model: Status,
        where: { name: 'active' },
      },
    };

    if (sort) {
      const sortBy = sort.split(':', 2);
      const col =
        sortBy[0].toLowerCase() === 'createdat'
          ? 'createdAt'
          : sortBy[0].toLowerCase();
      model.order = [[db.col(col), sortBy[1].toUpperCase()]];
    }
    if (search) {
      model.where = { name: { [Op.iLike]: `%${search}%` } };
      modelCount.where = { name: { [Op.iLike]: `%${search}%` } };
    }
    const pathAdmin = baseUrl.includes('/admin');
    if (pathAdmin) {
      model.include[1].where = status && { name: status };
      modelCount.include.where = status && { name: status };
    }
    const data = await Categories.findAll(model);
    if (!data.length) {
      throw new Error('No existen datos');
    }
    const totalCount = await Categories.count(modelCount);
    const objQuery = {
      ...(sort && { sort }),
      ...(search && { search }),
      ...(pathAdmin && status && { status }),
      ...(limit && { limit: lim }),
    };
    const newQuery = Object.keys(objQuery).length
      ? new URLSearchParams(objQuery).toString().replaceAll('%3A', ':') + '&'
      : '';
    const nextPage = (off + lim) < totalCount
      ? `${baseUrl}${newQuery}page=${page + 1}`
      : null;
    const prevPage = off > 0
      ? `${baseUrl}${newQuery}page=${Math.max(page - 1, 1)}`
      : null;
    const totalPages = Math.ceil(totalCount / lim);
    console.log(page , limit, totalCount)
    const to = Math.min(page * lim, totalCount) 
    return {
      all_items: totalCount,
      items: data.length,
      categories: data,
      pagination: {
        from: off + 1,
        to,
        total_count: totalCount,
        total_pages: totalPages,
        current_page: page,
        next_page: nextPage,
        prev_page: prevPage,
      },
      content_range: `${off} - ${lim} / ${totalCount}`,
    };
  } catch (error) {
    throw error.message || 'Error al traer los datos';
  }
};
const getCategoryByName = async (name) => {
  try {
    const data = await Categories.findOne({
      where: { name },
    });
    if(!data){
      throw new Error('No existe registro con ese nombre')
    }
    return data;
  } catch (error) {
    throw error.message || 'Error al traer los datos';
  }
};
//SIN USO
const getCategoryById = async (name) => {
  try {
    const data = await Categories.findOne({
      where: {
        name: {
          [Op.iLike]: name,
        },
      },
      include: [
        {
          model: Products,
          attributes: {
            exclude: [
              'createdAt',
              'updatedAt',
              'categoryId',
              'brandId',
              'subCategoryId',
            ],
          },
          include: [
            {
              model: ProductsImage,
              attributes: ['url'],
            },
            {
              model: Categories,
              attributes: ['name'],
            },
            {
              model: SubCategories,
              attributes: ['name'],
            },
            {
              model: Brand,
              attributes: ['name'],
            },
            {
              model: Stock,
              attributes: ['id', 'stock'],
              include: {
                model: ProductSize,
                attributes: ['name'],
              },
            },
          ],
        },
        {
          model: SubCategories,
          attributes: ['id', 'name'],
        },
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });
    if(!data){
      throw new Error('No existe registro con ese id')
    }
    data.products.map((e) => {
      e.dataValues.products_imgs.sort((a, b) => {
        const numberA = a.url.substring(a.url.length - 5, a.url.length - 4);
        const numberB = b.url.substring(b.url.length - 5, b.url.length - 4);
        return numberA - numberB;
      });
    });
    const dataJson = addUnique(data.toJSON());
    return dataJson;
  } catch (error) {
    throw error.message || 'Error al traer los datos'
  }
};

const editCategoryStatus = async (id, status) => {

  const transaction = await db.transaction()
  try {
    const getStatus = await Status.findOne({ where : { name: status } })
    const category = await Categories.update(
      { statusId: getStatus.id },
      { where: { id }, transaction }
    )
    const p = await Products.update(
      { statusId: getStatus.id },
      { where : { categoryId: id }, transaction }
    )
    await transaction.commit()
    return category
  } catch (error) {
    await transaction.rollback()
    throw error.message || 'Error al editar el status'
  }
}

const editCategory = async (id, name) => {
  try {
    await Categories.update(
      { name },
      { where: { id } }
    );
    return { id };
  } catch (error) {
    throw  error.message || 'Error al editar la categoria';
  }
};

const removeCategory = async (id) => {
  try {
    const remove = await Categories.destroy({
      where: { id }
    })
    console.log({remove})
    if(remove !== 1){
      throw new Error(`No existe el stock con el id : ${id}`)
  }
  } catch (error) {
    throw error.message || 'Error al eliminar la categoría'
  }
} 

const createdCategory = async (name) => {
  try {
    const newCategory = await Categories.create({
      id: uuid.v4(),
      name,
    });
    return newCategory;
  } catch (error) {
    throw error.message || 'Error al crear la categoria'
  }
};

const getAllSubCategory = async () => {
  const data = await SubCategories.findAll({
    attributes: {
      exclude: ['updatedAt', 'categoryId'],
    },
    include: {
      model: Categories,
      attributes: ['id', 'name'],
    },
  });
  return data;
};

const getSubCategoryByName = async (name) => {
  const data = await SubCategories.findOne({
    where: {
      name,
    },
    attributes: ['id', 'name'],
    include: [
      {
        model: Products,
        attributes: {
          exclude: [
            'createdAt',
            'updatedAt',
            'categoryId',
            'brandId',
            'subCategoryId',
          ],
        },
        include: [
          {
            model: ProductsImage,
            attributes: ['url'],
          },
          {
            model: Categories,
            attributes: ['name'],
          },
          {
            model: SubCategories,
            attributes: ['name'],
          },
          {
            model: Brand,
            attributes: ['name'],
          },
          {
            model: Stock,
            attributes: ['id', 'stock'],
            include: {
              model: ProductSize,
              attributes: ['name'],
            },
          },
        ],
      },
    ],
  });

  const dataJson = addUnique(data.toJSON());

  return dataJson;
};

const addUnique = (dataJson) => {
  const uniqueSubCategory = [
    ...new Set(dataJson.products.map((e) => e.sub_category.name)),
  ];
  dataJson.all_sub_categories = uniqueSubCategory;
  const uniqueBrand = [...new Set(dataJson.products.map((e) => e.brand.name))];
  dataJson.all_brands = uniqueBrand;
  /*
    const sizes = dataJson.products[0].product_stocks[0].product_size
    if(sizes){*/
  const uniqueName = {};
  const numbers = [];
  const letters = [];
  const json = dataJson.products;
  for (const e in json) {
    json[e].product_stocks.map((a) => {
      const size = a.product_size ? a.product_size.name : null;
      if (!uniqueName[size] && size) {
        if (size.search(/[0-9]/) !== -1) {
          numbers.push(size);
        } else {
          letters.push(size);
        }
        uniqueName[size] = true;
      }
    });
  }
  console.log(Object.keys(uniqueName));
  if (Object.keys(uniqueName).length) {
    numbers.sort((a, b) => a - b);
    letters.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
    const filterUnique = [...numbers, ...letters];
    dataJson.all_sizes = filterUnique;
  } else {
    dataJson.all_sizes = null;
  }
  /*} else {
        dataJson.all_sizes = null
    }*/
  console.log(dataJson.all_sizes);
  return dataJson;
};

module.exports = {
  getAllCategory,
  getCategoryByName,
  getCategoryById,
  editCategory,
  editCategoryStatus,
  removeCategory,
  createdCategory,
  getAllSubCategory,
  getSubCategoryByName,
  addUnique,
};
