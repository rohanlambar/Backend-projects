// acquiring mongoose 
const mongoose = require('mongoose');

// connection mongoose to provided url
async function connectionDb(url){
    return await mongoose.connect(url)
                   .then(()=>console.log(`\nCONNECTED TO MONGODB RUNNING ON ${url}`))
                   .catch((err)=>console.error("ERROR WHILE CONNECTING TO MONGODB ",err))
}


// exporting the module 
module.exports = {
    connectionDb,
}