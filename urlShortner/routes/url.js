const express = require('express')
const {handleCreateShortUrl, handleRedirectUrl,handleGetAllUser} = require('../controller/url')
const router = express.Router();

router.post('/',handleCreateShortUrl)
router.get('/',handleRedirectUrl)
router.get('/data',handleGetAllUser)
module.exports = router;