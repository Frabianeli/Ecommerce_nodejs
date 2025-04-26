const jwt = require('jsonwebtoken');

const authControllers = require('./auth.controllers');

const login = (req, res) => {
  const { email, password } = req.body;
  authControllers.loginUser(email, password)
    .then((response) => {
      return res.status(200).json({
          message: 'Tus credenciales son correctas',
          ...response
        });
    })
    .catch((err) => {
      res.status(401).json({ message: err });
    });
};

const register = (req, res) => {
  const body = req.body;
  authControllers.registerUser(body)
    .then((response) => {
      return res.status(201).json({
        message: `User created succesfully with id : ${response.id}`,
        user: response,
      })
    })
    .catch((err) => {
      return res.status(400).json({err: err});
    });
};

module.exports = {
  login,
  register,
};
