const router = require('express').Router()
const passport = require('passport')
require('../middleware/auth.middleware')(passport)

const categoryServices = require('./category.http')
const { roleAdminMiddleware } = require('../middleware/role.middleware')

const { validateGet, validateBody, validateName, validateId } = require('../validations/categories')

router.route('/')
    .get(validateGet, categoryServices.getAll)
    .post(validateBody, categoryServices.created)
    
router.route('/:id')
    .put(validateId, categoryServices.edit)
    .delete(validateId, categoryServices.remove)

router.put('/status/:id', categoryServices.editStatus)


router.get('/admin', categoryServices.getAll)

router.route('/subcategories')
    .get(categoryServices.getAllSubCategory)

//ESTA RUTA PODEMOS ELIMINARLA YA QUE EN LA RAIZ TENEMOS UN SEARCH CON PAG
router.route('/:name')
    .get(validateName, categoryServices.getByName)

router.get('/subcategories/:name', validateName, categoryServices.getByNameSubCategory)
exports.router = router