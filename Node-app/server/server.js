
// building a minimalistic server using express 

const express = require("express")

const app = express();

app.get("/",(req,res)=>{res.send(`you are at home page ${req.query.name}`)})
app.listen(8000,()=>console.log("server is started"));

