const express = require('express')
const session = require('express-session')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const passport = require('passport')
// const passportLocal = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const User = require('./user')

dotenv.config()

const app = express()



//MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error', console.error.bind('Connection error'))
db.once('open', () => console.log('Connection Successful to MongoDB'))

//MiddleWare
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors({
    origin: 'http://localhost:3000',  //<- Location of frontEnd
    credentials: true
}))

app.use(session({
    secret: "xyzcode",
    resave: true,
    saveUninitialized: true
}))

app.use(cookieParser('xyzcode'));

app.use(passport.initialize())
app.use(passport.session())
require('./passportConfig')(passport) //STEP-7

//Routes
app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, u, info) => {
        if (err) throw err
        if (!u) res.send('No user Found!!')
        else {
            req.logIn(u, (err) => {
                if (err) throw err
                res.send('Successfully authenticated')
                console.log(req.user)
            })
        }
    })(req, res, next)
})

app.post('/register', (req, res) => {
    User.findOne({ username: req.body.username }, async (err, doc) => {
        if (err) throw err
        if (doc) res.send('User exists')
        if (!doc) {
            const hashedPassword = await bcrypt.hash(req.body.password, 5)//STEP-5
            const newUser = new User({
                username: req.body.username,
                password: hashedPassword //STEP-5
            })
            
            //-------If opted Approach 5
            //const { username, password } = req.body;
            //const user = new User({ username });
            //const newUser = await User.register(user, password);
            //---------
            
            await newUser.save()
            res.send('user created')
        }
    })
})

app.get('/user', (req, res) => {
    res.send(req.user)
})

app.get('/logout', (req, res) => {
    req.logOut()
    res.send("Successful")
})


//Start Port
const port = process.env.PORT || 4000
app.listen(port, () => console.log("Serving at PortNo.4000"))
