const express = require('express');// importing express framework
let userData = require('./data.json');// fetching data from JSON file
const fs = require('fs');// acquiring file system module
const PORT = 8000;// PORT OF server

const app = express(); // creating a object of express()

//establishing middleware 

// app.use(express.json);
app.use(express.urlencoded({extended : false}));
// GET request for homepage '/' 


app.get('/user', (req, res) => {
    const html = `
    <ul>
    ${userData.map((ele) => `<li>${ele.first_name}</li>`).join('')}
    </ul>
    `;
    res.setHeader("X-name","Rohan")
    console.log(req.headers)
    res.send(html);
});

// GET request to get user data of specific user

app.get('/user/:id',(req,res)=>{
     const reqid = Number(req.params.id) 
     const data = userData.find(user => user.id === reqid);
     if(!data) return res.status(404).json({ response :'not found'})
     const html = ` ID = ${data.id} <br>
     First Name = ${data.first_name } <br>
      Last Name = ${data.last_name}  `
     res.send(html);
})

// POST request for enter new data

app.post('/user/enterData',(req,res)=>{
    const data = req.body;
    if(!data || !data.first_name || !data.last_name ) return res.status(400).json({response :" fill all field"})
    userData.push({id : userData.length + 1,...data});
    // writing to json file
    
    fs.writeFile("./data.json", JSON.stringify(userData,null,2),(err)=> {})
    const html = `<p>
    id: ${userData.length }<br>
    first name :${data.first_name}<br>
    last Name :${data.last_name}
    </p>`
    return res.status(201).send(html)


})

// implement patch request

app.patch('/user/:id',(req,res)=>{
    const reqId = Number(req.params.id);
     userData.forEach((ele,ind)=>{
        if(ele.id === reqId){
            if(req.body.first_name !== undefined) ele.first_name = req.body.first_name;
            
            if( req.body.last_name !== undefined) ele.last_name = req.body.last_name;
        }
       return ele;
    })
    const html = `<h1> data change for id : ${req.params.id}</h1><br>
    <p>
    first_name : ${req.body.first_name}<br>
    </p>`;
    // writing it to json file 
    fs.writeFile("./data.json", JSON.stringify(userData,null,2),(err)=> {})
    
    return res.send(html);
})

app.delete('/user/:id',(req,res)=>{
    const data = req.params;
    userData = userData.filter((ele,ind)=> ele.id !== Number(data.id));
    const html = `
    <h1> Data deleted </h1>
    <p>
    id : ${data.id}<br>
   
    </p>
    `
    // writing to file
    fs.writeFile("./data.json", JSON.stringify(userData,null,2),(err)=> {})
    res.send(html)
})
app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`));



