const Role = require("../models/roles.model");

const roleAdminMiddleware = (req, res, next) => {
  console.log('ROLE-ADMIN',req.body)
    Role.findOne({
        where: {
            name: "admin"
        }
    })
      .then((response) => {
        const rol = req.user.rol

        if (rol === response.id) {
          next()
        } else {
          res.status(401).json({
              status: "error",
              message: "User not authorized to make this request",
            })
        }
      })
      .catch(() =>
        res.status(401).json({
            status: "error",
            message: "User not authorized to make this request"
          })
      )
}

const roleHostMiddleware = (req, res, next) => {
    Role.findOne({
        where: {
            name: "host"
        }
    })
    .then((response) => {
      const rol = req.user.rol

      if (rol === response.id) {
        next()
      } else {
        res.status(401).json({
            status: "error",
            message: "User not authorized to make this request"
          })
      }
    })
    .catch(() =>
      res.status(401).json({
          status: "error",
          message: "User not authorized to make this request"
        })
    )
}

module.exports = {
    roleAdminMiddleware,
    roleHostMiddleware
}