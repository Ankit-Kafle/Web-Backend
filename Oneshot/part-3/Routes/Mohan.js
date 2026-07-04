const express = require('express');
const router = express.Router();

const User = require('../Models/userModel');

//routes




//CRUDE operations

// view/read

router.get('/users', async (req, res) => {
    try {

        //fetching all the entry using User.find();
        const users = await User.find(); // when request wii be receving in the route /users then we will bring all of the user from db and in response we will send all of the user 
        res.status(200).json(users);
    } 
    catch (err) {
        res.status(500).json({ success: false,
             message: err.message });
    }
});


//Create

router.post('/users', async(req,res)=>{


    try{
const {name,age,weight}= req.body;

// Saving all or only one entry using User.save()
const newUser = new User({name,age,weight});
await newUser.save();
res.status(200).json({
    success:true,
    user:newUser
})

    }

    catch(err){
res.status(500).json({
    success:false,
    message: err.message
})

    }


})


//Update
router.put('/users/:id', async(req,res) =>{
    const {id} = req.params;
    const {name,age,weight} = req.body;


try{
const updatedUser = await User.findByIdAndUpdate(id,{name,age,weight});
if(!updatedUser){
    res.json({
        message:"User not found"
    })
}

// but if you have updated the user sucessfully
res.status(200).json({
    success: true,
    user:updatedUser
})

}

catch(err){
    res.status(500).json({
    success:false,
    message: err.message
})
}
})


//delete

router.delete('/users/:id', async(req,res) =>{
const {id} = req.params;

    try{
const deletedUser = await User.findByIdAndDelete(id);

if(!deletedUser){
     res.json({
        message:"User not found"
    })
}

//if user found and deleted successfully
res.status(200).json({
    success:true,
    user: deletedUser
})

    }
catch(err){
    res.status(500).json({
    success:false,
    message: err.message
})
}
})

module.exports =router;
