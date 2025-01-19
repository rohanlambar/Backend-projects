

// session based authentication 
// const sessionIdToUser  = new Map();
// function setUser(user,id){
//     return sessionIdToUser.set(id,user);
// }
// function getUser(id){
//       return sessionIdToUser.get(id);
// }



// jwt based authentication 
const jwt = require('jsonwebtoken');
const secret = "rohan@025";

function setUser(user){
    const payload = {
        _id : user._id,
        username:user.username,
        email:user.email,
    }
    return jwt.sign(payload,secret);
}

function getUser(token){
    if(!token) return null;
   
    try{
         return jwt.verify(token,secret);


    }
    catch(err){
        
        return null;
    }
}

module.exports = {
    getUser,
    setUser,
}