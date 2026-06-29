const express = require('express');
const router = express.Router();


// define the home page route
//get request
router.get('/',(req,res) =>{
  res.send("Got a Get request") // If you come to this route (/) then in respose you will get the string define below

//   res.sendFile('./dummy.html',{root:__dirname});
});


//post request

router.post('/items',(req,res)=>{
  // res.send("Got a post requests")

res.json({x:1, y:2, z:3});

})

//put request
router.put('/items/:id',(req,res)=>{
  res.send("Got a put request")
})

//delete request
router.delete('/items/:id',(req,res)=>{
  res.send("Got a delete request")
})

module.exports = router;