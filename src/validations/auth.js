const { body, validationResult, checkSchema } = require('express-validator');
const { getUserByEmail } = require('../auth/auth.controllers');

const validateResult = (req, res, next) => {
  const errors = validationResult(req);
  console.log(req.body.email)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Error en la validacion de campos',
      error: errors.array(),
    });
  }
  next();
}

const emailChain = () => {
  return body('email')
    .exists()
    .withMessage('El campo email debe estar presente')
    .bail()
    .isString()
    .withMessage('Porfavor envie un string')
    .bail()
    .trim()
    //REGULAR NORMALIZE
    .normalizeEmail({ gmail_remove_dots: false })
    .isEmail({
      domain_specific_validation: true, // Habilita validaciones específicas para dominios comunes como Gmail
    })
    .withMessage('Porfavor envie un email')
    .bail({level: 'request'});
};

const passwordChain = () => {
  return body('password')
    .exists()
    .withMessage('El campo password debe estar presente')
    .bail()
    .isString()
    .withMessage('Porfavor envie un string')
    .bail()
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage('Porfavor ponga una contraseña que tenga minimo 4 caracteres y maximo 20')
};

const validateRegister = [
 body('name')
    .exists()
    .withMessage('El campo name debe estar presente')
    .bail()
    .isString()
    .withMessage('El campo debe ser un string')
    .matches(/^[a-zA-Za-záéíóúÁÉÍÓÚñÑ\s]+$/)
    .withMessage('El campo solo permite letras, números, espacios y caracteres acentuados'),
  emailChain()
    .custom(async (email) => {
      const emailExist = await getUserByEmail(email);
      if (emailExist) {
        throw new Error('El email ya existe');
      }
      return true;
    }),
  passwordChain(),
  validateResult
];

const validateLogin = [
  emailChain()
    .custom(async (value) => {
    const emailExist = await getUserByEmail(value);
    if (!emailExist) {
      throw new Error('El email no existe');
    }
    return true;
    }),
  passwordChain(),
  validateResult
];

const schema = checkSchema({
  email: {
    notEmpty: { errorMessage: 'NO SE ADMINTEN NULOS', bail: true },
    isEmail: { errorMessage: 'INGRESE UN EMAIL VALIDO', bail: true },
    custom: {
      options: async (value) => {
        const emailExist = await getUserByEmail(value);
        if (!emailExist) {
          throw new Error('El email no existe');
        }
        return true;
      },
      bail: true,
    },
  },
  password: { trim: true, notEmpty: { errorMessage: 'No se acpean nulos' } },
});

module.exports = {
  validateRegister,
  validateLogin,
  schema,
};
