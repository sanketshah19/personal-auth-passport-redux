// Strategy is used to authenticate requests. Strategies range from verifying a username and password
const JwtStrategy = require("passport-jwt").Strategy
const ExtractJwt = require("passport-jwt").ExtractJwt
const mongoose = require("mongoose")
const User = mongoose.model("users")
const keys = require("./keys")

// opts is an object literal containing options to control how the token is extracted from the request or verified.
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = keys.secretOrKey

module.exports = passport => {
    // Strategies, and their configuration, are supplied via the use() function.
    passport.use(
        // jwt_payload will be sent via our login endpoint 
        new JwtStrategy(opts, (jwt_payload, done) => {
            User.findById(jwt_payload.id)
              .then(user => {
                if (user) {
                    // When Passport authenticates a request, it parses the credentials contained in the request. It then invokes the verify callback with those credentials as arguments, in this case username and password. If the credentials are valid, the verify callback invokes done to supply Passport with the user that authenticated.
                    return done(null, user);
                }
                return done(null, false);
              })
              .catch(err => console.log(err));
          })
    )
}