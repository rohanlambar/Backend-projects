
const express = require('express')
const {handleUserLogin,handleUserSignUp, handleUserLogout,handleUserProfile} = require('../controllers/user')
const {checkForAuthentication,checkLoggedInStatus} = require('../middlewares/authentication')
const router = express.Router();

router.post('/login',handleUserLogin);
router.post('/signup',handleUserSignUp);
router.get('/logout',handleUserLogout);
router.get('/profile',checkForAuthentication,checkLoggedInStatus,handleUserProfile);
module.exports = router;
