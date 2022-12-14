const jwt = require('jsonwebtoken')

const authControllers = require('./auth.controllers')

const login = (req, res) => {
    const body = req.body
    if(!Object.keys(body).length) {
        res.status(400).json({message: 'Missing Data'})
    }
    else if(!body.email || !body.password){
        res.status(400).json({
            message: 'All fields must be completed',
            fields:{
                email : 'email',   
                password:  'string'
                }
        })
    } else {
        authControllers.loginUser(body.email, body.password)
            .then((response) => {
                if(response.email){
                    const token = jwt.sign({
                        id: response.id,
                        email: response.email,
                        rol: response.roleId
                    }, 'example')
                    if(response.roleId === '5ee551ed-7bf4-44b0-aeb5-daaa824b9473'){
                        return res.status(200).json({message: 'Tus credenciales son correctas', user: token, response})
                    }
                    console.log('despues de role.name')
                    return res.status(200).json({message: 'Tus credenciales son correctas', user: token})
                } else {
                    res.status(401).json({message: 'Invalid credentials'})
                }
            })
            .catch(err => {
                res.status(400).json(err)
            })
    }
}

const register = (req, res) => {
    const body = req.body
    if(!Object.keys(body).length) {
        res.status(400).json({message: 'Missing Data'})
    }
    else if(
            !body.name ||
            !body.email ||
            !body.password 
            ){
        res.status(400).json({
            message: 'All fields must be completed',
            fields:{
                name:  'string',
                email : 'email',   
                password:  'string',
                }
        })
    } else {
        authControllers.registerUser(body)
            .then(response => {
                if(response) {
                    res.status(201).json({
                        message: `User created succesfully with id : ${response.id}`,
                        user: response
                    })
                } else {
                    res.status(400).json({
                        message: 'Ese Email ya existe'
                    })
                }
            })
            .catch(err => {
                res.status(400).json(err)
            })
    }
}

module.exports = {
    login,
    register
}