
const express = require('express')
const path = require('path')
const staticRouter = require('./routes/staticRoutes.js')
const userRouter = require('./routes/user.js')
const cookieParser = require('cookie-parser')
const {connectToMongoDb} = require('./connectivity.js');


const PORT = 8000
const app  = express()

app.use(express.urlencoded({extended : false}));
app.use(express.json())
app.use(cookieParser()) 

//setting view engine for server side rendering 
app.set('view engine','ejs')
// setting path to all views in view folder
app.set('views',path.resolve('./views'));

//connecting to database
connectToMongoDb("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.0/blogweb")
app.use('/',staticRouter);
app.use('/user',userRouter)


app.listen(PORT,()=>{console.log(`Server started at ${PORT}`)})