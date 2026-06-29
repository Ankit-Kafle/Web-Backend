//require(); whenever we wanted to include some module,object erc we use this function
const express = require('express');  //used to include express module which have many tool
const app= express(); //initializing express application
const port= 3000;  //variable that stores the port

//start your server or app
app.listen(port, ()=>{
  console.log("application has started bruda");
})   // this app application is listening to the  3000 port



app.get('/', (req, res) => {
  res.send('Hello World!');
});





// import item router file
const item = require('./Routes/item')
const lalu = require('./Routes/birds')

//load into application
app.use('/api',item);  
app.use('/maya',lalu);


// --> /api/ ->  then item home pg will get hit
// -> /api/items -> item post request will get hitted
// -> /api/items/id -> put/delete request





//Request 

// //get request
// app.get('/',(req,res) =>{
//   // res.send("Got a Get request") // If you come to this route (/) then in respose you will get the string define below

//   res.sendFile('./dummy.html',{root:__dirname});
// });


// //post request

// app.post('/items',(req,res)=>{
//   // res.send("Got a post requests")

// res.json({x:1, y:2, z:3});

// })

// //put request
// app.put('/items/:id',(req,res)=>{
//   res.send("Got a put request")
// })

// //delete request
// app.delete('/items/:id',(req,res)=>{
//   res.send("Got a delete request")
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


