
const mongoose = require('mongoose');
 

// establishing connection with mongodb

async function connectionDb(url){
    return mongoose.connect(url)
                   .then(()=>console.log(`CONNECTION ESTABLISHED WITH MONGODB RUNNING ON ${url} `))
                   .catch(err => console.error(err));
 }

module.exports ={ connectionDb};