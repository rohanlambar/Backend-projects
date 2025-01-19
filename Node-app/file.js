 

// file handling 

const fs = require("fs");

//sync call
fs.writeFileSync("./test.txt"," hello file handling ");

// fs.writeFile("./test.txt","hello file handling in async",(err)=>{})

// sync call
// const data = fs.readFileSync("./test.txt","utf-8");
// console.log(data);

// async call
const data = fs.readFile("./test.txt","utf-8",(err,result)=>{
    if(err) console.log("err");
    else console.log(result);
})

fs.appendFileSync("./test.txt","this appended data");

