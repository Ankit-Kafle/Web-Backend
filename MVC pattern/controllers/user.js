const User = require('../models/user')

async function handleGetAllUsers(req,res) {
    const allDbUsers = await User.find({});
    return res.json(allDbUsers);
}

async function handlegetUserById(req,res) {
    
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ status: "User not found" });
  return res.json(user);
}

async function handleUpdateUserById(req,res){
     await User.findByIdAndUpdate(req.params.id, { lastName: "Changed"});
 return res.json({status:"Success"});
}

async function handleDeleteUserById(req,res){
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).json({ status: "User not found" });
  return res.json({ status: "Success", id: user._id });
}

async function handleCreateNewUser(req, res) {
     const body = req.body;
  if (!body || !body.first_name || !body.last_name || !body.email || !body.job_title) {
    return res.status(400).json({ msg: "All fields are required" });
  }


  const user = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    jobTitle: body.job_title,
  });

  return res.status(201).json({ status: "success", id:user._id });

}

module.exports ={
    handleGetAllUsers,
     handlegetUserById,
     handleUpdateUserById,
     handleDeleteUserById,
      handleCreateNewUser
}
