let mongoose = require('mongoose')

let User = mongoose.model('User',{
    name : {type :String, required: true} , 
    email : {type :String, required: true},
    password : {type :String, required: true},
    token : [{type :String}]
})


module.exports = User
