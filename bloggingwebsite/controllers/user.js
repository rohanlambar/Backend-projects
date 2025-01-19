
const userData = require('../model/userData')
// const {v4:uuidv4}  = require('uuid');
const {setUser} = require('../services/auth')
async function handleUserLogin(req,res){
    const {username,password} = req.body;
 
    const result = await userData.findOne({username,password});
    if(!result) res.redirect('/login');
    const token = setUser(result);
    res.cookie('token',token);
    if(result) return res.redirect('/user/profile')
    return res.redirect('/signup')
}
async function handleUserSignUp(req,res){
  const {username,email,password} = req.body;
  await userData.create({
    username,
    email,
    password,
  })
  
  console.log("successfully entered on data base")
  res.redirect('/login')
}

function handleUserLogout(req,res){
  res.cookie('token','',{maxAge : 1});
  res.redirect('/home');
}

function handleUserProfile(req,res){
  res.render('profile',{loggedIn : req.isLoggedIn});
}
module.exports = {
    handleUserLogin,
    handleUserSignUp,
    handleUserLogout,
    handleUserProfile,
}