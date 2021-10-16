const mongoose = require('mongoose')

const registration = mongoose.Schema({
    username: {type: String, required: true}, 
    email: {type: String, required: true, unique: true}, 
    password: {type: String, required: true}, 
}, { timeStamps : true })

registration.method("toJSON", function(){
    const { _v, _id, ...object } = this.toObject();
    object.id = _id
    return object
})

module.exports =  mongoose.model('registration', registration)