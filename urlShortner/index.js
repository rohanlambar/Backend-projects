//importing  express 
const express = require('express');
const path = require('path');
const {connectionDb} = require("./connection")
const cookieParser = require("cookie-parser")
const URLs = require("./model/url")
// routers 


const urlRouter =  require("./routes/url")
const staticRouter = require("./routes/staticRoute");
const userRouter = require("./routes/user");
const {checkForAuthentication,restrictTo} = require("./middleware/Authentication")
// creating object of express 
const app = express();

// assigning PORT no 
const PORT = 8001;
app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use(cookieParser());
app.use(checkForAuthentication);
//establishing connection 
connectionDb("mongodb://127.0.0.1:27017/urlshortner");

// using ejs as templeting engine for server side rendering 
app.set("view engine","ejs");
// setting path for all view folder 
app.set("views","./views");
app.use("/",staticRouter);
app.use('/url',restrictTo(["NORMAL","ADMIN"]),urlRouter);
app.use('/user',userRouter);
app.listen(PORT,()=>console.log(`Server started at ${PORT}`));

