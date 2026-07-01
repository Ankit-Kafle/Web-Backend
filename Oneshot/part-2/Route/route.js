const express = require('express');
const router = express.Router();

//middlewares
const auth = function (req,res,next){
    console.log("i am inside auth wala middleware");
    
//adding a dummy user
req.user = {userId:1, role:"admin"};

if(req.user) {
    //if a valid user is there in req, then proceed to next middleware
    next();
}
else {
    //if not a valid user
    res.json(
        {
            success: false,
            message: "Not a valid user",
        }
    )
}
}

const isStudent = function(req,res,next){
    console.log("I am inside student ones middleware");

    if(req.user.role==="student"){
        next();
    }

    else{
        res.json({
            success: false,
            message:"Acess Denied, this route is only for students"
        })
    }
}




const isAdmin = function(req,res,next){
    console.log("I am inside admin ones middleware");

    if(req.user.role==="admin"){
        next();
    }

    else{
        res.json({
            success: false,
            message:"Acess Denied: this route is only for admin"
        })
    }
}

//routes
router.get("/student",auth,isStudent,(req,res)=>{
    console.log("I am inside student route")
    res.send("Student Specific Page")
})
router.get("/admin",auth,isAdmin,(req,res)=>{
    console.log("I am inside admin route")
    res.send("admin Specific Page")
})


module.exports = router;