// const express = require('express');
// const router = express.Router();
// const {handleUserSignUp}  = require('../controller/user');
// const Urls = require('../model/url');
// router.get('/test',async (req,res)=>{
//     if(!req.user) res.redirect('/login');
//     const allUrls = await Urls.find({created_by : req.user._id});
//     res.render('home',{Urls:allUrls});
// })
// router.get('/signup',(req,res)=>{
//     res.render('signup');
// });
// router.get('/login',(req,res)=>{
//     res.render('login');
// });
// module.exports = router;

const express = require('express');
const router = express.Router();
const Urls = require('../model/url');
const {restrictTo} = require("../middleware/Authentication")

router.get('/admin/urls',restrictTo(["ADMIN"]), async (req,res) =>{
    try {
        const allUrls = await Urls.find({});
        res.render('home', { Urls: allUrls });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
})
router.get('/test',restrictTo(["NORMAL","ADMIN"]),async (req, res) => {

    try {
        const allUrls = await Urls.find({ created_by: req.user._id });
        res.render('home', { Urls: allUrls });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.get('/login', (req, res) => {
    res.render('login');
});

module.exports = router;
