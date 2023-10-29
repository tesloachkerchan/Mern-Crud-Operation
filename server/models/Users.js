const mongoose = require('mongoose')

//create model
const UserSchema = mongoose.Schema({
    name: String,
    email: String,
    age: Number
})
const UserModel = mongoose.model("users", UserSchema)
module.exports = UserModel;