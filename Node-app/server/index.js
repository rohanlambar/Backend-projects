

const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer((req,res)=>{
    console.log("server got request:",req.url);
    const myUrl = url.parse(req.url,true);
    switch(myUrl.pathname){
        case "/":
            res.end("you are at home page");
            break;
        case "/about":
            res.end("you are at about page");
            break;
        case "/search":
            const search = myUrl.query.search;
            res.end("search for ",search)
            break;
         default :
              res.end("404 NOT FOUND");
              break;
    }
    const time = new Date().toISOString();
    const ipAdd = req.socket.remoteAddress;
    fs.appendFileSync("serverRequest.txt", `At ${time }  server got request from ${ipAdd} on ${req.url}\n`);
    
});

myServer.listen(8000,()=> console.log("server started"));
