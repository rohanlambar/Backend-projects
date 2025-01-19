const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },  
    password:{
        type:String,
        required:true,
    }
})

const model = mongoose.model("userData",userSchema);
module.exports = model;