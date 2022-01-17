const User = require('./user')
const bcrypt = require('bcryptjs')
const locaalStrategy = require('passport-local')

module.exports = function (passport) {
    passport.use(
        new locaalStrategy((username, password, done) => {
            User.findOne({ username: username }, (err, user) => {
                if (err) throw err
                if (!user) return done(null, false)
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) throw err
                    if (result === true) {
                        return done(null, user)
                    } else {
                        return done(null, false)
                    }
                })
            })
        })
    )
    passport.serializeUser((user, cb) => {
        cb(null, user.id)
    })
    passport.deserializeUser((id, cb) => {
        User.findOne({ _id: id }, (err, user) => {
            // cb(err, user) Restriction the info have control on what we can  send
            const userInfo = {
                username: user.username
            }
            cb(err, userInfo)
        })
    })
}