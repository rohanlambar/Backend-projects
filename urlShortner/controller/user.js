
const User = require('../model/user');
const url = require('../model/url')
const {v4: uuidv4} = require('uuid')
const {setUser} = require('../service/auth')
async function handleUserSignUp(req,res){
    const {username,email,password} = req.body;
    await User.create({
        username,
        email,
        password
    });
    // const allurls = await url.find({});
    return res.redirect('/test');
}
async function handleUserLogin(req,res){
    const {username,password} = req.body;
    const result = await User.findOne({
        username,
        password
    });
    if(!result) return res.render('login',{error:"Not able to login "});

    // const sessionId = uuidv4();
    // setUser(sessionId,result);
    // res.cookie("uid",sessionId);
    const token = setUser(result);
    res.cookie("token",token);
    const allurls = await url.find({});
    return res.redirect('/test');
}

module.exports = {
    handleUserSignUp,
    handleUserLogin,
}