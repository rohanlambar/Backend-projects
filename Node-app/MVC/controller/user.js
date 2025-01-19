const User = require('../model/User')


async function handleGetAllUsers(req,res){
    const Data = await User.find({});
    const html = `
    <ul>
    ${Data.map((ele) => `<li>${ele.first_name}</li>`).join('')}
    </ul>
    `;
    return  res.send(html);
} 

async function handleCreateUser(req,res){
    const data = req.body;
    if(!data || !data.first_name || !data.last_name ) return res.status(400).json({response :" fill all field"})
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
  
  }

async function handleGetUserById(req,res){
    
    const data = await User.findById((req.params.id).trim());
    if(!data) return res.status(404).json({ response :'not found'})
     return res.json(data);
}
 
async function handleUpdateById(req,res){
    const reqId = (req.params.id).trim();
    const result = await User.findByIdAndUpdate(reqId,{first_name: "cristiano"})
    
    return res.send(result);
}

async function handleDeleteUserById(req,res){
    const data = (req.params.id).trim();
    await User.findByIdAndDelete(data);
   
    return res.status(200).json({status :"success"});
}


module.exports = {
  handleGetAllUsers,
  handleCreateUser,
  handleGetUserById,
  handleUpdateById,
  handleDeleteUserById,
}