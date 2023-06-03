const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const User = require("./user");

dotenv.config();

const app = express();

//STEPS:-
//(1)Set up backend require essentials and create basic routes
//(2)Go to front end useState, axios and make sure we are able to communicate to backend and viceversa
//(3)Now after step2 is done connect Mongodb(setup n connect) now make sure we are able to post data in DB with same register route
//axios
//(4)Now we can see we can store data in DB(username and password ) but password is not hashed.Not idle to store password like that
//-------------------AUTH STARTS----------------
//(5)we bcrypt(hash) the password(AT this point we can create as many user as we want without trouble)
//(6)WE create passportConfig folder with all the login inside it(Local strategy inside it)
//(7)we bring passportConfig in server.js and use it
//(8)Finally go to /login and do  the needful :)

//MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then((res) => console.log("Connection Successful to MongoDB"))
  .catch((err) => console.log("Connection error"));

//MiddleWare
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:3000", //<- Location of frontEnd
    credentials: true,
  })
);

app.use(
  session({
    secret: "xyzcode",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(cookieParser("xyzcode"));

app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

//Routes
app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, u, info) => {
    if (err) throw err;
    if (!u) res.send("No user Found!!");
    else {
      req.logIn(u, (err) => {
        if (err) throw err;
        res.send("Successfully authenticated");
        console.log(req.user);
      });
    }
  })(req, res, next);
});

app.post("/register", (req, res) => {
  User.findOne({ username: req.body.username }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send("User exists");
    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 5);
      const newUser = new User({
        username: req.body.username,
        password: hashedPassword,
      });
      await newUser.save();
      res.send("user created");
    }
  });
});

app.get("/user", (req, res) => {
  res.send(req.user);
});

app.post("/logout", function (req, res) {
  req.logout(function (err) {
    if (err) {
      console.log(err);
    }
    res.send("Successful");
  });
  // Uncomment this if logout is not working
  req.session.destroy(function (err) {
    if (err) {
      throw err;
    }
    // The response should indicate that the user is no longer authenticated.
    return res.send({ authenticated: req.isAuthenticated() });
  });
});

//Start Port
const port = process.env.PORT || 4000;
app.listen(port, () => console.log("Serving at PortNo.4000"));
