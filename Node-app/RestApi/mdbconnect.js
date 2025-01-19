const express = require('express');// importing express framework

const  mongoose = require('mongoose')
const PORT = 8000;// PORT OF server
const userData = null;
const app = express(); // creating a object of express()

//establishing middleware 
// app.use(express.json);
app.use(express.urlencoded({extended : false}));
// GET request for homepage '/' 

// database connectivity 

  // establishing connectivity 
      mongoose
      .connect("mongodb://127.0.0.1:27017")
      .then(()=>console.log("database connected"))
      .catch((err)=> console.log("error",err));


   // designing schema
      const userSchema = new mongoose.Schema({
        first_name :{
            type:String,
            required: true,
        },
        last_name:{
            type:String,
            required:true,
        },
      },
      {timestamps: true}
    ) ;
      
      
    // establings mobel 
      const User = mongoose.model("client",userSchema)  ;


app.get('/user', async (req, res) => {
    const Data = await User.find({});
    const html = `
    <ul>
    ${Data.map((ele) => `<li>${ele.first_name}</li>`).join('')}
    </ul>
    `;
    // res.setHeader("X-name","Rohan") custom headers
    // console.log(req.headers)
    res.send(html);
});

// GET request to get user data of specific user

app.get('/user/:id',async (req,res)=>{
    
     const data = await User.findById((req.params.id).trim());
     if(!data) return res.status(404).json({ response :'not found'})
    //  const html = ` ID = ${data.id} <br>
    //  First Name = ${data.first_name } <br>
    //   Last Name = ${data.last_name}  `
     res.json(data);
})

// POST request for enter new data

app.post('/user/enterData',async (req,res)=>{
    const data = req.body;
    if(!data || !data.first_name || !data.last_name ) return res.status(400).json({response :" fill all field"})
  
   // creating a new entry in database 
     const result =  await User.create({
        first_name : data.first_name,
        last_name : data.last_name,
      })

    
    const html = `<p>
    id:  ${result._id}
    first name :${data.first_name}<br>
    last Name :${data.last_name}
    </p>`
    return res.status(201).send(html)


})

// implement patch request

app.patch('/user/:id',async (req,res)=>{
    const reqId = (req.params.id).trim();
    // const html = `<h1> data change for id : ${req.params.id}</h1><br>
    // <p>
    // first_name : ${req.body.first_name}<br>
    // </p>`;
    // writing it to database file 
    const result = await User.findByIdAndUpdate(reqId,{first_name: "cristiano"})
    
    return res.send(result);
})

app.delete('/user/:id',async(req,res)=>{
    const data = (req.params.id).trim();
    await User.findByIdAndDelete(data);
   
    res.status(200).json({status :"success"});
})
app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`));



