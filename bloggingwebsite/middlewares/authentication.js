

const {getUser} = require('../services/auth')
// blackList for logout 

function checkForAuthentication(req,res,next){
    const cookieToken = req.cookies?.token;
    req.user = null;
    if(!cookieToken){
        return  res.redirect('/login');
    }
    req.user = getUser(cookieToken);
    if(!req.user) return res.redirect('/login')
    next();
}
function checkLoggedInStatus(req,res,next){
    const result = req.cookies.token ? true:false;
    
   
    req.isLoggedIn = result;
    next();
}


module.exports = {
    checkForAuthentication,
    checkLoggedInStatus,
}