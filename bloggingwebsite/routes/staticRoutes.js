
const express = require('express');
const {checkLoggedInStatus} = require('../middlewares/authentication')
const router = express.Router();


router.get('/signup',(req,res)=>{
    res.render('signup')
})
router.get('/home',checkLoggedInStatus,(req,res)=>{
 
    res.render('home',{loggedIn : req.isLoggedIn})
})
router.get('/login',(req,res)=>{
    res.render('login')
})
module.exports = router;
