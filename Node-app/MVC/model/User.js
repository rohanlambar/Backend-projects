
const  mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    first_name :{
        type:String,
        required: true,
    },
    last_name:{
        type:String,
        required:true,
    },
  },
  {timestamps: true}
) ;

const User = mongoose.model("client",userSchema)  ;
module.exports = User;