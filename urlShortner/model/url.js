// acquiring mongoose
const mongoose = require('mongoose')

// creating Schema for url data 
const urlSchema = new mongoose.Schema({
       URL :{
        type:String,
        required:true,
       },
       shortedURL:{
        type:String,
        required:true,
    },
    noOFClick :{
        type:Number,
        required:true,
    },
    created_by:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"users",
        
    }
});

// creating model for url data 
const url = mongoose.model("URLs",urlSchema);

// exporting url model 
module.exports = url;