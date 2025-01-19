const mongoose = require('mongoose');

 function connectToMongoDb(url){
      return  mongoose.connect(url)
                      .then(()=>console.log("Connected to database"));
                      
                      
}
module.exports = {connectToMongoDb}