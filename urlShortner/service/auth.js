
// const sessionIdToUser = new Map();
const jwt = require('jsonwebtoken');
const secret = "rohan@123";
// function setUser(sessionId,user){
//     return sessionIdToUser.set(sessionId,user);
// }
// function getUser(sessionId){
//    return  sessionIdToUser.get(sessionId);
// }

function setUser(user){
   const payload = {
    _id : user._id,
    username : user.username,
    roles : user.roles,
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
    setUser,
    getUser,
}