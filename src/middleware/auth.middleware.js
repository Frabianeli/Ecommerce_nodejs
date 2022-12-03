const { getUserById } = require('../users/user.controllers')

const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt

module.exports = (passport) => {
    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'), //Authorization JWT
        secretOrKey: 'academlo' //  Palabra secereta, debe estar en una variable de entorno
    };
    passport.use(
        new JwtStrategy(opts, async (decoded, done) => {
            try {
                const response = await getUserById(decoded.id)
                console.log(decoded)
                if(!response){
                    return done(null, false)
                } else {
                    return done(null, decoded)
                }
            } catch (error) {
                done(error.message)
            }
        })
    )
}