const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    username: String,
    password: String
})

module.exports = mongoose.model('User', userSchema)

//----------Approach B 

const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', userSchema);

//-------if choose this approach then npm i passport-local-mongoose must be installed in additional
