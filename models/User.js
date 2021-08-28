const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    age: {type: Number}
})

const UserDB = mongoose.model('User', UserSchema)

module.exports = UserDB