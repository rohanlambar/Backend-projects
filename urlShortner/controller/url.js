
// getting data from database
const User = require('../model/url')
// generating shortid
const shortid = require('shortid')

// function to handle creation of short url
async function handleCreateShortUrl(req,res){
    const redirectUrl = req.body.url;
    if(!redirectUrl) return res.status(400).json({response:'url needed'})
    const shortId = shortid.generate();
     await User.create({
     URL : redirectUrl,
     shortedURL : shortId,
     noOFClick : 0,
     created_by:req.user._id,
    })  
    return res.render('home',{id:shortId})
    return res.status(201).json({response : " successfully created short id which is ",
        shortid : id, 
    })  
}

async function handleRedirectUrl(req,res){
    try{const reqid = req.body.id;
    const result = await User.findOneAndUpdate(
        {shortedURL : reqid},
        {$inc : {noOFClick :1}},
        {
            returnDocument : "after",
            upsert : false
        }
    )
    if(!result) return res.status(400).send("Url not found");
    return res.status(301).redirect(result.URL);
}
catch(err){
    console.error("Error found  ",err);
    return res.status(500).send("Internal server error");
}
}

async function handleGetAllUser(req,res){
    const userData = await User.find({});
    const htmlList = userData.map( user => {
       return `<li> ${user.URL}   ${user.shortedURL}  ${user.noOFClick}</li>`
    }).join('')
    const html = `<ol> ${htmlList} </ol>`
    res.send(html);
}
module.exports = {
    handleCreateShortUrl,
    handleRedirectUrl,
    handleGetAllUser,
}