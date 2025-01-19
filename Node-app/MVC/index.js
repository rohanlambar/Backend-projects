// this model all about refractoring 

// sample code is  RestFul api implementation


const express = require('express');// importing express framework
const { logReqRes } = require("./middleware/index")
const {connectionDb} = require('./connection')
const userRouter = require('./routes/user');


const PORT = 8000;// PORT OF server

const app = express(); // creating a object of express()

app.use(express.urlencoded({extended : false}));
app.use(logReqRes("log.txt"));
connectionDb("mongodb://127.0.0.1:27017")
app.use('/user',userRouter);

app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`));



